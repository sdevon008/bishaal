
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdSpace from '@/components/shared/AdSpace';
import { CalendarDays, ArrowLeftRight, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CustomButton from '@/components/ui/CustomButton';
import {
  adToBs,
  bsToAd,
  formatAdDate,
  formatBsDate,
  getCurrentBsDate,
  BS_MONTHS_EN,
  AD_MONTHS,
  isValidBsDate,
  getDaysInBsMonth,
  minBsYear,
  maxBsYear
} from '@/lib/nepaliDateConverter';

const DateConverter = () => {
  // State for BS date
  const [bsYear, setBsYear] = useState<number>(0);
  const [bsMonth, setBsMonth] = useState<number>(0);
  const [bsDay, setBsDay] = useState<number>(1);
  const [bsMaxDay, setBsMaxDay] = useState<number>(30);
  
  // State for AD date
  const [adYear, setAdYear] = useState<number>(new Date().getFullYear());
  const [adMonth, setAdMonth] = useState<number>(new Date().getMonth());
  const [adDay, setAdDay] = useState<number>(new Date().getDate());
  
  // State for results and errors
  const [bsResult, setBsResult] = useState<string>('');
  const [adResult, setAdResult] = useState<string>('');
  const [bsError, setBsError] = useState<string>('');
  const [adError, setAdError] = useState<string>('');
  
  // Set initial BS date
  useEffect(() => {
    const currentBsDate = getCurrentBsDate();
    setBsYear(currentBsDate.year);
    setBsMonth(currentBsDate.month);
    setBsDay(currentBsDate.day);
    updateBsMaxDay(currentBsDate.year, currentBsDate.month);
  }, []);
  
  // Update max days whenever BS month or year changes
  useEffect(() => {
    updateBsMaxDay(bsYear, bsMonth);
  }, [bsYear, bsMonth]);
  
  // Function to update max days in a BS month
  const updateBsMaxDay = (year: number, month: number) => {
    try {
      const maxDay = getDaysInBsMonth(year, month);
      setBsMaxDay(maxDay);
      if (bsDay > maxDay) {
        setBsDay(maxDay);
      }
    } catch (error) {
      console.error('Error updating max days:', error);
    }
  };
  
  // Convert BS to AD
  const convertBsToAd = () => {
    setBsError('');
    setAdResult('');
    
    try {
      if (!isValidBsDate(bsYear, bsMonth, bsDay)) {
        setBsError(`Invalid Nepali date! Valid range is ${minBsYear} to ${maxBsYear} BS.`);
        return;
      }
      
      const adDate = bsToAd(bsYear, bsMonth, bsDay);
      setAdYear(adDate.getFullYear());
      setAdMonth(adDate.getMonth());
      setAdDay(adDate.getDate());
      
      const formattedAdDate = formatAdDate(adDate);
      setAdResult(formattedAdDate);
    } catch (error) {
      console.error(error);
      setBsError('Error converting date. Please check inputs.');
    }
  };
  
  // Convert AD to BS
  const convertAdToBs = () => {
    setAdError('');
    setBsResult('');
    
    try {
      const adDate = new Date(adYear, adMonth, adDay);
      
      // Check if date is valid
      if (isNaN(adDate.getTime())) {
        setAdError('Invalid English date!');
        return;
      }
      
      const bsDate = adToBs(adDate);
      setBsYear(bsDate.year);
      setBsMonth(bsDate.month);
      setBsDay(bsDate.day);
      
      const formattedBsDate = formatBsDate(bsDate);
      setBsResult(formattedBsDate);
    } catch (error) {
      console.error(error);
      setAdError('Error converting date. Please check inputs.');
    }
  };
  
  // Handle form submission
  const handleBsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    convertBsToAd();
  };
  
  const handleAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    convertAdToBs();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nepali Date Converter
              </h1>
              <p className="text-lg text-gray-600">
                Convert dates between Bikram Sambat (BS) and Gregorian Calendar (AD) quickly and accurately.
              </p>
            </div>
            
            {/* Ad Space */}
            <div className="mb-8">
              <AdSpace size="banner" />
            </div>
            
            {/* Date Converter */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* BS to AD Converter */}
                <div className="bg-nepal-red/5 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <CalendarDays className="h-6 w-6 text-nepal-red mr-2" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      BS to AD Converter
                    </h2>
                  </div>
                  
                  <form onSubmit={handleBsSubmit}>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <label htmlFor="bs-year" className="block text-sm font-medium text-gray-700 mb-1">
                          Year (साल)
                        </label>
                        <Input
                          id="bs-year"
                          type="number"
                          min={minBsYear}
                          max={maxBsYear}
                          value={bsYear}
                          onChange={(e) => setBsYear(parseInt(e.target.value) || 0)}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="bs-month" className="block text-sm font-medium text-gray-700 mb-1">
                          Month (महिना)
                        </label>
                        <select
                          id="bs-month"
                          value={bsMonth}
                          onChange={(e) => setBsMonth(parseInt(e.target.value))}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-10"
                        >
                          {BS_MONTHS_EN.map((month, index) => (
                            <option key={index} value={index}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="bs-day" className="block text-sm font-medium text-gray-700 mb-1">
                          Day (गते)
                        </label>
                        <Input
                          id="bs-day"
                          type="number"
                          min={1}
                          max={bsMaxDay}
                          value={bsDay}
                          onChange={(e) => setBsDay(parseInt(e.target.value) || 1)}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    {bsError && (
                      <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{bsError}</span>
                      </div>
                    )}
                    
                    <CustomButton 
                      type="submit" 
                      className="w-full"
                    >
                      Convert to AD
                    </CustomButton>
                    
                    {adResult && (
                      <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-md">
                        <p className="font-medium mb-1">Result (AD):</p>
                        <p className="text-lg">{adResult}</p>
                      </div>
                    )}
                  </form>
                </div>
                
                {/* AD to BS Converter */}
                <div className="bg-nepal-blue/5 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <CalendarDays className="h-6 w-6 text-nepal-blue mr-2" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      AD to BS Converter
                    </h2>
                  </div>
                  
                  <form onSubmit={handleAdSubmit}>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <label htmlFor="ad-year" className="block text-sm font-medium text-gray-700 mb-1">
                          Year
                        </label>
                        <Input
                          id="ad-year"
                          type="number"
                          min={1944}
                          max={2033}
                          value={adYear}
                          onChange={(e) => setAdYear(parseInt(e.target.value) || 0)}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="ad-month" className="block text-sm font-medium text-gray-700 mb-1">
                          Month
                        </label>
                        <select
                          id="ad-month"
                          value={adMonth}
                          onChange={(e) => setAdMonth(parseInt(e.target.value))}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-10"
                        >
                          {AD_MONTHS.map((month, index) => (
                            <option key={index} value={index}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="ad-day" className="block text-sm font-medium text-gray-700 mb-1">
                          Day
                        </label>
                        <Input
                          id="ad-day"
                          type="number"
                          min={1}
                          max={31}
                          value={adDay}
                          onChange={(e) => setAdDay(parseInt(e.target.value) || 1)}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    {adError && (
                      <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{adError}</span>
                      </div>
                    )}
                    
                    <CustomButton 
                      type="submit" 
                      className="w-full bg-nepal-blue hover:bg-nepal-blue/90"
                    >
                      Convert to BS
                    </CustomButton>
                    
                    {bsResult && (
                      <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-md">
                        <p className="font-medium mb-1">Result (BS):</p>
                        <p className="text-lg">{bsResult}</p>
                      </div>
                    )}
                  </form>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <div className="flex items-center p-3 bg-gray-50 rounded-full">
                  <ArrowLeftRight className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  About Nepali Date (BS) Converter
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  The Nepali calendar, also known as Bikram Sambat (BS), is the official calendar of Nepal.
                  It is approximately 56 years and 8.5 months ahead of the Gregorian (AD) calendar.
                  This tool supports date conversion between years {minBsYear} BS to {maxBsYear} BS.
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

export default DateConverter;
