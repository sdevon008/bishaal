
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdSpace from '@/components/shared/AdSpace';

const UnicodeConverter = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nepali Unicode Converter
              </h1>
              <p className="text-lg text-gray-600">
                Convert Nepali text between Unicode and traditional formats easily.
              </p>
            </div>
            
            {/* Ad Space */}
            <div className="mb-8">
              <AdSpace size="banner" />
            </div>
            
            {/* Unicode Converter */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
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
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How to Use Unicode Converter
                </h3>
                <ul className="space-y-2 text-gray-600 list-disc pl-5">
                  <li>Type Nepali text in the Romanized format in the top box</li>
                  <li>See the Unicode conversion instantly</li>
                  <li>Copy the converted text to use in documents, emails, or websites</li>
                  <li>Convert between traditional and Unicode formats as needed</li>
                </ul>
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
