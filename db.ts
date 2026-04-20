import "dotenv/config";
import pg from 'pg';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is NOT detected. Please check your .env file in the root directory.");
} else {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl && dbUrl.includes('://')) {
      const host = new URL(dbUrl).hostname;
      console.log(`✅ Database host detected: ${host}`);
    } else {
      console.log("✅ Database URL detected (non-standard format).");
    }
  } catch (e) {
    console.log("✅ Database URL detected.");
  }
}

// Use environment variable for connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // If no URL is provided, it will try to connect to localhost by default
  // We should handle this gracefully
});

// Initialize tables
const initDb = async () => {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL not found. Database features will be unavailable.");
    return;
  }

  try {
    const client = await pool.connect();
    try {
      console.log("Starting database initialization...");
      
      // Migrations for type standardization
      console.log("Standardizing ID types to TEXT...");
      const idConversionTables = ['mobiles', 'posts', 'brands', 'price_ranges', 'networks', 'ram_options', 'screen_sizes', 'mobile_features', 'os_options', 'gallery_images'];
      for (const table of idConversionTables) {
        try {
          await client.query(`
            DO $$ 
            BEGIN 
              IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='${table}' AND column_name='id' AND data_type='uuid') THEN
                ALTER TABLE ${table} ALTER COLUMN id TYPE TEXT USING id::text;
              END IF;
            END $$;
          `);
        } catch (e) {
          console.error(`Error converting ${table}.id to TEXT:`, e);
        }
      }

      const tableQueries = [
        {
          name: 'mobiles',
          query: `CREATE TABLE IF NOT EXISTS mobiles (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            brand TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            price TEXT,
            currency TEXT,
            launch_date TEXT,
            images JSONB,
            specs JSONB,
            description TEXT,
            seo_title TEXT,
            seo_description TEXT,
            category TEXT,
            features JSONB,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )`
        },
        {
          name: 'posts',
          query: `CREATE TABLE IF NOT EXISTS posts (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            content TEXT,
            author TEXT,
            image TEXT,
            tags JSONB,
            seo_title TEXT,
            seo_description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )`
        },
        {
          name: 'brands',
          query: `CREATE TABLE IF NOT EXISTS brands (
            id TEXT PRIMARY KEY,
            name TEXT UNIQUE NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            logo TEXT,
            description TEXT
          )`
        },
        {
          name: 'price_ranges',
          query: `CREATE TABLE IF NOT EXISTS price_ranges (
            id TEXT PRIMARY KEY,
            label TEXT NOT NULL,
            min_price INTEGER NOT NULL,
            max_price INTEGER NOT NULL,
            currency TEXT DEFAULT 'Rs.'
          )`
        },
        {
          name: 'networks',
          query: `CREATE TABLE IF NOT EXISTS networks (
            id TEXT PRIMARY KEY,
            name TEXT UNIQUE NOT NULL,
            slug TEXT UNIQUE NOT NULL
          )`
        },
        {
          name: 'ram_options',
          query: `CREATE TABLE IF NOT EXISTS ram_options (
            id TEXT PRIMARY KEY,
            label TEXT UNIQUE NOT NULL,
            slug TEXT UNIQUE NOT NULL
          )`
        },
        {
          name: 'screen_sizes',
          query: `CREATE TABLE IF NOT EXISTS screen_sizes (
            id TEXT PRIMARY KEY,
            label TEXT UNIQUE NOT NULL,
            slug TEXT UNIQUE NOT NULL
          )`
        },
        {
          name: 'mobile_features',
          query: `CREATE TABLE IF NOT EXISTS mobile_features (
            id TEXT PRIMARY KEY,
            label TEXT UNIQUE NOT NULL,
            slug TEXT UNIQUE NOT NULL
          )`
        },
        {
          name: 'os_options',
          query: `CREATE TABLE IF NOT EXISTS os_options (
            id TEXT PRIMARY KEY,
            name TEXT UNIQUE NOT NULL,
            slug TEXT UNIQUE NOT NULL
          )`
        },
        {
          name: 'gallery_images',
          query: `CREATE TABLE IF NOT EXISTS gallery_images (
            id TEXT PRIMARY KEY,
            file_name TEXT NOT NULL,
            mime_type TEXT NOT NULL,
            size INTEGER NOT NULL,
            data BYTEA NOT NULL,
            description TEXT,
            alt_text TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )`
        },
        {
          name: 'users',
          query: `CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            google_id TEXT UNIQUE,
            username TEXT UNIQUE,
            password_hash TEXT,
            email TEXT UNIQUE,
            name TEXT,
            avatar TEXT,
            role TEXT DEFAULT 'USER',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          )`
        },
        {
          name: 'comments',
          query: `CREATE TABLE IF NOT EXISTS comments (
            id TEXT PRIMARY KEY,
            mobile_id TEXT REFERENCES mobiles(id) ON DELETE CASCADE,
            post_id TEXT REFERENCES posts(id) ON DELETE CASCADE,
            user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
            content TEXT NOT NULL,
            parent_id TEXT REFERENCES comments(id) ON DELETE CASCADE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          )`
        },
        {
          name: 'ratings',
          query: `CREATE TABLE IF NOT EXISTS ratings (
            id TEXT PRIMARY KEY,
            mobile_id TEXT REFERENCES mobiles(id) ON DELETE CASCADE,
            user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
            rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(mobile_id, user_id)
          )`
        }
      ];

      for (const t of tableQueries) {
        try {
          await client.query(t.query);
          console.log(`✅ Table checked/created: ${t.name}`);
        } catch (e) {
          console.error(`❌ Error creating table ${t.name}:`, e);
        }
      }

      // Migrations
      console.log("Running migrations...");
      
      const migrationQueries = [
        {
          name: 'brands slug migration',
          query: `DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='brands' AND column_name='slug') THEN
                    ALTER TABLE brands ADD COLUMN slug TEXT;
                    UPDATE brands SET slug = LOWER(REPLACE(name, ' ', '-')) WHERE slug IS NULL;
                    ALTER TABLE brands ALTER COLUMN slug SET NOT NULL;
                    ALTER TABLE brands ADD CONSTRAINT brands_slug_key UNIQUE (slug);
                END IF;
            END $$;`
        },
        {
          name: 'mobiles filter columns migration',
          query: `DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='mobiles' AND column_name='network') THEN
                    ALTER TABLE mobiles ADD COLUMN network TEXT;
                END IF;
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='mobiles' AND column_name='ram') THEN
                    ALTER TABLE mobiles ADD COLUMN ram TEXT;
                END IF;
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='mobiles' AND column_name='screen_size') THEN
                    ALTER TABLE mobiles ADD COLUMN screen_size TEXT;
                END IF;
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='mobiles' AND column_name='os') THEN
                    ALTER TABLE mobiles ADD COLUMN os TEXT;
                END IF;
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='mobiles' AND column_name='coming_soon') THEN
                    ALTER TABLE mobiles ADD COLUMN coming_soon BOOLEAN DEFAULT FALSE;
                END IF;
            END $$;`
        },
        {
          name: 'posts brand columns migration',
          query: `DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='brand') THEN
                    ALTER TABLE posts ADD COLUMN brand TEXT;
                END IF;
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='brand_id') THEN
                    ALTER TABLE posts ADD COLUMN brand_id TEXT;
                END IF;
            END $$;`
        },
        {
          name: 'post_comments column migration',
          query: `DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='comments' AND column_name='post_id') THEN
                    ALTER TABLE comments ADD COLUMN post_id TEXT;
                END IF;
            END $$;`
        },
        {
          name: 'approval workflow columns',
          query: `DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='mobiles' AND column_name='status') THEN
                    ALTER TABLE mobiles ADD COLUMN status TEXT DEFAULT 'published';
                END IF;
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='status') THEN
                    ALTER TABLE posts ADD COLUMN status TEXT DEFAULT 'published';
                END IF;
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='brands' AND column_name='status') THEN
                    ALTER TABLE brands ADD COLUMN status TEXT DEFAULT 'published';
                END IF;
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='role') THEN
                    ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'USER';
                END IF;
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='username') THEN
                    ALTER TABLE users ADD COLUMN username TEXT UNIQUE;
                END IF;
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='password_hash') THEN
                    ALTER TABLE users ADD COLUMN password_hash TEXT;
                END IF;
            END $$;`
        }
      ];

      for (const m of migrationQueries) {
        try {
          await client.query(m.query);
          console.log(`✅ Migration completed: ${m.name}`);
        } catch (e) {
          console.error(`❌ Error in migration ${m.name}:`, e);
        }
      }

      // Seed specific users
      console.log("Seeding specific users...");
      const usersToSeed = [
        {
          username: 'nova_rider27',
          password: 'X7@kL9!pQ2z',
          role: 'SUPER_ADMIN',
          name: 'Nova Rider'
        },
        {
          username: 'pixel_forge88',
          password: 'mT4#vZ1$yR8',
          role: 'MANAGER',
          name: 'Pixel Forge'
        }
      ];

      for (const user of usersToSeed) {
        const checkRes = await client.query('SELECT id FROM users WHERE username = $1', [user.username]);
        if (checkRes.rows.length === 0) {
          const passHash = await bcrypt.hash(user.password, 10);
          await client.query(
            'INSERT INTO users (id, username, password_hash, role, name) VALUES ($1, $2, $3, $4, $5)',
            [uuidv4(), user.username, passHash, user.role, user.name]
          );
          console.log(`✅ User seeded: ${user.username} (${user.role})`);
        }
      }

      console.log("Database successfully initialized.");
      
      // Auto-Seed if mobiles are empty
      const mobileCountRes = await client.query('SELECT count(*) FROM mobiles');
      const mobileCount = parseInt(mobileCountRes.rows[0].count);
      
      if (mobileCount < 90) {
        console.log("Database needs seeding. Cleaning and starting auto-seed...");
        
        await client.query('DELETE FROM mobiles');
        await client.query('DELETE FROM posts');
        await client.query('DELETE FROM brands');
        await client.query('DELETE FROM price_ranges');
        await client.query('DELETE FROM networks');
        await client.query('DELETE FROM ram_options');
        await client.query('DELETE FROM screen_sizes');
        await client.query('DELETE FROM mobile_features');
        await client.query('DELETE FROM os_options');
        const seededBrands = [
          { name: 'iPhone', slug: 'iphone', logo: 'https://picsum.photos/seed/apple/200/200' },
          { name: 'Samsung', slug: 'samsung', logo: 'https://picsum.photos/seed/samsung/200/200' },
          { name: 'Xiaomi', slug: 'xiaomi', logo: 'https://picsum.photos/seed/xiaomi/200/200' },
          { name: 'Test Brand', slug: 'test-brand', logo: 'https://picsum.photos/seed/test/200/200' },
        ];

        for (const b of seededBrands) {
          await client.query(
            'INSERT INTO brands (id, name, slug, logo, description, status) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (name) DO NOTHING',
            [uuidv4(), b.name, b.slug, b.logo, `${b.name} description.`, 'published']
          );
        }

        // Seeding Filter Options
        const priceRanges = [
          { label: '10k - 20k', min: 10000, max: 20000 },
          { label: '20k - 40k', min: 20001, max: 40000 },
          { label: '40k - 70k', min: 40001, max: 70000 },
          { label: '70k+', min: 70001, max: 500000 },
        ];
        for (const p of priceRanges) {
          await client.query('INSERT INTO price_ranges (id, label, min_price, max_price) VALUES ($1, $2, $3, $4)', [uuidv4(), p.label, p.min, p.max]);
        }

        const networks = ['2G Band', '3G Band', '4G Band', '5G Band'];
        for (const n of networks) {
          await client.query('INSERT INTO networks (id, name, slug) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING', [uuidv4(), n, n.toLowerCase().replace(/ /g, '-')]);
        }

        const rams = ['2GB RAM', '4GB RAM', '6GB RAM', '8GB RAM', '12GB RAM', '16GB RAM'];
        for (const r of rams) {
          await client.query('INSERT INTO ram_options (id, label, slug) VALUES ($1, $2, $3) ON CONFLICT (label) DO NOTHING', [uuidv4(), r, r.toLowerCase().replace(/ /g, '-')]);
        }

        const screens = ['5.5 inches', '6 inches', '6.1 inches', '6.5 inches', '6.7 inches', '6.8 inches'];
        for (const s of screens) {
          await client.query('INSERT INTO screen_sizes (id, label, slug) VALUES ($1, $2, $3) ON CONFLICT (label) DO NOTHING', [uuidv4(), s, s.toLowerCase().replace(/ /g, '-')]);
        }

        const features = ['8MP', '12MP', '48MP', '50MP', '108MP', '200MP', 'Water Resistance', 'Fast Charging'];
        for (const f of features) {
          await client.query('INSERT INTO mobile_features (id, label, slug) VALUES ($1, $2, $3) ON CONFLICT (label) DO NOTHING', [uuidv4(), f, f.toLowerCase().replace(/ /g, '-')]);
        }

        const osList = ['Android', 'iOS', 'HarmonyOS'];
        for (const o of osList) {
          await client.query('INSERT INTO os_options (id, name, slug) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING', [uuidv4(), o, o.toLowerCase().replace(/ /g, '-')]);
        }

        // Seeding 100 Mobiles
        const mobileModels = ['Pro', 'Ultra', 'S', 'Note', 'Edge', 'Plus', 'Max', 'Prime', 'Lite', 'Neo'];
        for (let i = 1; i <= 100; i++) {
            const brandObj = seededBrands[Math.floor(Math.random() * seededBrands.length)];
            const model = mobileModels[Math.floor(Math.random() * mobileModels.length)];
            const name = `${brandObj.name} ${model} ${Math.floor(Math.random() * 20) + 10}`;
            const slug = `${name.toLowerCase().replace(/ /g, '-')}-${i}`;
            const price = Math.floor(Math.random() * 150000) + 10000;
            const ram = rams[Math.floor(Math.random() * rams.length)];
            const screen = screens[Math.floor(Math.random() * screens.length)];
            const network = networks[Math.floor(Math.random() * networks.length)];
            const os = brandObj.name === 'iPhone' ? 'iOS' : (Math.random() > 0.1 ? 'Android' : 'HarmonyOS');
            const feature = features[Math.floor(Math.random() * 6)];
            
            await client.query(
                `INSERT INTO mobiles (
                    id, name, brand, slug, price, currency, launch_date, 
                    images, specs, description, category, features, 
                    network, ram, screen_size, os, status
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
                [
                    uuidv4(),
                    name,
                    brandObj.name,
                    slug,
                    price.toString(),
                    'Rs.',
                    '2024, May',
                    JSON.stringify(['https://picsum.photos/seed/' + slug + '/800/600']),
                    JSON.stringify({ 
                        build: { os, dimensions: '160 x 75 x 8 mm', weight: '190g' },
                        display: { size: screen, technology: 'AMOLED' },
                        memory: { ram: ram, internal: '128GB/256GB' },
                        main_camera: { triple: feature + ' triple camera' }
                    }),
                    `The ${name} is a high-performance smartphone from ${brandObj.name}.`,
                    price > 80000 ? 'flagship' : (price > 40000 ? 'mid-range' : 'budget'),
                    JSON.stringify([feature]),
                    network,
                    ram,
                    screen,
                    os,
                    'published'
                ]
            );
        }

        // Seeding News Posts
        for (let i = 1; i <= 10; i++) {
            const title = `Latest Tech Update ${i}: The Future of Mobile Technology`;
            const slug = title.toLowerCase().replace(/ /g, '-').replace(/:/g, '') + '-' + i;
            await client.query(
                'INSERT INTO posts (id, title, slug, content, author, image, status) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [uuidv4(), title, slug, 'Today we look at the latest updates in the mobile industry. Many brands are launching new flagship devices with incredible camera features and faster processors.', 'Tech Reporter', 'https://picsum.photos/seed/tech' + i + '/1200/600', 'published']
            );
        }
        console.log("✅ Auto-seed completed successfully.");
      }

      console.log("PostgreSQL tables initialized");
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Failed to connect to PostgreSQL. Please check your DATABASE_URL.");
    // We don't rethrow here to allow the server to start even without DB
  }
};

// Run initialization in background
initDb().catch(err => console.error("Background DB init failed:", err));

export default pool;
