import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const SignupPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("signups").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      });
      if (error) throw error;
      toast.success("Signed up successfully! We'll be in touch.");
      setForm({ name: "", email: "", phone: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-semibold">Join Us</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">Sign Up</h1>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Register to receive updates and exclusive offers from The Skin House.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                <UserPlus size={22} className="text-primary-foreground" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground">Your Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Full Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all" maxLength={100} required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your email address" className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all" maxLength={255} required />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Phone *</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Your phone number" className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all" maxLength={15} required />
              </div>
              <button type="submit" disabled={loading} className="w-full gold-gradient text-primary-foreground py-4 rounded-xl font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 text-sm">
                <UserPlus size={16} />
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
