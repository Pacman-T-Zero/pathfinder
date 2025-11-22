import React, { useState, useEffect, useRef } from 'react';
import { User, Sparkles, BookOpen, MapPin, RefreshCw, GraduationCap, Brain, BatteryCharging, PlayCircle, ExternalLink, ChevronRight, Clock, Target, CheckCircle, AlertTriangle, Building2, Wallet, ChevronDown, ChevronUp, Shuffle } from 'lucide-react';

// --- THEMES & ASSETS ---
const THEME = {
  colors: {
    bg: "bg-[#F5F2EB]",
    chatBg: "bg-[#EAE7DE]", 
    primary: "bg-[#C64D3E]", // Terra Cotta
    secondary: "bg-[#2C3E50]", // Deep Slate
    accent: "bg-[#D4A373]", // Gold
    textMain: "text-[#1A1A1A]",
    textMuted: "text-[#555555]",
    bubbleBot: "bg-[#FFFFFF] border border-[#D1D1D1]",
    bubbleUser: "bg-[#2C3E50] text-white",
  },
  fonts: {
    header: "font-serif", 
    body: "font-sans",    
  }
};

// --- DATA: CAREER CLUSTERS ---
const CAREER_CLUSTERS = {
  ENG: {
    id: 'eng',
    title: "Engineering & Built Environment",
    desc: "Designing systems, structures, and solutions for the physical world.",
    unis: ["UP (Tuks)", "Stellenbosch", "Wits", "UCT"],
    reality: "Requires high Maths/Physics aptitude. Work is often on-site or project-based. High pressure but tangible results.",
    roles: ["Civil Engineer", "Mechatronics", "Electrical Engineer", "Industrial Engineer"],
    salary: { entry: "R300k - R450k", senior: "R1.2m - R2.5m+" },
    companies: { top: ["Sasol", "Anglo American", "Eskom"], alt: ["Zutari", "Murray & Roberts", "Transnet"] },
    videos: [
      { title: "Life of a Mining Engineering Student (UNISA)", url: "https://www.youtube.com/watch?v=D-xI3qVAg5o" },
      { title: "Day in the Life of a Civil Engineer", url: "https://www.youtube.com/watch?v=MmFIl7nJVCs" }
    ]
  },
  HEALTH: {
    id: 'health',
    title: "Health & Life Sciences",
    desc: "Diagnosing, treating, and caring for people or understanding biological systems.",
    unis: ["UCT (Health Sci)", "Wits (Medical School)", "SMU", "UKZN"],
    reality: "Long study path (6+ years). Requires empathy + strong stomach. Public service (Com Serve) is mandatory in SA.",
    roles: ["Medicine (MBChB)", "Physiotherapy", "Occupational Therapy", "Biomedical Sci"],
    salary: { entry: "R550k (Com Serv)", senior: "R1.8m - R3m+ (Specialist)" },
    companies: { top: ["Netcare", "Mediclinic", "Discovery Health"], alt: ["State Hospitals", "NHLS", "Clicks/Dis-Chem"] },
    videos: [
      { title: "Day in the Life: Doctor in Rural Limpopo", url: "https://www.youtube.com/watch?v=-43J071yDYg" },
      { title: "Medical Student Life at Sefako Makgatho", url: "https://www.youtube.com/watch?v=V6HkWTx54EU" }
    ]
  },
  TECH: {
    id: 'tech',
    title: "Computer Science & AI",
    desc: "Building the digital tools, software, and intelligence of the future.",
    unis: ["UCT", "UJ", "Wits", "Stellenbosch"],
    reality: "Fastest growing sector in SA. High flexibility (remote work). Continuous learning is required as tech changes fast.",
    roles: ["Software Dev", "Data Scientist", "AI Specialist", "Systems Analyst"],
    salary: { entry: "R360k - R500k", senior: "R1.5m - R2.8m (Global Remote)" },
    companies: { top: ["Amazon AWS", "Takealot", "Discovery Bank"], alt: ["BBD", "Investec", "Standard Bank Tech"] },
    videos: [
      { title: "Software Engineer Working from Home (SA)", url: "https://www.youtube.com/watch?v=_wJi5If-5rY" },
      { title: "Data Scientist & Dev in South Africa", url: "https://www.youtube.com/watch?v=8c4oeWsk8JA" }
    ]
  },
  EARTH: {
    id: 'earth',
    title: "Earth, Mining & Environment",
    desc: "Managing natural resources, geology, and environmental sustainability.",
    unis: ["Rhodes", "Wits (Mining)", "UWC", "UP"],
    reality: "Often involves travel or remote sites. Crucial for SA's mining economy and future climate resilience.",
    roles: ["Geologist", "Environmental Consultant", "GIS Specialist", "Mining Engineer"],
    salary: { entry: "R400k - R550k (Mining)", senior: "R1.4m - R2.2m" },
    companies: { top: ["Glencore", "De Beers", "Gold Fields"], alt: ["Environmental Consultancies", "Council for Geoscience", "SanParks"] },
    videos: [
      { title: "Diary of a Junior Geologist in SA", url: "https://www.youtube.com/watch?v=IRuen7Es0cE" },
      { title: "Meet Naledi: Mining Engineer at Anglo American", url: "https://www.youtube.com/watch?v=Fe-PBFcKF8w" }
    ]
  },
  SCIENCE: {
    id: 'science',
    title: "Pure & Applied Sciences",
    desc: "Research, laboratory work, and discovering new knowledge.",
    unis: ["UCT", "Wits", "Stellenbosch", "Rhodes"],
    reality: "Often requires Masters/PhD for high-level careers. Work is lab or academia based.",
    roles: ["Chemist", "Astrophysicist", "Biochemist", "Researcher"],
    salary: { entry: "R250k (Academic) - R400k (Industry)", senior: "R900k - R1.5m" },
    companies: { top: ["CSIR", "Sasol (R&D)", "PathCare"], alt: ["Universities", "SANSA", "Brewing/Food Corps"] },
    videos: [
      { title: "Day in the Life of a Data Scientist", url: "https://www.youtube.com/watch?v=F_Fzo87GKU4" },
      { title: "Geology Research at UP", url: "https://www.up.ac.za/research-matters/news/multimedia-3198751-a-day-in-the-life-of-a-geologist" }
    ]
  }
};

// --- DATA: STUDY ADVICE PROFILES ---
const STUDY_PROFILES = {
  PASSIVE: {
    title: "The Passive Absorber",
    desc: "You likely read the textbook over and over. This works in High School but fails at Uni.",
    advice: "Switch to 'Active Recall'. Close the book and try to teach the concept to an empty chair. If you can't explain it simply, you don't know it."
  },
  CRAMMER: {
    title: "The Adrenaline Crammer",
    desc: "You rely on pressure to focus. At university, the volume of work makes cramming impossible.",
    advice: "Use 'Spaced Repetition'. Review material 1 day, 3 days, and 7 days after learning it. Use tools like Anki or Quizlet."
  },
  BALANCED: {
    title: "The Balanced Strategist",
    desc: "You have solid foundations, but Uni requires efficiency.",
    advice: "Optimise with the 'Pomodoro Technique' (25min work, 5min break) and focus on Past Papers earlier in the semester."
  }
};

// --- DATA: LARGE QUESTION POOLS (FOR RANDOMIZATION) ---
const CAREER_QUESTION_POOL = [
  { text: "If you could download one skill instantly into your brain, which would you choose?", options: [{label: "Speak every language.", scores: {health: 2, science: 1}}, {label: "Fix any machine instantly.", scores: {eng: 3}}, {label: "Code any software.", scores: {tech: 3}}, {label: "Understand rock formations/weather.", scores: {earth: 3}}] },
  { text: "A pipe bursts in your house. What is your immediate reaction?", options: [{label: "Call a plumber, I don't touch mess.", scores: {tech: 1, science: 1}}, {label: "Try to find the valve and fix it myself.", scores: {eng: 3}}, {label: "Make sure everyone is safe/dry first.", scores: {health: 3}}] },
  { text: "Do you prefer the 'Idea' of things or the 'Reality' of things?", options: [{label: "The Idea (Theory/Abstract).", scores: {tech: 2, science: 3}}, {label: "The Reality (Physical/Touch).", scores: {eng: 2, health: 2, earth: 2}}] },
  { text: "How do you handle isolation?", options: [{label: "I love being alone with my thoughts.", scores: {tech: 3, science: 2}}, {label: "I need people around me to function.", scores: {health: 3}}, {label: "I don't mind it if I'm busy working.", scores: {eng: 1, earth: 2}}] },
  { text: "Which documentary title sounds most appealing?", options: [{label: "'The Code That Changed The World'", scores: {tech: 3}}, {label: "'Megastructures: Building Bridges'", scores: {eng: 3}}, {label: "'The Secret Life of Cells'", scores: {health: 2, science: 2}}, {label: "'Mining the Deep Earth'", scores: {earth: 3}}] },
  { text: "Would you rather work in a sterile lab or a muddy field?", options: [{label: "Sterile Lab.", scores: {science: 3, health: 2, tech: 1}}, {label: "Muddy Field.", scores: {earth: 3, eng: 2}}, {label: "Neither, give me an office.", scores: {tech: 2}}] },
  { text: "Do you care more about 'Why' it happens or 'How' to fix it?", options: [{label: "Why it happens (Curiosity).", scores: {science: 3}}, {label: "How to fix it (Application).", scores: {eng: 3, health: 2, tech: 2}}] },
  { text: "If you were a video game character, what are your stats?", options: [{label: "High Intelligence, Low Strength.", scores: {tech: 2, science: 2}}, {label: "High Stamina, High Wisdom.", scores: {health: 2, earth: 2}}, {label: "Balanced Build.", scores: {eng: 2}}] },
  { text: "How much does 'money' drive your decision?", options: [{label: "It's the #1 factor.", scores: {tech: 2, eng: 2}}, {label: "It matters, but happiness is #1.", scores: {health: 1, earth: 1}}, {label: "I want to discover things, money is secondary.", scores: {science: 3}}] },
  { text: "Are you detail-oriented or big-picture?", options: [{label: "Tiny Details (Micro).", scores: {tech: 2, science: 2, health: 1}}, {label: "Big Picture (Macro).", scores: {eng: 2, earth: 2}}] },
  { text: "Would you work on a project that takes 5 years to finish?", options: [{label: "Yes, I have patience.", scores: {science: 2, eng: 2}}, {label: "No, I need quick wins.", scores: {tech: 3, health: 1}}] },
  { text: "How do you feel about standard 9-5 office hours?", options: [{label: "I want flexibility/remote work.", scores: {tech: 3}}, {label: "I prefer a set shift structure.", scores: {health: 2, eng: 1}}, {label: "I don't mind irregular hours (field work).", scores: {earth: 2, eng: 1}}] },
  { text: "Do you enjoy debating ethics (right vs wrong)?", options: [{label: "Yes, deeply.", scores: {health: 3, science: 1}}, {label: "Not really, facts are facts.", scores: {eng: 2, tech: 1, earth: 1}}] },
  { text: "Pick a tool:", options: [{label: "Microscope.", scores: {science: 3, health: 2}}, {label: "Laptop.", scores: {tech: 3}}, {label: "Hammer/Wrench.", scores: {eng: 3, earth: 1}}, {label: "Compass/Map.", scores: {earth: 3}}] },
  { text: "How good are you at explaining complex things to simple people?", options: [{label: "Very good.", scores: {health: 2, eng: 1}}, {label: "I struggle, I get technical.", scores: {tech: 2, science: 2}}] },
  { text: "Do you get travel sickness?", options: [{label: "Yes, bad.", scores: {tech: 1, science: 1}}, {label: "No, I have an iron stomach.", scores: {earth: 2, eng: 1, health: 1}}] },
  { text: "If you fail a test, what do you do?", options: [{label: "Cry, then study harder.", scores: {health: 1}}, {label: "Analyze exactly where I lost marks.", scores: {eng: 2, tech: 2}}, {label: "Blame the teacher.", scores: {}}] },
  { text: "Do you like 3D Design / drawing plans?", options: [{label: "Yes, I love geometry.", scores: {eng: 3}}, {label: "No, I prefer algebra/code.", scores: {tech: 2, science: 1}}] },
  { text: "Are you squeamish about dirt/dust?", options: [{label: "Yes.", scores: {tech: 1, health: 1, science: 1}}, {label: "No.", scores: {eng: 1, earth: 3}}] },
  { text: "If you could build a robot, what would it do?", options: [{label: "Perform surgery with precision.", scores: {health: 2, eng: 1}}, {label: "Explore Mars.", scores: {earth: 2, science: 2}}, {label: "Automate boring tasks.", scores: {tech: 3}}] },
  { text: "You are in a bookstore. Which section do you visit first?", options: [{label: "Sci-Fi / Fantasy.", scores: {tech: 2, science: 1}}, {label: "Biographies / History.", scores: {health: 2}}, {label: "How-To / DIY Manuals.", scores: {eng: 3}}] },
  { text: "What matters more: The journey or the destination?", options: [{label: "The Destination (Results).", scores: {eng: 2, tech: 2}}, {label: "The Journey (Process).", scores: {science: 3, health: 2}}] },
  { text: "Do you trust your gut feeling or data sheets?", options: [{label: "My Gut (Intuition).", scores: {health: 2, earth: 1}}, {label: "Data Sheets (Facts).", scores: {eng: 2, tech: 2, science: 2}}] },
  { text: "Would you rather solve a crime using...", options: [{label: "DNA evidence & Lab tests.", scores: {science: 3, health: 1}}, {label: "Hacking surveillance cameras.", scores: {tech: 3}}, {label: "Mapping the crime scene.", scores: {earth: 2}}] },
  { text: "How do you feel about rules?", options: [{label: "They keep us safe.", scores: {eng: 2, health: 2}}, {label: "They are meant to be tested.", scores: {tech: 2, science: 2}}] },
  { text: "A historic building is crumbling. Do you...", options: [{label: "Demolish and build something modern/safe.", scores: {eng: 3}}, {label: "Try to restore and preserve the history.", scores: {earth: 2, science: 1}}] },
  { text: "Do you enjoy assembling IKEA furniture?", options: [{label: "Yes, I love following the diagram.", scores: {eng: 3}}, {label: "No, I hate physical tasks.", scores: {tech: 2, science: 1}}] },
  { text: "Climate Change solutions: Which approach do you trust more?", options: [{label: "New Technology (Carbon Capture).", scores: {tech: 2, eng: 2}}, {label: "Restoring Nature (Forests/Oceans).", scores: {earth: 3, science: 1}}] },
  { text: "Do you prefer biology or physics?", options: [{label: "Biology (Life).", scores: {health: 3, earth: 1}}, {label: "Physics (Forces).", scores: {eng: 3, science: 2}}] }
];

const STUDY_QUESTION_POOL = [
  { text: "When you study for a big exam, what does your desk look like?", options: [{label: "Organized chaos, notes everywhere.", score: 2}, {label: "Minimalist, just the book and pen.", score: 3}, {label: "I study in bed.", score: 1}] },
  { text: "How do you use your textbook?", options: [{label: "I highlight almost everything.", score: 1}, {label: "I read summaries only.", score: 1}, {label: "I close it and try to recall facts.", score: 3}] },
  { text: "It's 2 weeks before finals. What are you doing?", options: [{label: "Chilling, I'll study next week.", score: 1}, {label: "Doing past papers under timed conditions.", score: 3}, {label: "Re-reading my notes.", score: 2}] },
  { text: "What is your phone doing while you work?", options: [{label: "Next to me, face up.", score: 1}, {label: "In another room / Focus mode.", score: 3}, {label: "I use it to listen to music.", score: 2}] },
  { text: "If you don't understand a concept in class, you:", options: [{label: "Hope it's not in the exam.", score: 1}, {label: "Ask the teacher immediately.", score: 3}, {label: "Google it later.", score: 2}] },
  { text: "How long can you focus before your brain wanders?", options: [{label: "10 minutes max.", score: 1}, {label: "About 25-45 minutes.", score: 3}, {label: "Hours, but I get exhausted.", score: 2}] },
  { text: "Do you use a study timetable?", options: [{label: "Yes, and I stick to it.", score: 3}, {label: "Yes, but I ignore it.", score: 1}, {label: "No, I wing it.", score: 1}] },
  { text: "Memorization style:", options: [{label: "I re-write notes 100 times.", score: 1}, {label: "I use flashcards / Spaced Repetition.", score: 3}, {label: "I just read it.", score: 1}] },
  { text: "Group studying:", options: [{label: "We mostly just chat.", score: 1}, {label: "We quiz each other.", score: 3}, {label: "I prefer studying alone.", score: 2}] },
  { text: "Uni Reality Check: If you have 3 assignments due on the same day, what do you do?", options: [{label: "Panic / Pull an all-nighter.", score: 1}, {label: "Start weeks in advance.", score: 3}, {label: "Ask for an extension.", score: 1}] },
  { text: "Do you listen to lyrical music while studying?", options: [{label: "Yes, I sing along.", score: 1}, {label: "No, only lo-fi or silence.", score: 3}, {label: "Sometimes.", score: 2}] },
  { text: "How do you handle 'boring' subjects?", options: [{label: "I procrastinate until the last minute.", score: 1}, {label: "I mix them with subjects I like.", score: 3}, {label: "I force myself to suffer through.", score: 2}] },
  { text: "Do you study in the morning or late at night?", options: [{label: "Morning, fresh brain.", score: 3}, {label: "Late night, zombie mode.", score: 1}, {label: "Whenever I find time.", score: 2}] },
  { text: "When taking notes, do you...", options: [{label: "Copy exactly what the teacher says.", score: 1}, {label: "Summarize in my own words.", score: 3}, {label: "Take photos of the board.", score: 2}] },
  { text: "After you finish a chapter, do you...", options: [{label: "Move immediately to the next.", score: 1}, {label: "Take a quiz to check understanding.", score: 3}, {label: "Take a long break.", score: 2}] }
];

const getRandomQuestions = (pool, count) => {
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
};

// --- COMPONENT: TYPING INDICATOR ---
const TypingIndicator = () => (
  <div className="flex gap-1 p-2 bg-white rounded-xl w-fit border border-gray-200 items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
  </div>
);

// --- MAIN COMPONENT ---
export default function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [phase, setPhase] = useState('INTRO'); 
  const [activeCareerQuestions, setActiveCareerQuestions] = useState([]);
  const [activeStudyQuestions, setActiveStudyQuestions] = useState([]);
  const [careerQIndex, setCareerQIndex] = useState(0);
  const [studyQIndex, setStudyQIndex] = useState(0);
  const [careerScores, setCareerScores] = useState({ eng: 0, health: 0, tech: 0, earth: 0, science: 0 });
  const [studyScoreTotal, setStudyScoreTotal] = useState(0);
  const [expandedResults, setExpandedResults] = useState({}); 

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, expandedResults]);

  useEffect(() => {
    if (messages.length === 0) {
      initializeSession();
    }
  }, []);

  const initializeSession = () => {
    setActiveCareerQuestions(getRandomQuestions(CAREER_QUESTION_POOL, 20));
    setActiveStudyQuestions(getRandomQuestions(STUDY_QUESTION_POOL, 10));
    startIntro();
  };

  const addBotMessage = (text, delay = 0, options = null, type = 'text', data = null) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text, options, type, data }]);
    }, delay);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { sender: 'user', text }]);
  };

  const startIntro = () => {
    addBotMessage("Sawubona, Lesedi! Welcome back. 👋", 500);
    addBotMessage("I've shuffled the questions to keep things fresh.", 1500);
    addBotMessage("We have 2 missions today:", 2500);
    addBotMessage("1. Find your ideal STEM career path (20 Questions).", 3500);
    addBotMessage("2. Test your Uni-Readiness (10 Questions).", 4500);
    addBotMessage("Ready to roll the dice?", 5500, [{ label: "Let's go!", action: 'START_CAREER' }]);
  };

  const handleOptionClick = (option) => {
    addUserMessage(option.label);

    if (phase === 'CAREER_QUIZ' || option.action === 'START_CAREER') {
      if (option.action === 'START_CAREER') {
        setPhase('CAREER_QUIZ');
        askCareerQuestion(0);
        return;
      }
      
      if (option.scores) {
        setCareerScores(prev => {
          const newScores = { ...prev };
          Object.keys(option.scores).forEach(k => {
             if (newScores[k] !== undefined) newScores[k] += option.scores[k];
          });
          return newScores;
        });
      }

      const nextIdx = careerQIndex + 1;
      if (nextIdx < activeCareerQuestions.length) {
        setCareerQIndex(nextIdx);
        askCareerQuestion(nextIdx);
      } else {
        finishCareerQuiz();
      }
    }
    else if (phase === 'STUDY_QUIZ' || option.action === 'START_STUDY') {
      if (option.action === 'START_STUDY') {
        setPhase('STUDY_QUIZ');
        addBotMessage("Great choice. Let's test those habits.", 500);
        setTimeout(() => askStudyQuestion(0), 1500);
        return;
      }

      if (option.score) {
        setStudyScoreTotal(prev => prev + option.score);
      }

      const nextIdx = studyQIndex + 1;
      if (nextIdx < activeStudyQuestions.length) {
        setStudyQIndex(nextIdx);
        askStudyQuestion(nextIdx);
      } else {
        finishStudyQuiz();
      }
    }
  };

  const askCareerQuestion = (index) => {
    const q = activeCareerQuestions[index];
    addBotMessage(q.text, 800, q.options);
  };

  const askStudyQuestion = (index) => {
    const q = activeStudyQuestions[index];
    addBotMessage(q.text, 600, q.options);
  };

  const finishCareerQuiz = () => {
    setPhase('CAREER_RESULTS');
    addBotMessage("Analyzing your profile against SA Market Data...", 1000);
    setTimeout(() => {
      const sorted = Object.entries(careerScores).sort((a, b) => b[1] - a[1]);
      const top3 = sorted.slice(0, 3).map(item => CAREER_CLUSTERS[item[0].toUpperCase()]);
      
      addBotMessage("Here are your Top 3 Career Matches for this session:", 0, null, 'career_result', top3);
      addBotMessage("Remember, different answers unlock different paths. Now, what about your habits?", 3000);
      addBotMessage("Do you want to unlock the 'University Readiness' check?", 4000, [{ label: "Yes, check my study habits", action: "START_STUDY" }]);
    }, 2500);
  };

  const finishStudyQuiz = () => {
    setPhase('STUDY_RESULTS');
    addBotMessage("Calculating your University Survival Probability...", 1000);
    setTimeout(() => {
      let profile;
      if (studyScoreTotal <= 16) profile = STUDY_PROFILES.PASSIVE; 
      else if (studyScoreTotal <= 23) profile = STUDY_PROFILES.CRAMMER; 
      else profile = STUDY_PROFILES.BALANCED; 

      addBotMessage("Here is your Study Strategy Report:", 0, null, 'study_result', profile);
    }, 2500);
  };

  const resetApp = () => {
    setMessages([]);
    setPhase('INTRO');
    setCareerQIndex(0);
    setStudyQIndex(0);
    setCareerScores({ eng: 0, health: 0, tech: 0, earth: 0, science: 0 });
    setStudyScoreTotal(0);
    setExpandedResults({});
    initializeSession();
  };

  const toggleResult = (idx) => {
    setExpandedResults(prev => ({...prev, [idx]: !prev[idx]}));
  };

  const renderOptions = (options) => (
    <div className="flex flex-wrap gap-2 mt-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {options.map((opt, idx) => (
        <button key={idx} onClick={() => handleOptionClick(opt)} className={`px-4 py-3 text-left rounded-xl text-sm md:text-base border transition-all duration-200 shadow-sm w-full md:w-auto ${THEME.colors.bg} border-stone-300 hover:border-[#C64D3E] hover:text-[#C64D3E] hover:bg-white text-stone-700`}>
          {opt.label}
        </button>
      ))}
    </div>
  );

  const renderSalaryCard = (career) => (
    <div className="bg-stone-100 rounded-lg p-4 mt-3 border border-stone-200 text-sm">
        <div className="flex items-center gap-2 mb-3 text-[#2C3E50] font-bold border-b border-stone-200 pb-2">
            <Wallet size={16} className="text-[#D4A373]" /> 
            <span>Salary Expectations (SA)</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
                <span className="text-[10px] uppercase tracking-wide text-stone-500">Entry Level</span>
                <p className="font-bold text-stone-700">{career.salary.entry}</p>
            </div>
            <div>
                <span className="text-[10px] uppercase tracking-wide text-stone-500">Senior Level</span>
                <p className="font-bold text-stone-700">{career.salary.senior}</p>
            </div>
        </div>
        <div className="flex items-center gap-2 mb-2 text-[#2C3E50] font-bold border-b border-stone-200 pb-2">
            <Building2 size={16} className="text-[#D4A373]" /> 
            <span>Potential Employers</span>
        </div>
        <div className="space-y-2">
            <div>
                 <span className="text-[10px] uppercase tracking-wide text-[#C64D3E] font-bold">Top Paying / Leaders</span>
                 <div className="flex flex-wrap gap-1 mt-1">
                    {career.companies.top.map(c => <span key={c} className="bg-white px-2 py-1 rounded border border-stone-200 text-xs">{c}</span>)}
                 </div>
            </div>
            <div>
                 <span className="text-[10px] uppercase tracking-wide text-stone-500 font-bold">Stable Alternatives</span>
                 <div className="flex flex-wrap gap-1 mt-1">
                    {career.companies.alt.map(c => <span key={c} className="bg-stone-200/50 px-2 py-1 rounded border border-stone-200 text-xs">{c}</span>)}
                 </div>
            </div>
        </div>
    </div>
  );

  const renderCareerResult = (data) => (
    <div className="w-full max-w-2xl mt-4 space-y-6 animate-in zoom-in-95 duration-700 pb-6">
      <div className="flex items-center gap-2 mb-2">
         <GraduationCap className="text-[#C64D3E]" />
         <h2 className={`${THEME.fonts.header} text-2xl text-[#2C3E50]`}>Your Career Matches</h2>
      </div>
      <div className="bg-white border-t-4 border-[#C64D3E] rounded-xl shadow-lg p-6 relative">
         <div className="absolute top-0 right-0 bg-[#C64D3E] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Top Match</div>
         <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{data[0].title}</h3>
         <p className="text-stone-600 text-sm mb-4">{data[0].desc}</p>
         <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-stone-50 p-2 rounded border border-stone-100 text-xs"><span className="font-bold text-[#C64D3E] block">Key Unis</span>{data[0].unis.slice(0,2).join(", ")}</div>
             <div className="bg-stone-50 p-2 rounded border border-stone-100 text-xs"><span className="font-bold text-[#C64D3E] block">Roles</span>{data[0].roles.slice(0,2).join(", ")}</div>
         </div>
         <div className="space-y-2 mb-4">
            {data[0].videos.map((vid, i) => (
                <a key={i} href={vid.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 bg-stone-100 rounded hover:bg-stone-200 transition text-xs md:text-sm group">
                    <span className="flex items-center gap-2"><PlayCircle size={14} className="text-red-600"/> {vid.title}</span>
                    <ExternalLink size={12} className="text-stone-400 group-hover:text-stone-600"/>
                </a>
            ))}
         </div>
         {renderSalaryCard(data[0])}
      </div>
      <div className="space-y-3">
        {data.slice(1).map((career, idx) => (
            <div key={idx} className="bg-[#EAE7DE] border border-stone-300 rounded-lg p-4 transition-all">
                <div className="flex justify-between items-start cursor-pointer" onClick={() => toggleResult(idx)}>
                    <div>
                         <div className="flex items-center gap-2 mb-1">
                            <span className="bg-stone-600 text-white text-[10px] px-2 rounded-full">#{idx + 2}</span>
                            <h4 className="font-bold text-sm text-[#2C3E50]">{career.title}</h4>
                         </div>
                        <p className="text-xs text-stone-600 line-clamp-1">{career.desc}</p>
                    </div>
                    <button className="text-stone-500">{expandedResults[idx] ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}</button>
                </div>
                {expandedResults[idx] && (
                    <div className="mt-4 pt-3 border-t border-stone-300/50 animate-in slide-in-from-top-2">
                        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                             <div className="bg-white/50 p-2 rounded"><span className="block font-bold text-[#C64D3E]">Unis</span>{career.unis.join(", ")}</div>
                             <div className="bg-white/50 p-2 rounded"><span className="block font-bold text-[#C64D3E]">Roles</span>{career.roles.join(", ")}</div>
                        </div>
                        {renderSalaryCard(career)}
                         <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                            {career.videos.map((vid, i) => (
                                <a key={i} href={vid.url} target="_blank" rel="noopener noreferrer" className="text-[10px] flex items-center gap-1 bg-white px-2 py-1 rounded-full hover:bg-stone-50 text-stone-600 border border-stone-300/50 shrink-0">
                                <PlayCircle size={10}/> {vid.title}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        ))}
      </div>
    </div>
  );

  const renderStudyResult = (profile) => (
    <div className="w-full max-w-2xl mt-4 space-y-4 animate-in zoom-in-95 duration-700 pb-10">
       <div className="flex items-center gap-2 mb-2">
         <Brain className="text-[#C64D3E]" />
         <h2 className={`${THEME.fonts.header} text-2xl text-[#2C3E50]`}>Uni-Readiness Report</h2>
      </div>
      <div className="bg-[#2C3E50] text-white rounded-xl p-6 shadow-xl relative overflow-hidden">
         <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-1 text-[#D4A373]">{profile.title}</h3>
            <p className="text-stone-300 text-sm mb-4">{profile.desc}</p>
            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                <span className="text-[#D4A373] font-bold text-sm flex items-center gap-2 mb-2"><Target size={16}/> EXPERT ADVICE:</span>
                <p className="text-white text-sm italic leading-relaxed">"{profile.advice}"</p>
            </div>
            {profile.title !== "The Balanced Strategist" && (
                <div className="mt-4 flex items-start gap-2 text-xs text-red-300">
                    <AlertTriangle size={14} className="shrink-0 mt-0.5"/>
                    <span>Warning: High School methods (cramming) cause 60% of 1st year dropouts. Adapt now!</span>
                </div>
            )}
         </div>
         <Brain className="absolute -bottom-10 -right-10 text-white/5 w-48 h-48" />
      </div>
      <div className="text-center pt-4">
         <button onClick={resetApp} className="bg-white border border-stone-300 hover:bg-stone-50 text-stone-600 px-6 py-2 rounded-full flex items-center gap-2 mx-auto text-sm">
            <Shuffle size={14} className="text-[#C64D3E]"/> Start Fresh (New Questions)
         </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${THEME.colors.bg} ${THEME.fonts.body} flex flex-col items-center p-2 md:p-6 font-sans selection:bg-[#D4A373] selection:text-white`}>
      <header className="w-full max-w-3xl flex items-center justify-between mb-4 p-4 bg-white/50 backdrop-blur rounded-xl border border-white/20 shadow-sm">
        <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${THEME.colors.primary} text-white shadow-md`}><Sparkles size={24} /></div>
            <div>
                <h1 className={`text-xl md:text-2xl ${THEME.fonts.header} ${THEME.colors.textMain} font-bold`}>PathFinder <span className="text-[#D4A373]">Pro</span></h1>
                <p className={`text-[10px] md:text-xs ${THEME.colors.textMuted} tracking-wide uppercase`}>Career & Study Analyst</p>
            </div>
        </div>
        <div className="text-right hidden xs:block">
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-[#C64D3E] uppercase tracking-wider">
                    {phase.includes('INTRO') ? 'Start' : phase.includes('CAREER') ? 'Phase 1: Career' : 'Phase 2: Habits'}
                </span>
                {(phase === 'CAREER_QUIZ' || phase === 'STUDY_QUIZ') && (
                   <span className="text-xs text-stone-400">{phase === 'CAREER_QUIZ' ? `${careerQIndex + 1}/20` : `${studyQIndex + 1}/10`}</span>
                )}
            </div>
        </div>
      </header>
      <main className={`flex-1 w-full max-w-3xl ${THEME.colors.chatBg} rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-stone-200 relative`}>
        {(phase === 'CAREER_QUIZ' || phase === 'STUDY_QUIZ') && (
            <div className="absolute top-0 left-0 w-full h-1 bg-stone-200 z-20">
                <div className={`h-full transition-all duration-500 ease-out ${phase === 'CAREER_QUIZ' ? THEME.colors.primary : THEME.colors.secondary}`} style={{ width: phase === 'CAREER_QUIZ' ? `${((careerQIndex + 1) / 20) * 100}%` : `${((studyQIndex + 1) / 10) * 100}%` }}/>
            </div>
        )}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar">
          {messages.map((msg, index) => (
            <div key={index} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              {msg.sender === 'bot' && (
                <div className={`hidden md:flex w-8 h-8 md:w-10 md:h-10 rounded-full ${THEME.colors.primary} items-center justify-center text-white shrink-0 mr-3 mt-1 shadow-sm`}><BookOpen size={16} /></div>
              )}
              <div className="flex flex-col max-w-[95%] md:max-w-[85%]">
                  {msg.type === 'text' && (
                      <div className={`px-5 py-3 md:py-4 rounded-2xl text-sm md:text-[15px] leading-relaxed shadow-sm border ${msg.sender === 'user' ? `${THEME.colors.bubbleUser} rounded-tr-none border-transparent` : `${THEME.colors.bubbleBot} rounded-tl-none`}`}>
                        {msg.text}
                      </div>
                  )}
                  {msg.options && renderOptions(msg.options)}
                  {msg.type === 'career_result' && renderCareerResult(msg.data)}
                  {msg.type === 'study_result' && renderStudyResult(msg.data)}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex w-full justify-start animate-in fade-in">
                <div className={`hidden md:flex w-8 h-8 md:w-10 md:h-10 rounded-full ${THEME.colors.primary} items-center justify-center text-white shrink-0 mr-3`}><BookOpen size={16} /></div>
                <TypingIndicator />
             </div>
          )}
          <div ref={scrollRef} />
        </div>
      </main>
      <footer className="mt-4 text-center text-stone-400 text-[10px] md:text-xs"><p>Designed for South African Students • Matric 2025</p></footer>
    </div>
  );
}
