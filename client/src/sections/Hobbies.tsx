import { FaChess, FaBook, FaRobot, FaLightbulb } from "react-icons/fa";

const HobbyCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: JSX.Element; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="bg-white dark:bg-dark-lighter p-6 rounded-lg shadow-md border border-light-darker dark:border-dark hover:border-primary/30 dark:hover:border-primary/30 transition-colors">
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-full bg-primary/10 mr-4 text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <p className="text-dark/80 dark:text-light/80">
        {description}
      </p>
    </div>
  );
};

const Hobbies = () => {
  const hobbies = [
    {
      icon: <FaChess className="h-5 w-5" />,
      title: "Chess",
      description: "Passionate chess player, constantly improving my strategic thinking and enjoying games against both human opponents and AI."
    },
    {
      icon: <FaRobot className="h-5 w-5" />,
      title: "AI & Data",
      description: "Exploring the frontiers of artificial intelligence and data science, experimenting with machine learning models and data analysis techniques."
    },
    {
      icon: <FaBook className="h-5 w-5" />,
      title: "History Reading",
      description: "Avid reader with a particular interest in World War II history, understanding the strategic decisions, technological advancements, and human stories."
    },
    {
      icon: <FaLightbulb className="h-5 w-5" />,
      title: "Tech Innovation",
      description: "Passionate about technological innovations and finding creative ways to bridge civil engineering knowledge with modern software solutions."
    }
  ];

  return (
    <section id="hobbies" className="py-20 bg-light dark:bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center">
            <span className="text-primary">#</span> Hobbies & Interests
            <div className="h-px bg-light-darker dark:bg-dark-lighter flex-grow ml-4"></div>
          </h2>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {hobbies.map((hobby, index) => (
              <HobbyCard
                key={index}
                icon={hobby.icon}
                title={hobby.title}
                description={hobby.description}
              />
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-white dark:bg-dark-lighter rounded-lg shadow border border-light-darker dark:border-dark">
            <h3 className="text-xl font-bold mb-4">Bridging Civil Engineering & Technology</h3>
            <p className="text-dark/80 dark:text-light/80 mb-4">
              My unique background in civil engineering combined with my passion for software development 
              gives me a distinctive perspective on technological solutions. I'm particularly interested in:
            </p>
            <ul className="space-y-2 text-dark/80 dark:text-light/80">
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                Applying software solutions to structural engineering and construction challenges
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                Developing innovative project management tools that bridge the gap between technical and managerial aspects
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                Exploring how AI and machine learning can optimize construction processes and improve efficiency
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                Creating sustainable and smart infrastructure solutions through technology integration
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hobbies;