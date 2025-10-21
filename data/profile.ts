export interface Experience {
  company: string;
  role: string;
  start: string;
  end: string;
  description: string;
  technologies?: string[];
}

export interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
  description?: string;
  gpa?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
  expiryDate?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  repo?: string;
  demo?: string;
  image?: string;
}

export interface Social {
  linkedin?: string;
  github?: string;
  website?: string;
  email?: string;
  youtube?: string;
  telegram?: string;
  instagram?: string;
  tiktok?: string;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  avatar: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
  social: Social;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalUrl: string;
  };
}

// Base path for GitHub Pages deployment
const basePath = process.env.NODE_ENV === 'production' ? '/CV' : '';

export const profile: Profile = {
  name: 'Omar Mohamed',
  title: 'High School Student | English Tutor & Content Creator',
  location: 'Mielec, Podkarpackie, Poland',
  email: 'omarrmohamedd05@gmail.com',
  phone: '+48 733 790 952',
  summary:
    'Motivated and adaptable high school student who thrives on learning quickly and applying knowledge effectively. I enjoy working in collaborative environments where I can contribute fresh ideas while taking ownership of my responsibilities. Detail-oriented and reliable, yet flexible enough to keep growing both personally and professionally to deliver the best results in whatever I take on. "I am a simple person" - passionate about teaching English to beginners and creating educational content.',
  avatar: `${basePath}/avatar.jpg`,

  experience: [
    {
      company: 'Bright Stars Academy',
      role: 'English Teacher Assistant',
      start: '2024-01',
      end: '2025-01',
      description:
        "Assisted in planning and delivering engaging English lessons for children aged 4–10, focusing on communication skills, vocabulary building, and pronunciation. Supported classroom activities through games, songs, storytelling, and creative exercises to make learning enjoyable and interactive. Helped manage classroom behavior and maintained a positive, encouraging learning environment. Collaborated with senior teachers to adapt materials and teaching methods for different learning styles and levels. Encouraged students' confidence in speaking English through daily routines and group activities.",
      technologies: [
        'Teaching',
        'Classroom Management',
        'Lesson Planning',
        'Communication Skills',
        'Vocabulary Building',
      ],
    },
    {
      company: 'YouTube - English with Omar',
      role: 'English Tutor & Content Creator',
      start: '2023-01',
      end: 'Present',
      description:
        'Launched the YouTube channel @english_with_omarr in 2023 to teach English to beginners. Created 140+ educational videos with clear explanations and examples to help students understand English grammar and concepts effectively.',
      technologies: ['YouTube', 'Video Editing', 'CapCut', 'Content Strategy'],
    },
    {
      company: 'Telegram - English with Omar',
      role: 'Community Organizer & Mentor',
      start: '2023-02',
      end: 'Present',
      description:
        'Built and manage a Telegram study community with 897 subscribers focused on English lessons for secondary students. Share study materials, lesson notes, live exams, and quick language tips to support interactive learning.',
      technologies: [
        'Telegram',
        'Community Management',
        'E-Learning',
        'Live Teaching',
      ],
    },
    {
      company: 'TikTok - English with Omar',
      role: 'Short-form Content Creator',
      start: '2025-08-05',
      end: 'Present',
      description:
        'Create short-form educational content on TikTok to simplify English for beginners and promote longer-form lessons. Work with trends to increase engagement.',
      technologies: [
        'TikTok',
        'Scripting',
        'Video Editing',
        'Content Creation',
      ],
    },
  ],

  education: [
    {
      school: 'Worls TESOL Academy',
      degree: '120-Hour TESOL / TEFL Certificate',
      start: '2025-01',
      end: '2025-03',
      description:
        'Completed comprehensive 120-hour TESOL/TEFL certification training in London, UK. Focused on pedagogy, classroom management, lesson planning, and practical teaching methodologies for teaching English as a second language.',
    },
    {
      school: 'Martyr Colonel Ahmed Jaber Nassar Secondary School for Boys A',
      degree: 'High School Diploma in General Secondary Education',
      start: '2022-09',
      end: 'Present',
      description:
        'Currently pursuing high school education with focus on developing time management, research skills, communication, teamwork, leadership, and computer literacy. Maintaining strong academic performance while engaging in extracurricular activities.',
    },
    {
      school: 'Abdul Latif Hassanein Preparatory School',
      degree: 'Middle School Diploma in General Education',
      start: '2019-09',
      end: '2022-05',
      description:
        'Focused on science and mathematics, continued English learning, participated in inter-school competitions and club activities. Developed critical thinking, scientific reasoning, problem solving, teamwork, and study skills.',
    },
    {
      school: 'Abdul Latif Hassanein Basic Education Complex',
      degree: 'Primary School Education',
      start: '2013-09',
      end: '2019-05',
      description:
        'Participated in school football team, choir, science club, art club, and end-of-year performances. Focused on Arabic and math fundamentals, basic English, science, and social studies. Developed foundational skills in English literature, Egyptian Arabic, numeracy, teamwork, and presentation skills.',
    },
    {
      school: 'Abdul Latif Hassanein Basic Education Complex',
      degree: 'Early Childhood Education',
      start: '2011-09',
      end: '2013-05',
      description:
        'Early learning program with activities in playgroup, basic art & crafts, circle time, outdoor play, and early reading. Focused on foundational literacy, numeracy, social skills, group activities, and art projects.',
    },
  ],

  skills: [
    { name: 'Teaching English', level: 90, category: 'Teaching' },
    { name: 'Content Creation', level: 90, category: 'Digital' },
    { name: 'Educational Writing', level: 85, category: 'Digital' },
    { name: 'Community Management', level: 85, category: 'Digital' },
    { name: 'Online Tutoring', level: 85, category: 'Teaching' },
    { name: 'Video Editing', level: 80, category: 'Digital' },
    { name: 'Scriptwriting', level: 75, category: 'Digital' },
    { name: 'Communication', level: 95, category: 'Soft Skills' },
    { name: 'Presentation Skills', level: 90, category: 'Soft Skills' },
    { name: 'Problem Solving', level: 85, category: 'Soft Skills' },
    { name: 'Critical Thinking', level: 85, category: 'Soft Skills' },
    { name: 'Adaptability', level: 90, category: 'Soft Skills' },
    { name: 'Teamwork', level: 90, category: 'Soft Skills' },
    { name: 'Leadership', level: 80, category: 'Soft Skills' },
    { name: 'Creativity', level: 85, category: 'Soft Skills' },
    { name: 'Time Management', level: 85, category: 'Soft Skills' },
    { name: 'Research Skills', level: 80, category: 'Soft Skills' },
    { name: 'Canva', level: 80, category: 'Tools' },
    { name: 'CapCut', level: 80, category: 'Tools' },
    { name: 'Zoom', level: 85, category: 'Tools' },
    { name: 'Google Meet', level: 85, category: 'Tools' },
    { name: 'Microsoft Teams', level: 80, category: 'Tools' },
    { name: 'Arabic', level: 100, category: 'Languages' },
    { name: 'English', level: 85, category: 'Languages' },
    { name: 'Polish', level: 30, category: 'Languages' },
  ],

  certifications: [
    {
      name: '120-Hour TESOL / TEFL Certificate',
      issuer: 'Worls TESOL Academy',
      date: '2025-03',
    },
    {
      name: '3rd Place - III Chess Tournament LKS "START" Wola Mielecka',
      issuer: 'LKS "START" Wola Mielecka',
      date: '2024-09-14',
    },
    {
      name: '2nd Place - Tournament No. 5, 10th Edition Mielec School Chess League 2024 (Boys U19)',
      issuer: 'Mielec School Chess League - SDK-Lotnik',
      date: '2024-06-15',
    },
    {
      name: '3rd Place - Tournament No. 4, 10th Edition Mielec School Chess League 2024 (Boys U19)',
      issuer: 'Mielec School Chess League - SDK-Lotnik',
      date: '2024-05-16',
    },
    {
      name: '4th Place - General Classification, Mielec School Chess League 2024/2025 (Boys U19)',
      issuer: 'Mielec School Chess League - SDK-Lotnik',
      date: '2024-06-30',
    },
    {
      name: '3rd Place - Tournament No. 2, 10th Edition Mielec School Chess League 2024 (Boys U19)',
      issuer: 'Mielec School Chess League - SDK-Lotnik',
      date: '2024-03-16',
    },
    {
      name: 'IELTS Academic',
      issuer: 'British Council / IDP: IELTS UK',
      date: '2025-10-20',
    },
  ],

  projects: [
    {
      name: 'YouTube Educational Channel - English with Omar',
      description:
        'Created a comprehensive YouTube channel dedicated to providing educational English content for students. As content creator and presenter, I prepare lessons, write scripts, record videos, and edit them to help students understand English clearly and study effectively. Launched in 2023, focusing on simplifying English for beginners.',
      technologies: [
        'YouTube',
        'Video Editing',
        'Content Creation',
        'Educational Design',
        'CapCut',
      ],
      demo: 'https://www.youtube.com/@english_with_omarr',
      image: `${basePath}/projects/youtube-channel.svg`,
    },
    {
      name: 'Telegram Study Community - English with Omar',
      description:
        'Launched comprehensive Telegram channels with 897 subscribers for secondary students. Main channel (t.me/english_with_omarr) focuses on English lessons, study materials, lesson notes, live exams, and practice tests with emphasis on grammar and quick language tips. Additional channel (t.me/Omar2007S) provides chess strategies and handwriting tips. As organizer and mentor, I prepare and share content, organize live exams, and guide students to create supportive and interactive online learning communities.',
      technologies: [
        'Telegram',
        'Community Management',
        'Educational Content',
        'Live Teaching',
      ],
      demo: 'https://t.me/english_with_omarr',
      image: `${basePath}/projects/telegram-community.svg`,
    },
    {
      name: 'TikTok Educational Content - English with Omar',
      description:
        'Create engaging short-form educational videos on TikTok to simplify English for beginners. Use trending formats and creative storytelling to make English learning accessible and fun while promoting longer-form lessons on YouTube. Focus on quick tips, grammar explanations, and vocabulary building through viral content strategies.',
      technologies: [
        'TikTok',
        'Video Editing',
        'Content Creation',
        'Scriptwriting',
        'CapCut',
      ],
      demo: 'https://www.tiktok.com/@englishwithomar3',
      image: `${basePath}/projects/tiktok-content.svg`,
    },
  ],

  social: {
    linkedin: 'https://www.linkedin.com/in/omarmohameden/',
    github: 'https://github.com/omarmohamed05',
    youtube: 'https://www.youtube.com/@english_with_omarr',
    telegram: 'https://t.me/english_with_omarr',
    tiktok: 'https://www.tiktok.com/@englishwithomar3',
    website: 'https://omar-mohamed.dev',
    email: 'omarrmohamedd05@gmail.com',
  },

  seo: {
    title:
      'Omar Mohamed - High School Student | English Tutor & Content Creator',
    description:
      'High school student, English tutor, and content creator from Egypt, now in Mielec, Poland. Teaching English to beginners through YouTube (859 subscribers, 21.2k views) and Telegram (897 subscribers). Specializing in simplifying complex English concepts for secondary students.',
    keywords: [
      'omar mohamed',
      'english tutor',
      'content creator',
      'high school student',
      'english learning',
      'online teaching',
      'educational content',
      'youtube educator',
      'telegram teacher',
      'mielec',
      'poland',
      'egypt',
      'teaching english',
      'chess player',
    ],
    canonicalUrl: 'https://omar-mohamed.dev',
  },
};
