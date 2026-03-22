export type RoadmapLevel = {
  name: string;
  topics: string[];
  projects: string[];
};

export type RoadmapType = {
  id: string;
  title: string;
  description: string;
  icon: string;
  levels: RoadmapLevel[];
};

export const roadmaps: RoadmapType[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Learn to build stunning user interfaces and web applications using modern visual tools and frameworks.',
    icon: 'Monitor',
    levels: [
      { name: 'Beginner', topics: ['HTML', 'CSS', 'JavaScript Basics', 'DOM Manipulation'], projects: ['Personal Portfolio', 'To-Do List'] },
      { name: 'Intermediate', topics: ['React.js', 'Tailwind CSS', 'State Management', 'API Integration'], projects: ['Weather Dashboard', 'E-commerce UI'] },
      { name: 'Advanced', topics: ['Next.js', 'TypeScript', 'Web Performance', 'Testing'], projects: ['Full Stack Blog', 'Real-time Chat App'] }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Master server-side logic, databases, APIs, and the architecture that powers massive applications.',
    icon: 'Server',
    levels: [
      { name: 'Beginner', topics: ['Node.js Basics', 'Express.js', 'REST APIs', 'SQL Database'], projects: ['Simple CRUD API', 'Task Manager Backend'] },
      { name: 'Intermediate', topics: ['Authentication (JWT)', 'MongoDB', 'PostgreSQL', 'Caching (Redis)'], projects: ['E-commerce API', 'Blog Backend with Auth'] },
      { name: 'Advanced', topics: ['Microservices', 'GraphQL', 'Message Queues', 'Docker'], projects: ['Scalable Chat Service', 'Streaming Backend'] }
    ]
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'Become a complete developer by mastering both frontend presentation and backend server management.',
    icon: 'Layers',
    levels: [
      { name: 'Beginner', topics: ['HTML/CSS/JS', 'Node.js Basics', 'React Basics', 'Git Basics'], projects: ['Full Stack To-Do App', 'Notes App'] },
      { name: 'Intermediate', topics: ['MERN Stack', 'Authentication', 'RESTful Design', 'Deployment'], projects: ['Social Media Clone', 'E-commerce Store'] },
      { name: 'Advanced', topics: ['Next.js (SSR/SSG)', 'CI/CD Pipelines', 'Cloud Hosting', 'Testing'], projects: ['SaaS Dashboard', 'Real-time Collaboration Tool'] }
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Extract meaning from large datasets using Python, statistical modeling, and machine learning.',
    icon: 'BarChart',
    levels: [
      { name: 'Beginner', topics: ['Python Basics', 'Pandas', 'NumPy', 'Data Visualization (Matplotlib/Seaborn)'], projects: ['Exploratory Data Analysis', 'Sales Dashboard'] },
      { name: 'Intermediate', topics: ['SQL for Data Science', 'Statistical Analysis', 'A/B Testing', 'Feature Engineering'], projects: ['Customer Segmentation', 'Housing Price Predictor'] },
      { name: 'Advanced', topics: ['Time Series Analysis', 'Big Data (Spark)', 'Workflow Orchestration', 'Deep Learning Basics'], projects: ['Stock Market Forecaster', 'Recommendation System'] }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Design and implement intelligent systems that learn from data and solve complex predictive problems.',
    icon: 'BrainCircuit',
    levels: [
      { name: 'Beginner', topics: ['Python', 'Linear Algebra', 'Scikit-Learn Basics', 'Supervised Learning'], projects: ['Spam Classifier', 'Linear Regression Model'] },
      { name: 'Intermediate', topics: ['Neural Networks', 'Unsupervised Learning', 'TensorFlow or PyTorch', 'NLP Basics'], projects: ['Image Classifier', 'Sentiment Analysis'] },
      { name: 'Advanced', topics: ['Deep Learning', 'Computer Vision/Transformers', 'MLOps', 'Generative AI'], projects: ['LLM Chatbot', 'Face Recognition System'] }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps Engineering',
    description: 'Streamline the software lifecycle through automation, CI/CD, and robust cloud infrastructure.',
    icon: 'Infinity',
    levels: [
      { name: 'Beginner', topics: ['Linux Basics', 'Bash Scripting', 'Git/GitHub', 'Computer Networking'], projects: ['Automated Backup Script', 'Static Site Deployment'] },
      { name: 'Intermediate', topics: ['Docker', 'CI/CD Pipelines (GitHub Actions/Jenkins)', 'AWS/Azure Basics'], projects: ['Containerized Web App', 'Automated CI/CD Flow'] },
      { name: 'Advanced', topics: ['Kubernetes', 'Infrastructure as Code (Terraform)', 'Monitoring (Prometheus)', 'Site Reliability'], projects: ['Highly Available K8s Cluster', 'Infrastructure Provisioning'] }
    ]
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Craft beautiful, intuitive, and user-centric application designs that delight customers.',
    icon: 'PenTool',
    levels: [
      { name: 'Beginner', topics: ['Design Fundamentals', 'Color Theory', 'Figma Basics', 'Typography'], projects: ['Wireframe a Landing Page', 'Mobile App Mockup'] },
      { name: 'Intermediate', topics: ['User Research', 'Prototyping', 'Accessibility (a11y)', 'Design Systems'], projects: ['Interactive Prototype', 'SaaS Dashboard Design'] },
      { name: 'Advanced', topics: ['Usability Testing', 'Interaction Design', 'Micro-animations', 'Design Handoff'], projects: ['Comprehensive Case Study', 'Animated App Flow'] }
    ]
  },
  {
    id: 'mobile-android',
    title: 'Android Development',
    description: 'Build native applications for the world\'s most popular mobile operating system using Kotlin.',
    icon: 'Smartphone',
    levels: [
      { name: 'Beginner', topics: ['Kotlin Basics', 'Android Studio', 'Layouts (XML/Compose)', 'Activities/Intents'], projects: ['Calculator App', 'Unit Converter'] },
      { name: 'Intermediate', topics: ['RecyclerView', 'Room Database', 'Retrofit (APIs)', 'Coroutines'], projects: ['Weather App', 'Notes App with DB'] },
      { name: 'Advanced', topics: ['Clean Architecture', 'DI (Hilt/Dagger)', 'Advanced Jetpack Compose', 'Publishing'], projects: ['Full-scale E-commerce App'] }
    ]
  },
  {
    id: 'mobile-ios',
    title: 'iOS Development',
    description: 'Create sleek, performant apps for the Apple ecosystem using Swift and modern frameworks.',
    icon: 'Apple',
    levels: [
      { name: 'Beginner', topics: ['Swift Basics', 'Xcode', 'Views and Modifiers', 'State Management'], projects: ['Tip Calculator', 'Flashcards App'] },
      { name: 'Intermediate', topics: ['SwiftUI', 'CoreData', 'Networking (URLSession)', 'Navigation'], projects: ['Movie Fetcher App', 'Task Tracker'] },
      { name: 'Advanced', topics: ['Combine/Concurrency', 'App Store Deployment', 'Testing', 'Custom Animations'], projects: ['Social Networking App Native'] }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Defend systems, networks, and applications from digital attacks and malicious vulnerabilities.',
    icon: 'ShieldCheck',
    levels: [
      { name: 'Beginner', topics: ['Network Basics', 'Linux Command Line', 'Security Fundamentals', 'Cryptography Intro'], projects: ['Set up a Virtual Lab', 'Basic Network Scanner'] },
      { name: 'Intermediate', topics: ['Penetration Testing', 'Web Vulnerabilities (OWASP)', 'Wireshark', 'Metasploit'], projects: ['SQL Injection Lab', 'Vulnerability Assessment'] },
      { name: 'Advanced', topics: ['Reverse Engineering', 'Malware Analysis', 'Incident Response', 'Cloud Security'], projects: ['Capture The Flag (CTF) Challenges'] }
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud Computing',
    description: 'Design, deploy, and manage scalable and highly available applications in the cloud.',
    icon: 'Cloud',
    levels: [
      { name: 'Beginner', topics: ['Cloud Concepts', 'AWS/GCP/Azure Basics', 'Virtual Machines', 'Storage Services'], projects: ['Host a Static Website', 'EC2 Instance Setup'] },
      { name: 'Intermediate', topics: ['Serverless (Lambda)', 'Databases (RDS/DynamoDB)', 'IAM', 'Networking (VPC)'], projects: ['Serverless API', 'Scalable Web Hosting'] },
      { name: 'Advanced', topics: ['High Availability Design', 'Containers on Cloud', 'Cost Optimization', 'Migration'], projects: ['Multi-tier Architecture Deployment'] }
    ]
  },
  {
    id: 'game-dev',
    title: 'Game Development',
    description: 'Design and program interactive 2D and 3D games across multiple platforms.',
    icon: 'Gamepad2',
    levels: [
      { name: 'Beginner', topics: ['Programming Logic', 'Unity/Unreal Interface', '2D Physics', 'Basic Input'], projects: ['Pong Clone', 'Simple Platformer'] },
      { name: 'Intermediate', topics: ['C# or C++', '3D Environments', 'Animation Systems', 'Game AI Basics'], projects: ['First-Person Shooter Prototype', 'Endless Runner'] },
      { name: 'Advanced', topics: ['Multiplayer Networking', 'Shaders/Graphics', 'Performance Optimization', 'Publishing'], projects: ['Multiplayer Arena Game'] }
    ]
  },
  {
    id: 'blockchain',
    title: 'Blockchain / Web3',
    description: 'Develop decentralized applications, smart contracts, and cryptographical protocols.',
    icon: 'Network',
    levels: [
      { name: 'Beginner', topics: ['Cryptography Basics', 'Blockchain Concepts', 'Ethereum/Bitcoin Intro', 'Wallets'], projects: ['Simple Token Concept'] },
      { name: 'Intermediate', topics: ['Solidity', 'Smart Contracts', 'Web3.js / Ethers.js', 'Hardhat/Truffle'], projects: ['ERC20 Token Creation', 'Voting DApp'] },
      { name: 'Advanced', topics: ['DeFi Protocols', 'NFT Marketplaces', 'Security Audits', 'Zero-Knowledge Proofs'], projects: ['Full DeFi Exchange Platform'] }
    ]
  },
  {
    id: 'systems',
    title: 'Systems Programming',
    description: 'Write highly efficient, low-level code directly interacting with operating systems and hardware.',
    icon: 'Cpu',
    levels: [
      { name: 'Beginner', topics: ['C/C++ or Rust Basics', 'Memory Management', 'Pointers', 'Data Structures'], projects: ['Command Line Utility', 'Simple File Manager'] },
      { name: 'Intermediate', topics: ['Multithreading', 'Inter-process Communication', 'Network Sockets', 'File Systems'], projects: ['Custom HTTP Server', 'Thread Pool Executor'] },
      { name: 'Advanced', topics: ['Kernel Modules', 'Embedded Systems', 'Compilers/Interpreters', 'Performance Profiling'], projects: ['Simple OS Task Scheduler', 'Custom Compiler'] }
    ]
  },
  {
    id: 'qa-test',
    title: 'QA & Automation Engineering',
    description: 'Ensure software quality through comprehensive manual testing and automated scripts.',
    icon: 'TestTube',
    levels: [
      { name: 'Beginner', topics: ['Testing Fundamentals', 'Manual Testing', 'Bug Reporting', 'Agile Methodologies'], projects: ['Test Plan Creation', 'Defect Tracking Setup'] },
      { name: 'Intermediate', topics: ['Selenium / Cypress', 'API Testing (Postman)', 'Test Automation Frameworks'], projects: ['Automated Login Suite', 'API Test Collection'] },
      { name: 'Advanced', topics: ['CI/CD Integration', 'Performance Testing (JMeter)', 'Security Testing Basics'], projects: ['End-to-End Pipeline Automation'] }
    ]
  },
  {
    id: 'dba',
    title: 'Database Administration',
    description: 'Design, optimize, and secure vast robust databases that store the world\'s structured data.',
    icon: 'Database',
    levels: [
      { name: 'Beginner', topics: ['Relational Algebra', 'SQL Basics', 'Normalization', 'Entity-Relationship Diagrams'], projects: ['Library Database Design'] },
      { name: 'Intermediate', topics: ['Advanced Queries/Joins', 'Indexes', 'Stored Procedures', 'NoSQL Intro'], projects: ['Inventory Management DB', 'Query Optimization Exercise'] },
      { name: 'Advanced', topics: ['Replication/Sharding', 'Disaster Recovery', 'Security/Encryption', 'Data Warehousing'], projects: ['High-Availability DB Cluster Deployment'] }
    ]
  },
  {
    id: 'iot',
    title: 'Internet of Things (IoT)',
    description: 'Connect hardware devices to the internet and orchestrate physical-world automations.',
    icon: 'Wifi',
    levels: [
      { name: 'Beginner', topics: ['Electronics Basics', 'Arduino/Raspberry Pi', 'Sensors', 'MicroPython/C++'], projects: ['Smart LED Controller', 'Temperature Monitor'] },
      { name: 'Intermediate', topics: ['MQTT Protocols', 'Edge Computing', 'Wireless Comm (Bluetooth/Wi-Fi)', 'IoT Platforms'], projects: ['Remote Weather Station', 'Smart Home Hub'] },
      { name: 'Advanced', topics: ['IoT Security', 'Fleet Management', 'Industrial IoT', 'Machine Learning on Edge'], projects: ['Autonomous Robot Fleet'] }
    ]
  },
  {
    id: 'architecture',
    title: 'Software Architecture',
    description: 'Design scalable, robust, and maintainable software systems from a high-level perspective.',
    icon: 'LayoutTemplate',
    levels: [
      { name: 'Beginner', topics: ['Design Patterns', 'SOLID Principles', 'UML Diagrams', 'Monolithic Architecture'], projects: ['Refactor a Legacy App', 'System Design Document'] },
      { name: 'Intermediate', topics: ['Microservices', 'Event-Driven Architecture', 'Caching Strategies', 'API Gateways'], projects: ['Microservices E-commerce Blueprint'] },
      { name: 'Advanced', topics: ['Domain-Driven Design', 'Distributed Systems Consensus', 'Capacity Planning'], projects: ['Design a Global Video Streaming Architecture'] }
    ]
  },
  {
    id: 'ar-vr',
    title: 'AR/VR Development',
    description: 'Build immersive augmented and virtual reality experiences for the next generation of computing.',
    icon: 'Monitor',
    levels: [
      { name: 'Beginner', topics: ['3D Modeling Basics', 'Unity/Unreal Engine', 'C# Basics', 'ARKit/ARCore Intro'], projects: ['Simple Object Viewer AR', '3D Scene Setup'] },
      { name: 'Intermediate', topics: ['Spatial Tracking', 'VR Interactions', 'Physics Simulation', 'Optimizing Assets'], projects: ['VR Escape Room Prototype', 'AR Measurement Tool'] },
      { name: 'Advanced', topics: ['Multiplayer AR/VR', 'Advanced Haptics', 'Eye/Hand Tracking', 'Publishing to Quest/VisionOS'], projects: ['Collaborative VR Workspace'] }
    ]
  },
  {
    id: 'web3-frontend',
    title: 'Web3 Frontend Dev',
    description: 'Specialize in connecting modern frontend interfaces with decentralized blockchain backends.',
    icon: 'Link',
    levels: [
      { name: 'Beginner', topics: ['React.js Basics', 'Blockchain Basics', 'Wallets (MetaMask)', 'Ethers.js intro'], projects: ['Wallet Connection Button', 'Read Smart Contract Data'] },
      { name: 'Intermediate', topics: ['Wagmi / viem', 'Handling Transactions', 'Listening to Events', 'IPFS'], projects: ['Token Dashboard', 'Minting Interface'] },
      { name: 'Advanced', topics: ['Indexer (The Graph)', 'Account Abstraction', 'Optimistic UI for Web3', 'Security'], projects: ['Full NFT Marketplace Frontend'] }
    ]
  }
];
