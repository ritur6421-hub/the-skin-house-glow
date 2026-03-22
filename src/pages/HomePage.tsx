import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Star, Zap, Heart, Scissors, ShieldCheck, Users } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";

const services = [
  { icon: Sparkles, name: "Botox & Fillers", desc: "Smooth wrinkles and restore youthful volume" },
  { icon: Zap, name: "Laser Treatments", desc: "Advanced laser technology for flawless skin" },
  { icon: Heart, name: "Hydra Facial", desc: "Deep cleansing and hydration for radiant glow" },
  { icon: Star, name: "Chemical Peels", desc: "Reveal fresh, rejuvenated skin layers" },
  { icon: Scissors, name: "Hair Restoration", desc: "Regain confidence with fuller, healthier hair" },
  { icon: ShieldCheck, name: "Acne Scar Management", desc: "Effective solutions for smooth, clear skin" },
];

const HomePage = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p className="text-gold-light text-sm tracking-[0.3em] uppercase mb-4 font-medium">
              Premium Skin & Hair Clinic
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-background leading-tight mb-6">
              Glow with Confidence
              <br />
              <span className="italic font-normal text-gold-light">
                at The Skin House
              </span>
            </h1>
            <p className="text-background/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
              Advanced Skin & Hair Treatments by Dr. Simran Kaur
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/book"
                className="gold-gradient text-primary-foreground px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:opacity-90 hover:shadow-2xl transition-all"
              >
                Book Appointment
              </Link>
              <Link
                to="/services"
                className="border-2 border-background/30 text-background px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-background/10 transition-all"
              >
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-semibold">
              What We Offer
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Our Signature Treatments
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  to="/services"
                  className="block group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mb-5">
                    <service.icon size={24} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="text-primary font-semibold text-sm tracking-wider uppercase hover:underline"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-semibold">
              Why Choose Us
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Your Skin Deserves the Best
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: ShieldCheck, title: "Expert Care", desc: "Treatments by qualified dermatologist Dr. Simran Kaur" },
              { icon: Sparkles, title: "Latest Technology", desc: "State-of-the-art equipment for optimal results" },
              { icon: Users, title: "Personalized Approach", desc: "Customized treatment plans for every individual" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gold-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready for Your Transformation?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Book your consultation today and take the first step towards radiant, healthy skin.
          </p>
          <Link
            to="/book"
            className="inline-block bg-background text-foreground px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:shadow-2xl transition-all"
          >
            Book Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
