// Stock photos for the portfolio
export const STOCK_PHOTOS = {
  DEVELOPER_WORKSPACE: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=500",
  CODING_ENVIRONMENT: "https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
  HEADSHOT_PLACEHOLDER: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=500",
  PROJECT_ELEARNING: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
  PROJECT_API: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
  PROJECT_WORKFLOW: "https://images.unsplash.com/photo-1564865878688-9a244444042a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
};

// Resume information
export const RESUME_INFO = {
  name: "Vincent Kioko",
  title: "Software Engineer",
  tagline: "Backend Development | API Design | Cloud Architect | Python Expert",
  summary: "Results-driven Back-End Developer with 4+ years of experience designing and optimizing scalable, secure, and high-performance server-side systems. Proficient in Python, Node.js, and SQL/NoSQL databases, with proven experience in RESTful API design, workflow engines, and cloud infrastructure (AWS, GCP). Passionate about building resilient back-end services aligned with business goals.",
  email: "kiokovincent12@gmail.com",
  phone: "+25470318918",
  location: "Nairobi, Kenya",
  linkedin: "https://linkedin.com/in/kiokogit",
  github: "https://github.com/kiokogit"
};

// Work experience
export const WORK_EXPERIENCE = [
  {
    title: "Software Engineer",
    company: "Ardhisasa – Nairobi, Kenya",
    period: "Sept 2022 – Present",
    responsibilities: [
      "Designed and implemented scalable, secure RESTful APIs and backend services using Python, Django, and PostgreSQL.",
      "Delivered 5+ production-ready backend modules, including land transfer, property valuation, and automated stamp duty assessment systems.",
      "Spearheaded modularization of backend architecture, improving maintainability and reducing feature onboarding time by 30%.",
      "Developed and deployed a custom workflow engine to manage distributed transactions, improving system reliability, modularity, and audit traceability.",
      "Collaborated with DevOps to containerize services using Docker and manage deployments with Kubernetes in cloud environments."
    ]
  },
  {
    title: "Software Engineering Trainer",
    company: "Code Yetu – Nairobi, Kenya",
    period: "Nov 2023 – Present",
    responsibilities: [
      "Designed and delivered structured curricula for 3 web development and programming courses tailored to students under the age of 17.",
      "Taught 50+ young learners foundational programming concepts, including HTML, CSS, JavaScript, and Python, using hands-on project-based methods.",
      "Spearheaded the migration to a virtual learning model using online IDEs and automated testing platforms, increasing engagement and accessibility for remote students.",
      "Promoted STEM and coding awareness through mentorship and interactive workshops, contributing to the organization's mission of early tech education."
    ]
  }
];

// Skills data
export const SKILLS = {
  backend: [
    { name: "Python", percentage: 95 },
    { name: "Django / Django REST Framework", percentage: 90 },
    { name: "PostgreSQL", percentage: 85 },
    { name: "Node.js", percentage: 80 },
    { name: "Go", percentage: 70 },
  ],
  frontend: [
    { name: "JavaScript", percentage: 85 },
    { name: "React", percentage: 75 },
  ],
  devops: [
    { name: "Docker", percentage: 90 },
    { name: "Kubernetes", percentage: 80 },
    { name: "Google Cloud Platform (GCP)", percentage: 85 },
    { name: "CI/CD (Github/Gitlab)", percentage: 85 },
    { name: "Prometheus", percentage: 75 },
  ],
  soft: [
    "Product Management",
    "Conflict Resolution",
    "Teamwork",
    "Collaboration",
    "Adaptability",
    "Problem-solving",
    "Leadership",
    "Resilience",
  ]
};

// Projects data
export const PROJECTS = [
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
