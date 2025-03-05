
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdSpace from '@/components/shared/AdSpace';
import { Helmet } from 'react-helmet';

const UnicodeConverter = () => {
  useEffect(() => {
    // Update document title for SEO
    document.title = "Nepali Unicode Converter | Unicode to Preeti | Romanized Unicode";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <meta name="description" content="Free online Nepali Unicode converter. Convert between Unicode, Preeti, and Romanized Nepali. Type in English to get Nepali Unicode text. Download Nepali Unicode keyboard." />
        <meta name="keywords" content="nepali unicode, preeti to unicode, unicode to preeti, nepali unicode converter, unicode keyboard, nepali typing, nepali romanized unicode, english to nepali unicode, nepali unicode download" />
        <link rel="canonical" href="/unicode-converter" />
      </Helmet>

      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nepali Unicode Converter
              </h1>
              <p className="text-lg text-gray-600">
                Convert between Nepali Unicode, Preeti font, and English. Type in romanized English to get Nepali text instantly.
              </p>
            </div>
            
            {/* Ad Space */}
            <div className="mb-8">
              <AdSpace size="banner" />
            </div>
            
            {/* Unicode Converter */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Unicode to Nepali Converter
              </h2>
              <p className="text-gray-600 mb-4">
                Type in romanized English to instantly get Nepali Unicode text. Perfect for typing Nepali in websites, documents, and emails.
              </p>
              <div className="converter-wrapper">
                <iframe 
                  className="w-full min-h-[400px] border-0"
                  src="https://www.ashesh.com.np/linknepali-unicode3.php?api=520138p335"
                  title="Nepali Unicode Converter"
                  frameBorder={0}
                  scrolling="no"
                  marginWidth={0}
                  marginHeight={0}
                  allowTransparency={true}
                />
              </div>
            </div>
            
            {/* Preeti to Unicode Converter */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Preeti to Unicode Converter (Nepali Font to Unicode)
              </h2>
              <p className="text-gray-600 mb-4">
                Convert traditional Preeti font text to Unicode. Easy to use for documents created with older Nepali typing methods.
              </p>
              <div className="converter-wrapper">
                <iframe 
                  className="w-full min-h-[400px] border-0"
                  src="https://www.ashesh.com.np/preeti-unicode/linkapi.php?api=520135p444"
                  title="Nepali Font to Unicode Converter"
                  frameBorder={0}
                  scrolling="no"
                  marginWidth={0}
                  marginHeight={0}
                  allowTransparency={true}
                />
              </div>
            </div>
            
            {/* How to Use Instructions */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
              <div className="mt-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How to Use Nepali Unicode Converter
                </h3>
                <ul className="space-y-2 text-gray-600 list-disc pl-5">
                  <li>Type Nepali text in the Romanized English format in the top box</li>
                  <li>See the Unicode conversion instantly - perfect for Nepali typing online</li>
                  <li>Copy the converted text to use in documents, emails, or websites</li>
                  <li>Convert between traditional Preeti and Unicode formats as needed</li>
                  <li>Use the Preeti to Unicode converter for converting Preeti font text to Unicode</li>
                  <li>Download Nepali Unicode keyboard layouts for offline typing</li>
                </ul>
              </div>
            </div>
            
            {/* Popular Conversions */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Popular Nepali Unicode Conversions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Unicode to Preeti</h4>
                  <p className="text-gray-600 text-sm">
                    Convert modern Unicode text to traditional Preeti font format for compatibility with older systems.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">English to Nepali Unicode</h4>
                  <p className="text-gray-600 text-sm">
                    Type in English (Romanized) and get Nepali Unicode text instantly.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Nepali Typing Unicode</h4>
                  <p className="text-gray-600 text-sm">
                    Type Nepali text online without installing any software or fonts.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Unicode Keyboard</h4>
                  <p className="text-gray-600 text-sm">
                    Use our virtual Unicode keyboard for typing Nepali characters directly.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-8 bg-nepal-red/5 p-6 rounded-xl border border-nepal-red/10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-nepal-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">About Nepali Unicode</h3>
                  <p className="text-gray-600 mt-1">
                    Unicode enables consistent encoding of Nepali text, making it widely compatible across digital platforms and devices. 
                    Unlike traditional fonts like Preeti, Unicode text can be viewed correctly on all modern devices without special font installation.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section - Good for SEO */}
            <div className="mt-8 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div className="p-4 border border-gray-100 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">What is the difference between Unicode and Preeti?</h4>
                  <p className="text-gray-600">
                    Unicode is a universal character encoding standard that allows Nepali text to be displayed correctly across all platforms. Preeti is a traditional font that uses non-standard character mapping, requiring the Preeti font to be installed to view the text properly.
                  </p>
                </div>
                <div className="p-4 border border-gray-100 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">How can I download Nepali Unicode keyboard?</h4>
                  <p className="text-gray-600">
                    Most modern operating systems already include Nepali Unicode keyboard layouts. You can enable them in your system settings. For Windows, go to Control Panel {'>'}  Language {'>'}  Add a language {'>'}  नेपाली (Nepali).
                  </p>
                </div>
                <div className="p-4 border border-gray-100 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Can I translate Nepali to English using Unicode?</h4>
                  <p className="text-gray-600">
                    Our converter is designed for font conversion, not translation. For Nepali to English translation, we recommend using dedicated translation services like Google Translate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UnicodeConverter;
