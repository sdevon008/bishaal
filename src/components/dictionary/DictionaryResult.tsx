
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, BookText, Languages } from 'lucide-react';

interface Definition {
  pos: string;
  definition: string;
}

interface DictionaryResultProps {
  result: {
    word: string;
    definitions: Definition[];
    translations: string[];
    examples?: string[];
  } | null;
  fromNepali: boolean;
}

const DictionaryResult: React.FC<DictionaryResultProps> = ({ result, fromNepali }) => {
  if (!result) {
    return null;
  }

  const getPosLabel = (pos: string): string => {
    const posMap: Record<string, string> = {
      'noun': 'Noun',
      'verb': 'Verb',
      'adjective': 'Adjective',
      'adverb': 'Adverb',
      'pronoun': 'Pronoun',
      'preposition': 'Preposition',
      'conjunction': 'Conjunction',
      'interjection': 'Interjection',
      'unknown': 'Unknown'
    };
    
    return posMap[pos.toLowerCase()] || pos;
  };

  return (
    <Card className="w-full mt-6 overflow-hidden">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">{result.word}</CardTitle>
            <CardDescription>
              {fromNepali ? 'Nepali to English' : 'English to Nepali'} Dictionary Result
            </CardDescription>
          </div>
          <div className="p-2 bg-nepal-red/10 text-nepal-red rounded-lg">
            <Book className="h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        {/* Definitions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold flex items-center mb-3">
            <BookText className="mr-2 h-5 w-5 text-nepal-red" />
            Definitions
          </h3>
          
          <div className="space-y-3">
            {result.definitions.map((def, index) => (
              <div key={index} className="pb-3 border-b border-gray-100 last:border-0">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded mb-1">
                  {getPosLabel(def.pos)}
                </span>
                <p className="text-gray-700">{def.definition}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Translations */}
        {result.translations && result.translations.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold flex items-center mb-3">
              <Languages className="mr-2 h-5 w-5 text-nepal-red" />
              Translations
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.translations.map((translation, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-nepal-red/10 text-nepal-red rounded-lg text-sm"
                >
                  {translation}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Examples */}
        {result.examples && result.examples.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Examples</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {result.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DictionaryResult;
