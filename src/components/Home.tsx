import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    { src: '/Poster1.png', title: 'Sylane GAA', category: 'Sports Branding' },
    { src: '/Background2.png', title: 'No Signal', category: 'Digital Art' },
    { src: '/pOSTER2.png', title: 'Battle for Glory', category: 'Event Poster' },
    { src: '/hourglass.png', title: 'Time to Burn', category: 'Illustration' },
    { src: '/sabcap.png', title: 'Sabcap', category: 'Brand Identity' },
    { src: '/cardib2.png', title: 'Cardi B', category: 'Artist Poster' },
  ];

  useEffect(() => {
    // Smooth cursor animation
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

    // Custom scroll handler
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning) return;

      if (e.deltaY > 0 && currentIndex < projects.length - 1) {
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
  }, [isHovering, currentIndex, isTransitioning, projects.length]);

  const goToProject = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  return (
    <div ref={containerRef} className="h-screen w-screen bg-[#0a0a0a] overflow-hidden cursor-none">
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

      {/* Background Image */}
      <div className="absolute inset-0">
        {projects.map((project, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: index === currentIndex ? 1 : 0 }}
          >
            <img
              src={project.src}
              alt={project.title}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
          </div>
        ))}
      </div>

      {/* Navigation - Top */}
      <nav className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center px-10 py-8">
        <span 
          className="text-white text-sm"
          style={{ fontFamily: 'Against, sans-serif' }}
        >
          Shane
        </span>
        <div className="flex gap-8">
          <Link 
            to="/graphics" 
            className="text-neutral-400 hover:text-white text-sm transition-colors"
            style={{ fontFamily: 'Against, sans-serif' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Graphics
          </Link>
          <Link 
            to="/websites" 
            className="text-neutral-400 hover:text-white text-sm transition-colors"
            style={{ fontFamily: 'Against, sans-serif' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Websites
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 h-full flex items-center px-10 md:px-20">
        <div className="max-w-2xl">
          {/* Project Counter */}
          <div className="flex items-center gap-4 mb-8">
            <span 
              className="text-6xl md:text-8xl text-white font-light"
              style={{ fontFamily: 'Against, sans-serif' }}
            >
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <div className="h-px w-16 bg-neutral-600" />
            <span className="text-neutral-500 text-sm">
              {String(projects.length).padStart(2, '0')}
            </span>
          </div>

          {/* Project Title */}
          <div className="overflow-hidden mb-4">
            <h1 
              key={currentIndex}
              className="text-5xl md:text-7xl text-white animate-slide-up"
              style={{ fontFamily: 'Against, sans-serif' }}
            >
              {projects[currentIndex].title}
            </h1>
          </div>

          {/* Category */}
          <p className="text-neutral-400 text-sm tracking-wider uppercase mb-12">
            {projects[currentIndex].category}
          </p>

          {/* View Project Button */}
          <Link
            to="/graphics"
            className="inline-flex items-center gap-3 text-white group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="text-sm tracking-wider uppercase">View Project</span>
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </div>
      </main>

      {/* Project Preview - Right Side */}
      <div className="absolute right-10 md:right-20 top-1/2 -translate-y-1/2 z-20">
        <div 
          className="w-64 md:w-80 aspect-[3/4] rounded-lg overflow-hidden shadow-2xl transition-transform duration-700"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img
            src={projects[currentIndex].src}
            alt={projects[currentIndex].title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>

      {/* Progress Dots - Right Side */}
      <div className="fixed right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToProject(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-neutral-600 hover:bg-neutral-400'
            }`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
        <span className="text-neutral-500 text-xs tracking-wider uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-neutral-500 to-transparent animate-pulse" />
      </div>

      {/* Contact */}
      <div className="fixed bottom-10 right-10 z-30">
        <a 
          href="mailto:hello@shane.com" 
          className="text-neutral-500 hover:text-white text-xs transition-colors"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Get in touch →
        </a>
      </div>
    </div>
  );
}

export default Home;
