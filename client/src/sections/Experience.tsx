import { Card, CardContent } from "@/components/ui/card";

interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  isLast?: boolean;
  children: React.ReactNode;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  title, 
  company, 
  period, 
  isLast = false,
  children 
}) => {
  return (
    <div className={`timeline-item relative ${isLast ? '' : 'pb-12'}`}>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-primary">{company}</p>
            </div>
            <span className="bg-light-darker dark:bg-dark text-dark/70 dark:text-light/70 px-3 py-1 rounded text-sm">
              {period}
            </span>
          </div>
          
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-light dark:bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center">
            <span className="text-primary">#</span> Work Experience
            <div className="h-px bg-light-darker dark:bg-dark-lighter flex-grow ml-4"></div>
          </h2>
          
          <div className="mt-10 relative pl-10">
            <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-light-darker dark:bg-dark-lighter"></div>
            
            <TimelineItem
              title="Software Engineer"
              company="Ardhisasa – Nairobi, Kenya"
              period="Sept 2022 – Present"
            >
              <ul className="list-disc list-inside space-y-2 text-dark/80 dark:text-light/80">
                <li>Designed and implemented scalable, secure RESTful APIs and backend services using Python, Django, and PostgreSQL.</li>
                <li>Delivered 5+ production-ready backend modules, including land transfer, property valuation, and automated stamp duty assessment systems.</li>
                <li>Spearheaded modularization of backend architecture, improving maintainability and reducing feature onboarding time by 30%.</li>
                <li>Developed and deployed a custom workflow engine to manage distributed transactions, improving system reliability, modularity, and audit traceability.</li>
                <li>Collaborated with DevOps to containerize services using Docker and manage deployments with Kubernetes in cloud environments.</li>
              </ul>
            </TimelineItem>
            
            <TimelineItem
              title="Software Engineering Trainer"
              company="Code Yetu – Nairobi, Kenya"
              period="Nov 2023 – Present"
            >
              <ul className="list-disc list-inside space-y-2 text-dark/80 dark:text-light/80">
                <li>Designed and delivered structured curricula for 3 web development and programming courses tailored to students under the age of 17.</li>
                <li>Taught 50+ young learners foundational programming concepts, including HTML, CSS, JavaScript, and Python, using hands-on project-based methods.</li>
                <li>Spearheaded the migration to a virtual learning model using online IDEs and automated testing platforms, increasing engagement and accessibility for remote students.</li>
                <li>Promoted STEM and coding awareness through mentorship and interactive workshops, contributing to the organization's mission of early tech education.</li>
              </ul>
            </TimelineItem>
            
            <TimelineItem
              title="Civil Engineer"
              company="Previous Career"
              period="2018 – 2022"
            >
              <p className="text-dark/80 dark:text-light/80">
                With a BSc in Civil Engineering from Jomo Kenyatta University of Agriculture and Technology, 
                I spent 5 years applying engineering principles to infrastructure projects before transitioning to software development.
              </p>
            </TimelineItem>
            
            <TimelineItem
              title="Education"
              company="Jomo Kenyatta University of Agriculture and Technology"
              period="2013 – 2018"
              isLast={true}
            >
              <p className="text-dark/80 dark:text-light/80">
                Bachelor of Science in Civil Engineering
              </p>
              
              <div className="mt-4">
                <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                  Google Certified Professional Cloud Architect
                </span>
              </div>
            </TimelineItem>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
