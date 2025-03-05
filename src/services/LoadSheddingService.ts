
interface LoadSheddingSchedule {
  group: string;
  locations: string[];
  schedule: {
    day: string;
    times: string[];
  }[];
  lastUpdated: string;
}

class LoadSheddingService {
  private static CACHE_KEY = 'nea_load_shedding_schedule';
  private static CACHE_EXPIRY_KEY = 'nea_load_shedding_expiry';
  private static CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  public static async getSchedule(): Promise<LoadSheddingSchedule[]> {
    // Check if we have cached data and it's still valid
    const cachedData = this.getCachedData();
    if (cachedData) {
      return cachedData;
    }

    try {
      // In a real implementation, this would use a server-side function to scrape
      // the NEA website since it likely doesn't have a public API
      // For demonstration, we're using mock data
      const data = await this.fetchScheduleFromNEA();
      this.cacheData(data);
      return data;
    } catch (error) {
      console.error('Error fetching load shedding schedule:', error);
      // Return empty array or cached data even if expired
      return this.getCachedData(true) || [];
    }
  }

  private static getCachedData(ignoreExpiry = false): LoadSheddingSchedule[] | null {
    try {
      const cachedSchedule = localStorage.getItem(this.CACHE_KEY);
      const expiryTimestamp = localStorage.getItem(this.CACHE_EXPIRY_KEY);

      if (!cachedSchedule || !expiryTimestamp) {
        return null;
      }

      // Check if cache has expired
      if (!ignoreExpiry && Number(expiryTimestamp) < Date.now()) {
        return null;
      }

      return JSON.parse(cachedSchedule);
    } catch (error) {
      console.error('Error retrieving cached data:', error);
      return null;
    }
  }

  private static cacheData(data: LoadSheddingSchedule[]): void {
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(this.CACHE_EXPIRY_KEY, (Date.now() + this.CACHE_DURATION).toString());
    } catch (error) {
      console.error('Error caching data:', error);
    }
  }

  private static async fetchScheduleFromNEA(): Promise<LoadSheddingSchedule[]> {
    // In a production app, this would be a server-side function that scrapes the NEA website
    // For now, we'll return mock data with improved location information
    
    // Simulating network request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data for demonstration with locations added
    return [
      {
        group: "Group A",
        locations: [
          "Kathmandu: Balaju, Bansbari, Maharajgunj",
          "Lalitpur: Pulchowk, Jawalakhel",
          "Bhaktapur: Suryabinayak, Katunje"
        ],
        schedule: [
          {
            day: "Sunday",
            times: ["06:00 - 09:00", "18:00 - 21:00"]
          },
          {
            day: "Monday",
            times: ["08:00 - 11:00", "20:00 - 23:00"]
          },
          {
            day: "Tuesday",
            times: ["10:00 - 13:00", "22:00 - 01:00"]
          },
          {
            day: "Wednesday",
            times: ["04:00 - 07:00", "16:00 - 19:00"]
          },
          {
            day: "Thursday",
            times: ["07:00 - 10:00", "19:00 - 22:00"]
          },
          {
            day: "Friday",
            times: ["09:00 - 12:00", "21:00 - 00:00"]
          },
          {
            day: "Saturday",
            times: ["05:00 - 08:00", "17:00 - 20:00"]
          }
        ],
        lastUpdated: new Date().toISOString()
      },
      {
        group: "Group B",
        locations: [
          "Kathmandu: Chabahil, Bouddha, New Baneshwor",
          "Lalitpur: Patan, Satdobato, Imadol",
          "Bhaktapur: Lokanthali, Thimi"
        ],
        schedule: [
          {
            day: "Sunday",
            times: ["08:00 - 11:00", "20:00 - 23:00"]
          },
          {
            day: "Monday",
            times: ["10:00 - 13:00", "22:00 - 01:00"]
          },
          {
            day: "Tuesday",
            times: ["04:00 - 07:00", "16:00 - 19:00"]
          },
          {
            day: "Wednesday",
            times: ["07:00 - 10:00", "19:00 - 22:00"]
          },
          {
            day: "Thursday",
            times: ["09:00 - 12:00", "21:00 - 00:00"]
          },
          {
            day: "Friday",
            times: ["05:00 - 08:00", "17:00 - 20:00"]
          },
          {
            day: "Saturday",
            times: ["06:00 - 09:00", "18:00 - 21:00"]
          }
        ],
        lastUpdated: new Date().toISOString()
      },
      {
        group: "Group C",
        locations: [
          "Kathmandu: Kalanki, Swayambhu, Kalimati",
          "Lalitpur: Ekantakuna, Dhapakhel",
          "Bhaktapur: Madhyapur Thimi, Balkot"
        ],
        schedule: [
          {
            day: "Sunday",
            times: ["10:00 - 13:00", "22:00 - 01:00"]
          },
          {
            day: "Monday",
            times: ["04:00 - 07:00", "16:00 - 19:00"]
          },
          {
            day: "Tuesday",
            times: ["07:00 - 10:00", "19:00 - 22:00"]
          },
          {
            day: "Wednesday",
            times: ["09:00 - 12:00", "21:00 - 00:00"]
          },
          {
            day: "Thursday",
            times: ["05:00 - 08:00", "17:00 - 20:00"]
          },
          {
            day: "Friday",
            times: ["06:00 - 09:00", "18:00 - 21:00"]
          },
          {
            day: "Saturday",
            times: ["08:00 - 11:00", "20:00 - 23:00"]
          }
        ],
        lastUpdated: new Date().toISOString()
      },
      {
        group: "Group D",
        locations: [
          "Kathmandu: Baneshor, Koteshwor, Tinkune",
          "Lalitpur: Kupondole, Sanepa, Jhamsikhel",
          "Bhaktapur: Jagati, Changunarayan"
        ],
        schedule: [
          {
            day: "Sunday",
            times: ["04:00 - 07:00", "16:00 - 19:00"]
          },
          {
            day: "Monday",
            times: ["07:00 - 10:00", "19:00 - 22:00"]
          },
          {
            day: "Tuesday",
            times: ["09:00 - 12:00", "21:00 - 00:00"]
          },
          {
            day: "Wednesday",
            times: ["05:00 - 08:00", "17:00 - 20:00"]
          },
          {
            day: "Thursday",
            times: ["06:00 - 09:00", "18:00 - 21:00"]
          },
          {
            day: "Friday",
            times: ["08:00 - 11:00", "20:00 - 23:00"]
          },
          {
            day: "Saturday",
            times: ["10:00 - 13:00", "22:00 - 01:00"]
          }
        ],
        lastUpdated: new Date().toISOString()
      },
      {
        group: "Group E",
        locations: [
          "Kathmandu: Gongabu, Samakhushi, Tokha",
          "Lalitpur: Nakkhu, Sunakothi, Chapagaun",
          "Bhaktapur: Dadhikot, Gundu"
        ],
        schedule: [
          {
            day: "Sunday",
            times: ["07:00 - 10:00", "19:00 - 22:00"]
          },
          {
            day: "Monday",
            times: ["09:00 - 12:00", "21:00 - 00:00"]
          },
          {
            day: "Tuesday",
            times: ["05:00 - 08:00", "17:00 - 20:00"]
          },
          {
            day: "Wednesday",
            times: ["06:00 - 09:00", "18:00 - 21:00"]
          },
          {
            day: "Thursday",
            times: ["08:00 - 11:00", "20:00 - 23:00"]
          },
          {
            day: "Friday",
            times: ["10:00 - 13:00", "22:00 - 01:00"]
          },
          {
            day: "Saturday",
            times: ["04:00 - 07:00", "16:00 - 19:00"]
          }
        ],
        lastUpdated: new Date().toISOString()
      },
      {
        group: "Group F",
        locations: [
          "Kathmandu: Budhanilkantha, Kapan, Jorpati",
          "Lalitpur: Lubhu, Lamatar, Godavari",
          "Bhaktapur: Sipadol, Sirutar"
        ],
        schedule: [
          {
            day: "Sunday",
            times: ["09:00 - 12:00", "21:00 - 00:00"]
          },
          {
            day: "Monday",
            times: ["05:00 - 08:00", "17:00 - 20:00"]
          },
          {
            day: "Tuesday",
            times: ["06:00 - 09:00", "18:00 - 21:00"]
          },
          {
            day: "Wednesday",
            times: ["08:00 - 11:00", "20:00 - 23:00"]
          },
          {
            day: "Thursday",
            times: ["10:00 - 13:00", "22:00 - 01:00"]
          },
          {
            day: "Friday",
            times: ["04:00 - 07:00", "16:00 - 19:00"]
          },
          {
            day: "Saturday",
            times: ["07:00 - 10:00", "19:00 - 22:00"]
          }
        ],
        lastUpdated: new Date().toISOString()
      },
      {
        group: "Group G",
        locations: [
          "Kathmandu: Kirtipur, Thankot, Chandragiri",
          "Lalitpur: Bungamati, Khokana, Harisiddhi",
          "Bhaktapur: Nagarkot, Bageswori"
        ],
        schedule: [
          {
            day: "Sunday",
            times: ["05:00 - 08:00", "17:00 - 20:00"]
          },
          {
            day: "Monday",
            times: ["06:00 - 09:00", "18:00 - 21:00"]
          },
          {
            day: "Tuesday",
            times: ["08:00 - 11:00", "20:00 - 23:00"]
          },
          {
            day: "Wednesday",
            times: ["10:00 - 13:00", "22:00 - 01:00"]
          },
          {
            day: "Thursday",
            times: ["04:00 - 07:00", "16:00 - 19:00"]
          },
          {
            day: "Friday",
            times: ["07:00 - 10:00", "19:00 - 22:00"]
          },
          {
            day: "Saturday",
            times: ["09:00 - 12:00", "21:00 - 00:00"]
          }
        ],
        lastUpdated: new Date().toISOString()
      }
    ];
  }
}

export default LoadSheddingService;
