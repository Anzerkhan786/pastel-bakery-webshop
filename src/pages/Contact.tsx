
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";
import { 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Message sent successfully! We'll get back to you soon.");
    
    // Reset form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setLoading(false);
  };
  
  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl font-serif font-medium mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Have questions, special requests, or just want to say hello? We'd love to hear from you!
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="md:col-span-3">
              <div className="bakery-card p-6">
                <h2 className="text-2xl font-serif mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="bakery-button bakery-button-primary"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="md:col-span-2">
              <div className="bakery-card p-6 h-full">
                <h2 className="text-2xl font-serif mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="bg-bakery-pink bg-opacity-20 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Visit Our Bakery</h3>
                      <address className="not-italic text-muted-foreground">
                        123 Bakery Street<br />
                        Sweet Town, ST 12345<br />
                        United States
                      </address>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="bg-bakery-yellow bg-opacity-20 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Call Us</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:+15551234567" className="hover:text-primary-foreground transition-colors">
                          (555) 123-4567
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="bg-bakery-green bg-opacity-20 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Email Us</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:info@sweetdelights.com" className="hover:text-primary-foreground transition-colors">
                          info@sweetdelights.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium text-lg mb-2">Business Hours</h3>
                  <div className="grid grid-cols-2 gap-1 text-sm text-muted-foreground">
                    <div>Monday - Friday</div>
                    <div>7:00 AM - 6:00 PM</div>
                    <div>Saturday</div>
                    <div>8:00 AM - 5:00 PM</div>
                    <div>Sunday</div>
                    <div>8:00 AM - 2:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="mt-12">
            <div className="aspect-video rounded-lg overflow-hidden shadow-card bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">
                Map would be embedded here in a production environment
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
