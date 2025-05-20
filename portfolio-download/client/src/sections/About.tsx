const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-dark-lighter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center">
            <span className="text-primary">#</span> About Me
            <div className="h-px bg-light-darker dark:bg-dark flex-grow ml-4"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-10">
            <div className="order-2 md:order-1">
              <h3 className="text-xl font-semibold mb-4">My Journey from Civil to Software Engineering</h3>
              <p className="mb-4 text-dark/80 dark:text-light/80">
                With a Bachelor's degree in Civil Engineering and 5 years in the field, I discovered my passion for software development, 
                which led me to transition into the tech industry.
              </p>
              <p className="mb-4 text-dark/80 dark:text-light/80">
                Over the past 4+ years, I've specialized in backend development, creating robust APIs and cloud-based solutions 
                that drive business growth. My engineering background has given me a unique perspective on problem-solving 
                and system design.
              </p>
              <p className="mb-6 text-dark/80 dark:text-light/80">
                Currently, I work as a Software Engineer at Ardhisasa, designing and implementing scalable backend services, 
                while also sharing my knowledge as a Software Engineering Trainer at Code Yetu.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="px-4 py-2 bg-light-darker dark:bg-dark rounded text-sm font-medium">
                  <span className="text-primary font-bold">4+</span> Years Experience
                </div>
                <div className="px-4 py-2 bg-light-darker dark:bg-dark rounded text-sm font-medium">
                  <span className="text-primary font-bold">5+</span> Backend Modules
                </div>
                <div className="px-4 py-2 bg-light-darker dark:bg-dark rounded text-sm font-medium">
                  <span className="text-primary font-bold">50+</span> Students Taught
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary rounded-xl"></div>
                <img 
                  src="/images/sunset3.jpg" 
                  alt="Vincent Kioko - Software Engineer" 
                  className="rounded-xl shadow-lg w-full h-auto object-cover z-10 relative" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
