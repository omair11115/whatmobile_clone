import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SEO } from '@/src/components/SEO';
import { motion } from 'motion/react';

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email Us',
      value: 'umair.anser115@gmail.com',
      href: 'mailto:umair.anser115@gmail.com'
    },
    {
      icon: Phone,
      label: 'Call Us',
      value: '+92 (000) 000-0000',
      href: 'tel:+920000000000'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Karachi, Pakistan',
      href: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f0f2f5] py-20 lg:py-32">
      <SEO 
        title="Contact Us - MobiSpec" 
        description="Get in touch with the MobiSpec team for inquiries, feedback, or support."
      />
      
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tight text-[#1a3a5a]">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            Have questions about a mobile phone? Want to partner with us or share feedback? 
            Drop us a message and our team will get back to you shortly.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="bg-[#1a3a5a]/5 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#1a3a5a] transition-colors">
                <item.icon className="h-7 w-7 text-[#1a3a5a] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xs uppercase font-black tracking-widest text-muted-foreground mb-3">{item.label}</h3>
              <p className="text-lg font-bold text-[#1a3a5a]">{item.value}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="p-12 rounded-[2rem] bg-gradient-to-br from-[#1a3a5a] to-[#2c4c6c] text-white shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-black uppercase mb-4 tracking-tight">Working Hours</h2>
            <p className="opacity-70 font-medium mb-0">Monday — Friday: 9:00 AM - 6:00 PM</p>
            <p className="opacity-70 font-medium mt-1">Saturday: 10:00 AM - 2:00 PM</p>
          </div>
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        </motion.div>
      </div>
    </div>
  );
}
