import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Calendar, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomButton from '@/components/ui/CustomButton';

const NepaliCalendar: React.FC = () => {
  const isMobile = useIsMobile();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Function to remove copyright elements from iframe
  useEffect(() => {
    const removeCopyrightElements = () => {
      if (!iframeRef.current) return;
      
      const iframe = iframeRef.current;
      
      // Wait for iframe content to load
      iframe.addEventListener('load', () => {
        try {
          // Access iframe document
          const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
          
          if (!iframeDocument) {
            console.error("Could not access iframe document");
            return;
          }
          
          // Create a style element to inject CSS rules
          const style = iframeDocument.createElement('style');
          style.textContent = `
            /* Hide all copyright text, footer elements, and attribution links */
            [style*="text-align:center"],
            a[href*="hamropatro.com"],
            img[src*="hamropatro.com"],
            div[style*="font-size:11px"],
            div[style*="font-size:10px"],
            div[class*="copyright"],
            div[class*="footer"],
            footer,
            .logo-wrapper,
            .hp-logo,
            .copyright,
            div[style*="position: relative"] > div:last-child,
            div[style*="overflow: auto"] > div:last-child,
            div[style*="bottom: 0"] {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              height: 0 !important;
              width: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              overflow: hidden !important;
            }
            
            /* Prevent click events on hidden elements */
            body * {
              pointer-events: auto !important;
            }
            
            /* Prevent redirect links */
            a[href*="hamropatro.com"] {
              pointer-events: none !important;
              cursor: default !important;
              text-decoration: none !important;
            }

            /* Make calendar larger */
            body, html {
              width: 100% !important;
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              overflow: visible !important;
            }

            table {
              width: 100% !important;
              height: 100% !important;
            }
          `;
          
          // Append the style to the iframe document
          iframeDocument.head.appendChild(style);
          
          // Also try to remove elements directly
          const removeElements = () => {
            try {
              // Target copyright elements by various selectors
              const copyrightSelectors = [
                'div[style*="text-align:center"]',
                'a[href*="hamropatro.com"]',
                'img[src*="hamropatro.com"]',
                'div[style*="font-size:11px"]',
                'div[style*="font-size:10px"]',
                'div[class*="copyright"]',
                'div[class*="footer"]',
                'footer',
                '.logo-wrapper',
                '.hp-logo',
                '.copyright'
              ];
              
              copyrightSelectors.forEach(selector => {
                const elements = iframeDocument.querySelectorAll(selector);
                elements.forEach(el => {
                  el.remove();
                });
              });
              
              // Disable all link redirects
              const allLinks = iframeDocument.querySelectorAll('a');
              allLinks.forEach(link => {
                link.onclick = (e) => e.preventDefault();
                link.style.pointerEvents = 'none';
                link.style.cursor = 'default';
                link.style.textDecoration = 'none';
              });
            } catch (error) {
              console.error("Error removing elements from iframe:", error);
            }
          };
          
          // Run immediately and also set an interval to keep removing elements
          // (in case they're added dynamically)
          removeElements();
          const intervalId = setInterval(removeElements, 1000);
          
          // Clear interval when component unmounts
          return () => clearInterval(intervalId);
        } catch (error) {
          console.error("Error manipulating iframe content:", error);
        }
      });
    };
    
    removeCopyrightElements();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-16 bg-nepal-red/5">
        <div className="container-custom py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 text-gray-500 text-sm mb-2">
                <Link to="/" className="hover:text-nepal-red transition-colors">Home</Link>
                <ChevronLeft className="h-4 w-4 rotate-180" />
                <span>Nepali Calendar</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Nepali Calendar</h1>
              <p className="mt-2 text-gray-600 max-w-2xl">View and use the official Nepali (Bikram Sambat) calendar with dates, events, and festivals.</p>
            </div>
            <div className="hidden md:flex">
              <Calendar className="h-12 w-12 text-nepal-red opacity-75" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-8 flex-grow">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Bikram Sambat Calendar</h2>
              
              {/* Responsive Calendar Display */}
              <div className="calendar-wrapper">
                {isMobile ? (
                  /* Mobile Calendar */
                  <div className="relative mx-auto" style={{ width: '295px', height: '385px' }}>
                    <iframe 
                      ref={iframeRef}
                      src="https://www.hamropatro.com/widgets/calender-medium.php" 
                      frameBorder="0" 
                      scrolling="no" 
                      style={{ 
                        border: 'none', 
                        width: '295px', 
                        height: '385px', 
                        overflow: 'hidden',
                        backgroundColor: 'transparent' 
                      }}
                      title="Nepali Calendar Mobile"
                      allowTransparency={true}
                    />
                  </div>
                ) : (
                  /* Desktop Calendar - Larger Version */
                  <div className="relative mx-auto w-full">
                    <iframe 
                      ref={iframeRef}
                      src="https://www.hamropatro.com/widgets/calender-full.php" 
                      frameBorder="0" 
                      scrolling="no" 
                      style={{ 
                        border: 'none', 
                        width: '100%', 
                        height: '700px', 
                        overflow: 'hidden',
                        backgroundColor: 'transparent' 
                      }}
                      title="Nepali Calendar Desktop"
                      allowTransparency={true}
                    />
                  </div>
                )}
              </div>
              
              <div className="mt-8 bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-medium text-gray-900 mb-2">About Nepali Calendar (Bikram Sambat)</h3>
                <p className="text-gray-600 mb-3">
                  The Bikram Sambat (BS) calendar is the official calendar of Nepal. It is approximately 56 years and 8.5 months ahead of the 
                  Gregorian (AD) calendar. The new year in BS usually falls in mid-April of the Gregorian calendar.
                </p>
                <p className="text-gray-600">
                  This calendar displays Nepali dates, festivals, holidays, and other important events as observed in Nepal.
                </p>
              </div>
            </div>
          </div>
          
          {/* Other Tools Section */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Other Related Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Nepali Date Converter</h4>
                <p className="text-gray-600 mb-4">Convert dates between Bikram Sambat (BS) and Gregorian Calendar (AD) with ease.</p>
                <Link to="/date-converter">
                  <CustomButton variant="outline" size="sm">
                    Open Converter
                  </CustomButton>
                </Link>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Nepali Dictionary</h4>
                <p className="text-gray-600 mb-4">Look up Nepali words and their English translations in our comprehensive dictionary.</p>
                <Link to="/dictionary">
                  <CustomButton variant="outline" size="sm">
                    Open Dictionary
                  </CustomButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NepaliCalendar;
