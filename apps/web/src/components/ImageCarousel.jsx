
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext.jsx';

const images = [
  {
    url: 'https://horizons-cdn.hostinger.com/54c4fdd1-f5f9-4cdd-80c9-edd11956d0b3/86f4b72d6d4d8621013809b4f0482edb.jpg',
    alt: 'Lito tablet screen protector'
  },
  {
    url: 'https://horizons-cdn.hostinger.com/54c4fdd1-f5f9-4cdd-80c9-edd11956d0b3/3144c80b9413c419051125efabd13346.jpg',
    alt: 'Sapphire camera lens protector'
  },
  {
    url: 'https://horizons-cdn.hostinger.com/54c4fdd1-f5f9-4cdd-80c9-edd11956d0b3/1fbb1774c17e8c4661ce3606e85d69ae.jpg',
    alt: 'UV Glue Glass'
  },
  {
    url: 'https://horizons-cdn.hostinger.com/54c4fdd1-f5f9-4cdd-80c9-edd11956d0b3/f3b5b04390e93d6a949ada33f5a71e9d.jpg',
    alt: 'All-in Protection iPhone case'
  },
  {
    url: 'https://horizons-cdn.hostinger.com/54c4fdd1-f5f9-4cdd-80c9-edd11956d0b3/60057995886f4a57d3fdf1aff1eb01c2.jpg',
    alt: 'Charging equipment'
  },
  {
    url: 'https://horizons-cdn.hostinger.com/54c4fdd1-f5f9-4cdd-80c9-edd11956d0b3/3b9f46a4072c7d13d6bb9fa0680a925d.jpg',
    alt: 'Stereo Vision Pro tempered glass'
  },
  {
    url: 'https://horizons-cdn.hostinger.com/54c4fdd1-f5f9-4cdd-80c9-edd11956d0b3/6649e397f74315c39252accd9a43b49a.jpg',
    alt: 'HD Pro screen protector'
  }
];

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const ImageCarousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';

  const imageIndex = Math.abs(page % images.length);

  const paginate = useCallback((newDirection) => {
    setPage(prev => [prev[0] + newDirection, newDirection]);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        paginate(isRtl ? 1 : -1);
      } else if (e.key === 'ArrowRight') {
        paginate(isRtl ? -1 : 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate, isRtl]);

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    paginate(-1);
  };
  
  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    paginate(1);
  };

  return (
    <div 
      className="relative w-full h-[50vh] md:h-[60vh] lg:h-[75vh] overflow-hidden bg-muted group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      dir="ltr" // Force LTR for Framer Motion x-axis math, we handle RTL logically via buttons
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex].url}
          alt={images[imageIndex].alt}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 object-cover-full cursor-grab active:cursor-grabbing"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none z-10" />

      {/* Navigation Controls - using absolute left/right with RTL flip */}
      <div 
        className="absolute inset-0 flex items-center justify-between px-4 sm:px-8 pointer-events-none z-30"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <Button
          variant="secondary"
          size="icon"
          className="pointer-events-auto rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-background/80 backdrop-blur hover:bg-background/100 text-foreground transition-all duration-300 opacity-80 md:opacity-0 md:group-hover:opacity-100 shadow-lg border border-border/50"
          onClick={handlePrev}
          aria-label={t('carousel_prev')}
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="pointer-events-auto rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-background/80 backdrop-blur hover:bg-background/100 text-foreground transition-all duration-300 opacity-80 md:opacity-0 md:group-hover:opacity-100 shadow-lg border border-border/50"
          onClick={handleNext}
          aria-label={t('carousel_next')}
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>

      {/* Dots */}
      <div 
        className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 sm:gap-3 z-30 pointer-events-none"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              const newDirection = index > imageIndex ? 1 : -1;
              setPage([page + (index - imageIndex), newDirection]);
            }}
            aria-label={t('carousel_slide', { index: index + 1 })}
            className={`pointer-events-auto w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === imageIndex 
                ? 'bg-primary w-6 sm:w-8 scale-110 shadow-sm' 
                : 'bg-white/60 hover:bg-white hover:scale-110'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
