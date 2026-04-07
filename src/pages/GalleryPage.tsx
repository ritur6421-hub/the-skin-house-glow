import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";

type VideoItem = 
  | { type: "mp4"; src: string; title: string; desc: string }
  | { type: "youtube"; id: string; title: string; desc: string };

const videos: VideoItem[] = [
  {
    type: "mp4",
    src: "/videos/hydra-facial.mp4",
    title: "Hydra Facial Treatment",
    desc: "Deep cleansing for radiant, glowing skin",
  },
  {
    type: "youtube",
    id: "dQw4w9WgXcQ",
    title: "Chemical Peel Session",
    desc: "Visible improvement in skin texture",
  },
  {
    type: "youtube",
    id: "dQw4w9WgXcQ",
    title: "Laser Pigmentation Removal",
    desc: "Advanced laser technology for flawless skin",
  },
  {
    type: "youtube",
    id: "dQw4w9WgXcQ",
    title: "Hair Restoration Therapy",
    desc: "Noticeable hair regrowth results",
  },
  {
    type: "youtube",
    id: "dQw4w9WgXcQ",
    title: "Anti-Aging Botox Treatment",
    desc: "Natural-looking wrinkle reduction",
  },
  {
    type: "youtube",
    id: "dQw4w9WgXcQ",
    title: "Acne Scar Treatment",
    desc: "Smoother, clearer skin after sessions",
  },
];

const GalleryPage = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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
              Video Gallery
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Our Treatments in Action
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Real results, real transformations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setActiveVideo(video.id)}
              >
                {/* Thumbnail */}
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {video.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{video.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 text-background hover:text-primary transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
              title="Treatment Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
