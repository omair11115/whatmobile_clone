import { BlogPost } from '@/src/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <a href={`/blog/${post.slug}`} className="block group">
      <Card className="overflow-hidden border border-slate-100 hover:border-violet-100 shadow-sm hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500 rounded-2xl bg-white group-hover:-translate-y-1">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={post.image || 'https://picsum.photos/seed/tech/800/450'} 
            alt={post.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
        </div>
        <CardContent className="p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Calendar className="h-3 w-3 text-violet-500" />
              <span>{format(new Date(post.created_at), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <User className="h-3 w-3 text-violet-500" />
              <span>{post.author}</span>
            </div>
          </div>
          <h3 className="font-black text-lg leading-tight line-clamp-2 group-hover:text-violet-600 transition-colors tracking-tight text-slate-800 antialiased">
            {post.title}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map(tag => (
              <Badge key={tag} className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-violet-50 text-violet-600 border-none hover:bg-violet-100 transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
