
// Nepali date conversion utility
// Based on logic from https://www.ashesh.com.np/nepali-date-converter.php

// English to Nepali digit mapping
const englishToNepaliDigits: Record<string, string> = {
  '0': '०',
  '1': '१',
  '2': '२',
  '3': '३',
  '4': '४',
  '5': '५',
  '6': '६',
  '7': '७',
  '8': '८',
  '9': '९'
};

// Nepali to English digit mapping
const nepaliToEnglishDigits: Record<string, string> = {
  '०': '0',
  '१': '1',
  '२': '2',
  '३': '3',
  '४': '4',
  '५': '5',
  '६': '6',
  '७': '7',
  '८': '8',
  '९': '9'
};

// Convert English digits to Nepali digits
export const convertToNepaliDigits = (str: string): string => {
  return str.replace(/[0-9]/g, match => englishToNepaliDigits[match] || match);
};

// Convert Nepali digits to English digits
export const convertToEnglishDigits = (str: string): string => {
  return str.replace(/[०-९]/g, match => nepaliToEnglishDigits[match] || match);
};

// BS month names in English and Nepali
export const BS_MONTHS_EN = [
  'Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
  'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'
];

export const BS_MONTHS_NP = [
  'बैशाख', 'जेष्ठ', 'आषाढ़', 'श्रावण', 'भाद्र', 'आश्विन',
  'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र'
];

// AD month names
export const AD_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Days of the week in English and Nepali
export const DAYS_EN = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export const DAYS_NP = [
  'आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'
];

// Number of days in each month of BS year 
// Data for years 2000-2089 BS
// First element is for year 2000 BS, each row has 12 elements for 12 months
// Each element represents the number of days in that month
export const BS_DATE_DATA = [
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2000 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2001 BS
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2002 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2003 BS
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2004 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2005 BS
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2006 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2007 BS
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31], // 2008 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2009 BS
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2010 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2011 BS
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2012 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2013 BS
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2014 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2015 BS
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2016 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2017 BS
  [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2018 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2019 BS
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2020 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2021 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2022 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2023 BS
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2024 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2025 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2026 BS
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2027 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2028 BS
  [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30], // 2029 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2030 BS
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2031 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2032 BS
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2033 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2034 BS
  [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31], // 2035 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2036 BS
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2037 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2038 BS
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2039 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2040 BS
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2041 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2042 BS
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2043 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2044 BS
  [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2045 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2046 BS
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2047 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2048 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2049 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2050 BS
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2051 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2052 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2053 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2054 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2055 BS
  [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30], // 2056 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2057 BS
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2058 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2059 BS
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2060 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2061 BS
  [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31], // 2062 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2063 BS
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2064 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2065 BS
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31], // 2066 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2067 BS
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2068 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2069 BS
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2070 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2071 BS
  [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2072 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2073 BS
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2074 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2075 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2076 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2077 BS
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2078 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2079 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2080 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2081 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2082 BS
  [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30], // 2083 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2084 BS
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2085 BS
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2086 BS
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2087 BS
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2088 BS
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2089 BS
];

// Reference date - 1st Baisakh 2000 BS in Gregorian date
const BS_START_DATE = new Date(1943, 3, 14); // April 14, 1943 AD

// Lower range for BS date - 2000/1/1 - upper range 2089/12/30
export const minBsYear = 2000;
export const maxBsYear = 2089;

// Convert AD date to BS date
export function adToBs(adDate: Date): { year: number; month: number; day: number; weekDay: number } {
  // Calculate total days from the reference date
  const timeDiff = adDate.getTime() - BS_START_DATE.getTime();
  let totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  
  let bsYear = minBsYear;
  let bsMonth = 0;
  let bsDay = 1;
  
  // Find the year in BS
  while (totalDays > 0) {
    let daysInYear = 0;
    for (let i = 0; i < 12; i++) {
      daysInYear += BS_DATE_DATA[bsYear - minBsYear][i];
    }
    
    if (totalDays > daysInYear) {
      totalDays -= daysInYear;
      bsYear++;
      if (bsYear > maxBsYear) {
        break;
      }
    } else {
      break;
    }
  }
  
  // Find the month in BS
  for (let i = 0; i < 12; i++) {
    if (totalDays > BS_DATE_DATA[bsYear - minBsYear][i]) {
      totalDays -= BS_DATE_DATA[bsYear - minBsYear][i];
      bsMonth++;
    } else {
      break;
    }
  }
  
  // Find the day in BS
  bsDay = totalDays + 1;
  
  // Calculate weekday: 0 = Sunday, 1 = Monday, etc.
  const weekDay = adDate.getDay();
  
  return { year: bsYear, month: bsMonth, day: bsDay, weekDay };
}

// Convert BS date to AD date
export function bsToAd(bsYear: number, bsMonth: number, bsDay: number): Date {
  if (bsYear < minBsYear || bsYear > maxBsYear) {
    throw new Error(`Year must be between ${minBsYear} and ${maxBsYear}`);
  }
  
  if (bsMonth < 0 || bsMonth > 11) {
    throw new Error('Month must be between 0 and 11');
  }
  
  const monthDays = BS_DATE_DATA[bsYear - minBsYear][bsMonth];
  if (bsDay < 1 || bsDay > monthDays) {
    throw new Error(`Day must be between 1 and ${monthDays} for month ${bsMonth + 1}`);
  }
  
  // Calculate the total days from reference date
  let totalDays = 0;
  
  // Add days for years
  for (let i = minBsYear; i < bsYear; i++) {
    const yearIndex = i - minBsYear;
    for (let j = 0; j < 12; j++) {
      totalDays += BS_DATE_DATA[yearIndex][j];
    }
  }
  
  // Add days for months
  for (let i = 0; i < bsMonth; i++) {
    totalDays += BS_DATE_DATA[bsYear - minBsYear][i];
  }
  
  // Add days
  totalDays += bsDay - 1;
  
  // Calculate target date
  const adDate = new Date(BS_START_DATE);
  adDate.setDate(BS_START_DATE.getDate() + totalDays);
  
  return adDate;
}

// Format BS date 
export function formatBsDate(bsDate: { year: number; month: number; day: number; weekDay: number }, format: 'np' | 'en' = 'en'): string {
  const { year, month, day, weekDay } = bsDate;
  
  if (format === 'np') {
    const dayNp = convertToNepaliDigits(day.toString());
    const monthNp = BS_MONTHS_NP[month];
    const yearNp = convertToNepaliDigits(year.toString());
    const weekDayNp = DAYS_NP[weekDay];
    
    return `${dayNp} ${monthNp} ${yearNp}, ${weekDayNp}`;
  } else {
    const monthEn = BS_MONTHS_EN[month];
    const weekDayEn = DAYS_EN[weekDay];
    
    return `${day} ${monthEn} ${year}, ${weekDayEn}`;
  }
}

// Get the current BS date
export function getCurrentBsDate(): { year: number; month: number; day: number; weekDay: number } {
  const today = new Date();
  return adToBs(today);
}

// Get the number of days in a specific BS month
export function getDaysInBsMonth(bsYear: number, bsMonth: number): number {
  if (bsYear < minBsYear || bsYear > maxBsYear) {
    throw new Error(`Year must be between ${minBsYear} and ${maxBsYear}`);
  }
  
  if (bsMonth < 0 || bsMonth > 11) {
    throw new Error('Month must be between 0 and 11');
  }
  
  return BS_DATE_DATA[bsYear - minBsYear][bsMonth];
}

// Format AD date
export function formatAdDate(adDate: Date): string {
  const day = adDate.getDate();
  const month = AD_MONTHS[adDate.getMonth()];
  const year = adDate.getFullYear();
  const weekDay = DAYS_EN[adDate.getDay()];
  
  return `${day} ${month} ${year}, ${weekDay}`;
}

// Validate BS date
export function isValidBsDate(bsYear: number, bsMonth: number, bsDay: number): boolean {
  if (bsYear < minBsYear || bsYear > maxBsYear) {
    return false;
  }
  
  if (bsMonth < 0 || bsMonth > 11) {
    return false;
  }
  
  const monthDays = BS_DATE_DATA[bsYear - minBsYear][bsMonth];
  if (bsDay < 1 || bsDay > monthDays) {
    return false;
  }
  
  return true;
}
