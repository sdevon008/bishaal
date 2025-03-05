
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, RefreshCw } from 'lucide-react';

interface ScheduleDisplayProps {
  scheduleData: {
    group: string;
    schedule: {
      day: string;
      times: string[];
    }[];
    lastUpdated: string;
  }[];
  isLoading: boolean;
  onRefresh: () => void;
}

const ScheduleDisplay: React.FC<ScheduleDisplayProps> = ({ 
  scheduleData, 
  isLoading,
  onRefresh
}) => {
  // Function to format the last updated date
  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Find today's day
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-nepal-red" />
          <h2 className="text-xl font-medium">Load Shedding Schedule</h2>
        </div>
        <button 
          onClick={onRefresh} 
          className="flex items-center space-x-1 text-sm text-nepal-blue hover:text-nepal-red transition-colors"
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse space-y-2 text-center">
            <RefreshCw className="w-10 h-10 text-nepal-red/50 animate-spin mx-auto" />
            <p className="text-gray-500">Loading the latest schedule...</p>
          </div>
        </div>
      ) : scheduleData.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-10">
              <p className="text-gray-500">No schedule information available. Please try again later.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue={scheduleData[0].group}>
          <TabsList className="w-full grid grid-cols-2 mb-6">
            {scheduleData.map((group) => (
              <TabsTrigger key={group.group} value={group.group}>
                {group.group}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {scheduleData.map((group) => (
            <TabsContent key={group.group} value={group.group}>
              <Card>
                <CardHeader>
                  <CardTitle>{group.group} Schedule</CardTitle>
                  <CardDescription>
                    Last updated: {formatLastUpdated(group.lastUpdated)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                    {group.schedule.map((daySchedule) => {
                      const isToday = daySchedule.day === today;
                      return (
                        <div 
                          key={daySchedule.day} 
                          className={`p-3 rounded-lg border ${isToday ? 'border-nepal-red bg-red-50' : 'border-gray-200'}`}
                        >
                          <h3 className={`text-sm font-medium mb-2 ${isToday ? 'text-nepal-red' : 'text-gray-700'}`}>
                            {daySchedule.day}
                            {isToday && <span className="ml-2 text-xs bg-nepal-red text-white py-0.5 px-1.5 rounded">Today</span>}
                          </h3>
                          <ul className="space-y-1">
                            {daySchedule.times.map((time, idx) => (
                              <li key={idx} className="text-sm flex items-center">
                                <span className="h-1.5 w-1.5 rounded-full bg-nepal-red/60 mr-2"></span>
                                {time}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default ScheduleDisplay;
