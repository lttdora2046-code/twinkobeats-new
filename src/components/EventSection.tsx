import { motion } from "motion/react";
import { Cake, PartyPopper, Gift, Calendar, ArrowRight } from "lucide-react";

export default function EventSection() {
  const events = [
    { title: "Birthday Parties", icon: Cake, color: "bg-brand-pink", description: "Celebrate your special day with a creative bead-making workshop for all ages." },
    { title: "Corporate Events", icon: PartyPopper, color: "bg-brand-purple", description: "Team building through creativity! Design unique accessories together." },
    { title: "Private Workshops", icon: Gift, color: "bg-brand-yellow", description: "Host a personalized bead-making session for your friends and family." },
  ];

  return (
    <section id="events" className="py-24 px-6 bg-brand-pink/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/80 border border-brand-pink/30 px-4 py-2 rounded-full mb-6"
          >
            <PartyPopper className="w-4 h-4 text-brand-purple" />
            <span className="text-sm font-bold text-brand-purple tracking-wide uppercase">Unforgettable Moments</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-black text-gray-900 mb-6"
          >
            Host Your <span className="text-brand-purple">Event</span> with Us
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Make your next celebration truly unique! We provide everything you need for a fun, creative, and memorable bead-making experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -15 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl border-2 border-brand-pink/10 relative group"
            >
              <div className={`w-20 h-20 ${event.color} rounded-3xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-12 transition-transform`}>
                <event.icon className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">{event.title}</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {event.description}
              </p>
              
              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-brand-purple font-bold text-lg"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-yellow/30 rounded-full blur-xl group-hover:bg-brand-yellow/50 transition-colors" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-brand-purple p-12 rounded-[4rem] text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-display font-black mb-6">Ready to Plan Your Party?</h3>
            <p className="text-xl text-brand-pink/90 mb-10 max-w-2xl mx-auto font-medium">
              Contact us today to discuss your event requirements and get a personalized quote. Let's make something beautiful together!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-brand-purple px-12 py-5 rounded-full font-black text-xl shadow-2xl hover:shadow-white/20 transition-all flex items-center gap-3 mx-auto"
            >
              <Calendar className="w-6 h-6" />
              Book Now
            </motion.button>
          </div>
          
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl" />
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
