import { motion } from "framer-motion";
import { Award, Heart, BookOpen, Users } from "lucide-react";
import doctorImg from "@/assets/doctor.jpg";

const AboutPage = () => {
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
              About Us
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Meet Dr. Simran Kaur
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Doctor Intro */}
      <section className="py-24">
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
                  className="rounded-2xl w-full object-cover aspect-[3/4] max-h-[600px]"
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
              <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 font-semibold">
                Your Skin Specialist
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Dr. Simran Kaur
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Dr. Simran Kaur is a highly skilled dermatologist and aesthetic
                  medicine specialist based in Ludhiana, Punjab. With years of
                  dedicated practice in advanced skin and hair treatments, she has
                  established The Skin House as a premier destination for
                  comprehensive dermatological care.
                </p>
                <p>
                  Her expertise spans across a wide range of cosmetic and medical
                  dermatology procedures, including Botox, fillers, laser treatments,
                  chemical peels, and hair restoration therapies. Dr. Kaur is
                  committed to providing personalized treatment plans tailored to
                  each patient's unique needs.
                </p>
                <p>
                  At The Skin House, every patient receives compassionate,
                  evidence-based care in a luxurious and comfortable environment.
                  Dr. Kaur stays at the forefront of dermatological advancements,
                  ensuring her patients receive the most effective and safest
                  treatments available.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 gold-gradient">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "5000+", label: "Happy Patients" },
              { icon: Award, value: "10+", label: "Years Experience" },
              { icon: BookOpen, value: "20+", label: "Treatments Offered" },
              { icon: Heart, value: "100%", label: "Dedication" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon
                  size={28}
                  className="text-primary-foreground mx-auto mb-3"
                />
                <p className="font-display text-3xl font-bold text-primary-foreground">
                  {stat.value}
                </p>
                <p className="text-primary-foreground/70 text-sm mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
