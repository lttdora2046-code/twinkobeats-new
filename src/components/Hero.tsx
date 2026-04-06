import { motion } from "motion/react";
import { Sparkles, Star, Heart, ShoppingCart, Calendar } from "lucide-react";

export default function Hero({ content }: { content: any }) {
  const beads = [
    { color: "bg-brand-pink", size: "w-12 h-12", top: "10%", left: "10%", delay: 0 },
    { color: "bg-brand-purple", size: "w-16 h-16", top: "20%", left: "80%", delay: 0.5 },
    { color: "bg-brand-yellow", size: "w-10 h-10", top: "70%", left: "15%", delay: 1 },
    { color: "bg-brand-mint", size: "w-14 h-14", top: "60%", left: "85%", delay: 1.5 },
    { color: "bg-brand-peach", size: "w-12 h-12", top: "40%", left: "5%", delay: 2 },
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-b from-brand-pink/10 to-white">
      {/* Floating Beads */}
      {beads.map((bead, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1, y: [0, -20, 0] }}
          transition={{ 
            opacity: { duration: 1, delay: bead.delay },
            scale: { duration: 1, delay: bead.delay },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: bead.delay }
          }}
          className={`absolute ${bead.color} ${bead.size} rounded-full shadow-inner blur-[1px]`}
          style={{ top: bead.top, left: bead.left }}
        />
      ))}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-brand-pink/30 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-brand-purple" />
            <span className="text-sm font-bold text-brand-purple tracking-wide uppercase">Welcome to tinkobeats</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-black text-gray-900 leading-tight mb-6">
            {content.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
            {content.subtitle}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-purple text-white px-10 py-4 rounded-full font-black text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-3"
            >
              <ShoppingCart className="w-6 h-6" />
              Shop Retail Beads
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-brand-purple border-2 border-brand-purple px-10 py-4 rounded-full font-black text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
            >
              <Calendar className="w-6 h-6" />
              Book an Event
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="relative"
        >
          <div className="relative z-10 bg-white p-6 rounded-[2rem] shadow-2xl border-4 border-brand-pink/20">
            <img 
              src={content.image} 
              alt="Beautiful beads" 
              className="w-full h-auto rounded-[1.5rem] object-cover"
              referrerPolicy="no-referrer"
            />
            
            {/* Floating badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-brand-yellow p-4 rounded-2xl shadow-lg rotate-12 border-2 border-white"
            >
              <Star className="w-8 h-8 text-orange-400 fill-current" />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-brand-mint p-4 rounded-2xl shadow-lg -rotate-12 border-2 border-white"
            >
              <Heart className="w-8 h-8 text-red-400 fill-current" />
            </motion.div>
          </div>
          
          {/* Decorative circles */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-purple/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
