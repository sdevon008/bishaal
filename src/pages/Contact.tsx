
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';
import AdSpace from '@/components/shared/AdSpace';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4 
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill out all fields");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    // Create mailto link with prefilled information
    const subject = encodeURIComponent(`Contact Form: ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:devendrashah@outlook.my?subject=${subject}&body=${body}`;
    
    // Open the email client
    window.location.href = mailtoLink;

    // Show success message
    toast.success("Opening your email client to send the message");
    
    // Clear form and reset submission state after a short delay
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Contact Us | Your Nepal App</title>
        <meta name="description" content="Contact us for support, feedback, or inquiries about Your Nepal App's tools and services." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          {/* Top Ad Banner */}
          <div className="mb-8">
            <AdSpace size="banner" className="mx-auto" />
          </div>
          
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-8" variants={itemVariants}>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Get in <span className="text-nepal-red">Touch</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have questions or feedback? We'd love to hear from you.
              </p>
              <Separator className="my-6 max-w-md mx-auto bg-gray-200" />
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div className="md:col-span-1" variants={itemVariants}>
                <Card className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                    <p className="text-gray-600 mb-6">
                      Feel free to reach out with questions, suggestions, or feedback about our Nepali culture tools.
                    </p>
                    
                    <div className="space-y-4 mt-6">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-nepal-red mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">Email</p>
                          <a href="mailto:devendrashah@outlook.my" className="text-gray-600 hover:text-nepal-red transition-colors">
                            devendrashah@outlook.my
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-nepal-red mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-gray-600">Kathmandu, Nepal</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-nepal-red mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">WhatsApp</p>
                          <a href="https://wa.me/9779808848817" className="text-gray-600 hover:text-nepal-red transition-colors">
                            +977 9808848817
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <AdSpace size="mediumRectangle" className="mt-8" />
                </Card>
              </motion.div>
              
              <motion.div className="md:col-span-2" variants={itemVariants}>
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <Input 
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input 
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <Textarea 
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Enter your message..."
                          rows={6}
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-nepal-red hover:bg-nepal-crimson text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Bottom Ad Banner */}
          <div className="mt-8">
            <AdSpace size="banner" className="mx-auto" />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
