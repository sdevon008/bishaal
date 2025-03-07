
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DateConverter from "./pages/DateConverter";
import NepaliCalendar from "./pages/NepaliCalendar";
import UnicodeConverter from "./pages/UnicodeConverter";
import LoadShedding from "./pages/LoadShedding";
import Rashifal from "./pages/Rashifal";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CurrencyConverter from "./pages/CurrencyConverter";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/shared/ScrollToTop";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/date-converter" element={<DateConverter />} />
          <Route path="/nepali-calendar" element={<NepaliCalendar />} />
          <Route path="/unicode-converter" element={<UnicodeConverter />} />
          <Route path="/load-shedding" element={<LoadShedding />} />
          <Route path="/rashifal" element={<Rashifal />} />
          <Route path="/currency-converter" element={<CurrencyConverter />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
