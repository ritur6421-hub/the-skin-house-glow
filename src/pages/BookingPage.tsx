import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Send } from "lucide-react";
import { toast } from "sonner";
import { submitAppointment, openWhatsApp } from "@/lib/appointments";

const serviceOptions = [
  "Botox & Fillers",
  "Laser Treatments",
  "Hydra Facial",
  "Chemical Peels",
  "Hair Restoration",
  "Men's Skin Care",
  "Acne Scar Management",
  "General Consultation",
];

const BookingPage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.service || !form.date) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const { error } = await submitAppointment(form);
      if (error) { console.error("Appointment insert error:", error); throw error; }
      console.log("Appointment saved successfully");

      toast.success("Appointment booked successfully! We'll contact you shortly.");
      setForm({ name: "", phone: "", service: "", date: "", message: "" });
    } catch (error) {
      console.error("Appointment page submission failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              Schedule a Visit
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Book an Appointment
            </h1>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Fill in the form below and we'll get back to you to confirm your
              appointment.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-2xl p-8 md:p-12"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                <Calendar size={22} className="text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">
                  Appointment Details
                </h2>
                <p className="text-muted-foreground text-sm">
                  All fields marked with * are required
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    maxLength={100}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    maxLength={15}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Service *
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    required
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Additional Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Any additional details or concerns..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                  maxLength={1000}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gold-gradient text-primary-foreground py-4 rounded-xl font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
              >
                <Send size={16} />
                {loading ? "Sending..." : "Confirm Appointment"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
