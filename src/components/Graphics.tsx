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

  // Mobile Layout - Clean scrollable gallery
  if (isMobile) {
    return (
      <div className="min-h-screen w-screen bg-[#0a0a0a] overflow-x-hidden">
        {/* Top Nav */}
        <div className="sticky top-0 z-20 flex justify-between items-center p-4 bg-[#0a0a0a]/90 backdrop-blur-sm">
          <Link 
            to="/" 
            className="bg-black px-3 py-2 flex items-center gap-2 text-[#e8e4dc] text-xs"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            BACK
          </Link>

          <div className="flex gap-2">
            <Link to="/graphics" className="bg-black px-3 py-2 text-xs tracking-[0.15em] text-[#e8e4dc] uppercase">
              Graphics
            </Link>
            <Link to="/websites" className="bg-black px-3 py-2 text-xs tracking-[0.15em] text-[#e8e4dc] uppercase">
              Websites
            </Link>
          </div>
        </div>

        {/* Gallery */}
        <div className="px-4 pb-24">
          <div className="space-y-4">
            {posters.map((poster, index) => (
              <div key={index} className="overflow-hidden bg-neutral-900">
                <img
                  src={poster.src}
                  alt={poster.title}
                  className="w-full h-auto object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-end gap-2 p-4 bg-[#0a0a0a]/90 backdrop-blur-sm">
          <a href="/Shane Costello CV.pdf" download className="bg-black px-4 py-2 text-xs tracking-[0.2em] text-[#e8e4dc] uppercase">
            CV ↓
          </a>
          <a href="https://linkedin.com/in/shanecos21" target="_blank" rel="noopener noreferrer" className="bg-black px-4 py-2 text-xs tracking-[0.2em] text-[#e8e4dc] uppercase">
            LinkedIn →
          </a>
        </div>
      </div>
    );
  }

  // Desktop Layout - Masonry gallery
  return (
    <div 
      className="min-h-screen w-screen bg-[#0a0a0a] overflow-x-hidden overflow-y-auto cursor-none"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
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

      {/* Top Row */}
      <div className="fixed top-0 left-0 right-0 z-20 flex justify-between items-start p-6">
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
          <span className="text-sm tracking-[0.2em] uppercase">BACK</span>
        </Link>
      </div>

      {/* Centered Nav Buttons */}
      <div className="fixed top-0 left-0 right-0 z-20 flex justify-center p-6 pointer-events-none">
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

      {/* Gallery - 4 per row, no gaps */}
      <div className="pt-20 pb-24">
        <div className="grid grid-cols-4 gap-0">
          {posters.map((poster, index) => (
            <div
              key={index}
              className="group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="aspect-[3/4] overflow-hidden bg-neutral-900">
                <img
                  src={poster.src}
                  alt={poster.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-end gap-2 p-6">
        <a 
          href="/Shane Costello CV.pdf"
          download
          className="bg-black px-4 py-2 text-sm tracking-[0.2em] text-[#e8e4dc] uppercase hover:text-white transition-colors"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          CV ↓
        </a>
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
    </div>
  );
}

export default Graphics;
