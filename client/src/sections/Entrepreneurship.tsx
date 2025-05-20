import { FaExternalLinkAlt, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

const Entrepreneurship = () => {
  return (
    <section id="entrepreneurship" className="py-20 bg-white dark:bg-dark-lighter relative overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-sunset-orange/10 to-transparent"></div>
      <div className="absolute right-0 bottom-0 h-full w-1/4 bg-gradient-to-l from-sunset-gold/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center">
            <span className="text-primary">#</span> Entrepreneurship
            <div className="h-px bg-light-darker dark:bg-dark flex-grow ml-4"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 items-center">
            <div>
              <div className="flex items-center mb-6">
                <img 
                  src="/images/unatum-logo.png" 
                  alt="Unatum Services Logo" 
                  className="h-16 md:h-20 mr-4" 
                />
                <h3 className="text-2xl font-bold">Unatum Services</h3>
              </div>
              
              <p className="mb-4 text-dark/80 dark:text-light/80">
                As founder and owner of Unatum Services (a scrambled name for Autumn), I lead a construction 
                contracting company that specializes in high-quality construction projects throughout Kenya.
              </p>
              
              <p className="mb-6 text-dark/80 dark:text-light/80">
                Founded in February 2023, Unatum has quickly established itself in the construction sector, with our 
                most recent project being pavement and cabro installation at Yaya Center, Kenya. We're now ready 
                to take on contracts from any client.
              </p>
              
              <div className="flex flex-col space-y-3 mb-6">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <FaMapMarkerAlt className="text-primary" />
                  </div>
                  <span>Nairobi, Kenya</span>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <FaBuilding className="text-primary" />
                  </div>
                  <span>Construction & Contracting Services</span>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <FaExternalLinkAlt className="text-primary" />
                  </div>
                  <a 
                    href="https://www.unatum.online" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline"
                  >
                    www.unatum.online
                  </a>
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href="https://www.unatum.online" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center"
                >
                  Visit Company Website <FaExternalLinkAlt className="ml-2" />
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-sunset-gold rounded-xl"></div>
              <div className="bg-gradient-to-br from-sunset-orange/20 to-sunset-gold/20 p-6 rounded-xl relative z-10">
                <h4 className="text-xl font-bold mb-4 border-b border-sunset-gold/30 pb-2">Services Offered</h4>
                <ul className="space-y-2 text-dark/80 dark:text-light/80">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Pavement and cabro installation
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Commercial construction projects
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Renovation and remodeling
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Infrastructure development
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Civil engineering consultancy
                  </li>
                </ul>
                
                <div className="mt-6 pt-4 border-t border-sunset-gold/30">
                  <h4 className="text-lg font-medium mb-2">Connecting Two Worlds</h4>
                  <p className="text-dark/80 dark:text-light/80">
                    Unatum represents the perfect bridge between my civil engineering background and 
                    entrepreneurial spirit, while my software expertise allows for innovative 
                    project management and technological integration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Entrepreneurship;