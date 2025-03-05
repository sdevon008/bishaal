
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdSpace from '@/components/shared/AdSpace';
import { Calendar } from 'lucide-react';

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
            
            {/* Hamro Patro Calendar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
              <div className="calendar-wrapper flex justify-center">
                <iframe 
                  src="https://www.hamropatro.com/widgets/calender-full.php" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginWidth="0" 
                  marginHeight="0" 
                  style={{ border: 'none', overflow: 'hidden', width: '100%', height: '840px', maxWidth: '800px' }} 
                  allowTransparency={true}
                  title="Nepali Calendar by Hamro Patro"
                />
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
