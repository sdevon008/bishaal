
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  LanguagesIcon, 
  Zap, 
  Book, 
  ChevronRight,
  DollarSign,
  Briefcase
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomButton from '@/components/ui/CustomButton';
import ToolCard from '@/components/shared/ToolCard';
import AdSpace from '@/components/shared/AdSpace';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="mt-16 pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 nepal-pattern"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-nepal-red/10 text-nepal-red text-sm font-medium mb-6 animate-fade-in">
              Designed for Nepal, Built with Love
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Essential Nepali Tools <br />
              <span className="text-nepal-red">All in One Place</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              A collection of free and easy-to-use tools designed specifically for Nepalese people.
              Simplify your daily digital tasks with our carefully crafted utilities.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CustomButton size="lg" rightIcon={<ChevronRight />}>
                Explore Tools
              </CustomButton>
              
              <CustomButton size="lg" variant="outline">
                Learn More
              </CustomButton>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute left-0 bottom-0 w-32 h-32 bg-nepal-red/5 rounded-tr-full"></div>
        <div className="absolute right-12 top-24 w-16 h-16 bg-nepal-blue/5 rounded-full"></div>
        <div className="absolute right-0 bottom-12 w-24 h-24 bg-nepal-yellow/10 rounded-full"></div>
      </section>
      
      {/* Tools Grid Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Discover Our Tools
            </h2>
            <p className="text-gray-600">
              Explore our collection of practical tools created specifically for Nepalese users.
              Each tool is designed to be simple, fast, and effective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard
              title="Nepali Date Converter"
              description="Convert dates between Bikram Sambat (BS) and Gregorian Calendar (AD) with ease."
              icon={<Calendar className="h-6 w-6" />}
              to="/date-converter"
            />
            
            <ToolCard
              title="Nepali Calendar"
              description="View Nepali calendar with festivals, holidays, and daily horoscope information."
              icon={<Calendar className="h-6 w-6" />}
              to="/nepali-calendar"
            />
            
            <ToolCard
              title="Unicode Converter"
              description="Convert Nepali text between Unicode and traditional formats."
              icon={<LanguagesIcon className="h-6 w-6" />}
              to="/unicode-converter"
            />
            
            <ToolCard
              title="Load Shedding Schedule"
              description="Stay updated with the latest electricity load shedding schedules in Nepal."
              icon={<Zap className="h-6 w-6" />}
              to="/load-shedding"
            />
            
            <ToolCard
              title="Currency Converter"
              description="Convert currencies and check the latest exchange rates for Nepali Rupee."
              icon={<DollarSign className="h-6 w-6" />}
              to="/currency-converter"
            />
            
            <ToolCard
              title="Services"
              description="Explore our range of additional services designed to help Nepali users."
              icon={<Briefcase className="h-6 w-6" />}
              to="/services"
            />
            
            <ToolCard
              title="Rashifal"
              description="Get your daily, weekly, and monthly horoscope predictions based on your zodiac sign."
              icon={<Calendar className="h-6 w-6" />}
              to="/rashifal"
            />
            
            <ToolCard
              title="Blog"
              description="Read our latest articles about Nepali culture, technology, and useful tips."
              icon={<Book className="h-6 w-6" />}
              to="/blog"
            />
          </div>
          
          <div className="mt-12">
            <AdSpace size="banner" className="max-w-3xl mx-auto" />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Our Tools?
              </h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 p-2 bg-nepal-red/10 text-nepal-red rounded-lg">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Designed for Nepalis</h3>
                    <p className="mt-2 text-gray-600">Created specifically for the unique needs of Nepalese users, incorporating local context and requirements.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 p-2 bg-nepal-red/10 text-nepal-red rounded-lg">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Fast & Efficient</h3>
                    <p className="mt-2 text-gray-600">Optimized for speed and performance, even with slower internet connections common in Nepal.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 p-2 bg-nepal-red/10 text-nepal-red rounded-lg">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Free & Secure</h3>
                    <p className="mt-2 text-gray-600">All our tools are completely free to use and respect your privacy and data security.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 p-2 bg-nepal-red/10 text-nepal-red rounded-lg">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Regularly Updated</h3>
                    <p className="mt-2 text-gray-600">Our tools are constantly updated to ensure accuracy and incorporate the latest information.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-nepal-blue/10 rounded-full animate-float"></div>
              </div>
              
              <div className="relative glass-morphism rounded-2xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-start space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                
                <div className="bg-white">
                  <div className="p-6">
                    <div className="w-full h-12 bg-nepal-red/5 rounded-lg mb-4"></div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="h-20 bg-nepal-red/5 rounded-lg"></div>
                      <div className="h-20 bg-nepal-blue/5 rounded-lg"></div>
                      <div className="h-20 bg-nepal-yellow/5 rounded-lg"></div>
                    </div>
                    <div className="w-full h-12 bg-gray-100 rounded-lg mb-4"></div>
                    <div className="w-3/4 h-12 bg-nepal-red/10 rounded-lg mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-nepal-red/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Simplify Your Tasks?
            </h2>
            <p className="text-gray-600 mb-8">
              Start using our free Nepali tools now and make your daily tasks easier and more efficient.
            </p>
            <CustomButton size="lg" className="bg-nepal-red">
              Explore All Tools
            </CustomButton>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
