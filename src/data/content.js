// All portfolio content lives here. Edit the text below.
export const contact = {
  email: 'devanbeeda@gmail.com',
  phone: '+91 9441849616',
  location: 'B. Kothakota, Andhra Pradesh, India',
  github: 'https://github.com/devanbeeda',
  linkedin: 'https://www.linkedin.com/in/devanbeeda',
  gmail: 'https://mail.google.com/mail/?view=cm&to=devanbeeda@gmail.com',
};

// Roles shown in the Contact section
export const roles = ['Data Analyst', 'Data Scientist', 'Data Engineer', 'AI Engineer', 'Business Analyst', 'ML Engineer'];

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];


export const about = {
  text: [
    "I'm Devan, a Computer Science and Engineering (Artificial Intelligence) graduate from B. Kothakota in Andhra Pradesh. I finished my B.Tech at Madanapalle Institute of Technology & Science in 2026.",
    'My work is mostly in Python and SQL. I use Pandas and NumPy to clean and explore data, and Scikit-learn to build and test models like regression, classification and Random Forest. I also work on computer vision with OpenCV and YOLOv11, and I make charts and dashboards with Matplotlib, Seaborn, Power BI and Tableau.',
    'Two of my main projects: a system that watches live video and detects 13 kinds of wild animals to protect livestock, where I checked detections across consecutive frames to cut down false alarms, and a model that predicts maize yield from rainfall, temperature, humidity, soil and fertilizer data, with a small Flask and React page where you can enter values and see the prediction.',
    'I have done two internships. At Edufer Technologies I was an AI and ML intern from December 2025 to April 2026, cleaning data, building models and sharing what I found with the team. In summer 2024 I did a remote Python internship at Inspire Softech Solutions, writing scripts to process data and automate tasks. I also hold HackerRank certificates in SQL and Python.',
    "I'm looking for an entry-level role in data and AI, such as data analyst, data scientist, data engineer, AI engineer, business analyst or ML engineer, where I can keep learning and work on real problems.",
  ],
};
// Skills are shown in fixed groups (same categories as the resume, plus AWS).
// `logo` is a file name in src/assets/skills (without .svg). `chips` are skills without a logo.
export const skillGroups = [
  {
    title: 'Languages & Libraries',
    logos: [
      { name: 'Python', logo: 'python' },
      { name: 'SQL', logo: 'sql' },
      { name: 'Pandas', logo: 'pandas' },
      { name: 'NumPy', logo: 'numpy' },
    ],
  },
  {
    title: 'Machine Learning',
    logos: [{ name: 'Scikit-learn', logo: 'scikitlearn' }],
    chips: ['Regression', 'Classification', 'Random Forest', 'Feature Engineering', 'Model Evaluation'],
  },
  {
    title: 'Deep Learning & Computer Vision',
    logos: [
      { name: 'YOLOv11', logo: 'ultralytics' },
      { name: 'OpenCV', logo: 'opencv' },
    ],
    chips: ['CNNs'],
  },
  {
    title: 'Statistics & Analysis',
    chips: ['EDA', 'Hypothesis Testing', 'Probability', 'A/B Testing', 'Data Cleaning & Preprocessing'],
  },
  {
    title: 'Data Visualization',
    logos: [
      { name: 'Matplotlib', logo: 'matplotlib' },
      { name: 'Seaborn', logo: 'seaborn' },
      { name: 'Power BI', logo: 'powerbi' },
      { name: 'Tableau', logo: 'tableau' },
    ],
  },
  {
    title: 'Cloud Computing',
    logos: [
      { name: 'Google Cloud', logo: 'googlecloud' },
      { name: 'AWS', logo: 'aws' },
    ],
  },
  {
    title: 'Tools & Platforms',
    logos: [
      { name: 'Linux', logo: 'linux' },
      { name: 'Git', logo: 'git' },
      { name: 'GitHub', logo: 'github' },
      { name: 'Jupyter', logo: 'jupyter' },
      { name: 'Colab', logo: 'googlecolab' },
      { name: 'VS Code', logo: 'vscode' },
      { name: 'Flask', logo: 'flask' },
      { name: 'React', logo: 'react' },
    ],
  },
];

const aiProjects = [
  {
    title: 'Livestock Farm Protection from Harmful Wild Animals Using YOLOv11',
    repo: 'https://github.com/devanbeeda/wildlife-detection-temporal-consistency',
    visual: 'detect',
    points: [
      'Real-time monitoring system that detects and classifies 13 categories of wild animals from live video streams.',
      'Applies temporal consistency across consecutive frames to reduce false positives and keep detections stable.',
      'Detection thresholds tuned to balance precision and recall for real-world deployment.',
    ],
    stack: [
      { name: 'Python', logo: 'python' },
      { name: 'YOLOv11', logo: 'ultralytics' },
      { name: 'OpenCV', logo: 'opencv' },
      { name: 'NumPy', logo: 'numpy' },
      { name: 'Pandas', logo: 'pandas' },
    ],
  },
  {
    title: 'Maize Crop Yield Prediction',
    repo: 'https://github.com/devanbeeda/maize-crop-yield-prediction',
    visual: 'regress',
    points: [
      'Random Forest model that predicts maize yield from rainfall, temperature, humidity, soil and fertilizer data, using feature engineering.',
      'Evaluated with standard regression metrics and tuned hyperparameters to reduce prediction error.',
      'Interactive Flask and React web interface to enter parameters and see yield predictions in real time.',
    ],
    stack: [
      { name: 'Python', logo: 'python' },
      { name: 'Scikit-learn', logo: 'scikitlearn' },
      { name: 'Random Forest' },
      { name: 'React', logo: 'react' },
      { name: 'Flask', logo: 'flask' },
    ],
  },
];

// Projects are grouped by category. To add new work later:
//  - add a project to an existing group's `projects` list, or
//  - add a new group, e.g. { title: 'Data Analytics', projects: [ ... ] }
// A project needs: title, repo (link), points (bullets), stack, and visual ('detect' or 'regress'; leave out for none).
export const projectGroups = [
  { title: 'AI & Machine Learning', projects: aiProjects },
  // { title: 'Data Analytics', projects: [] },
];

export const experience = [
  {
    role: 'AI & Machine Learning Intern',
    company: 'Edufer Technologies',
    dates: 'Dec 2025 to Apr 2026',
    points: [
      'Used Python, Pandas and NumPy to clean, preprocess and analyze datasets for predictive modeling tasks.',
      'Built and optimized ML models through feature engineering and evaluation, and turned findings into actionable recommendations with cross-functional teams.',
    ],
  },
  {
    role: 'Python Programming Intern',
    company: 'Inspire Softech Solutions (Remote)',
    dates: 'Jun 2024 to Aug 2024',
    points: [
      'Wrote Python scripts for data processing and automation, applying debugging and data validation to improve accuracy and efficiency.',
    ],
  },
];

export const education = [
  {
    dates: 'Sep 2022 to May 2026',
    title: 'Madanapalle Institute of Technology & Science',
    subtitle: ['Bachelor of Technology', 'Computer Science and Engineering (Artificial Intelligence)'],
  },
  {
    dates: '2020 to 2022',
    title: 'Sunku Usha Gowthami Mem. Jr. College',
    subtitle: ['Intermediate', 'Mathematics, Physics and Chemistry'],
  },
  {
    dates: 'Passed out 2020',
    title: 'ZPHS (Boys), B. Kothakota',
    subtitle: 'Schooling',
  },
];

// Add new certificates here. `url` shows a "View certificate" button.
export const certifications = [
  { name: 'SQL Certification', issuer: 'HackerRank', url: 'https://www.hackerrank.com/certificates/ea424f4a1987' },
  { name: 'Python Certification', issuer: 'HackerRank', url: 'https://www.hackerrank.com/certificates/3df8f19812e5' },
];
