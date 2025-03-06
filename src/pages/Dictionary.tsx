
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Book, Languages } from 'lucide-react';

const Dictionary = () => {
  const [translatorLoaded, setTranslatorLoaded] = useState(false);
  const [dictionaryLoaded, setDictionaryLoaded] = useState(false);
  const translatorRef = useRef<HTMLDivElement>(null);
  const dictionaryRef = useRef<HTMLDivElement>(null);

  // Initialize Google Translate widget
  useEffect(() => {
    // Add Google Translate script
    const googleTranslateScript = document.createElement('script');
    googleTranslateScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    googleTranslateScript.async = true;
    
    // Initialize function
    window.googleTranslateElementInit = function() {
      if (translatorRef.current) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,ne',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
          },
          translatorRef.current.id
        );
        setTranslatorLoaded(true);
      }
    };
    
    document.body.appendChild(googleTranslateScript);
    
    return () => {
      document.body.removeChild(googleTranslateScript);
      delete window.googleTranslateElementInit;
    };
  }, []);

  // Initialize Google Dictionary widget
  useEffect(() => {
    if (dictionaryRef.current) {
      const script = document.createElement('script');
      script.src = "https://www.dictionaryapi.com/api/v1/references/learners/search?key=YOUR_API_KEY&q=";
      script.async = true;
      script.onload = () => setDictionaryLoaded(true);
      
      dictionaryRef.current.appendChild(script);

      // Styling for dictionary widget
      const style = document.createElement('style');
      style.textContent = `
        .dictionary-container {
          font-family: 'Arial', sans-serif;
          max-width: 100%;
          overflow: hidden;
        }
        .dictionary-container a {
          text-decoration: none;
          color: #DC2626;
        }
        .dictionary-container .copyright, 
        .dictionary-container .logo,
        .dictionary-container .branding {
          display: none !important;
        }
      `;
      document.head.appendChild(style);

      return () => {
        if (dictionaryRef.current && script.parentNode) {
          script.parentNode.removeChild(script);
        }
        document.head.removeChild(style);
      };
    }
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.3 
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-8" variants={itemVariants}>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                <span className="text-nepal-red">Nepali-English</span> Language Tools
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Translate between Nepali and English with our integrated Google tools
              </p>
              <Separator className="my-6 max-w-md mx-auto bg-gray-200" />
            </motion.div>
            
            <Tabs defaultValue="translator" className="w-full">
              <motion.div variants={itemVariants}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="translator" className="flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Translator
                  </TabsTrigger>
                  <TabsTrigger value="dictionary" className="flex items-center gap-2">
                    <Book className="h-4 w-4" />
                    Dictionary
                  </TabsTrigger>
                </TabsList>
              </motion.div>
              
              <TabsContent value="translator">
                <motion.div variants={itemVariants}>
                  <Card className="border-gradient animate-fade-in">
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4 text-gray-800">Google Translator</h2>
                      <div 
                        id="google_translate_element" 
                        ref={translatorRef}
                        className="translator-container min-h-[300px] bg-white rounded-lg p-4"
                      >
                        {!translatorLoaded && (
                          <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nepal-red"></div>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 text-sm text-gray-500">
                        <p>Use the dropdown above to select your language preferences. Type in the text area to translate.</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="dictionary">
                <motion.div variants={itemVariants}>
                  <Card className="border-gradient animate-fade-in">
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4 text-gray-800">Dictionary Lookup</h2>
                      <div 
                        ref={dictionaryRef} 
                        className="dictionary-container min-h-[300px] bg-white rounded-lg p-4"
                      >
                        {!dictionaryLoaded && (
                          <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nepal-red"></div>
                          </div>
                        )}
                        <div className="mb-4">
                          <input 
                            type="text" 
                            id="dictionary-search"
                            placeholder="Type a word to look up..." 
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nepal-red/30 focus:border-nepal-red"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                const term = (e.target as HTMLInputElement).value;
                                if (term) {
                                  window.open(`https://www.google.com/search?q=${term}+meaning+in+nepali`, '_blank');
                                }
                              }
                            }}
                          />
                        </div>
                        <div id="dictionary-results">
                          <p className="text-center text-gray-500">Enter a word above and press Enter to search</p>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-500">
                        <p>For best results, specify if you want to translate from English to Nepali or vice versa.</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Add TypeScript interface for the Google Translate API
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: {
          InlineLayout: {
            SIMPLE: number;
            HORIZONTAL: number;
            VERTICAL: number;
          };
          new (options: {
            pageLanguage: string;
            includedLanguages?: string;
            layout?: number;
            autoDisplay?: boolean;
            gaTrack?: boolean;
            gaId?: string;
          }, element: string): void;
        };
      };
    };
  }
}

export default Dictionary;
