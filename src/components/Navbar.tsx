import { motion } from "motion/react";
import { ShoppingBag, Calendar, Heart, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-pink/30 px-6 py-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <motion.div 
          whileHover={{ rotate: 180 }}
          className="w-10 h-10 bg-brand-pink rounded-full flex items-center justify-center shadow-sm"
        >
          <Heart className="text-white w-6 h-6 fill-current" />
        </motion.div>
        <span className="text-2xl font-display font-bold text-gray-800 tracking-tight">
          tinko<span className="text-brand-purple">beats</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
        <a href="#products" className="hover:text-brand-purple transition-colors">Beads & Products</a>
        <a href="#events" className="hover:text-brand-purple transition-colors">Events & Parties</a>
        <a href="#about" className="hover:text-brand-purple transition-colors">About Us</a>
      </div>

      <div className="flex items-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-brand-purple text-white px-6 py-2 rounded-full font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          Shop Now
        </motion.button>
        <button className="md:hidden p-2 text-gray-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.nav>
  );
}
