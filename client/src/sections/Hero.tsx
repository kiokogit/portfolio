import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";
import resumePdf from "@assets/Vincent Kioko Software Resume 2025.pdf";

const Hero = () => {
  return (
    <section id="hero" className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-light to-light-darker dark:from-dark dark:to-dark-lighter">
      <div className="absolute inset-0">
        <div className="code-overlay">
          <div className="code-line" data-line="01">import SoftwareEngineer from &quot;career&quot;;</div>
          <div className="code-line" data-line="02">import BackendSkills from &quot;skills&quot;;</div>
          <div className="code-line" data-line="03"></div>
          <div className="code-line" data-line="04">class VincentKioko &#123;</div>
          <div className="code-line" data-line="05">  constructor() &#123;</div>
          <div className="code-line" data-line="06">    this.role = &quot;Software Engineer&quot;;</div>
          <div className="code-line" data-line="07">    this.name = &quot;Vincent Kioko&quot;;</div>
          <div className="code-line" data-line="08">    this.skills = BackendSkills;</div>
          <div className="code-line" data-line="09">    this.experience = 4;</div>
          <div className="code-line" data-line="10">    this.background = &quot;Civil&quot;;</div>
          <div className="code-line" data-line="11">  &#125;</div>
          <div className="code-line" data-line="12"></div>
          <div className="code-line" data-line="13">  build(project) &#123;</div>
          <div className="code-line" data-line="14">    return this.skills</div>
          <div className="code-line" data-line="15">      .map(skill =&gt; skill.apply(project));</div>
          <div className="code-line" data-line="16">  &#125;</div>
          <div className="code-line" data-line="17">&#125;</div>
          <div className="code-line" data-line="18"></div>
          <div className="code-line" data-line="19">export default VincentKioko;</div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl fade-in">
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
              className="px-6 py-3 bg-dark dark:bg-light text-light dark:text-dark rounded-lg hover:bg-dark/90 dark:hover:bg-light/90 transition-colors flex items-center gap-2"
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
              className="text-dark/70 dark:text-light/70 hover:text-dark dark:hover:text-light transition-colors"
            >
              <FaGithub className="text-2xl" />
            </a>
            <a 
              href="https://linkedin.com/in/kiokogit" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-dark/70 dark:text-light/70 hover:text-dark dark:hover:text-light transition-colors"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a 
              href="mailto:kiokovincent12@gmail.com"
              aria-label="Email"
              className="text-dark/70 dark:text-light/70 hover:text-dark dark:hover:text-light transition-colors"
            >
              <FaEnvelope className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
