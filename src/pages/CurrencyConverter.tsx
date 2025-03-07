
import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useToast } from "@/hooks/use-toast";
import { sonnerToast } from "@/components/ui/use-toast";
import { 
  DollarSign, 
  ArrowLeftRight, 
  RefreshCw,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import CustomButton from '@/components/ui/CustomButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Define currency data structure
interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface ExchangeRate {
  currency: string;
  buying: number;
  selling: number;
  lastUpdated: string;
}

const popularCurrencies: Currency[] = [
  { code: 'NPR', name: 'Nepalese Rupee', symbol: 'रू' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س' },
];

const CurrencyConverter = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('NPR');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [nprExchangeRates, setNprExchangeRates] = useState<ExchangeRate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchExchangeRates = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/866a1d1a332497d76b609edb/latest/USD`);
      const data = await response.json();
      
      if (data.result === 'success') {
        console.log("Raw exchange rate data:", data);
        setExchangeRates(data.conversion_rates);
        setLastUpdated(new Date().toLocaleString());
        
        const nprRates: ExchangeRate[] = [];
        
        const otherCurrencies = popularCurrencies.filter(currency => currency.code !== 'NPR');
        
        // Log what we're about to calculate
        console.log("USD to NPR rate:", data.conversion_rates.NPR);
        
        for (const currency of otherCurrencies) {
          const usdToNpr = data.conversion_rates.NPR;
          const usdToCurrency = data.conversion_rates[currency.code];
          
          if (!usdToNpr || !usdToCurrency) {
            console.log(`Missing rate for ${currency.code}`);
            continue;
          }
          
          // The exchange rate from NPR to currency = (USD to currency) / (USD to NPR)
          // This gives us how many units of currency you get per 1 NPR
          const currencyToNpr = usdToNpr / usdToCurrency;
          
          console.log(`${currency.code} to NPR rate calculation:`, {
            usdToNpr,
            usdToCurrency,
            result: currencyToNpr
          });
          
          nprRates.push({
            currency: currency.code,
            buying: parseFloat((currencyToNpr * 0.99).toFixed(4)),
            selling: parseFloat((currencyToNpr * 1.01).toFixed(4)),
            lastUpdated: new Date().toLocaleString()
          });
        }
        
        console.log('Generated NPR rates:', nprRates);
        setNprExchangeRates(nprRates);
        
        if (amount && fromCurrency && toCurrency) {
          convertCurrency(amount, fromCurrency, toCurrency, data.conversion_rates);
        }
        
        // Use sonnerToast instead of toast for success
        sonnerToast.success("Exchange rates updated", {
          description: "The latest exchange rates have been fetched successfully."
        });
      } else {
        throw new Error("Failed to fetch exchange rates");
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      // Use sonnerToast instead of toast for error
      sonnerToast.error("Error fetching exchange rates", {
        description: "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  }, [amount, fromCurrency, toCurrency]);

  useEffect(() => {
    fetchExchangeRates();
    
    const intervalId = setInterval(fetchExchangeRates, 60000);
    
    return () => clearInterval(intervalId);
  }, [fetchExchangeRates]);

  const convertCurrency = (
    amount: number, 
    from: string, 
    to: string, 
    rates: Record<string, number> = exchangeRates
  ) => {
    if (!rates || Object.keys(rates).length === 0) return;
    
    const rateFrom = rates[from];
    const rateTo = rates[to];
    
    if (rateFrom && rateTo) {
      // Convert amount in 'from' currency to USD
      const amountInUsd = amount / rateFrom;
      // Convert amount in USD to 'to' currency
      const result = amountInUsd * rateTo;
      setConvertedAmount(parseFloat(result.toFixed(4)));
      
      console.log(`Converting ${amount} ${from} to ${to}:`, {
        rateFrom,
        rateTo,
        amountInUsd,
        result
      });
    }
  };

  const handleConvert = () => {
    if (amount && fromCurrency && toCurrency) {
      convertCurrency(amount, fromCurrency, toCurrency);
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    if (amount) {
      convertCurrency(amount, toCurrency, fromCurrency);
    }
  };

  const getCurrencySymbol = (code: string): string => {
    const currency = popularCurrencies.find(c => c.code === code);
    return currency ? currency.symbol : '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Nepal Currency Converter | Live Exchange Rates | NPR Converter</title>
        <meta name="description" content="Free online Nepali Rupee (NPR) currency converter with live exchange rates. Convert between NPR and USD, EUR, GBP, INR, AUD, and all major world currencies." />
        <meta name="keywords" content="nepali rupee converter, NPR exchange rate, nepal currency converter, dollar to rupee, remittance nepal, currency calculator nepal, forex rates nepal" />
        <meta property="og:title" content="Nepal Currency Converter | Live Exchange Rates | NPR Converter" />
        <meta property="og:description" content="Free online Nepali Rupee (NPR) currency converter with live exchange rates. Convert between NPR and USD, EUR, GBP, INR, AUD, and all major world currencies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yournepalapp.com/currency-converter" />
        <link rel="canonical" href="https://yournepalapp.com/currency-converter" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container-custom">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Currency Converter & Exchange Rates
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Convert between currencies and check the latest exchange rates for Nepali Rupee (NPR).
              Rates are updated automatically every minute.
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-md">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center text-xl">
                  <DollarSign className="h-5 w-5 mr-2 text-nepal-red" />
                  Currency Converter
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                      Amount
                    </label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="focus:ring-nepal-red focus:border-nepal-red"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-2 items-center">
                    <div className="space-y-2">
                      <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700">
                        From
                      </label>
                      <Select
                        value={fromCurrency}
                        onValueChange={setFromCurrency}
                      >
                        <SelectTrigger id="fromCurrency" className="w-full">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {popularCurrencies.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.code} - {currency.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <button
                      onClick={handleSwapCurrencies}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-nepal-red/10 text-nepal-red mt-6 mx-auto transition-transform hover:scale-110"
                      aria-label="Swap currencies"
                    >
                      <ArrowLeftRight className="h-5 w-5" />
                    </button>
                    
                    <div className="space-y-2">
                      <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700">
                        To
                      </label>
                      <Select
                        value={toCurrency}
                        onValueChange={setToCurrency}
                      >
                        <SelectTrigger id="toCurrency" className="w-full">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {popularCurrencies.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.code} - {currency.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <CustomButton
                    onClick={handleConvert}
                    className="w-full"
                    isLoading={isLoading}
                    disabled={!amount || !fromCurrency || !toCurrency}
                  >
                    Convert
                  </CustomButton>
                  
                  {convertedAmount !== null && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500 mb-2">Result:</div>
                      <div className="text-2xl font-semibold">
                        {amount} {fromCurrency} = {convertedAmount.toLocaleString()} {toCurrency}
                      </div>
                      <div className="text-sm text-gray-500 mt-2">
                        1 {fromCurrency} = {(convertedAmount / amount).toFixed(4)} {toCurrency}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div>
                      Last updated: {lastUpdated || 'Fetching...'}
                    </div>
                    <button
                      onClick={fetchExchangeRates}
                      className="flex items-center text-nepal-red"
                      disabled={isLoading}
                    >
                      <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                      Refresh
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center text-xl">
                  <DollarSign className="h-5 w-5 mr-2 text-nepal-red" />
                  NPR Exchange Rates
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {nprExchangeRates.length > 0 ? (
                  <div className="rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Currency
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Buying (NPR)
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Selling (NPR)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {nprExchangeRates.map((rate) => (
                            <tr key={rate.currency} className="hover:bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="text-sm font-medium text-gray-900">
                                    {rate.currency}
                                  </div>
                                  <div className="ml-2 text-sm text-gray-500">
                                    {popularCurrencies.find(c => c.code === rate.currency)?.symbol}
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-gray-700">
                                {rate.buying.toFixed(2)}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-right text-sm text-gray-700">
                                {rate.selling.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="animate-spin mx-auto mb-4 h-8 w-8 text-nepal-red">
                      <RefreshCw />
                    </div>
                    <p className="text-gray-500">Loading exchange rates...</p>
                  </div>
                )}
                
                <div className="mt-4 text-xs text-gray-500">
                  <p className="mb-2">
                    <strong>Disclaimer:</strong> These rates are for reference only and may vary from actual bank rates.
                  </p>
                  <p className="flex items-center">
                    <span>Data provided by Exchange Rate API</span>
                    <a 
                      href="https://www.exchangerate-api.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-1 inline-flex items-center text-nepal-red"
                    >
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </p>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={fetchExchangeRates}
                    className="flex items-center text-nepal-red text-sm"
                    disabled={isLoading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                    {isLoading ? 'Updating...' : 'Refresh Rates'}
                  </button>
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
                  How accurate are these exchange rates?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Our exchange rates are sourced from ExchangeRate-API, which provides reliable market rates. 
                  However, banks and money exchangers may offer slightly different rates. The data is updated 
                  every minute to ensure accuracy. For the most official rates in Nepal, you can also check 
                  the Nepal Rastra Bank website.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-medium text-gray-800">
                  Why is there a difference between buying and selling rates?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Banks and exchange services typically have different rates for buying and selling currencies. 
                  The difference (spread) represents their profit margin. Our tool simulates this real-world scenario 
                  with a small spread applied to NPR exchange rates. Generally, when you're selling foreign currency, 
                  you'll get the buying rate, and when you're purchasing foreign currency, you'll pay the selling rate.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-medium text-gray-800">
                  Can I use these rates for commercial transactions?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  These rates are provided for informational purposes only. For commercial transactions, 
                  please consult with your bank or financial institution for the exact rates they offer.
                  In Nepal, the official exchange rates are set by Nepal Rastra Bank, and commercial banks
                  base their rates on those with slight variations.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left font-medium text-gray-800">
                  How to send money to Nepal with the best exchange rates?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  To get the best rates when sending money to Nepal, compare services like Western Union, 
                  MoneyGram, and online remittance platforms such as Wise (formerly TransferWise), Remitly, 
                  and WorldRemit. Look beyond the exchange rate to consider fees and transfer speed. Many 
                  Nepalis in the US, UK, Australia, and the Middle East use these services regularly for remittances.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left font-medium text-gray-800">
                  Why do exchange rates fluctuate?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Exchange rates fluctuate due to factors like inflation rates, interest rates, political stability, 
                  economic performance, and market speculation. For the Nepali Rupee specifically, factors like 
                  remittance inflows, trade balances with India (as NPR is pegged to INR), tourism trends, and 
                  central bank policies play significant roles in determining its value against other currencies.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left font-medium text-gray-800">
                  What is the best currency to bring to Nepal when traveling?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  US Dollars are widely accepted for exchange in Nepal, followed by Euros and British Pounds. 
                  Major hotels, travel agencies and some larger shops in tourist areas may accept these currencies 
                  directly. However, for the best rates, exchange at banks or official money changers in Kathmandu, 
                  Pokhara, and other major cities. ATMs are also widely available in urban areas for withdrawing NPR.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          
          <section className="mt-12 max-w-3xl mx-auto text-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Currency Conversion Made Easy for Nepalis
            </h2>
            <p className="mb-4">
              Our free currency converter tool helps Nepali users easily convert between Nepali Rupee (NPR) and other major world currencies. 
              Whether you're planning a trip abroad, sending money to family, or conducting international business, our tool provides accurate 
              and up-to-date exchange rates.
            </p>
            <p className="mb-4">
              The exchange rates are automatically updated every minute to ensure you have the most current information. 
              We also provide buy and sell rates for NPR against major currencies, helping you make informed financial decisions.
            </p>
            <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-900">
              Why Use Our Currency Converter?
            </h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Real-time exchange rates updated every minute</li>
              <li>Easy conversion between NPR and major world currencies</li>
              <li>View both buying and selling rates for NPR</li>
              <li>User-friendly interface designed for Nepali users</li>
              <li>Completely free to use with no hidden fees</li>
            </ul>
            
            <div className="mt-8 text-gray-800">
              <h3 className="text-xl font-semibold mb-3">Popular Currency Conversions in Nepal</h3>
              <p className="mb-4">
                Our tool supports all major currency pairs important for Nepalis, including NPR to USD, NPR to INR, 
                NPR to AED (for workers in UAE), NPR to QAR (Qatar), NPR to MYR (Malaysia), and many more. Track exchange 
                rate trends to find the best time to convert your currency.
              </p>
              <p className="mb-4">
                Whether you're tracking remittance rates, planning foreign education expenses, or managing import/export 
                business finances, our currency converter provides the information you need with Nepali context.
              </p>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CurrencyConverter;
