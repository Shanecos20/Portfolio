import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSongEmbed, setShowSongEmbed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  const sections = [
    {
      id: 'intro',
      mainTitle: 'welcome.',
      rightContent: {
        label: 'Shane Costello',
        items: [
          'Brand Marketing',
          'Web Development',
          'Graphic Design',
          'Content Creation',
        ],
      }
    },
    {
      id: 'about',
      mainTitle: 'designer.',
      rightContent: {
        label: 'Skills',
        items: [
          'React / JavaScript / PHP',
          'Adobe Suite / Canva',
          'MySQL / OpenAI',
          'Unity / Blender',
        ],
      }
    },
    {
      id: 'experience',
      mainTitle: 'work.',
      rightContent: {
        label: 'Recent Roles',
        items: [
          'ATU Innovation Hubs',
          'Symphysis Medical',
          'Freelance Designer',
          'Summer Camp Tutor',
        ],
      }
    },
    {
      id: 'work',
      mainTitle: 'portfolio.',
      rightContent: {
        label: 'Achievements',
        items: [
          'EU Green Award 2025',
          'Enterprise Ireland Top 50',
          'AI Beehive Project',
          'First Class Honours',
        ],
      }
    },
    {
      id: 'contact',
      mainTitle: 'connect.',
      rightContent: {
        label: 'Get In Touch',
        items: [
          'shanecostello150@gmail.com',
          '(087) 439-0709',
          'Galway, Ireland',
        ],
      }
    },
  ];

  const currentSection = sections[currentIndex];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Skip custom navigation on mobile
    if (isMobile) return;

    const animateCursor = () => {
      if (cursorRef.current) {
        cursorPos.current.x += (targetPos.current.x - cursorPos.current.x) * 0.12;
        cursorPos.current.y += (targetPos.current.y - cursorPos.current.y) * 0.12;
        cursorRef.current.style.left = `${cursorPos.current.x - (isHovering ? 30 : 12)}px`;
        cursorRef.current.style.top = `${cursorPos.current.y - (isHovering ? 30 : 12)}px`;
      }
      requestAnimationFrame(animateCursor);
    };
    const animationId = requestAnimationFrame(animateCursor);

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning) return;

      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1);
        setTimeout(() => setIsTransitioning(false), 800);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        setIsTransitioning(true);
        setCurrentIndex(prev => prev - 1);
        setTimeout(() => setIsTransitioning(false), 800);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isHovering, currentIndex, isTransitioning, sections.length, isMobile]);

  // Mobile Layout - Simple scrollable page
  if (isMobile) {
    return (
      <div className="min-h-screen w-screen bg-[#0a0a0a] overflow-x-hidden">
        {/* Top Nav */}
        <div className="sticky top-0 z-20 flex justify-center gap-2 p-4 bg-[#0a0a0a]/90 backdrop-blur-sm">
          <Link 
            to="/graphics" 
            className="bg-black px-4 py-2 text-xs tracking-[0.2em] text-[#e8e4dc] uppercase"
          >
            Graphics
          </Link>
          <Link 
            to="/websites" 
            className="bg-black px-4 py-2 text-xs tracking-[0.2em] text-[#e8e4dc] uppercase"
          >
            Websites
          </Link>
        </div>

        {/* All Sections */}
        <div className="px-6 pb-8">
          {sections.map((section, idx) => (
            <div key={section.id} className={`py-12 ${idx !== 0 ? 'border-t border-[#e8e4dc]/10' : ''}`}>
              <h1 
                className="text-[15vw] leading-[0.9] text-[#e8e4dc] font-medium tracking-tight mb-8"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {section.mainTitle}
              </h1>
              
              <h2 className="text-xl text-[#e8e4dc] mb-3 font-medium">
                {section.rightContent.label}
              </h2>
              
              <div className="space-y-2">
                {section.rightContent.items.map((item, index) => (
                  <p key={index} className="text-sm text-[#e8e4dc]/80 leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="sticky bottom-0 z-20 flex justify-between items-center p-4 bg-[#0a0a0a]/90 backdrop-blur-sm">
          <span className="text-[10px] tracking-[0.1em] text-[#e8e4dc]/60">
            ©Shane Costello
          </span>
          <a 
            href="https://linkedin.com/in/shanecos21" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.1em] text-[#e8e4dc] uppercase"
          >
            LinkedIn →
          </a>
        </div>
      </div>
    );
  }

  // Desktop Layout - Fancy scroll-through sections
  return (
    <div className="h-screen w-screen overflow-hidden cursor-none relative bg-[#0a0a0a]">
      {/* Repeating Graphics - Right to Left with fading opacity, size, and blur */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full flex items-center"
            style={{
              right: `${i * 15}%`,
              zIndex: 6 - i,
              opacity: 1 - (i * 0.15),
              transform: `scale(${1 - (i * 0.1)})`,
              filter: `blur(${i * 2}px)`,
            }}
          >
            <img
              src="/cardib2.png"
              alt=""
              className="h-[90vh] w-auto object-contain"
            />
          </div>
        ))}
      </div>

      {/* Selected Graphic & Song Labels */}
      <div 
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-4 items-center"
      >
        <div className="bg-black px-6 py-3 pointer-events-none">
          <span className="text-sm tracking-[0.3em] text-[#e8e4dc] uppercase">
            Highlighted Graphic
          </span>
        </div>
        
        <button 
          onClick={() => setShowSongEmbed(!showSongEmbed)}
          className="bg-black px-6 py-3 hover:bg-neutral-900 transition-colors"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className="text-sm tracking-[0.3em] text-[#e8e4dc] uppercase">
            Selected Song
          </span>
        </button>
      </div>

      {/* Custom cursor */}
      <div 
        ref={cursorRef}
        className="pointer-events-none fixed z-50 mix-blend-difference"
        style={{ left: 0, top: 0 }}
      >
        <div 
          className="bg-white rounded-full transition-all duration-300 ease-out"
          style={{
            width: isHovering ? 60 : 24,
            height: isHovering ? 60 : 24,
          }}
        />
      </div>

      {/* Top Row - STATIC - Absolute positioned */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-start p-6">
        <div className="bg-black px-4 py-2">
          <span className="text-sm tracking-[0.2em] text-[#e8e4dc] uppercase">
            GALWAY, IRELAND
          </span>
        </div>

        <div className="bg-black px-4 py-2">
          <span className="text-sm tracking-[0.2em] text-[#e8e4dc] uppercase">
            2025
          </span>
        </div>
      </div>

      {/* Centered Nav Buttons */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center p-6 pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          <Link 
            to="/graphics" 
            className="bg-black px-4 py-2 text-sm tracking-[0.2em] text-[#e8e4dc] hover:text-white transition-colors duration-300 uppercase"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Graphics
          </Link>
          <Link 
            to="/websites" 
            className="bg-black px-4 py-2 text-sm tracking-[0.2em] text-[#e8e4dc] hover:text-white transition-colors duration-300 uppercase"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Websites
          </Link>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center p-12 lg:p-16">

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-center overflow-visible">
          {/* Main Title - Left aligned with overflow */}
          <div 
            key={`title-${currentIndex}`}
            className="overflow-visible animate-fadeIn"
          >
            <h1 
              className="text-[13vw] lg:text-[11vw] leading-[0.9] text-[#e8e4dc] whitespace-nowrap font-medium tracking-tight"
              style={{ 
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {currentSection.mainTitle}
            </h1>
          </div>

          {/* Details - Below title */}
          <div 
            key={`details-${currentIndex}`}
            className="mt-40 lg:mt-48 overflow-visible animate-fadeIn"
            style={{ animationDelay: '0.15s' }}
          >
            <h2 
              className="text-3xl lg:text-4xl text-[#e8e4dc] mb-4 font-medium"
            >
              {currentSection.rightContent.label}
            </h2>
            
            <div className="space-y-2">
              {currentSection.rightContent.items.map((item, index) => (
                <p 
                  key={index}
                  className="text-lg lg:text-xl text-[#e8e4dc] leading-snug text-shadow animate-fadeIn"
                  style={{ animationDelay: `${0.25 + index * 0.08}s` }}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Spotify Embed Slider */}
      <div 
        className={`fixed bottom-20 right-0 z-30 flex items-center transition-transform duration-500 ease-out ${
          showSongEmbed ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setShowSongEmbed(false)}
          className="bg-black px-3 py-4 hover:bg-neutral-900 transition-colors"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className="text-[#e8e4dc] text-lg">→</span>
        </button>
        <div className="bg-black p-2">
          <iframe 
            src="https://open.spotify.com/embed/track/1qyw5wSUkEvH8DtaCdx7Lg?utm_source=generator&theme=0" 
            width="300" 
            height="80" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            className="rounded"
          />
        </div>
      </div>

      {/* Bottom Row - STATIC - Absolute positioned */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-between items-end p-6">
        <div className="bg-black px-4 py-2">
          <span className="text-sm tracking-[0.2em] text-[#e8e4dc]">
            ©Shane Costello
          </span>
        </div>
        
        <div className="bg-black px-4 py-2">
          <span className="text-sm tracking-[0.2em] text-[#e8e4dc] uppercase">
            SCROLL
          </span>
        </div>
        
          <a 
            href="https://linkedin.com/in/shanecos21" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black px-4 py-2 text-sm tracking-[0.2em] text-[#e8e4dc] uppercase hover:text-white transition-colors"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            LinkedIn →
          </a>
      </div>

      {/* Progress indicator - moved to left */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 800);
              }
            }}
            className={`w-[3px] rounded-full transition-all duration-500 ease-out ${
              index === currentIndex 
                ? 'h-10 bg-[#e8e4dc]' 
                : 'h-3 bg-[#e8e4dc]/30 hover:bg-[#e8e4dc]/60'
            }`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
