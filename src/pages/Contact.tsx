
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to WhatsApp
    const redirectTimer = setTimeout(() => {
      window.location.href = "https://wa.me/9779808848817";
    }, 100);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div>
      <Helmet>
        <title>Contact Us | Your Nepal App</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="Contact us for support, feedback, or inquiries about Your Nepal App's tools and services." />
      </Helmet>
      {/* This content won't be visible due to the redirect */}
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="mb-8">Fill out the form below to get in touch with us.</p>
        
        <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input type="text" id="name" className="w-full px-3 py-2 border rounded-md" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input type="email" id="email" className="w-full px-3 py-2 border rounded-md" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
            <textarea id="message" rows={5} className="w-full px-3 py-2 border rounded-md"></textarea>
          </div>
          
          <button 
            type="submit" 
            className="bg-nepal-red text-white py-2 px-4 rounded-md hover:bg-nepal-crimson transition-colors"
          >
            Send Message
          </button>
          
          <p className="mt-4 text-sm text-gray-600">
            Your message will be sent to: devendrashah@outlook.my
          </p>
        </form>
      </div>
    </div>
  );
};

export default Contact;
