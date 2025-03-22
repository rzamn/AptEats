
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Button from '../shared/Button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-6 lg:px-8',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-subtle' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-foreground animate-fade-in">
            AptEats
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 animate-fade-in">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Features</a>
          <a href="#calculator" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Calculator</a>
          <a href="#nutrition" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Nutrition</a>
          <a href="#workouts" className="text-muted-foreground hover:text-foreground transition-colors duration-300">Workouts</a>
          <Button variant="primary" size="sm">Get Started</Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <button
            className="text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md">
          <div className="px-4 py-6 space-y-4 animate-fade-in">
            <a 
              href="#features" 
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#calculator" 
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Calculator
            </a>
            <a 
              href="#nutrition" 
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nutrition
            </a>
            <a 
              href="#workouts" 
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Workouts
            </a>
            <Button 
              variant="primary" 
              className="w-full mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
