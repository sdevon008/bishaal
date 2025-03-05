
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, RefreshCw, Calendar } from 'lucide-react';
import CustomButton from "@/components/ui/CustomButton";

interface ScheduleDisplayProps {
  scheduleData: {
    group: string;
    locations: string[];
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
  // Find today's day
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const [selectedView, setSelectedView] = useState<'calendar' | 'list'>('calendar');

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-nepal-red" />
          <h2 className="text-xl font-medium">Load Shedding Schedule</h2>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex border rounded-md overflow-hidden">
            <button 
              onClick={() => setSelectedView('calendar')}
              className={`px-3 py-1.5 text-sm flex items-center gap-1 ${selectedView === 'calendar' ? 'bg-nepal-red text-white' : 'bg-white text-gray-600'}`}
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Calendar</span>
            </button>
            <button 
              onClick={() => setSelectedView('list')}
              className={`px-3 py-1.5 text-sm flex items-center gap-1 ${selectedView === 'list' ? 'bg-nepal-red text-white' : 'bg-white text-gray-600'}`}
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
          <CustomButton
            variant="outline"
            size="sm"
            onClick={onRefresh}
            isLoading={isLoading}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            <span className="hidden sm:inline">Refresh</span>
          </CustomButton>
        </div>
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
          <TabsList className="w-full grid grid-cols-3 mb-6">
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
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <CardTitle>{group.group} Schedule</CardTitle>
                      <CardDescription>
                        Last updated: {formatLastUpdated(group.lastUpdated)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-nepal-red shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-sm text-gray-700 mb-2">Areas Covered:</h3>
                        <ul className="space-y-1">
                          {group.locations.map((location, idx) => (
                            <li key={idx} className="text-sm text-gray-600">{location}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {selectedView === 'calendar' ? (
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
                                <li key={idx} className="text-sm flex items-center text-gray-600">
                                  <span className="h-1.5 w-1.5 rounded-full bg-nepal-red/60 mr-2"></span>
                                  {time}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {group.schedule.map((daySchedule) => {
                        const isToday = daySchedule.day === today;
                        return (
                          <div 
                            key={daySchedule.day} 
                            className={`p-3 rounded-lg border ${isToday ? 'border-nepal-red bg-red-50' : 'border-gray-200'}`}
                          >
                            <div className="flex items-center justify-between">
                              <h3 className={`text-sm font-medium ${isToday ? 'text-nepal-red' : 'text-gray-700'}`}>
                                {daySchedule.day}
                                {isToday && <span className="ml-2 text-xs bg-nepal-red text-white py-0.5 px-1.5 rounded">Today</span>}
                              </h3>
                              <div className="flex flex-wrap justify-end gap-2">
                                {daySchedule.times.map((time, idx) => (
                                  <span key={idx} className="text-xs bg-gray-100 text-gray-700 py-1 px-2 rounded-full">
                                    {time}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
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
