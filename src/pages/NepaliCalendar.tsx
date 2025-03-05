
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdSpace from '@/components/shared/AdSpace';

const NepaliCalendar = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nepali Calendar
              </h1>
              <p className="text-lg text-gray-600">
                View the Nepali calendar with festivals, holidays, and daily horoscope information.
              </p>
            </div>
            
            {/* Ad Space */}
            <div className="mb-8">
              <AdSpace size="banner" />
            </div>
            
            {/* Placeholder for future content */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-nepal-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-nepal-red" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Nepali Calendar Tool Coming Soon
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  This feature is under development. Soon you'll be able to view detailed Nepali calendar with festivals, holidays, and daily horoscope information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NepaliCalendar;
