
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, RotateCcw } from 'lucide-react';
import { searchWord } from '@/services/DictionaryService';
import { useToast } from '@/hooks/use-toast';

interface DictionaryResult {
  word: string;
  definitions: {
    pos: string;
    definition: string;
  }[];
  translations: string[];
  examples?: string[];
}

interface DictionarySearchProps {
  onResultFound: (result: DictionaryResult | null) => void;
}

const DictionarySearch: React.FC<DictionarySearchProps> = ({ onResultFound }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState<'np-to-en' | 'en-to-np'>('np-to-en');
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Search field is empty",
        description: "Please enter a word to search",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const fromNepali = direction === 'np-to-en';
      const result = await searchWord(searchTerm, fromNepali);
      onResultFound(result);
      
      if (!result) {
        toast({
          title: "No results found",
          description: "Please try a different word",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error searching:', error);
      toast({
        title: "Search failed",
        description: "There was a problem with your search",
        variant: "destructive",
      });
      onResultFound(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    onResultFound(null);
  };

  return (
    <div className="w-full p-5 bg-white rounded-xl shadow-sm border border-gray-100">
      <Tabs defaultValue="np-to-en" onValueChange={(value) => setDirection(value as 'np-to-en' | 'en-to-np')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="np-to-en">नेपाली → English</TabsTrigger>
          <TabsTrigger value="en-to-np">English → नेपाली</TabsTrigger>
        </TabsList>
        
        <TabsContent value="np-to-en" className="space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="नेपाली शब्द खोज्नुहोस्..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pr-10"
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={isLoading}
              className="bg-nepal-red hover:bg-nepal-crimson"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  खोज्दै...
                </span>
              ) : (
                <span className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  खोज्नुहोस्
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              title="Reset search"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="en-to-np" className="space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search English word..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pr-10"
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={isLoading}
              className="bg-nepal-red hover:bg-nepal-crimson"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                <span className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              title="Reset search"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DictionarySearch;
