import { Card, CardContent } from "@/components/ui/card";
interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  logoSrc?: string; // New prop for logo image
  isLast?: boolean;
  children: React.ReactNode;
}

const TimelineItem: React.FC<TimelineItemProps> = (
    {
  title, 
  company, 
  period,
      logoSrc,
  isLast = false,
  children 
}) => {
  return (
      <div className={`timeline-item relative ${isLast ? '' : 'pb-12'}`}>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                {logoSrc && (
                    <img
                        src={logoSrc}
                        alt={`${company} logo`}
                        className="w-10 h-10 object-contain"
                    />
                )}
                <div>
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="text-primary">{company}</p>
                </div>
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
    <section id="experience" className="py-20 bg-light dark:bg-dark relative overflow-hidden">
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 dark:opacity-20" style={{ backgroundImage: "url('/images/sunset1.jpg')", backgroundSize: "cover", backgroundPosition: "center right" }}></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              logoSrc={'/images/ardhisasa.jpg'}
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
              logoSrc={'/images/codeyetu.png'}
            >
              <ul className="list-disc list-inside space-y-2 text-dark/80 dark:text-light/80">
                <li>Designed and delivered structured curricula for 3 web development and programming courses tailored to students under the age of 17.</li>
                <li>Taught 50+ young learners foundational programming concepts, including HTML, CSS, JavaScript, and Python, using hands-on project-based methods.</li>
                <li>Spearheaded the migration to a virtual learning model using online IDEs and automated testing platforms, increasing engagement and accessibility for remote students.</li>
                <li>Promoted STEM and coding awareness through mentorship and interactive workshops, contributing to the organization's mission of early tech education.</li>
              </ul>
            </TimelineItem>
            
            <TimelineItem
              title="Civil/Structural Resident Engineer"
              company="Heritage Solutions - Tana River, Kenya"
              period="Mar 2022 – Aug 2022"
              logoSrc={'/images/heritage_logo.jpg'}
            >
              <ul className="list-disc list-inside space-y-2 text-dark/80 dark:text-light/80">
                <li>Designed and inspected structural engineering projects in Tana River county under the Secondary Education Quality Improvement Project
                for the marginalized ASAL area.</li>
                <li>Supervised 20+ concurrent projects in 11 schools across Tana River county for a period of 4 months.</li>
                <li>Provided daily reporting of the progress of construciton projects for effective management and coordination.</li>
              </ul>
            </TimelineItem>

            <TimelineItem
                title="Civil Engineer"
                company="Gearbox Ltd, Naivasha - Kenya"
                period="Jan 2021 - Oct 2021"
                logoSrc={'/images/gearbox.jpeg'}
            >
              <ul className="list-disc list-inside space-y-2 text-dark/80 dark:text-light/80">
                <li>Supervised and coordinated construction works for development of Young African Works project in Ruiru, Limuru and Ngong areas, Kenya</li>
                <li>Certified Civil and Surveying works for site setting outs for the projects.</li>
                <li>Optimized labor and materials usage in projects works cutting the budget by 20% during the project period.</li>
                <li>Accelerated construction time by 1.5 months beating deadline for the works and delivering high quality works as per expectations.</li>
              </ul>
            </TimelineItem>
            
            <TimelineItem
              title="Education"
              company="Jomo Kenyatta University of Agriculture and Technology"
              period="2013 – 2018"
              logoSrc={'/images/jkuatlogo1.jpg'}
              isLast={true}
            >
              <p className="text-dark/80 dark:text-light/80">
                Bachelor of Science in Civil Engineering (Second class honors, Upper Division)

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
