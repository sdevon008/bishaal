
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdSpace from '@/components/shared/AdSpace';
import { Zap, Info, AlertTriangle } from 'lucide-react';
import ScheduleDisplay from '@/components/load-shedding/ScheduleDisplay';
import LoadSheddingService from '@/services/LoadSheddingService';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';

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
      
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Nepal Electricity Load Shedding Schedule
              </h1>
              <p className="text-lg text-gray-600">
                Stay updated with the latest electricity outage schedules across Nepal
              </p>
            </div>
            
            {/* Alert Card */}
            <Card className="border-l-4 border-l-yellow-400 mb-6">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="mr-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Schedule Updates</h3>
                    <p className="text-sm text-gray-600">
                      This schedule is updated daily. Last sync with NEA website: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white border border-gray-100 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-nepal-red/10 rounded-full flex items-center justify-center mr-4">
                      <Zap className="h-5 w-5 text-nepal-red" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      About Load Shedding
                    </h2>
                  </div>
                  <div className="space-y-3 text-gray-600 text-sm">
                    <p>
                      Load shedding refers to the deliberate shutdown of power in parts of the electricity distribution system, 
                      generally to prevent the failure of the entire system when the demand strains the capacity.
                    </p>
                    <p>
                      This schedule is automatically updated daily from the Nepal Electricity Authority (NEA) website.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-100 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-nepal-blue/10 rounded-full flex items-center justify-center mr-4">
                      <Info className="h-5 w-5 text-nepal-blue" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Important Notice
                    </h2>
                  </div>
                  <div className="space-y-3 text-gray-600 text-sm">
                    <p>
                      <strong>Find your area:</strong> Identify which group your area belongs to and check the schedule accordingly.
                    </p>
                    <p>
                      <strong>Note:</strong> Always check with your local NEA office for the most accurate information 
                      specific to your area, as schedules may change due to maintenance or other factors.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoadShedding;
