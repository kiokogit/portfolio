import { FaGithub } from "react-icons/fa";
import { Card } from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  technologies: string[];
  githubUrl: string;
  detailsUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageSrc,
  technologies,
  githubUrl,
  detailsUrl,
}) => {
  return (
    <div className="bg-white dark:bg-dark-lighter rounded-lg overflow-hidden shadow-md transition-transform hover:-translate-y-2">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        
        <p className="text-dark/70 dark:text-light/70 mb-4">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <a href={detailsUrl} className="text-primary hover:underline">
            View Details
          </a>
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`Github repository for ${title}`}
            className="text-dark/70 dark:text-light/70 hover:text-dark dark:hover:text-light"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Code Yetu E-Learning Platform",
      description: "Built the backend and DevOps infrastructure for a Django-based e-learning system with role-based dashboards for administrators, tutors, and students.",
      imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      technologies: ["Django", "PostgreSQL", "Docker"],
      githubUrl: "https://github.com/kiokogit",
      detailsUrl: "#"
    },
    {
      title: "Land Management API System",
      description: "Designed and built a comprehensive API for land valuation, transfer processing, and automated stamp duty assessment, improving transaction processing time by 40%.",
      imageSrc: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      technologies: ["Django REST", "Kubernetes", "PostgreSQL"],
      githubUrl: "https://github.com/kiokogit",
      detailsUrl: "#"
    },
    {
      title: "Custom Workflow Engine",
      description: "Developed a distributed transaction workflow engine to manage complex business processes with enhanced reliability, modularity, and audit traceability.",
      imageSrc: "https://images.unsplash.com/photo-1564865878688-9a244444042a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      technologies: ["Python", "Celery", "Redis"],
      githubUrl: "https://github.com/kiokogit",
      detailsUrl: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-light dark:bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center">
            <span className="text-primary">#</span> Projects
            <div className="h-px bg-light-darker dark:bg-dark-lighter flex-grow ml-4"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                imageSrc={project.imageSrc}
                technologies={project.technologies}
                githubUrl={project.githubUrl}
                detailsUrl={project.detailsUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
