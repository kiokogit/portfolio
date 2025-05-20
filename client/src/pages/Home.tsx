import { Helmet } from "react-helmet";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Entrepreneurship from "@/sections/Entrepreneurship";
import Contact from "@/sections/Contact";

const Home = () => {
  return (
    <main>
      <Helmet>
        <title>Vincent Kioko | Software Engineer & Entrepreneur</title>
        <meta name="description" content="Vincent Kioko - Software Engineer specializing in Backend Development, API Design, and Cloud Architecture. Founder of Unatum Services construction company. Explore my portfolio showcasing my journey from Civil to Software Engineering." />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Vincent Kioko | Software Engineer & Entrepreneur" />
        <meta property="og:description" content="Backend Developer with 4+ years of experience designing and optimizing scalable, secure, and high-performance server-side systems. Founder of Unatum Services construction company." />
        <meta property="og:url" content="https://vincentkioko.com" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vincent Kioko | Software Engineer & Entrepreneur" />
        <meta name="twitter:description" content="Backend Developer with 4+ years of experience designing and optimizing scalable, secure, and high-performance server-side systems. Founder of Unatum Services." />
      </Helmet>
      
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Entrepreneurship />
      <Contact />
    </main>
  );
};

export default Home;
