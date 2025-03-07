
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdSpace from '@/components/shared/AdSpace';
import { Zap, Info, AlertTriangle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import ScheduleDisplay from '@/components/load-shedding/ScheduleDisplay';
import LoadSheddingService from '@/services/LoadSheddingService';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
      <Helmet>
        <title>Nepal Load Shedding Schedule 2025 | Latest NEA Power Outage Updates</title>
        <meta name="description" content="Get accurate and updated Nepal Electricity Authority (NEA) load shedding schedule 2025. Find your area's power outage timings across Kathmandu, Lalitpur, Bhaktapur and all major cities." />
        <meta name="keywords" content="Nepal load shedding, NEA schedule, power outage, electricity cuts, loadshedding Nepal, Kathmandu power schedule, Nepal Electricity Authority" />
        <meta property="og:title" content="Nepal Load Shedding Schedule 2025 | Latest NEA Power Outage Updates" />
        <meta property="og:description" content="Get accurate and updated Nepal Electricity Authority (NEA) load shedding schedule 2025. Find your area's power outage timings across Kathmandu, Lalitpur, Bhaktapur and all major cities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yournepalapp.com/load-shedding" />
        <link rel="canonical" href="https://yournepalapp.com/load-shedding" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Nepal Electricity Load Shedding Schedule
              </h1>
              <p className="text-lg text-gray-600">
                Stay updated with the latest power outage schedules across Nepal.
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
            <AdSpace size="banner" className="mb-8" />
            
            {/* Load Shedding Schedule */}
            <div className="mb-8">
              <ScheduleDisplay 
                scheduleData={scheduleData} 
                isLoading={isLoading}
                onRefresh={handleManualRefresh}
              />
            </div>
            
            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white border border-gray-100 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-nepal-blue/10 rounded-full flex items-center justify-center mr-4">
                      <Zap className="h-5 w-5 text-nepal-blue" />
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
            
            {/* FAQ Section */}
            <section className="mb-12 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <HelpCircle className="h-6 w-6 text-nepal-red mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left font-medium text-gray-800">
                      What is the current load shedding situation in Nepal?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      As of 2025, Nepal has significantly reduced load shedding compared to previous years. However, occasional power outages still occur in certain areas due to maintenance, technical issues, or high demand periods. The Nepal Electricity Authority (NEA) implements scheduled power cuts only when necessary, and this page provides the most up-to-date information on these schedules.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left font-medium text-gray-800">
                      How do I find which load shedding group my area belongs to?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      You can identify your load shedding group by checking the "Locations" section in each group's details on this page. Find the area that matches or is closest to your location. If you're still unsure, you can contact your local NEA office or check the official NEA website where they list areas by group.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left font-medium text-gray-800">
                      Why does load shedding still happen despite Nepal's hydropower potential?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Despite Nepal's significant hydropower potential, several factors contribute to occasional load shedding: seasonal variations in water levels (especially during dry winter months), growing electricity demand, limitations in transmission infrastructure, technical issues, and maintenance requirements. The government and NEA continue to invest in expanding generation capacity and improving distribution systems to address these challenges.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left font-medium text-gray-800">
                      How often is the load shedding schedule updated?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Our load shedding schedule is updated daily to reflect the latest information from the Nepal Electricity Authority. We automatically sync with NEA's data to ensure you have access to the most current schedule. You can also manually refresh the data using the refresh button on this page.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left font-medium text-gray-800">
                      What alternatives can I use during power outages?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      During power outages, you can use inverters, solar systems, power banks for small devices, or generators as backup power sources. Many households and businesses in Nepal have invested in these alternatives to ensure continuous power supply. Energy-efficient LED lights and appliances can also help conserve power during limited electricity availability.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </section>
          </div>
        </div>
      </main>
     
      <Footer />
    </div>
  );
};

export default LoadShedding;
