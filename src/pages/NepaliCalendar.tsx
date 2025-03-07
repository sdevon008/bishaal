
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Calendar, ChevronLeft, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomButton from '@/components/ui/CustomButton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
      <Helmet>
        <title>Nepali Calendar 2080-2081 | Bikram Sambat Calendar with Festivals</title>
        <meta name="description" content="View the official Nepali Calendar (Bikram Sambat) online. Get dates, festivals, holidays, and events in Nepali date format. Easy to use BS calendar with important tithi and festivals." />
        <meta name="keywords" content="nepali calendar, bikram sambat calendar, BS calendar, nepali patro, nepali dates, nepal festivals, nepali tithi, nepali rashifal, today's date in nepal" />
        <meta property="og:title" content="Nepali Calendar 2080-2081 | Bikram Sambat Calendar with Festivals" />
        <meta property="og:description" content="View the official Nepali Calendar (Bikram Sambat) online. Get dates, festivals, holidays, and events in Nepali date format. Easy to use BS calendar with important tithi and festivals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yournepalapp.com/nepali-calendar" />
        <link rel="canonical" href="https://yournepalapp.com/nepali-calendar" />
      </Helmet>
      
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
          
          {/* FAQ Section */}
          <div className="mt-12 bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <HelpCircle className="h-6 w-6 text-nepal-red mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-medium text-gray-800">
                    What is the Bikram Sambat Calendar?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Bikram Sambat (BS) is the official calendar of Nepal, introduced by Emperor Vikramaditya. It is approximately 56 years and 8.5 months ahead of the Gregorian calendar. The Nepali new year (Baishakh 1) usually falls in mid-April of the Gregorian calendar. Unlike the solar Gregorian calendar, the Nepali calendar is a lunisolar calendar based on both lunar and solar cycles.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-medium text-gray-800">
                    How many days are in a Nepali month?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    The number of days in Nepali months varies. Months in the Bikram Sambat calendar can have 29, 30, 31, or 32 days. This variation occurs because the Nepali calendar follows lunar cycles while maintaining alignment with solar years. The month of Falgun can have 28 or 29 days depending on whether it's a leap year.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-medium text-gray-800">
                    What are the names of the Nepali months?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    The twelve months in the Nepali calendar are: Baishakh, Jestha, Ashadh, Shrawan, Bhadra, Ashwin, Kartik, Mangsir, Poush, Magh, Falgun, and Chaitra. The Nepali new year begins with the month of Baishakh (typically in mid-April of the Gregorian calendar).
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-medium text-gray-800">
                    How can I convert dates between Nepali (BS) and Gregorian (AD) calendars?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    You can use our <Link to="/date-converter" className="text-nepal-red hover:underline">Date Converter tool</Link> to easily convert dates between Bikram Sambat and Gregorian calendars. This is particularly useful for official purposes, documentation, or when planning around important Nepali festivals and holidays.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left font-medium text-gray-800">
                    What are Tithis in the Nepali calendar?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Tithis are lunar days in the Hindu calendar system, which is followed in the Nepali calendar. There are 15 tithis in each lunar fortnight (Paksha). These tithis are important for determining auspicious times for religious ceremonies, festivals, and rituals. Many Nepali festivals like Dashain, Tihar, and Teej are celebrated on specific tithis rather than fixed dates.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left font-medium text-gray-800">
                    Why do Nepali festival dates change every year?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Nepali festivals often change dates each year because they are based on the lunisolar Bikram Sambat calendar and are tied to specific tithis (lunar days), nakshatras (stars), or other astronomical events. As the lunar calendar doesn't perfectly align with the solar year, the dates of festivals shift when viewed from the perspective of the Gregorian calendar. This is why festivals like Dashain, Tihar, and Teej fall on different Gregorian dates each year.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
