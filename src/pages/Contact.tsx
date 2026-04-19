import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SEO } from '@/src/components/SEO';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending email to umair.anser115@gmail.com
    console.log('Sending message to: umair.anser115@gmail.com', formData);
    
    // In a real app with a backend, we'd call an API here
    // For now, we simulate the success state
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] py-12">
      <SEO 
        title="Contact Us - MobiSpec" 
        description="Get in touch with the MobiSpec team for inquiries, feedback, or support."
      />
      
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Contact Info */}
            <div className="bg-[#1a3a5a] text-white p-8 md:p-12">
              <h1 className="text-3xl font-black uppercase mb-6 tracking-tight">Get in Touch</h1>
              <p className="opacity-80 mb-10 leading-relaxed font-medium">
                Have questions about a mobile phone? Want to partner with us or share feedback? 
                Drop us a message and our team will get back to you shortly.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold opacity-60 mb-1">Email Us</p>
                    <p className="font-bold">umair.anser115@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold opacity-60 mb-1">Call Us</p>
                    <p className="font-bold">+92 (000) 000-0000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold opacity-60 mb-1">Location</p>
                    <p className="font-bold">Karachi, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-8 md:p-12 relative">
              {isSubmitted ? (
                <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
                  <div className="bg-green-100 p-4 rounded-full mb-6">
                    <CheckCircle2 className="h-16 w-16 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-black text-[#1a3a5a] uppercase mb-2">Message Sent!</h2>
                  <p className="text-muted-foreground font-medium mb-8">
                    Thank you for reaching out. We've received your inquiry and will respond to <span className="text-[#1a3a5a] font-bold">umair.anser115@gmail.com</span> shortly.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#1a3a5a] hover:bg-[#2c4c6c] font-bold"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-black text-[#1a3a5a] uppercase mb-8 tracking-tight">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase text-[#1a3a5a]">Full Name</label>
                        <Input 
                          required
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-muted/30 border-none h-11"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase text-[#1a3a5a]">Email Address</label>
                        <Input 
                          required
                          type="email"
                          placeholder="Your email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-muted/30 border-none h-11"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-[#1a3a5a]">Subject</label>
                      <Input 
                        required
                        placeholder="What is this regarding?"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="bg-muted/30 border-none h-11"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-[#1a3a5a]">Message</label>
                      <Textarea 
                        required
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="bg-muted/30 border-none min-h-[150px] resize-none"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-[#d32f2f] hover:bg-[#b71c1c] h-12 text-sm font-black uppercase tracking-widest shadow-lg shadow-red-200">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
