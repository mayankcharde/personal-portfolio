export const portfolioData = {
  personal: {
    name: "Mayank Charde",
    callsign: "MAVERICK",
    initials: "MC",
    title: "AI & Full Stack Developer",
    tagline: "BUILDING AGENTIC SYSTEMS AND HIGH-PERFORMANCE MERN WEB APPLICATIONS",
    bio: "Aspiring Software Engineer | Full-Stack Developer | AI/ML & Generative AI Enthusiast",
    email: "mayankcharde2@gmail.com",
    phone: "+91 9699561658",
    location: "Nagpur, India",
    avatar: "/mayank.jpeg",
    resumeUrl: "/Mayank Charde Resume (2).pdf",
    availableForWork: true,
    careerStartDate: "2024-01-01",
    githubUsername: "mayankcharde",
  },

  socials: {
    github: "https://github.com/mayankcharde",
    linkedin: "https://www.linkedin.com/in/mayank-charde-56636b2a4",
    twitter: "https://twitter.com/mayankcharde",

  },

  about: {
    bio: "B.Tech Student in Artificial Intelligence with a passion for building robust full-stack web applications and complex agentic systems. Experienced in creating multi-agent platforms, RAG architectures, and AI negotiation assistants.",
    photoUrl: "/mayank2.jpeg",
    yearsExperience: "0-1",
  },

  stats: [
    { label: "PROJECTS_DEPLOYED", value: 15 },
    { label: "EXPERIENCE", value: "0-1 YRS" },
    { label: "INTERNSHIPS", value: 2 },
    { label: "TECHNOLOGIES", value: 20 },
    { label: "COMMITS", value: "250+" },
    { label: "REPOS", value: "45+" },
  ],

  skills: [
    {
      category: "Frontend",
      color: "#61DAFB",
      proficiency: 95,
      items: [
        { name: "React.js", level: 95 },
        { name: "JavaScript", level: 95 },
        { name: "Tailwind CSS", level: 92 },
        { name: "TypeScript", level: 78 },
        { name: "Framer Motion", level: 82 },
        { name: "HTML5 / CSS3", level: 90 },
      ],
    },
    {
      category: "Backend",
      color: "#339933",
      proficiency: 90,
      items: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 88 },
        { name: "FastAPI", level: 88 },
        { name: "MongoDB", level: 85 },
        { name: "MySQL", level: 82 },
        { name: "JWT / Auth", level: 90 },
      ],
    },
    {
      category: "AI & Agentic",
      color: "#FF7A1A",
      proficiency: 92,
      items: [
        { name: "LangChain", level: 90 },
        { name: "LangGraph", level: 85 },
        { name: "Gemini API", level: 90 },
        { name: "Mistral AI", level: 85 },
        { name: "Python", level: 88 },
        { name: "RAG", level: 85 },
        { name: "MCP", level: 82 },
        { name: "Pydantic", level: 88 },
        { name: "Transformers", level: 80 },
        { name: "Deep Learning", level: 82 },
      ],
    },
    {
      category: "Tools",
      color: "#F0B0A0",
      proficiency: 85,
      items: [
        { name: "Git / GitHub", level: 98 },
        { name: "Docker", level: 78 },
        { name: "Puppeteer", level: 85 },
        { name: "Postman", level: 92 },
        { name: "Razorpay", level: 90 },
        { name: "Cloudinary", level: 85 },
        { name: "SendGrid", level: 82 },
        { name: "Vercel / Render", level: 90 },
      ],
    },
  ],

  projects: [
    {
      id: 1,
      title: "NADT Education Platform",
      codename: "TAXPAYER_EDU",
      category: "Full Stack",
      description:
        "A secure taxpayer awareness platform for NADT. Features video learning, progress tracking, and automated certificate generation using Puppeteer and SendGrid.",
      techStack: ["React", "Node.js", "MongoDB", "Razorpay", "SendGrid", "Puppeteer"],
      imageUrl:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop",
      liveUrl: "https://nadt4.vercel.app/",
      repoUrl: "https://github.com/mayankcharde/nadt4",
      status: "LIVE",
      featured: true,
    },
    {
      id: 2,
      title: "Literai – Multi-Agent AI Research Assistant",
      codename: "MULTI_AGENT_RESEARCH",
      category: "Generative AI",
      description:
        "Built a production-ready multi-agent research platform using LangGraph, LangChain, and Mistral AI. The system orchestrates 9 specialized AI agents (Orchestrator, Planner, Searcher, Analyzer, Writer, Fact Checker, Reviewer, Summarizer, Formatter) to conduct comprehensive research on any topic. Features include automated report generation, RAG-based Q&A with source attribution, quality scoring, and user authentication.",
      techStack: ["React", "Node.js", "MongoDB", "Express.js", "FastAPI", "LangGraph", "LangChain", "Mistral AI", "ChromaDB", "REST APIs"],
      imageUrl:
        "https://images.unsplash.com/photo-1531746790733-6c0f9f89e8b9?q=80&w=1000&auto=format&fit=crop",
      liveUrl: "https://literai-neon.vercel.app/",
      repoUrl: "https://github.com/mayankcharde/literai",
      status: "LIVE",
      featured: true,
    },
    {
      id: 3,
      title: "IntelliBlog – Multi-Agent AI Blog Writing System",
      codename: "BLOG_ORCHESTRATOR",
      category: "Generative AI",
      description:
        "Engineered a production-ready multi-agent content generation system using LangGraph, LangChain, and Mistral AI. The platform employs autonomous AI agents for topic analysis, content planning, article generation, and quality enhancement, enabling the creation of high-quality, SEO-friendly blog posts through an end-to-end agentic workflow.",
      techStack: ["React", "Node.js", "MongoDB", "Express.js", "LangGraph", "LangChain", "Mistral AI", "REST APIs"],
      imageUrl:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop",
      liveUrl: "https://blog-writing-xdnf.vercel.app/",
      repoUrl: "https://github.com/mayankcharde/Blog-Writing",
      status: "LIVE",
      featured: true,
    },
    {
      id: 4,
      title: "FoundIt – QR-Enabled Lost & Found Platform",
      codename: "QR_LOST_FOUND",
      category: "Full Stack",
      description:
        "Developed a QR-powered lost and found platform. Owners register belongings and generate unique QR codes; finders scan to instantly establish a secure communication channel. Implemented real-time messaging using Socket.IO without exposing personal contact information.",
      techStack: ["MERN Stack", "Socket.IO", "QR Code Generation", "MongoDB", "Express.js", "React", "Node.js"],
      imageUrl:
        "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=1000&auto=format&fit=crop",
      liveUrl: "https://found-it-jet.vercel.app/",
      repoUrl: "https://github.com/mayankcharde/FoundIt",
      status: "IN_PROGRESS",
      featured: true,
    },
    {
      id: 5,
      title: "Gen AI Job Prep Platform",
      codename: "AI_JOB_PREP",
      category: "Artificial Intelligence",
      description:
        "Helping job seekers with ATS-optimized resumes and Gemini-powered interview questions based on job descriptions.",
      techStack: ["React", "Node.js", "Gemini API", "Puppeteer", "JWT"],
      imageUrl:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1000&auto=format&fit=crop",
      liveUrl: "https://interview-ai-zeta-inky.vercel.app/",
      repoUrl: "https://github.com/mayankcharde/interviewAi",
      status: "LIVE",
      featured: false,
    },
    {
      id: 6,
      title: "DeepSeek AI Clone",
      codename: "AI_MULTIMODAL_OS",
      category: "Artificial Intelligence",
      description:
        "AI-powered platform with speech interactions, image generation, and subscription management. Integrated with Gemini API and Razorpay.",
      techStack: ["MERN Stack", "Gemini API", "Razorpay", "Speech-to-Text", "CDN"],
      imageUrl:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
      liveUrl: "https://final-deepseek-2.vercel.app/",
      repoUrl: "https://github.com/mayankcharde/FINAL-DEEPSEEK2",
      status: "LIVE",
      featured: true,
    },
    {
      id: 7,
      title: "E Store - Modern E-Commerce",
      codename: "ECOMMERCE_PLATFORM",
      category: "Full Stack",
      description:
        "Feature-rich shopping experience with Razorpay integration and automated PDF invoice generation delivered via email.",
      techStack: ["MERN Stack", "Razorpay", "Puppeteer", "Email API"],
      imageUrl:
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000&auto=format&fit=crop",
      liveUrl: "https://e-commerce-16n95tt0a-mayankchardes-projects.vercel.app/",
      repoUrl: "https://github.com/mayankcharde/E-Commerce",
      status: "LIVE",
      featured: true,
    },
    {
      id: 8,
      title: "MovieGenie - ML Suggestion",
      codename: "ML_RECOMMENDER",
      category: "Artificial Intelligence",
      description:
        "Personalized movie recommendation system using ML & NLP similarity matching with TF-IDF vectorization.",
      techStack: ["Python", "FastAPI", "NLP", "ML", "Streamlit"],
      imageUrl:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
      liveUrl: "#",
      repoUrl: "https://github.com/mayankcharde/MovieGenie",
      status: "ARCHIVED",
      featured: false,
    },
    {
      id: 9,
      title: "Spotify Cloud Clone",
      codename: "MUSIC_STREAM_UI",
      category: "Full Stack",
      description:
        "Futuristic music streaming experience with glassmorphism UI, custom playlists, and real-time interactive controls.",
      techStack: ["React.js", "Tailwind CSS", "Framer Motion", "Context API"],
      imageUrl:
        "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1000&auto=format&fit=crop",
      liveUrl: "https://spotify-nu-peach.vercel.app/",
      repoUrl: "https://github.com/mayankcharde/spotify",
      status: "LIVE",
      featured: false,
    },
    {
      id: 10,
      title: "Code Reviewer",
      codename: "AI_CODE_REVIEW",
      category: "Artificial Intelligence",
      description:
        "Built with React.js and Gemini API integrated in Express/Node.js for intelligent code analysis.",
      techStack: ["React.js", "Gemini API", "Node.js", "Express"],
      imageUrl:
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop",
      liveUrl: "#",
      repoUrl: "https://github.com/mayankcharde/final-code-reviwer",
      status: "ARCHIVED",
      featured: false,
    },
    {
      id: 11,
      title: "House Price Prediction",
      codename: "ML_HOUSE_PRICE",
      category: "Artificial Intelligence",
      description:
        "Built with React.js and Python (Flask) using house price detection datasets.",
      techStack: ["React.js", "Python", "Flask", "Machine Learning"],
      imageUrl:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop",
      liveUrl: "https://demo-house-azure.vercel.app/",
      repoUrl: "https://github.com/mayankcharde/demo_house",
      status: "LIVE",
      featured: false,
    },
    {
      id: 12,
      title: "GTA 6 Website",
      codename: "GTA6_LANDING",
      category: "Frontend/UI",
      description:
        "Built with React.js integrated with Framer Motion for high-fidelity animations.",
      techStack: ["React.js", "Framer Motion", "Tailwind CSS"],
      imageUrl:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
      liveUrl: "https://gta-6-iota-eight.vercel.app/",
      repoUrl: "https://github.com/mayankcharde/GTA-6-Website",
      status: "LIVE",
      featured: false,
    },
    {
      id: 13,
      title: "Weather App",
      codename: "WEATHER_INTERFACE",
      category: "Web Development",
      description:
        "Predictive weather application using HTML5, CSS, and JS with Weather API integration.",
      techStack: ["HTML5", "CSS", "JavaScript", "Weather API"],
      imageUrl:
        "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=1000&auto=format&fit=crop",
      liveUrl: "https://weather-interface-kappa.vercel.app/",
      repoUrl: "https://github.com/mayankcharde/weather-interface",
      status: "LIVE",
      featured: false,
    },
    {
      id: 14,
      title: "DermSight – AI Skin Health System",
      codename: "DERMSIGHT_AI",
      category: "Artificial Intelligence",
      description:
        "AI-powered skin disease detection and triage system that analyzes images and symptoms to provide real-time insights and prioritize high-risk cases.",
      techStack: ["React", "Node.js", "FastAPI", "TensorFlow", "PyTorch"],
      imageUrl: "/derm.png",
      liveUrl: "#",
      repoUrl: "https://github.com/mayankcharde/dermsight-ai-assistant",
      status: "IN_PROGRESS",
      featured: false,
    },
    {
      id: 15,
      title: "Fire & Smoke Detection System",
      codename: "FIRE_DETECTION",
      category: "Artificial Intelligence",
      description:
        "Real-time fire detection system using YOLO and OpenCV that analyzes live video and triggers an instant alarm on detection. Supports webcam and ESP32 camera integration.",
      techStack: ["YOLO", "OpenCV", "FastAPI", "Python"],
      imageUrl:
        "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=1000&auto=format&fit=crop",
      liveUrl: "#",
      repoUrl: "https://github.com/mayankcharde/Fire-Prediction",
      status: "IN_PROGRESS",
      featured: false,
    },
  ],

  experience: [
    {
      type: "work",
      role: "AI Intern",
      company: "Infosys Springboard",
      duration: "Nov 2025 - Present",
      location: "Virtual",
      description:
        "Built an AI-Powered Car Lease & Loan Contract Negotiation Assistant. Implemented OCR-based document processing with Tesseract, LangChain NLP pipelines for risk clause identification, and LLM-generated negotiation recommendations.",
      points: [
        "Built an AI-Powered Car Lease & Loan Contract Negotiation Assistant to simplify complex financing contracts.",
        "Implemented OCR-based data extraction using Tesseract for analyzing legal documents.",
        "Developed NLP pipelines with spaCy and LangChain for identifying risk clauses and financial terms.",
        "Engineered a fairness benchmarking system with LLM-generated negotiation recommendations.",
      ],
      techStack: ["Python", "FastAPI", "Flutter", "LangChain", "spaCy", "Tesseract", "Pandas"],
      repoUrl: "https://github.com/mayankcharde/Car-Lease-AI-Assistant",
    },
    {
      type: "work",
      role: "MERN Stack Developer Intern",
      company: "Codec Technologies India",
      duration: "Jun 2025 - Present",
      location: "Hybrid",
      description:
        "Developing responsive and performant full-stack MERN applications. Optimizing frontend components, reducing database query latencies, and implementing real-time socket modules.",
      points: [
        "Developing and maintaining full-stack web applications using the MERN stack.",
        "Collaborating with cross-functional teams to deliver scalable and performant digital solutions.",
        "Optimizing frontend performance and implementing modern UI/UX patterns.",
      ],
      techStack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    },
    {
      type: "education",
      role: "B.Tech Student (AI)",
      company: "St. Vincent Pallotti College of Engineering & Technology",
      duration: "2023 - 2027",
      location: "Nagpur, India",
      cgpa: "8.6",
      description:
        "Focusing on Artificial Intelligence and Machine Learning architectures. Specialized projects in Neural Networks, Deep Learning, and Advanced Natural Language Processing (NLP).",
      points: [
        // "Specializing in Artificial Intelligence and Machine Learning architectures.",
        // "Core focus on Neural Networks, Deep Learning, and Advanced NLP.",
      ],
      techStack: ["Artificial Intelligence", "MERN", "Python", "Problem Solving"],
    },
    {
      type: "education",
      role: "12th HSC",
      company: "Sahu Garden Junior College",
      duration: "2021 - 2023",
      location: "Nagpur, India",
      // description: "Completed Higher Secondary Certificate with focus on Science stream.",
      techStack: ["Physics", "Chemistry", "Mathematics"],
    },
    {
      type: "education",
      role: "10th Standard",
      company: "Montfort Secondary School",
      duration: "2021",
      location: "Nagpur, India",
      // description: "Achieved excellence in Science and Mathematics.",
      techStack: ["Science", "Mathematics"],
    },
  ],

  achievements: [
    {
      icon: "🚀",
      title: "SWALAMBH 2026 TOP 15",
      issuer: "SVPCET Nagpur x GCVI/HCL",
      date: "2026",
      description:
        "Selected among the Top 15 innovative teams for an AI-driven solution focused on real-world impact.",
      link: "#",
    },
    {
      icon: "🌟",
      title: "Webathon 2.0 National Finalist",
      issuer: "Webathon 2.0 Mumbai",
      date: "2025",
      description:
        "Ranked in the Top 20 teams nationally out of 125+ participants for a high-performance web solution.",
      link: "#",
    },
    {
      icon: "🎵",
      title: "Beatbots Runner-up (3rd)",
      issuer: "AI Music Gen Challenge",
      date: "2024",
      description:
        "Secured 3rd position globally in an AI software-based music generation event for a classical-rock fusion.",
      link: "#",
    },
  ],

  certifications: [
    {
      title: "Fundamentals of Deep Learning",
      issuer: "NVIDIA",
      date: "Jan 2026",
      credentialId: "1tO0Ys3ITkGJkXM3sgBKrQ",
      color: "#76B900",
    },
    {
      title: "Full Stack Generative & Agentic AI with Python",
      issuer: "Udemy",
      date: "Nov 2025",
      credentialId: "UC-434c4acf-3cf7-452d-9a3a-777fd1025a07",
      color: "#A435F0",
    },
    {
      title: "OCI 2025 Certified Generative AI Professional",
      issuer: "Oracle",
      date: "Sep 2025",
      credentialId: "321665152OCI25GAIOCP",
      color: "#F80000",
    },
    {
      title: "OCI Certified AI Foundations Associate",
      issuer: "Oracle",
      date: "Sep 2025",
      credentialId: "321665152OCI25AICFA",
      color: "#F80000",
    },
    {
      title: "Generative AI Essentials",
      issuer: "IBM",
      date: "Aug 2025",
      credentialId: "",
      color: "#054ADA",
    },
    {
      title: "Programming using Java",
      issuer: "Infosys Springboard",
      date: "2025",
      credentialId: "",
      color: "#007CC3",
    },
    {
      title: "Introduction to MERN Stack",
      issuer: "Simplilearn",
      date: "2025",
      credentialId: "",
      color: "#00B4D8",
    },
  ],

  github: {
    fallback: {
      repos: 0,
      followers: 0,
      latestActivity: "Activity feed unavailable",
      language: "React / Node.js",
      activity: [20, 35, 28, 42, 50, 34, 26],
    },
  },
};
