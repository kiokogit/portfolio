import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";
import resumePdf from "@assets/Vincent Kioko Software Resume 2025.pdf";

const Hero = () => {
  return (
    <section id="hero" className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-light to-light-darker dark:from-dark dark:to-dark-lighter">
      <div className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-30" style={{ backgroundImage: "url('/images/sunset2.jpg')" }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="max-w-3xl fade-in order-2 md:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-primary">Vincent Kioko</span>
            </h1>
            
            <h2 className="text-xl sm:text-2xl font-medium text-dark/80 dark:text-light/80 mb-6">
              Software Engineer | Backend Development | API Design | Cloud Architect
            </h2>
            
            <p className="text-lg mb-8 max-w-2xl text-dark/70 dark:text-light/70">
              Results-driven Backend Developer with 4+ years of experience building scalable, secure, and high-performance server-side systems. 
              Journey started in Civil Engineering, evolved into Software Engineering.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Get In Touch
              </a>
              <a 
                href="#projects" 
                className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
              >
                View Projects
              </a>
              <a 
                href={resumePdf} 
                download 
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2"
              >
                <FaDownload /> Download Resume
              </a>
            </div>
            
            <div className="flex mt-10 gap-4">
              <a 
                href="https://github.com/kiokogit" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a 
                href="https://linkedin.com/in/kiokogit" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <FaLinkedin className="text-2xl" />
              </a>
              <a 
                href="mailto:kiokovincent12@gmail.com"
                aria-label="Email"
                className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <FaEnvelope className="text-2xl" />
              </a>
            </div>
          </div>
          
          <div className="flex justify-center order-1 md:order-2">
            <img 
              src="/images/portrait.jpg"
              alt="Vincent Kioko - Software Engineer" 
              className="rounded-xl shadow-lg max-w-xs lg:max-w-sm xl:max-w-md z-10 border-4 border-white dark:border-dark"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
