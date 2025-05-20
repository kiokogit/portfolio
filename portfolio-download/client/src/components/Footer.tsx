import { Link } from "wouter";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-dark dark:bg-black text-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-bold text-primary">
                <span className="font-mono">&lt;</span>Vincent<span className="font-mono">/&gt;</span>
              </Link>
            </div>
            
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-light/70">Software Engineer | Backend Development | API Design | Cloud Architect</p>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="https://github.com/kiokogit" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-light/70 hover:text-light transition-colors"
              >
                <FaGithub className="text-xl" />
              </a>
              <a 
                href="https://linkedin.com/in/kiokogit" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-light/70 hover:text-light transition-colors"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a 
                href="mailto:kiokovincent12@gmail.com"
                aria-label="Email"
                className="text-light/70 hover:text-light transition-colors"
              >
                <FaEnvelope className="text-xl" />
              </a>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-light/10 text-center text-light/50 text-sm">
            <p>&copy; {currentYear} Vincent Kioko. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
