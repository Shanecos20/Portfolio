import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Websites() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  // Websites with two images each - secondIsMobile adds blur background effect
  const websites = [
    {
      images: ['/websites/beesite1.png', '/websites/beesite2.png'],
      link: 'https://hivesite2.vercel.app/mission',
      bio: 'AI-powered beehive monitoring system - tracking bee health and hive conditions in real-time.',
      secondIsMobile: false,
    },
    {
      images: ['/websites/weddingsite1.png', '/websites/weddingmobilesite2.png'],
      link: 'https://nicolaandconnor.info',
      bio: 'Elegant wedding website with RSVP functionality and event details.',
      secondIsMobile: true,
    },
    {
      images: ['/websites/portfoliosite1.png', '/websites/portfoliosite2.png'],
      link: 'https://shanecostello.ie',
      bio: 'Personal portfolio website showcasing creative work and development projects.',
      secondIsMobile: false,
    },
    {
      images: ['/websites/sylanesite1.png', '/websites/sylanesite2.png'],
      link: 'https://sylane-main.vercel.app',
      bio: 'Modern web application with clean design and intuitive user experience.',
      secondIsMobile: false,
    },
    {
      images: ['/websites/bakerysite1.png', '/websites/bakerysite2.png'],
      link: '#',
      bio: 'Bakery website with online ordering and menu display.',
      secondIsMobile: true,
    },
  ];

  useEffect(() => {
    const animateCursor = () => {
      if (cursorRef.current) {
        cursorPos.current.x += (targetPos.current.x - cursorPos.current.x) * 0.15;
        cursorPos.current.y += (targetPos.current.y - cursorPos.current.y) * 0.15;
        cursorRef.current.style.left = `${cursorPos.current.x - (isHovering ? 30 : 12)}px`;
        cursorRef.current.style.top = `${cursorPos.current.y - (isHovering ? 30 : 12)}px`;
      }
      requestAnimationFrame(animateCursor);
    };
    const animationId = requestAnimationFrame(animateCursor);

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering]);

  return (
    <div 
      className="min-h-screen w-screen bg-[#0a0a0a] cursor-none overflow-x-hidden overflow-y-auto"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {/* Custom cursor - fluid */}
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

      {/* Top Row */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-start p-4 md:p-6">
        <Link 
          to="/" 
          className="bg-black px-4 py-2 flex items-center gap-2 text-[#e8e4dc] hover:text-white transition-colors group"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs md:text-sm tracking-[0.2em] uppercase">Back</span>
        </Link>
      </div>

      {/* Centered Nav Buttons */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center p-4 md:p-6 pointer-events-none">
        <div className="flex gap-2 pointer-events-auto">
          <Link 
            to="/graphics"
            className="bg-black px-4 py-2 text-xs md:text-sm tracking-[0.2em] text-[#e8e4dc] hover:text-white transition-colors duration-300 uppercase"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Graphics
          </Link>
          <Link 
            to="/websites"
            className="bg-black px-4 py-2 text-xs md:text-sm tracking-[0.2em] text-[#e8e4dc] hover:text-white transition-colors duration-300 uppercase"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Websites
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 pb-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto space-y-16">
          {websites.map((site, index) => (
            <div key={index} className="group">
              {/* Two images side by side */}
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <div 
                  className="aspect-[4/3] overflow-hidden bg-neutral-900"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <img
                    src={site.images[0]}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                </div>
                <div 
                  className="aspect-[4/3] overflow-hidden bg-neutral-900 relative"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {site.secondIsMobile ? (
                    <>
                      {/* Blurred background using first image */}
                      <img
                        src={site.images[0]}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-90"
                        draggable={false}
                      />
                      {/* Mobile image centered on top */}
                      <img
                        src={site.images[1]}
                        alt=""
                        className="absolute inset-0 w-auto h-full object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
                        draggable={false}
                      />
                    </>
                  ) : (
                    <img
                      src={site.images[1]}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      draggable={false}
                    />
                  )}
                </div>
              </div>
              
              {/* Link and bio below */}
              <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <p className="text-sm md:text-base text-[#e8e4dc]/70 max-w-xl">
                  {site.bio}
                </p>
                <a
                  href={site.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm tracking-[0.2em] text-[#e8e4dc] uppercase hover:text-white transition-colors flex items-center gap-2 shrink-0"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  Visit Site
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-4 h-4"
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row - Just LinkedIn */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-end p-4 md:p-6">
        <a 
          href="https://linkedin.com/in/shanecos21" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black px-4 py-2 text-xs md:text-sm tracking-[0.2em] text-[#e8e4dc] uppercase hover:text-white transition-colors"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          LinkedIn →
        </a>
      </div>
    </div>
  );
}

export default Websites;
