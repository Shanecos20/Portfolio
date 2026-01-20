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
  // Image size is w-72 (288px) x h-96 (384px)
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
      className={`min-h-screen w-screen bg-[#f5f5f0] ${viewMode === 'canvas' ? 'h-screen overflow-hidden cursor-grab active:cursor-grabbing' : 'overflow-auto cursor-none'}`}
      onMouseDown={handleMouseDown}
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

      {/* Back button */}
      <Link 
        to="/" 
        className="fixed top-10 left-10 z-30 flex items-center gap-3 text-neutral-800 hover:text-[#e63946] transition-colors group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-sm" style={{ fontFamily: 'Against, sans-serif' }}>Back</span>
      </Link>

      {/* Title */}
      <div className="fixed top-10 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
        <h1 className="text-sm text-neutral-500" style={{ fontFamily: 'Against, sans-serif' }}>
          Graphics {viewMode === 'canvas' ? '— Drag to explore' : ''}
        </h1>
      </div>

      {/* View Mode Toggle */}
      <div 
        className="fixed top-10 right-10 z-30 flex items-center gap-3"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <span className={`text-xs transition-colors ${viewMode === 'canvas' ? 'text-neutral-800' : 'text-neutral-400'}`} style={{ fontFamily: 'Against, sans-serif' }}>
          Canvas
        </span>
        <button
          onClick={() => setViewMode(viewMode === 'canvas' ? 'grid' : 'canvas')}
          className="relative w-12 h-6 bg-neutral-200 rounded-full transition-colors hover:bg-neutral-300"
        >
          <div 
            className={`absolute top-1 w-4 h-4 bg-neutral-800 rounded-full transition-all duration-300 ${
              viewMode === 'grid' ? 'left-7' : 'left-1'
            }`}
          />
        </button>
        <span className={`text-xs transition-colors ${viewMode === 'grid' ? 'text-neutral-800' : 'text-neutral-400'}`} style={{ fontFamily: 'Against, sans-serif' }}>
          Grid
        </span>
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
                <div className="w-72 h-96 overflow-hidden transition-all duration-500 hover:scale-105 hover:z-10 bg-neutral-100">
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

          {/* Hint */}
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <span className="text-xs text-neutral-400">Click and drag to navigate</span>
          </div>
        </>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="pt-28 pb-16 px-8 md:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
            {posters.map((src, index) => (
              <div
                key={index}
                className="group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="aspect-[3/4] overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:z-10 group-hover:shadow-xl bg-neutral-100">
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
      )}
    </div>
  );
}

export default Graphics;
