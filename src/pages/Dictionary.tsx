
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdSpace from '@/components/shared/AdSpace';
import { Book, Languages } from 'lucide-react';
import DictionarySearch from '@/components/dictionary/DictionarySearch';
import DictionaryResult from '@/components/dictionary/DictionaryResult';
import TextTranslator from '@/components/dictionary/TextTranslator';

interface DictionaryResultType {
  word: string;
  definitions: {
    pos: string;
    definition: string;
  }[];
  translations: string[];
  examples?: string[];
}

const Dictionary = () => {
  const [searchResult, setSearchResult] = useState<DictionaryResultType | null>(null);
  const [searchDirection, setSearchDirection] = useState<'np-to-en' | 'en-to-np'>('np-to-en');

  const handleResultFound = (result: DictionaryResultType | null) => {
    setSearchResult(result);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nepali Dictionary & Translator
              </h1>
              <p className="text-lg text-gray-600">
                Look up Nepali words, find their English translations, or translate text between Nepali and English.
              </p>
            </div>
            
            {/* Ad Space */}
            <div className="mb-8">
              <AdSpace size="banner" />
            </div>
            
            <Tabs defaultValue="dictionary" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="dictionary" className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Dictionary
                </TabsTrigger>
                <TabsTrigger value="translator" className="flex items-center gap-2">
                  <Languages className="h-4 w-4" />
                  Translator
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dictionary">
                <DictionarySearch onResultFound={handleResultFound} />
                <DictionaryResult result={searchResult} fromNepali={searchDirection === 'np-to-en'} />
              </TabsContent>
              
              <TabsContent value="translator">
                <TextTranslator />
              </TabsContent>
            </Tabs>
            
            {/* Tips and info */}
            <div className="mt-10 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">About Nepali Dictionary</h2>
              <p className="mb-4">
                Our Nepali-English dictionary provides definitions, translations, and example sentences to help you learn and understand the Nepali language.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-white p-4 rounded border border-gray-100">
                  <h3 className="font-medium mb-2">Dictionary Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Find meanings of Nepali and English words</li>
                    <li>View multiple definitions with parts of speech</li>
                    <li>See example usage in sentences</li>
                    <li>Toggle between Nepali-to-English and English-to-Nepali</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded border border-gray-100">
                  <h3 className="font-medium mb-2">Translator Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Translate longer texts between Nepali and English</li>
                    <li>Copy translations to clipboard</li>
                    <li>Simple and clean interface</li>
                    <li>Fast translation service</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dictionary;
