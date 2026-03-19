export type LevelType = {
  name: 'Beginner' | 'Intermediate' | 'Advanced';
  topics: string[];
  projects: string[];
};

export type RoadmapType = {
  id: string;
  title: string;
  icon: string;
  description: string;
  levels: LevelType[];
};

export const roadmaps: RoadmapType[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    icon: "Monitor",
    description: "Build the visual interfaces and experiences that users interact with directly.",
    levels: [
      {
        name: "Beginner",
        topics: ["HTML5 Structure", "CSS Styling & Flexbox", "JavaScript Basics (Variables, Functions)", "DOM Manipulation"],
        projects: ["Personal Portfolio", "To-Do List App"]
      },
      {
        name: "Intermediate",
        topics: ["React.js & Hooks", "Tailwind CSS", "Fetch API & Promises", "Git & GitHub"],
        projects: ["Weather Dashboard", "E-commerce Product Page"]
      },
      {
        name: "Advanced",
        topics: ["Next.js & SSR", "State Management (Zustand/Redux)", "Web Performance Optimization", "CSS Animations"],
        projects: ["Full-Stack Social App Clone", "Interactive Dashboard"]
      }
    ]
  },
  {
    id: "backend",
    title: "Backend Engineering",
    icon: "Server",
    description: "Design the core logic, databases, and APIs that power applications from behind the scenes.",
    levels: [
      {
        name: "Beginner",
        topics: ["Node.js Basics", "Express.js Setup", "RESTful APIs", "Relational Databases (SQL)"],
        projects: ["Simple REST API", "CLI Task Manager"]
      },
      {
        name: "Intermediate",
        topics: ["MongoDB & Mongoose", "Authentication (JWT)", "Middleware & Error Handling", "PostgreSQL"],
        projects: ["User Authentication System", "Blog API with Database"]
      },
      {
        name: "Advanced",
        topics: ["GraphQL", "Microservices Architecture", "Caching (Redis)", "Docker & Containerization"],
        projects: ["Real-time Chat Server", "E-commerce Backend Service"]
      }
    ]
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    icon: "Layers",
    description: "Master both frontend and backend to build complete, end-to-end web applications.",
    levels: [
      {
        name: "Beginner",
        topics: ["HTML/CSS/JS", "Basic Node.js", "Express routing", "Connecting DB"],
        projects: ["Full Stack To-Do App", "Simple CRUD App"]
      },
      {
        name: "Intermediate",
        topics: ["MERN/PERN Stack", "API Authentication", "Deployment (Vercel/Render)", "State Management"],
        projects: ["Job Board Application", "E-commerce Site"]
      },
      {
        name: "Advanced",
        topics: ["Next.js App Router", "Serverless Functions", "WebSockets", "CI/CD Pipelines"],
        projects: ["Real-time Collaboration Tool", "SaaS Boilerplate"]
      }
    ]
  },
  {
    id: "datascience",
    title: "Data Science",
    icon: "Database",
    description: "Extract actionable insights from data using statistical and machine learning techniques.",
    levels: [
      {
        name: "Beginner",
        topics: ["Python Programming", "Pandas & NumPy", "Matplotlib / Seaborn", "Basic Statistics"],
        projects: ["Exploratory Data Analysis (EDA)", "Data Cleaning Script"]
      },
      {
        name: "Intermediate",
        topics: ["Scikit-learn", "Regression Models", "Classification Algorithms", "SQL for Data Analysis"],
        projects: ["House Price Predictor", "Customer Segmentation"]
      },
      {
        name: "Advanced",
        topics: ["Deep Learning (PyTorch/TF)", "NLP basics", "Time Series Analysis", "Model Deployment"],
        projects: ["Sentiment Analysis Tool", "Stock Price Forecaster"]
      }
    ]
  },
  {
    id: "dataanalytics",
    title: "Data Analytics",
    icon: "BarChart",
    description: "Analyze datasets to find trends, create dashboards, and solve business problems.",
    levels: [
      {
        name: "Beginner",
        topics: ["Excel/Google Sheets", "SQL Basics", "Data Cleaning", "Basic Metrics formulation"],
        projects: ["Sales Data Tracker", "Personal Budget Analysis"]
      },
      {
        name: "Intermediate",
        topics: ["Tableau / Power BI", "Advanced SQL (CTEs, Window Functions)", "Python for Analytics", "A/B Testing Concepts"],
        projects: ["Interactive Tableau Dashboard", "A/B Test Result Analysis"]
      },
      {
        name: "Advanced",
        topics: ["ETL Pipelines", "Data Warehousing (Snowflake)", "Predictive Analytics", "Business Intelligence Strategy"],
        projects: ["Automated Reporting Pipeline", "Retail Dashboard & Insights"]
      }
    ]
  },
  {
    id: "aiengineer",
    title: "AI Engineer",
    icon: "BrainCircuit",
    description: "Build intelligent systems leveraging LLMs, generative AI, and advanced algorithms.",
    levels: [
      {
        name: "Beginner",
        topics: ["Python Setup", "Prompt Engineering", "OpenAI API Basics", "Hugging Face Hub"],
        projects: ["Simple Chatbot", "Text Summarizer"]
      },
      {
        name: "Intermediate",
        topics: ["LangChain / LlamaIndex", "Vector Databases (Pinecone/Chroma)", "RAG Architecture", "Fine-Tuning Overview"],
        projects: ["Document Q&A Bot", "Personal Knowledge Assistant"]
      },
      {
        name: "Advanced",
        topics: ["Agentic Frameworks", "Local LLM Deployment", "Optimizing LLM inference", "AI Guardrails"],
        projects: ["Autonomous Research Agent", "Multi-modal AI Pipeline"]
      }
    ]
  },
  {
    id: "machinelearning",
    title: "Machine Learning",
    icon: "Network",
    description: "Design and train predictive models to solve complex pattern recognition tasks.",
    levels: [
      {
        name: "Beginner",
        topics: ["Math for ML (Linear Algebra)", "Python (NumPy, Scikit-learn)", "Linear/Logistic Regression", "Decision Trees"],
        projects: ["Spam Classifier", "Titanic Survival Prediction"]
      },
      {
        name: "Intermediate",
        topics: ["Random Forests & XGBoost", "Hyperparameter Tuning", "Cross-Validation", "Model Evaluation Metrics"],
        projects: ["Credit Score Predictor", "Image Classification Model"]
      },
      {
        name: "Advanced",
        topics: ["Neural Networks (PyTorch)", "CNNs & RNNs", "MLOps Lifecycle", "Model Serving (FastAPI)"],
        projects: ["Facial Recognition System", "Production ML API"]
      }
    ]
  },
  {
    id: "ios",
    title: "iOS Development",
    icon: "Apple",
    description: "Create native applications for Apple devices using Swift and iOS frameworks.",
    levels: [
      {
        name: "Beginner",
        topics: ["Swift Language Basics", "Xcode Environment", "SwiftUI Views", "State & Binding"],
        projects: ["Tip Calculator", "To-Do List App"]
      },
      {
        name: "Intermediate",
        topics: ["Navigation & Routing", "Core Data", "REST API Integration", "App Architecture (MVVM)"],
        projects: ["Weather App", "News Reader App"]
      },
      {
        name: "Advanced",
        topics: ["Combine Framework", "Core Animation", "Push Notifications", "App Store Publishing"],
        projects: ["Social Media Clone", "Fitness Tracker App"]
      }
    ]
  },
  {
    id: "blockchain",
    title: "Blockchain",
    icon: "Link",
    description: "Develop decentralized applications and smart contracts on blockchain networks.",
    levels: [
      {
        name: "Beginner",
        topics: ["Cryptography Basics", "Blockchain Architecture", "Ethereum Fundamentals", "Wallets & Transactions"],
        projects: ["Simple Block Generator", "Ethereum Wallet Setup"]
      },
      {
        name: "Intermediate",
        topics: ["Solidity", "Smart Contract Development", "Hardhat / Truffle", "Web3.js / Ethers.js"],
        projects: ["ERC-20 Token Creation", "Decentralized Voting App"]
      },
      {
        name: "Advanced",
        topics: ["DeFi Protocols", "ZK-Rollups", "Smart Contract Auditing", "Cross-chain Bridges"],
        projects: ["DEX (Decentralized Exchange) Clone", "NFT Marketplace"]
      }
    ]
  },
  {
    id: "android",
    title: "Android Development",
    icon: "Smartphone",
    description: "Build robust, scalable apps for the Android ecosystem using Kotlin.",
    levels: [
      {
        name: "Beginner",
        topics: ["Kotlin Basics", "Android Studio Setup", "Jetpack Compose UI", "Activities & Fragments"],
        projects: ["Hello World App", "Calculator App"]
      },
      {
        name: "Intermediate",
        topics: ["Coroutines & Flow", "Room Database", "Retrofit API Client", "Navigation Component"],
        projects: ["Movie DB Client", "Notes App (Offline)"]
      },
      {
        name: "Advanced",
        topics: ["Clean Architecture", "Dependency Injection (Dagger/Hilt)", "Background Tasks (WorkManager)", "Google Play Publishing"],
        projects: ["E-commerce App", "Chat Application"]
      }
    ]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    icon: "ShieldCheck",
    description: "Protect systems, networks, and data from digital attacks and threats.",
    levels: [
      {
        name: "Beginner",
        topics: ["Networking Fundamentals", "Linux Command Line", "Security Basics (CIA Triad)", "Cryptography Intro"],
        projects: ["Network Traffic Analyzer (Wireshark)", "Password Strength Checker"]
      },
      {
        name: "Intermediate",
        topics: ["Web Application Security (OWASP)", "Vulnerability Scanning", "Penetration Testing Tools", "Python for Security"],
        projects: ["Port Scanner", "Basic Keylogger Tutorial (Ethical)"]
      },
      {
        name: "Advanced",
        topics: ["Incident Response", "Malware Analysis", "Advanced Exploitation", "Cloud Security"],
        projects: ["Automated Vulnerability Scanner", "SIEM Dashboard Setup"]
      }
    ]
  },
  {
    id: "cloud",
    title: "Cloud Computing",
    icon: "Cloud",
    description: "Architect and manage distributed systems and infrastructure in the cloud.",
    levels: [
      {
        name: "Beginner",
        topics: ["Cloud Concepts (IaaS, PaaS, SaaS)", "AWS/Azure/GCP Basics", "Virtual Machines", "Cloud Storage"],
        projects: ["Static Website Hosting", "Deploy VM Server"]
      },
      {
        name: "Intermediate",
        topics: ["Serverless Architecture", "Cloud Networking (VPCs)", "IAM & Security Groups", "Containers in Cloud"],
        projects: ["Serverless API (AWS Lambda/API Gateway)", "Containerized Web App"]
      },
      {
        name: "Advanced",
        topics: ["Infrastructure as Code (Terraform)", "High Availability Design", "Cost Optimization", "Multi-Cloud Strategy"],
        projects: ["Scalable Auto-Scaling Architecture", "Terraform Multi-Tier App"]
      }
    ]
  },
  {
    id: "devops",
    title: "DevOps",
    icon: "Infinity",
    description: "Bridge the gap between development and operations with automation and CI/CD.",
    levels: [
      {
        name: "Beginner",
        topics: ["Linux Administration", "Git Fundamentals", "Bash Scripting", "Introduction to CI/CD"],
        projects: ["Automated Backup Script", "GitHub Actions Auto-Linter"]
      },
      {
        name: "Intermediate",
        topics: ["Docker & Container Building", "Jenkins / GitLab CI", "Ansible Configuration", "Basic Monitoring"],
        projects: ["End-to-End CI/CD Pipeline", "Dockerized Microservices"]
      },
      {
        name: "Advanced",
        topics: ["Kubernetes (K8s)", "Prometheus & Grafana", "Service Meshes", "GitOps Practices"],
        projects: ["Kubernetes Cluster Setup", "Comprehensive Observability Stack"]
      }
    ]
  },
  {
    id: "testing",
    title: "Software Testing",
    icon: "TestTube",
    description: "Ensure code quality and reliability through automated and manual testing methodologies.",
    levels: [
      {
        name: "Beginner",
        topics: ["Software Testing Life Cycle (STLC)", "Manual vs Automated Testing", "Writing Test Cases", "Bug Reporting (Jira)"],
        projects: ["Website Regression Test Suite", "Bug Tracking Simulation"]
      },
      {
        name: "Intermediate",
        topics: ["Unit Testing (Jest/JUnit)", "Selenium WebDriver", "API Testing (Postman)", "Test Driven Development (TDD)"],
        projects: ["Automated API Test Suite", "UI Automation Script"]
      },
      {
        name: "Advanced",
        topics: ["Cypress / Playwright", "Performance Testing (JMeter)", "CI/CD Integration", "Security Testing Basics"],
        projects: ["End-to-End E-commerce Test Suite", "Load Testing Report"]
      }
    ]
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    icon: "PenTool",
    description: "Design intuitive user experiences and gorgeous interfaces.",
    levels: [
      {
        name: "Beginner",
        topics: ["Design Principles (Color, Typography)", "Figma Interface", "Wireframing", "User Research Basics"],
        projects: ["Landing Page Wireframe", "Mobile App Mockup"]
      },
      {
        name: "Intermediate",
        topics: ["Prototyping & Interactions", "Design Systems", "Usability Testing", "Accessibility (a11y)"],
        projects: ["Interactive App Prototype", "Personal UI Kit"]
      },
      {
        name: "Advanced",
        topics: ["UX Psychology", "Advanced Micro-interactions", "Handoff to Developers", "A/B Testing Strategies"],
        projects: ["Complete SaaS Redesign", "Comprehensive Case Study"]
      }
    ]
  },
  {
    id: "gamedev",
    title: "Game Development",
    icon: "Gamepad2",
    description: "Create immersive 2D and 3D games across various platforms.",
    levels: [
      {
        name: "Beginner",
        topics: ["Game Loop Concept", "C# Basics (Unity) / C++ Basics", "2D Sprites & Movement", "Collision Detection"],
        projects: ["Pong Clone", "Simple Platformer"]
      },
      {
        name: "Intermediate",
        topics: ["Physics Engines", "UI & Canvas", "Animation State Machines", "Audio Integration"],
        projects: ["Flappy Bird Clone", "Top-Down RPG Prototype"]
      },
      {
        name: "Advanced",
        topics: ["3D Math & Vectors", "Shaders & Lighting", "Multiplayer Networking", "Optimization Techniques"],
        projects: ["3D First-Person Controller", "Online Multiplayer Arena Setup"]
      }
    ]
  },
  {
    id: "iot",
    title: "IoT/Embedded",
    icon: "Cpu",
    description: "Connect physical devices and build embedded systems that interface with the real world.",
    levels: [
      {
        name: "Beginner",
        topics: ["C/C++ Basics", "Arduino Platform", "Basic Electronics (Resistors, LEDs)", "Reading Sensors"],
        projects: ["Blinking LED Sequence", "Temperature Sensor System"]
      },
      {
        name: "Intermediate",
        topics: ["Raspberry Pi", "IoT Protocols (MQTT)", "Wireless Communication (WiFi/Bluetooth)", "RTOS Basics"],
        projects: ["Smart Home Humidity Dashboard", "Remote Controlled Car"]
      },
      {
        name: "Advanced",
        topics: ["PCB Design", "Edge AI/ML Integration", "IoT Security", "Low Power Optimization (BLE)"],
        projects: ["End-to-End Asset Tracker", "Voice-Controlled Hardware System"]
      }
    ]
  },
  {
    id: "networks",
    title: "Computer Networks",
    icon: "Wifi",
    description: "Understand and design the infrastructure that connects the digital world.",
    levels: [
      {
        name: "Beginner",
        topics: ["OSI & TCP/IP Models", "IP Addressing & Subnetting", "Switches & Routers", "Basic Network Commands (ping, traceroute)"],
        projects: ["Network Topologies Diagram", "Subnet Calculator Script"]
      },
      {
        name: "Intermediate",
        topics: ["Routing Protocols (OSPF, BGP)", "VLANs & Trunking", "DNS & DHCP", "Network Security Basics (Firewalls)"],
        projects: ["Cisco Packet Tracer Lab", "Deploying a DNS Server"]
      },
      {
        name: "Advanced",
        topics: ["Software-Defined Networking (SDN)", "Network Automation (Python/Ansible)", "IPv6 Implementation", "Load Balancing Strategies"],
        projects: ["Automated Switch Configuration Script", "Enterprise Network Architecture Design"]
      }
    ]
  },
  {
    id: "systemdesign",
    title: "System Design",
    icon: "LayoutTemplate",
    description: "Architect scalable, highly available, and reliable software systems.",
    levels: [
      {
        name: "Beginner",
        topics: ["Client-Server Model", "Monolith vs Microservices", "Vertical vs Horizontal Scaling", "CAP Theorem"],
        projects: ["URL Shortener Design Diagram", "Basic Scalable Architecture Document"]
      },
      {
        name: "Intermediate",
        topics: ["Load Balancers", "Database Sharding & Replication", "Caching Strategies (Redis/Memcached)", "Message Queues (Kafka/RabbitMQ)"],
        projects: ["Chat Application System Design", "Streaming Service Architecture"]
      },
      {
        name: "Advanced",
        topics: ["Distributed Consensus (Paxos/Raft)", "Rate Limiting Algorithms", "Global Data Replication", "Fault Tolerance & Disaster Recovery"],
        projects: ["Design Global E-commerce Platform", "Ride-Sharing Service System Layout"]
      }
    ]
  },
  {
    id: "cp",
    title: "Competitive Programming",
    icon: "Code",
    description: "Master algorithms and data structures to solve complex, high-stakes programming logic problems.",
    levels: [
      {
        name: "Beginner",
        topics: ["Time/Space Complexity (Big O)", "Arrays & Strings", "Basic Sorting (Bubble, Insertion)", "Recursion Fundamentals"],
        projects: ["LeetCode Easy Set", "Custom Sorting Visualizer"]
      },
      {
        name: "Intermediate",
        topics: ["Hash Tables & Sets", "Trees & Graphs (BFS/DFS)", "Dynamic Programming Basics", "Two Pointers & Sliding Window"],
        projects: ["Codeforces Div. 2 Path", "Graph Traversal Toolkit"]
      },
      {
        name: "Advanced",
        topics: ["Advanced DP (Bitmask, Digit)", "Segment Trees & Fenwick Trees", "String Matching (KMP, Rabin-Karp)", "Graph Algorithms (Dijkstra, A*)"],
        projects: ["ACM-ICPC Problem Solutions Repository", "Advanced Data Structure Library"]
      }
    ]
  }
];
