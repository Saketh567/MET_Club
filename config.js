const SITE_CONFIG = {
  // Contact email for the form submissions
  contactEmail: "1873reddy1873@gmail.com",

  // ──────────────────────────────────────────────
  // TEAM MEMBERS (Index Page)
  // ──────────────────────────────────────────────
  team: [
    {
      name: "Ratna Koushik Appasani",
      role: "President",
      image: "assets/images/ratna.jpeg",
      bio: "Ratna leads the vision and strategy for MET Club. With a passion for interdisciplinary engineering, she focuses on building a community where theoretical math meets practical technology.",
      memberId: "#TC8492",
      joinYear: "2023",
      skills: [{name: "Leadership", level: 90}, {name: "Systems Design", level: 85}, {name: "Strategy", level: 95}, {name: "Management", level: 80}],
      currentProject: { title: "Strategic Growth", desc: "AI-powered Analytics Platform" },
      linkedin: "#",
      github: "#"
    },
    {
      name: "Tanya Aggarwal",
      role: "Vice President",
      image: "assets/images/tanya.jpeg",
      bio: "Tanya oversees the club's operations and ensures that projects align with our core values. She's incredibly proud of the collaborative environment the team has fostered.",
      memberId: "#TC8493",
      joinYear: "2023",
      skills: [{name: "Operations", level: 95}, {name: "Product Mgt", level: 88}, {name: "Logistics", level: 85}, {name: "Design", level: 75}],
      currentProject: { title: "Fall Hackathon", desc: "Scaling club operations" },
      linkedin: "#",
      github: "#"
    },
    {
      name: "Saketh Reddy Kanthala",
      role: "Tech Lead",
      image: "assets/images/saketh.jpeg",
      bio: "Saketh is the technical backbone of our projects. He specializes in bridging complex algorithms with robust software architecture, constantly pushing the boundaries of what our club can build.",
      memberId: "#TC8494",
      joinYear: "2022",
      skills: [{name: "Python", level: 88}, {name: "JavaScript", level: 92}, {name: "AWS", level: 85}, {name: "Docker", level: 75}],
      currentProject: { title: "Project Phoenix", desc: "AI-powered Analytics Platform" },
      linkedin: "#",
      github: "#"
    },
    {
      name: "Shubham Verma",
      role: "Events Coordinator",
      image: "assets/images/shubham.jpeg",
      bio: "Shubham orchestrates our hackathons and workshops. His dedication ensures that every event is an unforgettable learning experience for all members.",
      memberId: "#TC8495",
      joinYear: "2023",
      skills: [{name: "Event Planning", level: 92}, {name: "Community", level: 90}, {name: "Marketing", level: 85}, {name: "Outreach", level: 80}],
      currentProject: { title: "MET Tech Symposium", desc: "Annual technical showcase" },
      linkedin: "#",
      github: "#"
    },
    {
      name: "Open Position",
      role: "Hardware Lead",
      image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%23ece7df'/><text x='50%25' y='50%25' font-family='sans-serif' font-size='120' fill='%231b3d2f' text-anchor='middle' dominant-baseline='central'>?</text></svg>",
      memberId: "#TC0000",
      joinYear: "2024",
      skills: [{name: "Hardware", level: 0}, {name: "Circuitry", level: 0}, {name: "Embedded", level: 0}],
      currentProject: { title: "Hiring Now", desc: "Apply to join the team" },
      linkedin: "#",
      github: "#"
    },
    {
      name: "Open Position",
      role: "Operations Director",
      image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%23ece7df'/><text x='50%25' y='50%25' font-family='sans-serif' font-size='120' fill='%231b3d2f' text-anchor='middle' dominant-baseline='central'>?</text></svg>",
      memberId: "#TC0000",
      joinYear: "2024",
      skills: [{name: "Logistics", level: 0}, {name: "Management", level: 0}],
      currentProject: { title: "Hiring Now", desc: "Apply to join the team" },
      linkedin: "#",
      github: "#"
    },
    {
      name: "Open Position",
      role: "Software Engineer",
      image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%23ece7df'/><text x='50%25' y='50%25' font-family='sans-serif' font-size='120' fill='%231b3d2f' text-anchor='middle' dominant-baseline='central'>?</text></svg>",
      memberId: "#TC0000",
      joinYear: "2024",
      skills: [{name: "Fullstack", level: 0}, {name: "Database", level: 0}],
      currentProject: { title: "Hiring Now", desc: "Apply to join the team" },
      linkedin: "#",
      github: "#"
    },
    {
      name: "Open Position",
      role: "Marketing Lead",
      image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%23ece7df'/><text x='50%25' y='50%25' font-family='sans-serif' font-size='120' fill='%231b3d2f' text-anchor='middle' dominant-baseline='central'>?</text></svg>",
      linkedin: "#",
      github: "#"
    }
  ],

  // ──────────────────────────────────────────────
  // EVENTS CALENDAR (Index Page)
  // ──────────────────────────────────────────────
  events: [
    {
      date: "2026-10-14",
      title: "Robotics Workshop - Build a Line-Following Robot",
      meta: "6:00-8:00 PM · Engineering Lab",
      details: "Join us for a hands-on workshop where we will build a line-following robot from scratch. No prior experience is required, and all materials will be provided. We'll cover basic electronics, motor control, and simple programming."
    },
    {
      date: "2026-10-22",
      title: "Calculus Study Circle - Fourier Transforms & Applications",
      meta: "4:30-6:00 PM · Math Commons Rm 112",
      details: "A collaborative study session focusing on Fourier transforms. We'll explore the mathematical theory behind them and discuss real-world applications in signal processing and engineering."
    },
    {
      date: "2026-11-03",
      title: "3D Printing for Engineers - Rapid Prototyping Session",
      meta: "10:00 AM-12:30 PM · Makerspace Studio",
      details: "Learn the fundamentals of 3D printing and rapid prototyping. This session will walk you through CAD design basics, slicing software, and best practices for printing functional parts for your engineering projects."
    },
    {
      date: "2026-11-15",
      title: "AI Workshop - Train Your First Neural Network",
      meta: "2:00-5:00 PM · CS Lab 204",
      details: "Dive into the world of Artificial Intelligence! We will guide you through setting up a Python environment and training your very first neural network using PyTorch to recognize handwritten digits."
    },
    {
      date: "2026-12-01",
      title: "MET Hackathon 2026 - 48-Hour Innovation Sprint",
      meta: "All day · Engineering Hall",
      details: "The biggest event of the year! Join us for a 48-hour innovation sprint where teams will compete to build the best tech solutions. Prizes, free food, and industry networking opportunities await!"
    }
  ],

  // ──────────────────────────────────────────────
  // COMMUNITY PROJECTS (Showcase Page)
  // ──────────────────────────────────────────────
  projects: [
    {
      title: "AI-Powered Robotics",
      author: "Sarah Jenkins",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "An autonomous robot capable of navigating complex terrains using machine learning algorithms. Built entirely from scratch during the winter workshop.",
      link: "#"
    },
    {
      title: "Quantum Algorithm Sim",
      author: "Marcus Chen",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "A lightweight, web-based simulator designed to make core quantum computing concepts visually accessible to beginners and enthusiasts.",
      link: "#"
    },
    {
      title: "Eco-Tracker App",
      author: "Team GreenTech",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "A mobile application that tracks and gamifies personal carbon footprints for college students. Over 500 active users in the first month.",
      link: "#"
    }
  ]
};
