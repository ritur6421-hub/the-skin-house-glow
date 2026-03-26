import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles, Star, Zap, Heart, Scissors, ShieldCheck, Users,
  Phone, MapPin, Clock, Send, ChevronLeft, ChevronRight, Quote, Instagram,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import HeroSlider from "@/components/HeroSlider";
import AppointmentPopup from "@/components/AppointmentPopup";
import doctorImg from "@/assets/doctor.jpg";

const services = [
  { icon: Sparkles, name: "Botox & Fillers", desc: "Smooth wrinkles and restore youthful volume" },
  { icon: Zap, name: "Laser Treatments", desc: "Advanced laser technology for flawless skin" },
  { icon: Heart, name: "Hydra Facial", desc: "Deep cleansing and hydration for radiant glow" },
  { icon: Star, name: "Chemical Peels", desc: "Reveal fresh, rejuvenated skin layers" },
  { icon: Scissors, name: "Hair Restoration", desc: "Regain confidence with fuller, healthier hair" },
  { icon: ShieldCheck, name: "Acne Treatment", desc: "Effective solutions for smooth, clear skin" },
];

const testimonials = [
  { name: "Priya S.", text: "Dr. Simran transformed my skin! The hydra facial results were amazing. Highly recommend The Skin House.", rating: 5 },
  { name: "Amit K.", text: "Best dermatologist in Ludhiana. My acne scars have improved dramatically after just a few sessions.", rating: 5 },
  { name: "Neha R.", text: "The laser treatment was painless and effective. The clinic is so clean and the staff is very caring.", rating: 5 },
  { name: "Rajan M.", text: "Great experience with hair restoration. Seeing real results within months. Thank you Dr. Kaur!", rating: 5 },
];

const galleryItems = [
  { category: "Hydra Facial", desc: "Radiant glow after a single session" },
  { category: "Chemical Peel", desc: "Visible improvement in skin texture" },
  { category: "Laser Treatment", desc: "Pigmentation reduced significantly" },
  { category: "Acne Scar", desc: "Smoother skin after treatment course" },
  { category: "Hair Restoration", desc: "Noticeable hair regrowth results" },
  { category: "Botox & Fillers", desc: "Natural-looking wrinkle reduction" },
];

const HomePage = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" });
  const [contactLoading, setContactLoading] = useState(false);

  // Auto-show popup after 5 seconds
  useEffect(() => {
    const shown = sessionStorage.getItem("popup_shown");
    if (!shown) {
      const timer = setTimeout(() => {
        setPopupOpen(true);
        sessionStorage.setItem("popup_shown", "true");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Auto-scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.phone.trim() || !contactForm.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setContactLoading(true);
    try {
      const payload = {
        name: contactForm.name.trim(),
        phone: contactForm.phone.trim(),
        message: contactForm.message.trim(),
      };
      console.log("Submitting contact (homepage):", payload);
      const { error } = await supabase.from("contacts").insert(payload);
      if (error) { console.error("Contact insert error:", error); throw error; }
      toast.success("Message sent! We'll get back to you soon.");
      setContactForm({ name: "", phone: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setContactLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7 },
  };

  return (
    <div>
      {/* Popup Appointment Form */}
      <AppointmentPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />

      {/* Hero Slider */}
      <HeroSlider onBookClick={() => setPopupOpen(true)} />

      {/* Services */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-semibold">What We Offer</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">Our Signature Treatments</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to="/services"
                  className="block group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl gold-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <service.icon size={24} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="text-primary font-semibold text-sm tracking-wider uppercase hover:underline">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* About Doctor */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl border-2 border-primary/20" />
                <img
                  src={doctorImg}
                  alt="Dr. Simran Kaur - Dermatologist at The Skin House"
                  className="rounded-2xl w-full object-cover aspect-[3/4] max-h-[550px]"
                  loading="lazy"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-semibold">Your Skin Specialist</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Dr. Simran Kaur</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Dr. Simran Kaur is a highly skilled dermatologist and aesthetic medicine specialist based in Ludhiana, Punjab.
                  With years of dedicated practice, she has established The Skin House as a premier destination for comprehensive
                  dermatological care.
                </p>
                <p>
                  Her expertise spans cosmetic and medical dermatology — Botox, fillers, laser treatments, chemical peels,
                  and hair restoration. Every patient receives personalized, evidence-based care in a luxurious environment.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { value: "5000+", label: "Patients" },
                  { value: "10+", label: "Years Exp." },
                  { value: "20+", label: "Treatments" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-xl bg-background border border-border">
                    <p className="font-display text-xl font-bold text-primary">{stat.value}</p>
                    <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setPopupOpen(true)}
                className="mt-8 gold-gradient text-primary-foreground px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase hover:opacity-90 transition-all inline-block"
              >
                Book Consultation
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-semibold">Results</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">Before & After</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[4/3] bg-muted flex relative overflow-hidden">
                  <div className="w-1/2 bg-muted flex items-center justify-center border-r border-border">
                    <span className="text-muted-foreground text-sm font-medium">Before</span>
                  </div>
                  <div className="w-1/2 bg-secondary flex items-center justify-center">
                    <span className="text-secondary-foreground text-sm font-medium">After</span>
                  </div>
                  <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                    {item.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">{item.category}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/gallery" className="text-primary font-semibold text-sm tracking-wider uppercase hover:underline">
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-semibold">What Patients Say</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">Testimonials</h2>
          </motion.div>
          <div className="max-w-2xl mx-auto relative">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="shrink-0 w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
              >
                <ChevronLeft size={18} />
              </button>

              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex-1 text-center bg-card border border-border rounded-2xl p-8"
              >
                <Quote size={32} className="text-primary/30 mx-auto mb-4" />
                <p className="text-foreground text-lg leading-relaxed italic mb-4">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div className="flex justify-center gap-1 mb-3">
                  {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="font-display font-semibold text-foreground">{testimonials[currentTestimonial].name}</p>
              </motion.div>

              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="shrink-0 w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-2 rounded-full transition-all ${i === currentTestimonial ? "w-6 bg-primary" : "w-2 bg-border"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gold-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Book Your Appointment Now
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Take the first step towards radiant, healthy skin. Book your consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setPopupOpen(true)}
              className="inline-block bg-background text-foreground px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:shadow-2xl transition-all"
            >
              Book Appointment
            </button>
            <a
              href="https://wa.me/919709703638?text=Hi%20I%20want%20to%20book%20an%20appointment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-primary-foreground px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:opacity-90 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-semibold">Reach Us</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">Get In Touch</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info + Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="space-y-5 mb-8">
                <a href="tel:9709703638" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Phone</p>
                    <p className="text-muted-foreground text-sm">+91 9709703638</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Address</p>
                    <p className="text-muted-foreground text-sm">Synogen Biomed, Sukhdev Nagar, Jamalpur, Ludhiana, Punjab</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Hours</p>
                    <p className="text-muted-foreground text-sm">Mon–Sat: 10 AM – 7 PM | Sun: By Appointment</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3423.8!2d75.85!3d30.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSukhdev+Nagar+Jamalpur+Ludhiana!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Skin House Location"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-card border border-border rounded-2xl p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">Send a Message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Your Name</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="Enter your phone"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Message</label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="How can we help you?"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="w-full gold-gradient text-primary-foreground py-3.5 rounded-xl font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    <Send size={16} />
                    {contactLoading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
