import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const galleryItems = [
  { category: "Hydra Facial", desc: "Radiant glow after a single session" },
  { category: "Chemical Peel", desc: "Visible improvement in skin texture" },
  { category: "Laser Treatment", desc: "Pigmentation reduced significantly" },
  { category: "Acne Scar", desc: "Smoother skin after treatment course" },
  { category: "Hair Restoration", desc: "Noticeable hair regrowth results" },
  { category: "Botox & Fillers", desc: "Natural-looking wrinkle reduction" },
];

const GalleryPage = () => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-semibold">
              Results
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Before & After Gallery
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              See the transformative results our patients have achieved with our
              advanced treatments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all"
              >
                {/* Placeholder for before/after */}
                <div className="aspect-[4/3] bg-muted flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 bg-muted flex items-center justify-center border-r border-border">
                      <span className="text-muted-foreground text-sm font-medium">Before</span>
                    </div>
                    <div className="w-1/2 bg-secondary flex items-center justify-center">
                      <span className="text-secondary-foreground text-sm font-medium">After</span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs px-3 py-1 rounded-full font-medium z-10">
                    {item.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {item.category}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">
              Actual patient results will be displayed here. Contact us to see
              more transformations.
            </p>
            <Link
              to="/book"
              className="gold-gradient text-primary-foreground px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase hover:opacity-90 transition-all inline-block"
            >
              Book Your Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
