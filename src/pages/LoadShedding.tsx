
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdSpace from '@/components/shared/AdSpace';
import { Zap } from 'lucide-react';
import ScheduleDisplay from '@/components/load-shedding/ScheduleDisplay';
import LoadSheddingService from '@/services/LoadSheddingService';
import { useToast } from '@/components/ui/use-toast';

const LoadShedding = () => {
  const { toast } = useToast();
  const [scheduleData, setScheduleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSchedule = async () => {
    setIsLoading(true);
    try {
      const data = await LoadSheddingService.getSchedule();
      setScheduleData(data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load the schedule. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
    
    // Set up a daily refresh at midnight
    const now = new Date();
    const night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // tomorrow
      0, 0, 0 // midnight
    );
    const msUntilMidnight = night.getTime() - now.getTime();
    
    // Schedule the first refresh
    const refreshTimeout = setTimeout(() => {
      fetchSchedule();
      
      // Then set up daily interval
      const dailyInterval = setInterval(() => {
        fetchSchedule();
      }, 24 * 60 * 60 * 1000); // 24 hours
      
      return () => clearInterval(dailyInterval);
    }, msUntilMidnight);
    
    return () => clearTimeout(refreshTimeout);
  }, []);

  const handleManualRefresh = () => {
    fetchSchedule();
    toast({
      title: "Refreshing",
      description: "Getting the latest load shedding schedule.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nepal Electricity Load Shedding Schedule
              </h1>
              <p className="text-lg text-gray-600">
                Stay updated with the latest electricity load shedding schedules in Nepal.
              </p>
            </div>
            
            {/* Ad Space */}
            <div className="mb-8">
              <AdSpace size="banner" />
            </div>
            
            {/* Load Shedding Schedule */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <ScheduleDisplay 
                scheduleData={scheduleData}
                isLoading={isLoading}
                onRefresh={handleManualRefresh}
              />
            </div>
            
            {/* Information Section */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-nepal-red/10 rounded-full flex items-center justify-center mr-4">
                  <Zap className="h-5 w-5 text-nepal-red" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  About Load Shedding in Nepal
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Load shedding refers to the deliberate shutdown of power in parts of the electricity distribution system, 
                  generally to prevent the failure of the entire system when the demand strains the capacity.
                </p>
                <p>
                  This schedule is automatically updated daily from the Nepal Electricity Authority (NEA) website. 
                  The schedule shows power outage times for different groups across the week.
                </p>
                <p>
                  <strong>Note:</strong> Always check with your local NEA office for the most accurate information 
                  specific to your area, as schedules may change due to maintenance or other factors.
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

export default LoadShedding;
