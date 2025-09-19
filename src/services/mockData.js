// Mock data for the resume website
export const personalInfo = {
  name: 'Bo Wangle',
  title: 'Full Stack Developer',
  subtitle: 'I craft digital experiences that inspire.',
  description: "I'm a passionate software engineer specializing in building exceptional digital experiences. With a keen eye for design and a love for clean code, I create solutions that are both beautiful and functional.",
  email: 'bo.wangle@example.com',
  location: 'San Francisco, CA',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  resume: '/resume.pdf',
}

export const aboutInfo = {
  introduction: [
    "Hello! My name is Bo and I enjoy creating things that live on the internet. My journey into web development started back in 2018 when I discovered the magic of turning ideas into interactive digital experiences. What began as curiosity quickly evolved into a passion for crafting elegant solutions.",
    "Fast-forward to today, and I've had the privilege of working with innovative startups, established corporations, and creative agencies. My main focus is building accessible, performant, and visually stunning applications that users love to interact with.",
    "Here are the technologies I'm currently passionate about:"
  ],
  skills: [
    'JavaScript (ES6+)',
    'TypeScript',
    'React & Next.js',
    'Node.js & Express',
    'Python & Django',
    'Docker & Kubernetes',
    'AWS & Vercel',
    'MongoDB & PostgreSQL',
    'GraphQL & REST APIs',
    'Tailwind CSS',
    'Three.js',
    'Framer Motion'
  ],
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face'
}

export const experiences = [
  {
    id: 1,
    company: 'TechCorp',
    position: 'Senior Full Stack Developer',
    duration: 'January 2022 - Present',
    location: 'San Francisco, CA',
    website: 'https://techcorp.com',
    responsibilities: [
      'Lead development of scalable web applications serving 100K+ daily active users using React, Node.js, and AWS',
      'Architect and implement microservices infrastructure reducing system latency by 40% and improving reliability',
      'Mentor junior developers and conduct code reviews, establishing best practices for clean, maintainable code',
      'Collaborate with product managers and designers to translate business requirements into technical solutions',
      'Optimize database queries and implement caching strategies, improving application performance by 60%'
    ]
  },
  {
    id: 2,
    company: 'InnovateLab',
    position: 'Frontend Developer',
    duration: 'March 2020 - December 2021',
    location: 'Seattle, WA',
    website: 'https://innovatelab.io',
    responsibilities: [
      'Developed responsive web applications using React, TypeScript, and modern CSS frameworks',
      'Implemented complex UI components with smooth animations using Framer Motion and CSS transitions',
      'Integrated RESTful APIs and GraphQL endpoints to create seamless user experiences',
      'Collaborated with UX/UI designers to ensure pixel-perfect implementation of design mockups',
      'Maintained 95%+ test coverage using Jest, React Testing Library, and Cypress for E2E testing'
    ]
  },
  {
    id: 3,
    company: 'StartupXYZ',
    position: 'Full Stack Developer',
    duration: 'June 2018 - February 2020',
    location: 'Austin, TX',
    website: 'https://startupxyz.com',
    responsibilities: [
      'Built and maintained full-stack applications using MERN stack (MongoDB, Express, React, Node.js)',
      'Designed and implemented RESTful APIs with comprehensive documentation and error handling',
      'Deployed applications on AWS using Docker containers and implemented CI/CD pipelines',
      'Worked in an agile environment with daily standups, sprint planning, and retrospectives',
      'Contributed to product strategy discussions and technical decision-making processes'
    ]
  },
  {
    id: 4,
    company: 'DigitalSolutions',
    position: 'Junior Web Developer',
    duration: 'August 2017 - May 2018',
    location: 'Denver, CO',
    website: 'https://digitalsolutions.com',
    responsibilities: [
      'Developed responsive websites and web applications using HTML5, CSS3, JavaScript, and jQuery',
      'Collaborated with senior developers to implement complex features and debug existing code',
      'Participated in client meetings to gather requirements and provide technical insights',
      'Maintained and updated legacy codebases while learning modern development practices',
      'Created technical documentation and user guides for internal and client use'
    ]
  },
  {
    id: 5,
    company: 'FreelanceWork',
    position: 'Freelance Web Developer',
    duration: 'January 2016 - July 2017',
    location: 'Remote',
    website: 'https://portfolio.com',
    responsibilities: [
      'Delivered custom websites and web applications for small to medium-sized businesses',
      'Managed complete project lifecycle from initial consultation to deployment and maintenance',
      'Specialized in WordPress development, custom themes, and e-commerce solutions',
      'Provided ongoing technical support and website maintenance services',
      'Built strong client relationships resulting in 90% repeat business and referrals'
    ]
  },
  {
    id: 6,
    company: 'University Research Lab',
    position: 'Student Developer',
    duration: 'September 2015 - December 2015',
    location: 'Boulder, CO',
    website: 'https://university.edu',
    responsibilities: [
      'Developed data visualization tools for research projects using D3.js and Python',
      'Created automated scripts for data processing and analysis using Python and R',
      'Collaborated with researchers to understand requirements and deliver technical solutions',
      'Presented findings and technical demos to faculty and graduate students',
      'Gained experience with version control, documentation, and collaborative development'
    ]
  }
]

export const projects = [
  {
    id: 1,
    title: 'AI-Powered Analytics Dashboard',
    description: 'A comprehensive analytics platform that leverages machine learning to provide real-time insights and predictive analytics. Features interactive charts, customizable dashboards, and intelligent data visualization.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    technologies: ['React', 'TypeScript', 'Python', 'TensorFlow', 'D3.js', 'PostgreSQL'],
    github: 'https://github.com/bwangle/ai-analytics',
    external: 'https://analytics-demo.vercel.app',
    featured: true
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'A modern, scalable e-commerce solution built with microservices architecture. Includes payment processing, inventory management, and real-time order tracking with a beautiful, responsive design.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe API', 'Redis', 'Docker'],
    github: 'https://github.com/bwangle/ecommerce-platform',
    external: 'https://shop-demo.vercel.app',
    featured: true
  },
  {
    id: 3,
    title: 'Social Media Scheduler',
    description: 'An intelligent social media management tool that helps businesses schedule, analyze, and optimize their social media presence across multiple platforms with AI-powered content suggestions.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    technologies: ['Vue.js', 'Express', 'GraphQL', 'AWS Lambda', 'OpenAI API'],
    github: 'https://github.com/bwangle/social-scheduler',
    external: 'https://social-scheduler-demo.com',
    featured: false
  },
  {
    id: 4,
    title: 'Real-time Collaboration Tool',
    description: 'A Slack-inspired collaboration platform with real-time messaging, file sharing, video calls, and project management features. Built for remote teams to stay connected and productive.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
    technologies: ['React', 'Socket.io', 'Node.js', 'WebRTC', 'MongoDB', 'AWS S3'],
    github: 'https://github.com/bwangle/collab-tool',
    external: 'https://collab-demo.herokuapp.com',
    featured: false
  },
  {
    id: 5,
    title: 'Cryptocurrency Tracker',
    description: 'A comprehensive crypto portfolio tracker with real-time price updates, advanced charting, portfolio analytics, and price alerts. Features a clean, intuitive interface for both beginners and experts.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    technologies: ['React Native', 'Redux', 'CoinGecko API', 'Chart.js', 'Firebase'],
    github: 'https://github.com/bwangle/crypto-tracker',
    external: 'https://crypto-tracker-app.com',
    featured: false
  },
  {
    id: 6,
    title: 'Smart Home Dashboard',
    description: 'An IoT dashboard for controlling and monitoring smart home devices. Features energy usage tracking, automated routines, security monitoring, and a beautiful, responsive interface.',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop',
    technologies: ['React', 'IoT Core', 'MQTT', 'InfluxDB', 'Grafana', 'Raspberry Pi'],
    github: 'https://github.com/bwangle/smart-home',
    external: 'https://smarthome-demo.netlify.app',
    featured: false
  }
]

export const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/bchiang7',
    icon: 'github'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/bchiang7',
    icon: 'linkedin'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/bchiang7',
    icon: 'twitter'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/bchiang7',
    icon: 'instagram'
  }
]

export const contactInfo = {
  title: "What's Next?",
  heading: 'Get In Touch',
  description: "Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
  email: 'bo.wangle@example.com'
}
