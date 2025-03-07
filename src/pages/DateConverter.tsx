
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdSpace from '@/components/shared/AdSpace';
import { Calendar, ArrowRight, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import CustomButton from '@/components/ui/CustomButton';
import { bsToAd, adToBs, getBsMonthDays, getAdMonthDays, getBsMonthText, getAdMonthText } from '@/lib/nepaliDateConverter';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ScrollToTop from '@/components/shared/ScrollToTop';

type DateType = 'bs' | 'ad';

const DateConverter = () => {
  const [dateType, setDateType] = useState<DateType>('bs');
  const [bsYear, setBsYear] = useState<number>(2080);
  const [bsMonth, setBsMonth] = useState<number>(1);
  const [bsDay, setBsDay] = useState<number>(1);
  const [adYear, setAdYear] = useState<number>(2024);
  const [adMonth, setAdMonth] = useState<number>(1);
  const [adDay, setAdDay] = useState<number>(1);
  const [convertedDate, setConvertedDate] = useState<string | null>(null);
  
  const currentYear = new Date().getFullYear();
  const bsStartYear = 2000;
  const bsEndYear = 2100;
  const adStartYear = 1950;
  const adEndYear = currentYear + 50;

  useEffect(() => {
    convertDate();
  }, [dateType, bsYear, bsMonth, bsDay, adYear, adMonth, adDay]);

  const convertDate = () => {
    if (dateType === 'bs') {
      try {
        const adDate = bsToAd(bsYear, bsMonth, bsDay);
        setConvertedDate(`${getAdMonthText(adDate.month)} ${adDate.day}, ${adDate.year}`);
        setAdYear(adDate.year);
        setAdMonth(adDate.month);
        setAdDay(adDate.day);
      } catch (error) {
        setConvertedDate('Invalid Date');
      }
    } else {
      try {
        const bsDate = adToBs(adYear, adMonth, adDay);
        setConvertedDate(`${getBsMonthText(bsDate.month)} ${bsDate.day}, ${bsDate.year}`);
        setBsYear(bsDate.year);
        setBsMonth(bsDate.month);
        setBsDay(bsDate.day);
      } catch (error) {
        setConvertedDate('Invalid Date');
      }
    }
  };

  const handleSwap = () => {
    setDateType(dateType === 'bs' ? 'ad' : 'bs');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Nepali Date Converter | Convert BS to AD and AD to BS Dates</title>
        <meta name="description" content="Free online Nepali date converter to easily convert between Bikram Sambat (BS) and Gregorian (AD) dates. Accurate and fast BS to AD and AD to BS conversion." />
        <meta name="keywords" content="nepali date converter, bs to ad, ad to bs, bikram sambat converter, nepali calendar converter, date conversion nepal" />
        <meta property="og:title" content="Nepali Date Converter | Convert BS to AD and AD to BS Dates" />
        <meta property="og:description" content="Free online Nepali date converter to easily convert between Bikram Sambat (BS) and Gregorian (AD) dates. Accurate and fast BS to AD and AD to BS conversion." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yournepalapp.com/date-converter" />
        <link rel="canonical" href="https://yournepalapp.com/date-converter" />
      </Helmet>
      
      <Navbar />
      <ScrollToTop />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container-custom">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nepali Date Converter
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Easily convert dates between Bikram Sambat (BS) and Gregorian (AD) calendars.
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-md">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center text-xl">
                  <Calendar className="h-5 w-5 mr-2 text-nepal-red" />
                  Date Converter
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue={dateType} className="w-full">
                  <TabsList>
                    <TabsTrigger value="bs" onClick={() => setDateType('bs')}>
                      Bikram Sambat (BS)
                    </TabsTrigger>
                    <TabsTrigger value="ad" onClick={() => setDateType('ad')}>
                      Gregorian (AD)
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="bs">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bsYear">Year</Label>
                        <Select value={String(bsYear)} onValueChange={(value) => setBsYear(Number(value))}>
                          <SelectTrigger id="bsYear">
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: bsEndYear - bsStartYear + 1 }, (_, i) => bsStartYear + i).map((year) => (
                              <SelectItem key={year} value={String(year)}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bsMonth">Month</Label>
                        <Select value={String(bsMonth)} onValueChange={(value) => setBsMonth(Number(value))}>
                          <SelectTrigger id="bsMonth">
                            <SelectValue placeholder="Select Month" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                              <SelectItem key={month} value={String(month)}>
                                {getBsMonthText(month)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bsDay">Day</Label>
                        <Select value={String(bsDay)} onValueChange={(value) => setBsDay(Number(value))}>
                          <SelectTrigger id="bsDay">
                            <SelectValue placeholder="Select Day" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: getBsMonthDays(bsYear, bsMonth) }, (_, i) => i + 1).map((day) => (
                              <SelectItem key={day} value={String(day)}>
                                {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ad">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="adYear">Year</Label>
                        <Select value={String(adYear)} onValueChange={(value) => setAdYear(Number(value))}>
                          <SelectTrigger id="adYear">
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: adEndYear - adStartYear + 1 }, (_, i) => adStartYear + i).map((year) => (
                              <SelectItem key={year} value={String(year)}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="adMonth">Month</Label>
                        <Select value={String(adMonth)} onValueChange={(value) => setAdMonth(Number(value))}>
                          <SelectTrigger id="adMonth">
                            <SelectValue placeholder="Select Month" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                              <SelectItem key={month} value={String(month)}>
                                {getAdMonthText(month)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="adDay">Day</Label>
                        <Select value={String(adDay)} onValueChange={(value) => setAdDay(Number(value))}>
                          <SelectTrigger id="adDay">
                            <SelectValue placeholder="Select Day" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: getAdMonthDays(adYear, adMonth) }, (_, i) => i + 1).map((day) => (
                              <SelectItem key={day} value={String(day)}>
                                {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex items-center justify-center my-6">
                  <Button variant="outline" size="icon" onClick={handleSwap}>
                    <ArrowRight className="h-4 w-4 rotate-90" />
                  </Button>
                </div>
                
                {convertedDate && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-2">Converted Date:</div>
                    <div className="text-2xl font-semibold">{convertedDate}</div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center text-xl">
                  <Calendar className="h-5 w-5 mr-2 text-nepal-red" />
                  About Nepali Date (Bikram Sambat)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4 text-gray-600">
                  <p>
                    The Bikram Sambat (BS) is the official calendar of Nepal. It is approximately 56 years and 8.5 months ahead of the Gregorian calendar.
                  </p>
                  <p>
                    The new year in BS usually falls in mid-April of the Gregorian calendar.
                  </p>
                  <p>
                    Use this tool to convert dates between BS and AD for various purposes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* FAQ Section */}
          <section className="mt-12 bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-nepal-red" />
              Frequently Asked Questions
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-medium text-gray-800">
                  How accurate is this Nepali date converter?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Our Nepali date converter uses verified algorithms to ensure high accuracy. However, minor discrepancies may occur due to variations in different calendar systems. Always cross-verify with official sources for critical applications.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-medium text-gray-800">
                  Why is the Nepali calendar different from the Gregorian calendar?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  The Nepali calendar (Bikram Sambat) is a lunisolar calendar, while the Gregorian calendar is a solar calendar. This means the BS calendar is based on both the moon's phases and the Earth's orbit around the sun, leading to differences in date calculations.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-medium text-gray-800">
                  Can I convert dates from past centuries?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes, our converter supports a wide range of dates. However, accuracy may decrease for dates before 1900 AD due to historical variations in calendar systems.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left font-medium text-gray-800">
                  How do I use this tool to find auspicious dates?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  While our tool primarily converts dates, you can use it to identify corresponding dates in the Nepali calendar for traditional events. Consult a Nepali calendar or "Panchang" for specific auspicious dates and times.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left font-medium text-gray-800">
                  Is this tool suitable for official purposes?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  While we strive for accuracy, this tool is intended for informational purposes only. Always verify converted dates with official documents or government sources for legal or official use.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          
          {/* Ad Space */}
          <AdSpace size="banner" className="mt-8" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DateConverter;
