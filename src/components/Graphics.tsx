import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Graphics() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  const posters = [
    { src: '/Poster1.png', title: 'Poster Design' },
    { src: '/Background2.png', title: 'Abstract Art' },
    { src: '/pOSTER2.png', title: 'Typography' },
    { src: '/hourglass.png', title: 'Hourglass' },
    { src: '/sabcap.png', title: 'Brand Work' },
    { src: '/cardib2.png', title: 'Portrait' },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

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
  }, [isHovering, isMobile]);

  return (
    <div 
      className={`min-h-screen w-screen bg-[#0a0a0a] overflow-x-hidden overflow-y-auto ${isMobile ? '' : 'cursor-none'}`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {/* Custom cursor - desktop only */}
      {!isMobile && (
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
      )}

      {/* Top Nav */}
      <div className={`${isMobile ? 'sticky' : 'fixed'} top-0 left-0 right-0 z-20 flex justify-between items-center p-4 md:p-6 ${isMobile ? 'bg-[#0a0a0a]/90 backdrop-blur-sm' : ''}`}>
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

        <div className="flex gap-2">
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

      {/* Gallery */}
      <div className={`${isMobile ? 'pt-4' : 'pt-24'} pb-24 px-4 md:px-8 lg:px-16`}>
        <div className="max-w-6xl mx-auto">
          {/* Masonry-style layout */}
          <div className="columns-1 md:columns-2 gap-4 md:gap-6">
            {posters.map((poster, index) => (
              <div
                key={index}
                className="break-inside-avoid mb-4 md:mb-6 group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="relative overflow-hidden bg-neutral-900">
                  <img
                    src={poster.src}
                    alt={poster.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    draggable={false}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end justify-start p-6 opacity-0 group-hover:opacity-100">
                    <span className="text-[#e8e4dc] text-sm tracking-[0.2em] uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {poster.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`${isMobile ? 'sticky' : 'fixed'} bottom-0 left-0 right-0 z-30 flex justify-between items-center p-4 md:p-6 ${isMobile ? 'bg-[#0a0a0a]/90 backdrop-blur-sm' : ''}`}>
        <span className="text-[10px] md:text-xs tracking-[0.1em] text-[#e8e4dc]/60">
          ©Shane Costello
        </span>
        <div className="flex gap-2">
          <a 
            href="/Shane Costello CV.pdf"
            download
            className="bg-black px-4 py-2 text-[10px] md:text-xs tracking-[0.2em] text-[#e8e4dc] uppercase hover:text-white transition-colors"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            CV ↓
          </a>
          <a 
            href="https://linkedin.com/in/shanecos21" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black px-4 py-2 text-[10px] md:text-xs tracking-[0.2em] text-[#e8e4dc] uppercase hover:text-white transition-colors"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            LinkedIn →
          </a>
        </div>
      </div>
    </div>
  );
}

export default Graphics;
