import { useEffect, useRef } from "react";

interface SkillBarProps {
  name: string;
  percentage: number;
  color: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage, color }) => {
  const skillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (skillRef.current) {
              skillRef.current.style.width = `${percentage}%`;
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current.parentElement as Element);
    }

    return () => {
      if (skillRef.current?.parentElement) {
        observer.unobserve(skillRef.current.parentElement as Element);
      }
    };
  }, [percentage]);

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span>{percentage}%</span>
      </div>
      <div className="skill-bar bg-light-darker dark:bg-dark">
        <div
          ref={skillRef}
          className={`skill-level ${color}`}
          style={{ width: "0%" }}
        ></div>
      </div>
    </div>
  );
};

const Skills = () => {
  const backendSkills = [
    { name: "Python", percentage: 95 },
    { name: "Django / Django REST Framework", percentage: 90 },
    { name: "PostgreSQL", percentage: 85 },
    { name: "Node.js", percentage: 70 },
    { name: "Go", percentage: 60 },
  ];

  const frontendSkills = [
    { name: "JavaScript", percentage: 85 },
    { name: "React", percentage: 85 },
  ];

  const devopsSkills = [
    { name: "Docker", percentage: 90 },
    { name: "Kubernetes", percentage: 60 },
    { name: "Google Cloud Platform (GCP)", percentage: 85 },
    { name: "CI/CD (Github/Gitlab)", percentage: 95 },
    { name: "Prometheus", percentage: 75 },
  ];

  const softSkills = [
    "Product Management",
    "Conflict Resolution",
    "Teamwork",
    "Collaboration",
    "Adaptability",
    "Problem-solving",
    "Leadership",
    "Resilience",
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-dark-lighter relative">
      <div className="absolute left-0 bottom-0 h-full w-1/4 opacity-10 dark:opacity-20" style={{ backgroundImage: "url('/images/silhouette.jpg')", backgroundSize: "cover", backgroundPosition: "left center" }}></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center">
            <span className="text-primary">#</span> Technical Skills
            <div className="h-px bg-light-darker dark:bg-dark flex-grow ml-4"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
            <div>
              <h3 className="text-xl font-bold mb-6">Backend Development</h3>
              
              <div className="space-y-5">
                {backendSkills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    percentage={skill.percentage}
                    color="bg-primary"
                  />
                ))}
              </div>
              
              <h3 className="text-xl font-bold mt-10 mb-6">Frontend Development</h3>
              
              <div className="space-y-5">
                {frontendSkills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    percentage={skill.percentage}
                    color="bg-secondary"
                  />
                ))}
              </div>
              
              <div className="mt-10 p-4 border border-primary/20 rounded-lg bg-white/50 dark:bg-dark/50">
                <div className="flex items-center mb-4">
                  <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                  <h4 className="text-lg font-medium">Career Transition Highlight</h4>
                </div>
                <p className="text-dark/80 dark:text-light/80">
                  Leveraging 5 years of civil engineering experience, I bring a unique perspective 
                  to software design, applying structural principles to create robust and maintainable systems.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">DevOps & Cloud</h3>
              
              <div className="space-y-5">
                {devopsSkills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    percentage={skill.percentage}
                    color="bg-accent"
                  />
                ))}
              </div>
              
              <h3 className="text-xl font-bold mt-10 mb-4">Soft Skills</h3>
              
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground rounded-full text-sm hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
