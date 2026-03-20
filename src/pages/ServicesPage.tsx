import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Zap, Heart, Star, Scissors, ShieldCheck, UserCheck } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    name: "Botox & Fillers",
    desc: "Smooth out fine lines and wrinkles, restore facial volume, and achieve a naturally youthful appearance with expertly administered Botox and dermal filler treatments.",
    benefits: ["Wrinkle reduction", "Volume restoration", "Lip enhancement", "Non-surgical facelift"],
  },
  {
    icon: Zap,
    name: "Laser Treatments",
    desc: "State-of-the-art laser technology for pigmentation correction, skin tightening, tattoo removal, and overall skin rejuvenation with minimal downtime.",
    benefits: ["Pigmentation correction", "Skin tightening", "Tattoo removal", "Hair removal"],
  },
  {
    icon: Heart,
    name: "Hydra Facial",
    desc: "A multi-step facial treatment that cleanses, exfoliates, extracts, and hydrates your skin for an instant, radiant glow that lasts.",
    benefits: ["Deep cleansing", "Hydration boost", "Instant glow", "Anti-aging benefits"],
  },
  {
    icon: Star,
    name: "Chemical Peels",
    desc: "Controlled exfoliation treatments that reveal fresh, smoother skin underneath. Effective for acne, pigmentation, fine lines, and uneven skin tone.",
    benefits: ["Acne treatment", "Even skin tone", "Fine line reduction", "Texture improvement"],
  },
  {
    icon: Scissors,
    name: "Hair Restoration",
    desc: "Comprehensive hair loss solutions including PRP therapy, mesotherapy, and advanced treatments to promote natural hair growth and restore confidence.",
    benefits: ["PRP therapy", "Mesotherapy", "Hair growth stimulation", "Scalp treatment"],
  },
  {
    icon: UserCheck,
    name: "Men's Skin Care",
    desc: "Specialized skin care solutions designed for men, addressing concerns like acne, pigmentation, aging, and grooming with a results-driven approach.",
    benefits: ["Anti-aging solutions", "Acne management", "Skin brightening", "Grooming treatments"],
  },
  {
    icon: ShieldCheck,
    name: "Acne Scar Management",
    desc: "Advanced treatments combining laser therapy, microneedling, and chemical peels to significantly reduce acne scars and restore smooth skin texture.",
    benefits: ["Microneedling", "Fractional laser", "Scar reduction", "Skin resurfacing"],
  },
];

const ServicesPage = () => {
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
              Our Expertise
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Treatments & Services
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Discover our comprehensive range of advanced skin and hair treatments
              tailored to your unique needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 rounded-xl gold-gradient flex items-center justify-center shrink-0">
                  <service.icon size={28} className="text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.benefits.map((b) => (
                      <span
                        key={b}
                        className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full font-medium"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gold-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Begin Your Treatment?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Schedule a consultation with Dr. Simran Kaur to discuss the best
            treatment plan for you.
          </p>
          <Link
            to="/book"
            className="inline-block bg-background text-foreground px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:shadow-2xl transition-all"
          >
            Book Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
