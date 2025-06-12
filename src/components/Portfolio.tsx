import { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Code, Briefcase, Terminal, Menu, X, Heart } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [glitchText, setGlitchText] = useState('SHANE COSTELLO');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const fullText = "* Full-Stack Developer | Innovation | Digital Design";
  const typingSpeed = 80;

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, typingSpeed);
    return () => clearInterval(timer);
  }, []);

  // Glitch effect for name
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const originalText = 'SHANE COSTELLO';
      let glitched = '';
      
      for (let i = 0; i < originalText.length; i++) {
        if (Math.random() > 0.95) {
          glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          glitched += originalText[i];
        }
      }
      
      setGlitchText(glitched);
      
      setTimeout(() => setGlitchText(originalText), 100);
    }, 3000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  // Smooth scroll with section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportCenter = scrollPosition + windowHeight / 2;

      // Check if we're at the very bottom of the page (within 20px)
      if (scrollPosition + windowHeight >= documentHeight - 20) {
        setActiveSection('contact');
        return;
      }

      // Find which section center is closest to viewport center
      let currentSection = 'home';
      let minDistance = Infinity;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const sectionCenter = offsetTop + offsetHeight / 2;
          const distance = Math.abs(viewportCenter - sectionCenter);
          
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const projects = [
    {
      title: "[HIVE]",
      subtitle: "IoT Beekeeping Platform",
      description: "AI-powered sensor platform for real-time bee colony health monitoring",
      tech: ["React", "IoT", "AI/ML", "Node.js"],
      achievement: "★ EU GREEN AWARD WINNER",
      stats: { impact: "70+ submissions", rank: "TOP 1.5%" }
    },
    {
      title: "[GOLF_LIVE]",
      subtitle: "Real-time Scoring System",
      description: "Live golf tournament tracking for The Bridge Bar",
      tech: ["React", "WebSocket", "Node.js"],
      stats: { users: "200+", uptime: "99.9%" }
    },
    {
      title: "[TIPSTER_PRO]",
      subtitle: "Competition Platform",
      description: "Automated scoring system eliminating manual calculation errors",
      tech: ["JavaScript", "PHP", "MySQL"],
      stats: { efficiency: "+30%", errors: "-100%" }
    }
  ];

  const skills = [
    { name: "REACT/NATIVE", level: 90, exp: "3+ YRS" },
    { name: "JS/TYPESCRIPT", level: 85, exp: "4+ YRS" },
    { name: "UI/UX DESIGN", level: 80, exp: "3+ YRS" },
    { name: "BACKEND/NODE", level: 75, exp: "2+ YRS" },
    { name: "3D/GAME DEV", level: 70, exp: "2+ YRS" }
  ];

  const experience = [
    {
      role: "BARTENDER + DEVELOPER",
      company: "The Bridge Bar",
      period: "2021 - PRESENT",
      achievements: [
        "→ Built 2 production web applications",
        "→ Reduced service time by 30%",
        "→ Automated manual processes"
      ]
    },
    {
      role: "CAMP INSTRUCTOR",
      company: "ATU Summer Camp",
      period: "JUNE 2024",
      achievements: [
        "→ Taught 3D modeling & game dev",
        "→ Mentored 20+ students",
        "→ Developed curriculum content"
      ]
    }
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden font-mono">

      {/* Scanlines overlay */}
      <div className="scanlines" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="pixel-font text-xs text-gray-400">
              SC://PORTFOLIO.EXE
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 mono-font text-sm">
              {['home', 'about', 'projects', 'skills', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`uppercase transition-all ${
                    activeSection === section 
                      ? 'text-white' 
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  [{section}]
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-400"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-gray-800">
            <div className="px-6 py-4 space-y-4">
              {['home', 'about', 'projects', 'skills', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left uppercase text-gray-500 hover:text-white transition-all mono-font text-sm"
                >
                  [{section}]
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="text-center px-6">
          <div className="mb-8">
            <h1 className="pixel-font text-3xl md:text-5xl mb-4 glitch flicker">
              {glitchText}
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-red-500 via-yellow-500 to-cyan-500 mb-8" />
          </div>
          
          <div className="retro-font text-2xl md:text-3xl text-gray-400 mb-8 h-8">
            {typedText}<span className="blink">_</span>
          </div>

          <div className="flex justify-center space-x-6 mb-12">
            <a href="https://github.com/Shanecos20" className="text-gray-500 hover:text-white transition-all">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/shanecos21" className="text-gray-500 hover:text-white transition-all">
              <Linkedin size={20} />
            </a>
            <a href="mailto:shanecostello150@gmail.com" className="text-gray-500 hover:text-white transition-all">
              <Mail size={20} />
            </a>
          </div>

          <div className="mono-font text-xs text-gray-600 mb-8">
            PRESS [↓] TO CONTINUE
          </div>

          <button
            onClick={() => scrollToSection('about')}
            className="animate-bounce"
          >
            <ChevronDown size={24} className="text-gray-500" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="pixel-font text-xl md:text-2xl mb-16 text-center">
            <Terminal className="inline mr-2" size={24} />
            ABOUT.TXT
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="retro-font text-2xl text-gray-300 leading-relaxed">
                &gt; FINAL YEAR COMPUTING STUDENT<br/>
                &gt; ATU GALWAY // 74% GPA<br/>
                &gt; FULL-STACK DEVELOPER<br/>
                &gt; AWARD-WINNING INNOVATOR
              </div>
              
              <p className="mono-font text-sm text-gray-500 leading-relaxed">
                Passionate about creating innovative digital solutions. From AI-powered IoT platforms 
                to engaging web experiences, I bring ideas to life through code. Winner of the EU 
                Green Award for Sustainability.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-800 p-4 mono-font text-sm">
                <div className="text-gray-500 mb-2">[STATS]</div>
                <div className="space-y-1">
                  <div>→ PROJECTS_COMPLETED: 10+</div>
                  <div>→ AWARDS_WON: 2</div>
                  <div>→ YEARS_CODING: 4+</div>
                  <div>→ COFFEE_CONSUMED: ∞</div>
                </div>
              </div>
              
              <div className="border border-gray-800 p-4 mono-font text-sm">
                <div className="text-gray-500 mb-2">[ACHIEVEMENTS]</div>
                <div className="space-y-1">
                  <div className="text-green-500">✓ EU GREEN AWARD WINNER</div>
                  <div className="text-green-500">✓ ENTERPRISE IRELAND TOP 50</div>
                  <div className="text-green-500">✓ ALL DISTINCTIONS QQI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="pixel-font text-xl md:text-2xl mb-16 text-center">
            <Code className="inline mr-2" size={24} />
            PROJECTS.EXE
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="border border-gray-800 p-6 hover:border-gray-600 transition-all cursor-pointer"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="mono-font text-xs text-gray-500 mb-2">PROJECT_{index + 1}</div>
                <h3 className="retro-font text-2xl mb-1">{project.title}</h3>
                <p className="mono-font text-sm text-gray-500 mb-4">{project.subtitle}</p>
                
                {project.achievement && (
                  <div className="pixel-font text-xs text-yellow-500 mb-4 flicker">
                    {project.achievement}
                  </div>
                )}
                
                <p className="mono-font text-xs text-gray-400 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="mono-font text-xs px-2 py-1 border border-gray-700 text-gray-400">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {hoveredProject === index && project.stats && (
                  <div className="mono-font text-xs text-gray-500 space-y-1">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key}>• {key.toUpperCase()}: {value}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="pixel-font text-xl md:text-2xl mb-12 text-center">
            <Heart className="inline mr-2" size={24} />
            SKILLS.DAT
          </h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            {skills.map((skill, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between mb-2">
                  <span className="mono-font text-sm">{skill.name}</span>
                  <span className="mono-font text-xs text-gray-500">{skill.exp}</span>
                </div>
                <div className="h-4 bg-gray-900 border border-gray-800">
                  <div className="h-full bg-gray-700 relative overflow-hidden" style={{ width: `${skill.level}%` }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                  </div>
                </div>
                <div className="mono-font text-xs text-gray-600 mt-1">[{skill.level}/100]</div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 border border-gray-800 p-6">
            <div className="pixel-font text-sm text-gray-500 mb-4">TOOLBOX://</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mono-font text-xs">
              {['ADOBE_SUITE', 'UNITY_3D', 'BLENDER', 'FIGMA', 'WORDPRESS', 'ANDROID_STUDIO', 'SQL', 'GIT'].map((tool) => (
                <div key={tool} className="text-gray-400 hover:text-white transition-all">
                  → {tool}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="pixel-font text-xl md:text-2xl mb-12 text-center">
            <Briefcase className="inline mr-2" size={24} />
            EXPERIENCE.LOG
          </h2>
          
          <div className="space-y-8 max-w-3xl mx-auto">
            {experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-800 pl-6">
                <div className="mono-font text-xs text-gray-500 mb-1">{exp.period}</div>
                <h3 className="retro-font text-2xl mb-1">{exp.role}</h3>
                <p className="mono-font text-sm text-gray-400 mb-4">@{exp.company}</p>
                <div className="space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="mono-font text-xs text-gray-500">{achievement}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="pixel-font text-xl md:text-2xl mb-8">
            <Mail className="inline mr-2" size={24} />
            CONTACT.INIT
          </h2>
          
          <div className="retro-font text-2xl text-gray-400 mb-8">
            READY TO START A NEW QUEST?
          </div>
          
          <div className="mono-font text-sm text-gray-500 mb-8">
            &gt; Let's build something amazing together_
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:shanecostello150@gmail.com"
              className="px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-all mono-font text-sm"
            >
              [SEND_MESSAGE]
            </a>
            <a
              href="https://linkedin.com/in/shanecos21"
              className="px-6 py-3 border border-gray-600 text-gray-400 hover:border-white hover:text-white transition-all mono-font text-sm"
            >
              [VIEW_LINKEDIN]
            </a>
          </div>
          
          <div className="mt-16 pixel-font text-xs text-gray-600">
            © 2025 SHANE COSTELLO // ALL RIGHTS RESERVED
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio; 