
interface DictionaryResult {
  word: string;
  definitions: {
    pos: string;
    definition: string;
  }[];
  translations: string[];
  examples?: string[];
}

interface TranslationResult {
  original: string;
  translated: string;
}

export const searchWord = async (word: string, fromNepali: boolean = true): Promise<DictionaryResult | null> => {
  try {
    // Lexical Lab API endpoint (placeholder - to be replaced with actual API)
    const apiUrl = `https://api.lexicallab.org/dictionary/search?term=${encodeURIComponent(word)}&from=${fromNepali ? 'np' : 'en'}`;
    
    // For development, let's use some mock data
    // In production, uncomment the fetch code below
    
    /*
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch dictionary data');
    }
    const data = await response.json();
    return data;
    */
    
    // Return mock data for demonstration
    return getMockDictionaryResult(word, fromNepali);
  } catch (error) {
    console.error('Error searching dictionary:', error);
    return null;
  }
};

export const translateText = async (text: string, fromNepali: boolean = true): Promise<TranslationResult | null> => {
  try {
    // Lexical Lab API endpoint (placeholder - to be replaced with actual API)
    const apiUrl = `https://api.lexicallab.org/translate?text=${encodeURIComponent(text)}&from=${fromNepali ? 'np' : 'en'}`;
    
    // For development, let's use some mock data
    // In production, uncomment the fetch code below
    
    /*
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to translate text');
    }
    const data = await response.json();
    return data;
    */
    
    // Return mock translation for demonstration
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    return {
      original: text,
      translated: getMockTranslation(text, fromNepali)
    };
  } catch (error) {
    console.error('Error translating text:', error);
    return null;
  }
};

// Mock data functions - replace these with actual API calls in production
function getMockDictionaryResult(word: string, fromNepali: boolean): DictionaryResult {
  const mockNepaliToEnglish: Record<string, DictionaryResult> = {
    'नमस्ते': {
      word: 'नमस्ते',
      definitions: [
        { pos: 'noun', definition: 'A traditional greeting in Nepal and India' },
        { pos: 'interjection', definition: 'Hello; good day; greetings' }
      ],
      translations: ['hello', 'greetings', 'good day'],
      examples: ['नमस्ते, तपाईंलाई कस्तो छ?']
    },
    'माया': {
      word: 'माया',
      definitions: [
        { pos: 'noun', definition: 'Love, affection' },
        { pos: 'noun', definition: 'Care, concern' }
      ],
      translations: ['love', 'affection', 'care'],
      examples: ['मलाई तपाईंको माया चाहिन्छ।']
    },
    'खाना': {
      word: 'खाना',
      definitions: [
        { pos: 'noun', definition: 'Food, meal' },
        { pos: 'verb', definition: 'To eat' }
      ],
      translations: ['food', 'meal', 'to eat'],
      examples: ['खाना खानुहोस्।']
    },
    'पानी': {
      word: 'पानी',
      definitions: [
        { pos: 'noun', definition: 'Water' }
      ],
      translations: ['water'],
      examples: ['म पानी पिउँछु।']
    }
  };

  const mockEnglishToNepali: Record<string, DictionaryResult> = {
    'hello': {
      word: 'hello',
      definitions: [
        { pos: 'interjection', definition: 'A greeting used when meeting someone' }
      ],
      translations: ['नमस्ते', 'नमस्कार'],
      examples: ['Hello, how are you?']
    },
    'love': {
      word: 'love',
      definitions: [
        { pos: 'noun', definition: 'A deep affection or attachment to someone' },
        { pos: 'verb', definition: 'To feel deep affection for someone' }
      ],
      translations: ['माया', 'प्रेम'],
      examples: ['I love you.']
    },
    'food': {
      word: 'food',
      definitions: [
        { pos: 'noun', definition: 'Any substance consumed to provide nutritional support' }
      ],
      translations: ['खाना', 'खानेकुरा'],
      examples: ['The food is delicious.']
    },
    'water': {
      word: 'water',
      definitions: [
        { pos: 'noun', definition: 'A clear, colorless, odorless, tasteless liquid' }
      ],
      translations: ['पानी', 'जल'],
      examples: ['I drink water.']
    }
  };

  const mockData = fromNepali ? mockNepaliToEnglish : mockEnglishToNepali;
  const lowerWord = word.toLowerCase();
  
  // Return the mock data if found, otherwise return a default "not found" result
  if (mockData[word]) {
    return mockData[word];
  }
  
  // Check for partial matches
  for (const key in mockData) {
    if (key.toLowerCase().includes(lowerWord) || lowerWord.includes(key.toLowerCase())) {
      return mockData[key];
    }
  }
  
  return {
    word: word,
    definitions: [{ pos: 'unknown', definition: 'No definition found' }],
    translations: ['No translation available'],
    examples: []
  };
}

function getMockTranslation(text: string, fromNepali: boolean): string {
  const nepaliToEnglish: Record<string, string> = {
    'नमस्ते': 'Hello',
    'तपाईंलाई कस्तो छ?': 'How are you?',
    'म नेपाली हुँ': 'I am Nepali',
    'मलाई नेपाल मन पर्छ': 'I like Nepal',
    'धन्यवाद': 'Thank you',
    'मेरो नाम': 'My name is',
  };
  
  const englishToNepali: Record<string, string> = {
    'Hello': 'नमस्ते',
    'How are you?': 'तपाईंलाई कस्तो छ?',
    'I am Nepali': 'म नेपाली हुँ',
    'I like Nepal': 'मलाई नेपाल मन पर्छ',
    'Thank you': 'धन्यवाद',
    'My name is': 'मेरो नाम',
  };
  
  const dictionary = fromNepali ? nepaliToEnglish : englishToNepali;
  
  // Check for exact matches
  if (dictionary[text]) {
    return dictionary[text];
  }
  
  // For longer text, we'll just append a mock translation note
  return fromNepali 
    ? `[Translated from Nepali]: ${text}` 
    : `[नेपालीमा अनुवाद]: ${text}`;
}
