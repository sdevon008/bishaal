
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeftRight, Languages, Copy, Check } from 'lucide-react';
import { translateText } from '@/services/DictionaryService';
import { useToast } from '@/hooks/use-toast';

const TextTranslator: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState<'np-to-en' | 'en-to-np'>('np-to-en');
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Translation field is empty",
        description: "Please enter text to translate",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const fromNepali = direction === 'np-to-en';
      const result = await translateText(inputText, fromNepali);
      
      if (result) {
        setOutputText(result.translated);
      } else {
        setOutputText('');
        toast({
          title: "Translation failed",
          description: "Unable to translate the text",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error translating:', error);
      toast({
        title: "Translation failed",
        description: "There was a problem with your translation",
        variant: "destructive",
      });
      setOutputText('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyOutput = () => {
    if (!outputText) return;
    
    navigator.clipboard.writeText(outputText).then(() => {
      setIsCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "The translated text has been copied to your clipboard",
      });
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  const handleReset = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="w-full p-5 bg-white rounded-xl shadow-sm border border-gray-100">
      <Tabs defaultValue="np-to-en" onValueChange={(value) => setDirection(value as 'np-to-en' | 'en-to-np')} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Languages className="mr-2 h-5 w-5 text-nepal-red" />
            Text Translator
          </h2>
          <TabsList>
            <TabsTrigger value="np-to-en">नेपाली → English</TabsTrigger>
            <TabsTrigger value="en-to-np">English → नेपाली</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {/* Input Area */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {direction === 'np-to-en' ? 'नेपाली टेक्स्ट' : 'English Text'}
            </label>
            <textarea
              className="w-full min-h-[150px] p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nepal-red/30 focus:border-nepal-red"
              placeholder={direction === 'np-to-en' ? 'यहाँ नेपाली मा टाइप गर्नुहोस्...' : 'Type in English here...'}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          
          {/* Output Area */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                {direction === 'np-to-en' ? 'English Translation' : 'नेपाली अनुवाद'}
              </label>
              {outputText && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyOutput}
                  className="text-gray-500 hover:text-nepal-red"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 mr-1" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1" />
                  )}
                  {isCopied ? 'Copied' : 'Copy'}
                </Button>
              )}
            </div>
            <div className="w-full min-h-[150px] p-3 bg-gray-50 border border-gray-200 rounded-lg">
              {outputText ? (
                <p className="whitespace-pre-wrap">{outputText}</p>
              ) : (
                <p className="text-gray-400 italic">Translation will appear here...</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-4 justify-center">
          <Button
            onClick={handleTranslate}
            disabled={isLoading}
            className="bg-nepal-red hover:bg-nepal-crimson"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Translating...
              </span>
            ) : (
              <span className="flex items-center">
                <ArrowLeftRight className="mr-2 h-4 w-4" />
                Translate
              </span>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={isLoading}
          >
            Clear
          </Button>
        </div>
      </Tabs>
    </div>
  );
};

export default TextTranslator;
