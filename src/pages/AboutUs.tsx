
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Separator } from '@/components/ui/separator';
import AdSpace from '@/components/shared/AdSpace';

const AboutUs = () => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About Us | Your Nepal App</title>
        <meta name="description" content="Learn about Your Nepal App and our mission to provide useful tools and services for Nepal." />
        <meta name="keywords" content="nepal app, nepali tools, about us, nepali services, nepal digital tools" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          {/* Top Ad Banner */}
          <div className="mb-8">
            <AdSpace size="banner" className="mx-auto" />
          </div>
          
          <motion.div 
            className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl font-bold mb-6">About Us</h1>
              <Separator className="my-6" />
              
              <div className="prose prose-slate max-w-none">
                <p className="mb-4">
                  Welcome to Your Nepal App, your comprehensive resource for Nepali utilities and tools.
                </p>
                
                <p className="mb-4">
                  Founded in 2023, we aim to provide accessible digital services that simplify everyday tasks 
                  for Nepali citizens and anyone interested in Nepal.
                </p>
                
                <h2 className="text-xl font-semibold mt-6 mb-3">Our Mission</h2>
                <p className="mb-4">
                  Our mission is to bridge the digital divide by creating user-friendly, accessible tools that 
                  make everyday tasks easier for Nepalese people everywhere. We believe in technology that 
                  serves people where they are, with the resources they have.
                </p>
                
                <h2 className="text-xl font-semibold mt-6 mb-3">What We Offer</h2>
                <p className="mb-4">
                  Our tools include:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Nepali date conversion between BS and AD</li>
                  <li>Comprehensive Nepali calendar with festivals and holidays</li>
                  <li>Unicode conversion tools for Nepali text</li>
                  <li>Load shedding schedules</li>
                  <li>Daily, weekly, and monthly rashifal (horoscope)</li>
                  <li>Currency conversion focused on Nepali Rupee</li>
                  <li>And much more!</li>
                </ul>
                
                <h2 className="text-xl font-semibold mt-6 mb-3">Our Values</h2>
                <p className="mb-4">
                  We believe in:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li><strong>Accessibility:</strong> Creating tools that work for everyone, regardless of technical skill</li>
                  <li><strong>Reliability:</strong> Providing accurate and up-to-date information</li>
                  <li><strong>Simplicity:</strong> Designing intuitive interfaces that are easy to use</li>
                  <li><strong>Cultural Relevance:</strong> Respecting and reflecting Nepali culture in everything we create</li>
                </ul>
                
                <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
                <p>
                  For any inquiries or feedback, please contact us at support@yournepalapp.com or visit our 
                  <a href="/contact" className="text-nepal-red hover:text-nepal-crimson ml-1">contact page</a>.
                </p>
              </div>
            </motion.div>
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

export default AboutUs;
