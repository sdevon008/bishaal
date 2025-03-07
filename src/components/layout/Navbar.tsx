
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Book, DollarSign, Briefcase } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Date Converter', path: '/date-converter' },
    { name: 'Nepali Calendar', path: '/nepali-calendar' },
    { name: 'Unicode Converter', path: '/unicode-converter' },
    { name: 'Load Shedding', path: '/load-shedding' },
    { name: 'Currency Converter', path: '/currency-converter', icon: <DollarSign className="h-4 w-4 mr-1" /> },
    { name: 'Services', path: '/services', icon: <Briefcase className="h-4 w-4 mr-1" /> },
    { name: 'Rashifal', path: '/rashifal' },
    { name: 'Blog', path: '/blog', icon: <Book className="h-4 w-4 mr-1" /> },
  ];
  
  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass-morphism py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 overflow-hidden">
              <div className="absolute inset-0 bg-nepal-red rounded-sm transform rotate-45 translate-y-1/4"></div>
              <div className="absolute inset-0 bg-nepal-blue rounded-sm transform -rotate-45 -translate-y-1/4 translate-x-1/4"></div>
            </div>
            <span className={cn(
              "font-bold text-2xl transition-colors duration-300",
              isScrolled ? "text-nepal-red" : "text-nepal-red"
            )}>
              Bishaal Tools
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-300",
                  location.pathname === link.path
                    ? "text-white bg-nepal-red"
                    : "text-gray-700 hover:text-nepal-red"
                )}
              >
                {link.icon && <span className="inline-flex items-center">{link.icon}</span>}
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-nepal-red" />
            ) : (
              <Menu className="h-6 w-6 text-nepal-red" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-morphism mt-4 rounded-lg animate-fade-in overflow-hidden">
            <div className="py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-all duration-300",
                    location.pathname === link.path
                      ? "bg-nepal-red text-white"
                      : "text-gray-700 hover:bg-gray-50 hover:text-nepal-red"
                  )}
                >
                  {link.icon && <span className="inline-flex items-center">{link.icon}</span>}
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
