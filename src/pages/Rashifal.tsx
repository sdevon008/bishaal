
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Star, Moon } from 'lucide-react';

const Rashifal = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Nepali Rashifal - Daily Horoscope | Nepali Culture Tools</title>
        <meta name="description" content="Read today's rashifal (horoscope) in Nepali. Get your daily, weekly, and monthly aajako rashifal for all zodiac signs - Mesh, Brish, Mithun, Karkat, Singh, Kanya, Tula, Brischik, Dhanu, Makar, Kumbha, and Meen." />
        <meta name="keywords" content="today rashifal, aajako rashifal, nepali rashifal, rashifal today nepali, rashifal in nepali, rashi, hamro patro rashifal, hamro rashifal, rashifal in english, aaja ko rashifal, today rashifal in nepali, rashifal 2025, aaj ka rashifal, nepali patro rashifal, horoscope, aaj ko rashifal, weekly rashifal, aajako rashifal nepali, aja ko rashifal, rashifal mithun, hindi rashifal, dainik rashifal, today's rashifal, rashifal monthly, vrishchik rashifal today, rashifal astrosage, dainik bhaskar rashifal, pisces horoscope today, rasifal, today's rashifal nepali, aquarius horoscope today, calendar 2081, makar rashi, todays rashifal in nepali" />
        <meta property="og:title" content="Nepali Rashifal - Daily Horoscope" />
        <meta property="og:description" content="Read today's rashifal (horoscope) in Nepali. Daily, weekly, and monthly predictions for all zodiac signs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://culture-tools-nepal.app/rashifal" />
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
                <span className="text-nepal-red">Nepali Rashifal</span>
                <Moon className="h-7 w-7 text-nepal-indigo" />
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Daily horoscope predictions for all zodiac signs in Nepal
              </p>
              <Separator className="my-6 max-w-md mx-auto bg-gray-200" />
            </motion.div>
            
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
                    <p className="text-gray-700">
                      The predictions consider planetary positions and their influence on different aspects 
                      of life including career, relationships, health, and finance. Many Nepalis consult 
                      their rashifal regularly as part of their cultural tradition.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Rashifal;
