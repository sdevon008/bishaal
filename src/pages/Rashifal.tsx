
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Star, Moon } from 'lucide-react';
import AdSpace from '@/components/shared/AdSpace';

const Rashifal = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Set current date in Nepali format for SEO and display
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(today.toLocaleDateString('en-US', options));
    
    // Handle iframe load event
    const handleIframeLoad = () => {
      setIsLoading(false);
      
      // Access iframe content to remove copyright elements
      try {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          const iframeDocument = iframeRef.current.contentWindow.document;
          
          // Create style element to inject CSS
          const style = document.createElement('style');
          style.textContent = `
            span[style*="color:gray; font-size:8px;"],
            a[href*="ashesh.com.np"],
            a[title="Nepali horoscope"],
            .copyright, .footer-credit {
              display: none !important;
            }
            body {
              font-family: 'Arial', sans-serif;
              color: #333;
              line-height: 1.6;
            }
            .rashifal-container {
              padding: 0 !important;
              margin: 0 !important;
            }
            .rashifal-header {
              background-color: var(--primary-color, #f0b03f) !important;
              color: white !important;
              border-radius: 4px 4px 0 0 !important;
            }
            .rashifal-content {
              background-color: white !important;
              border-radius: 0 0 4px 4px !important;
              padding: 15px !important;
            }
          `;
          
          // Append style to iframe head
          iframeDocument.head.appendChild(style);
        }
      } catch (error) {
        console.error("Error modifying iframe content:", error);
      }
    };

    // Add load event listener to iframe
    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', handleIframeLoad);
    }

    // Cleanup function
    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleIframeLoad);
      }
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
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
        duration: 0.3 
      }
    }
  };

  // Zodiac signs data for SEO and display
  const zodiacSigns = [
    { name: 'Mesh (मेष)', english: 'Aries', date: 'March 21 - April 19' },
    { name: 'Brish (वृष)', english: 'Taurus', date: 'April 20 - May 20' },
    { name: 'Mithun (मिथुन)', english: 'Gemini', date: 'May 21 - June 20' },
    { name: 'Karkat (कर्कट)', english: 'Cancer', date: 'June 21 - July 22' },
    { name: 'Singh (सिंह)', english: 'Leo', date: 'July 23 - August 22' },
    { name: 'Kanya (कन्या)', english: 'Virgo', date: 'August 23 - September 22' },
    { name: 'Tula (तुला)', english: 'Libra', date: 'September 23 - October 22' },
    { name: 'Brischik (वृश्चिक)', english: 'Scorpio', date: 'October 23 - November 21' },
    { name: 'Dhanu (धनु)', english: 'Sagittarius', date: 'November 22 - December 21' },
    { name: 'Makar (मकर)', english: 'Capricorn', date: 'December 22 - January 19' },
    { name: 'Kumbha (कुम्भ)', english: 'Aquarius', date: 'January 20 - February 18' },
    { name: 'Meen (मीन)', english: 'Pisces', date: 'February 19 - March 20' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Aajako Rashifal - Today's Nepali Horoscope for {currentDate} | Your Nepal App</title>
        <meta name="description" content={`Read today's (${currentDate}) rashifal (horoscope) in Nepali. Get your daily, weekly, and monthly aajako rashifal for all zodiac signs - Mesh, Brish, Mithun, Karkat, Singh, Kanya, Tula, Brischik, Dhanu, Makar, Kumbha, and Meen.`} />
        <meta name="keywords" content="today rashifal, aajako rashifal, nepali rashifal, rashifal today nepali, rashifal in nepali, rashi, hamro patro rashifal, hamro rashifal, rashifal in english, aaja ko rashifal, today rashifal in nepali, rashifal 2081, aaj ka rashifal, nepali patro rashifal, horoscope, aaj ko rashifal, weekly rashifal, aajako rashifal nepali, aja ko rashifal, rashifal mithun, hindi rashifal, dainik rashifal, today's rashifal, rashifal monthly, vrishchik rashifal today, rashifal astrosage, dainik bhaskar rashifal, pisces horoscope today, rasifal, today's rashifal nepali, aquarius horoscope today, calendar 2081, makar rashi, todays rashifal in nepali" />
        <meta property="og:title" content="Aajako Rashifal - Today's Nepali Horoscope" />
        <meta property="og:description" content={`Read today's (${currentDate}) rashifal (horoscope) in Nepali. Daily, weekly, and monthly predictions for all zodiac signs.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bishaal.lovable.app/rashifal" />
        <meta property="og:image" content="https://bishaal.lovable.app/og-image.png" />
        <meta property="article:published_time" content={new Date().toISOString()} />
        <meta property="article:modified_time" content={new Date().toISOString()} />
        
        {/* JSON-LD structured data for Rashifal page */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Aajako Rashifal - Today's Nepali Horoscope for ${currentDate}",
              "description": "Read today's rashifal (horoscope) in Nepali. Get your daily, weekly, and monthly aajako rashifal for all zodiac signs.",
              "image": "https://bishaal.lovable.app/og-image.png",
              "author": {
                "@type": "Organization",
                "name": "Your Nepal App",
                "url": "https://bishaal.lovable.app"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Your Nepal App",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://bishaal.lovable.app/og-image.png"
                }
              },
              "datePublished": "${new Date().toISOString().split('T')[0]}",
              "dateModified": "${new Date().toISOString()}"
            }
          `}
        </script>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-8" variants={itemVariants}>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <Star className="h-8 w-8 text-nepal-yellow" />
                <span className="text-nepal-red">आजको राशिफल</span>
                <Moon className="h-7 w-7 text-nepal-indigo" />
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Daily horoscope predictions for all zodiac signs in Nepal - {currentDate}
              </p>
              <Separator className="my-6 max-w-md mx-auto bg-gray-200" />
            </motion.div>
            
            {/* AdSpace for monetization */}
            <div className="mb-8">
              <AdSpace size="banner" className="mx-auto" />
            </div>
            
            <motion.div variants={itemVariants}>
              <Card className="border-gradient animate-fade-in">
                <CardContent className="pt-6">
                  <div className="rashifal-container relative min-h-[365px] rounded-lg overflow-hidden">
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nepal-red"></div>
                      </div>
                    )}
                    <iframe 
                      ref={iframeRef}
                      src="https://www.ashesh.com.np/rashifal/widget.php?header_title=Nepali Rashifal&header_color=f0b03f&api=620136p032" 
                      frameBorder="0" 
                      scrolling="yes" 
                      style={{
                        border: "none", 
                        width: "100%", 
                        height: "365px", 
                        borderRadius: "5px"
                      }}
                      title="Nepali Rashifal - Daily Horoscope"
                      className="w-full"
                      allowTransparency={true}
                    />
                  </div>
                  
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-3 text-nepal-indigo">About Nepali Rashifal</h2>
                    <p className="text-gray-700 mb-4">
                      Rashifal (राशिफल) is the Nepali horoscope based on ancient astrological principles. 
                      It provides daily, weekly, and monthly predictions for all twelve zodiac signs 
                      (Mesh, Brish, Mithun, Karkat, Singh, Kanya, Tula, Brischik, Dhanu, Makar, Kumbha, and Meen).
                    </p>
                    <p className="text-gray-700 mb-4">
                      The predictions consider planetary positions and their influence on different aspects 
                      of life including career, relationships, health, and finance. Many Nepalis consult 
                      their rashifal regularly as part of their cultural tradition.
                    </p>
                    
                    {/* SEO-focused content: List of zodiac signs with dates */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-4 text-nepal-red">All Zodiac Signs (राशि)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {zodiacSigns.map((sign, index) => (
                          <div key={index} className="p-3 border border-gray-200 rounded-lg">
                            <h4 className="font-medium text-nepal-indigo">{sign.name}</h4>
                            <p className="text-sm text-gray-600">{sign.english}</p>
                            <p className="text-xs text-gray-500">{sign.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Additional content for SEO */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-3">Frequently Asked Questions</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-nepal-red">What is Rashifal?</h4>
                          <p className="text-sm text-gray-700">Rashifal is the Nepali term for horoscope predictions based on astrological calculations and planetary positions. It provides insights into different aspects of life for each zodiac sign.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-nepal-red">How often is Rashifal updated?</h4>
                          <p className="text-sm text-gray-700">We update our Rashifal daily to provide the most accurate predictions for all twelve zodiac signs. You can also find weekly and monthly Rashifal on our platform.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-nepal-red">How can I find my zodiac sign?</h4>
                          <p className="text-sm text-gray-700">Your zodiac sign is determined by your birth date. Check the list above to find which sign corresponds to your birth date.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Bottom ad space */}
            <div className="mt-8">
              <AdSpace size="banner" className="mx-auto" />
            </div>
            
            {/* Related links for internal linking */}
            <motion.div className="mt-8" variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-4 text-center">Other Useful Nepali Tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a href="/nepali-calendar" className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                  <h4 className="font-medium text-nepal-indigo">Nepali Calendar</h4>
                  <p className="text-sm text-gray-600">View BS/AD calendar with events</p>
                </a>
                <a href="/date-converter" className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                  <h4 className="font-medium text-nepal-indigo">Date Converter</h4>
                  <p className="text-sm text-gray-600">Convert between BS and AD dates</p>
                </a>
                <a href="/unicode-converter" className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                  <h4 className="font-medium text-nepal-indigo">Unicode Converter</h4>
                  <p className="text-sm text-gray-600">Convert text to/from Unicode</p>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Rashifal;
