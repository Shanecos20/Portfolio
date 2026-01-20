import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Graphics() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [viewMode, setViewMode] = useState<'canvas' | 'grid'>('grid');
  const dragStart = useRef({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  const posters = [
    '/Poster1.png',
    '/Background2.png',
    '/pOSTER2.png',
    '/hourglass.png',
    '/sabcap.png',
    '/cardib2.png',
  ];

  // Hexagonal layout - 1 center, 6 around (touching, no gaps)
  const imgWidth = 288;
  const imgHeight = 384;
  
  const artworks = [
    { src: posters[0], x: 0, y: 0 },
    { src: posters[1], x: imgWidth, y: 0 },
    { src: posters[2], x: -imgWidth, y: 0 },
    { src: posters[3], x: imgWidth / 2, y: imgHeight },
    { src: posters[4], x: -imgWidth / 2, y: -imgHeight },
    { src: posters[5], x: -imgWidth / 2, y: imgHeight },
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
      
      if (isDragging && viewMode === 'canvas') {
        const deltaX = e.clientX - dragStart.current.x;
        const deltaY = e.clientY - dragStart.current.y;
        setPosition(prev => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY
        }));
        dragStart.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isHovering, viewMode]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewMode === 'canvas') {
      setIsDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY };
    }
  };

  return (
    <div 
      className={`min-h-screen w-screen bg-[#0a0a0a] overflow-x-hidden scrollbar-hide ${viewMode === 'canvas' ? 'h-screen overflow-hidden cursor-grab active:cursor-grabbing' : 'overflow-y-auto cursor-none'}`}
      onMouseDown={handleMouseDown}
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

      {/* Top Row - matching Home exactly */}
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

        <div 
          className="bg-black px-4 py-2 flex items-center gap-3"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className={`text-xs md:text-sm tracking-[0.2em] uppercase transition-colors ${viewMode === 'canvas' ? 'text-[#e8e4dc]' : 'text-[#e8e4dc]/40'}`}>
            Canvas
          </span>
          <button
            onClick={() => setViewMode(viewMode === 'canvas' ? 'grid' : 'canvas')}
            className="hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-4 bg-[#e8e4dc]/20 rounded-full relative">
              <div 
                className={`absolute top-0.5 w-3 h-3 bg-[#e8e4dc] rounded-full transition-all duration-300 ${
                  viewMode === 'grid' ? 'left-4' : 'left-0.5'
                }`}
              />
            </div>
          </button>
          <span className={`text-xs md:text-sm tracking-[0.2em] uppercase transition-colors ${viewMode === 'grid' ? 'text-[#e8e4dc]' : 'text-[#e8e4dc]/40'}`}>
            Grid
          </span>
        </div>
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

      {/* Canvas View */}
      {viewMode === 'canvas' && (
        <>
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              transition: isDragging ? 'none' : 'transform 0.15s ease-out'
            }}
          >
            {artworks.map((art, index) => (
              <div
                key={index}
                className="absolute artwork-card"
                style={{
                  left: `calc(50% + ${art.x}px)`,
                  top: `calc(50% + ${art.y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="w-72 h-96 overflow-hidden transition-all duration-500 hover:scale-105 hover:z-10 bg-neutral-900">
                  <img
                    src={art.src}
                    alt=""
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row - Canvas */}
          <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-between items-end p-4 md:p-6">
            <div className="bg-black px-4 py-2">
              <span className="text-xs md:text-sm tracking-[0.2em] text-[#e8e4dc]/60 uppercase">
                Click and drag to navigate
              </span>
            </div>
            
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
        </>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <>
          <div className="pt-24 pb-20 px-4 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
              {posters.map((src, index) => (
                <div
                  key={index}
                  className="group"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="aspect-[3/4] overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:z-10 group-hover:shadow-xl bg-neutral-900">
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row - Grid */}
          <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-end p-4 md:p-6">
            <a 
              href="https://linkedin.com/in/shanecostello" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black px-4 py-2 text-xs md:text-sm tracking-[0.2em] text-[#e8e4dc] uppercase hover:text-white transition-colors"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              LinkedIn →
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default Graphics;
