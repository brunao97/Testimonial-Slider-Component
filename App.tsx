
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from './constants';

const CARD_HEIGHT = 208;
const GAP = 24;
const CARD_TOTAL_HEIGHT = CARD_HEIGHT + GAP;

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const testimonial = TESTIMONIALS[currentIndex];
  const listCenterIndex = Math.floor(TESTIMONIALS.length / 2);

  const textVariants = {
    enter: { opacity: 0, filter: 'blur(10px)' },
    center: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(10px)' },
  };

  const PlaceholderCard: React.FC<{ className?: string }> = ({ className = "" }) => (
    <div className={`rounded-[32px] bg-white border border-gray-100/60 shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex-shrink-0 ${className}`} />
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f9fafb] selection:bg-gray-100">
      <div className="w-[1100px] h-[520px] bg-white rounded-[48px] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.08)] overflow-hidden flex border border-gray-100/80 relative">
        
        <div className="w-[42%] bg-[#fcfcfd] flex items-center justify-center relative overflow-hidden border-r border-gray-50">
          <div className="flex gap-4 relative h-full items-center">
            
            <motion.div 
              className="flex flex-col gap-6"
              animate={{ y: (currentIndex * CARD_TOTAL_HEIGHT) - (TESTIMONIALS.length * CARD_TOTAL_HEIGHT / 2) }}
              transition={{ type: "spring", stiffness: 70, damping: 20 }}
            >
              {[...Array(TESTIMONIALS.length * 3)].map((_, i) => (
                <PlaceholderCard key={`c1-${i}`} className="w-14 h-32 opacity-40" />
              ))}
            </motion.div>

            <div className="relative z-10 h-full flex items-center">
              <motion.div 
                className="flex flex-col gap-6"
                animate={{ y: (listCenterIndex - currentIndex) * CARD_TOTAL_HEIGHT }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
              >
                {TESTIMONIALS.map((t, i) => (
                  <div 
                    key={`c2-${i}`} 
                    className={`w-52 h-52 rounded-[40px] transition-all duration-700 flex-shrink-0 relative overflow-hidden bg-white ${
                      i === currentIndex 
                        ? 'scale-110 z-20 ring-8 ring-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)] opacity-100' 
                        : 'opacity-0 scale-95 grayscale blur-[1px]'
                    }`}
                  >
                    <img 
                      src={t.imageUrl} 
                      alt="" 
                      className="w-full h-full object-cover object-center" 
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div 
              className="flex flex-col gap-6"
              animate={{ y: (currentIndex * CARD_TOTAL_HEIGHT) - (TESTIMONIALS.length * CARD_TOTAL_HEIGHT / 2) }}
              transition={{ type: "spring", stiffness: 70, damping: 20 }}
            >
              {[...Array(TESTIMONIALS.length * 3)].map((_, i) => (
                <PlaceholderCard key={`c3-${i}`} className="w-14 h-32 opacity-40" />
              ))}
            </motion.div>

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#fcfcfd] via-transparent via-transparent to-[#fcfcfd] opacity-95" />
          </div>
        </div>

        <div className="flex-1 flex flex-col relative bg-white">
          <div className="absolute top-14 left-20 z-10">
            <Quote className="w-16 h-16 text-gray-100 fill-current opacity-80" />
          </div>

          <div className="flex-1 pt-28 pb-12 px-28 flex flex-col justify-between">
            <div className="flex-1 flex flex-col justify-center overflow-hidden pl-4">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={testimonial.id}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut"
                  }}
                >
                  <h2 className="text-3xl md:text-4xl font-mono text-[#1a1a1a] leading-[1.35] tracking-tight max-w-[540px] antialiased line-clamp-4">
                    {testimonial.text}
                  </h2>
                  <p className="text-gray-400 font-medium text-lg font-mono tracking-tight mt-8">
                    {testimonial.author}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-gray-50">
              <div className="flex items-center gap-4">
                <button
                  onClick={prevTestimonial}
                  className="w-11 h-11 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-90"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-11 h-11 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-90"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="font-mono text-sm font-medium tracking-widest text-gray-300 select-none">
                <span className="text-gray-900">
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span className="mx-2">—</span>
                <span>{String(TESTIMONIALS.length).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
