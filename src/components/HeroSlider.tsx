import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.jpg";

const slides = [
  {
    image: heroSlide1,
    heading: "Glow with Confidence",
    subheading: "Advanced Skin & Hair Treatments at The Skin House",
    button: "Book Appointment",
  },
  {
    image: heroSlide2,
    heading: "Acne & Scar Treatment",
    subheading: "Get clear and healthy skin with expert care",
    button: "Explore Services",
  },
  {
    image: heroSlide3,
    heading: "Laser & Skin Rejuvenation",
    subheading: "Safe and effective modern treatments",
    button: "Learn More",
  },
  {
    image: heroSlide4,
    heading: "Hair Restoration Solutions",
    subheading: "Regain confidence with advanced hair treatments",
    button: "Book Now",
  },
];

interface HeroSliderProps {
  onBookClick?: () => void;
}

const HeroSlider = ({ onBookClick }: HeroSliderProps) => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 font-medium">
                Premium Skin & Hair Clinic
              </p>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-background leading-tight mb-6">
                {slides[current].heading}
              </h1>
              <p className="text-background/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
                {slides[current].subheading}
              </p>
              <button
                onClick={onBookClick}
                className="gold-gradient text-primary-foreground px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:opacity-90 hover:shadow-2xl transition-all inline-block cursor-pointer"
              >
                {slides[current].button}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm border border-background/30 flex items-center justify-center text-background hover:bg-background/30 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm border border-background/30 flex items-center justify-center text-background hover:bg-background/30 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-3 rounded-full transition-all duration-300 ${
              i === current ? "w-8 gold-gradient" : "w-3 bg-background/40 hover:bg-background/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
