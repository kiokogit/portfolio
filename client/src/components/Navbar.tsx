import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Unatum", href: "#entrepreneurship" },
    { name: "Hobbies", href: "#hobbies" },
    { name: "Contact", href: "#contact" },
  ];
  
  // Additional link for the private section
  const additionalLinks = [
    { name: "Private", href: "/auth", external: true },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white/90 dark:bg-dark/95 backdrop-blur-sm shadow-sm transition-all ${isScrolled ? 'shadow-md' : ''}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary flex items-center">
          <img 
            src="/images/watch.jpg" 
            alt="Vincent's Watch" 
            className="h-10 w-10 rounded-full object-cover mr-2 hidden sm:block border border-primary/30"
          />
          <span className="font-mono">&lt;</span>Vincent<span className="font-mono">/&gt;</span>
        </Link>
        
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded-full hover:bg-light-darker dark:hover:bg-dark-lighter"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            onClick={toggleMenu}
            className="md:hidden rounded hover:bg-light-darker dark:hover:bg-dark-lighter"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <a 
            href="#contact" 
            className="hidden md:block px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          >
            Hire Me
          </a>
        </div>
      </nav>
      
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={`py-2 ${
                  index < navLinks.length - 1 ? "border-b border-light-darker dark:border-dark-lighter" : ""
                } hover:text-primary transition-colors`}
                onClick={closeMenu}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 text-center py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              onClick={closeMenu}
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
