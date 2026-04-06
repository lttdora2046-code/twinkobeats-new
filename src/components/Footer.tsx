import { motion } from "motion/react";
import { Heart, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-8">
            <motion.div 
              whileHover={{ rotate: 180 }}
              className="w-10 h-10 bg-brand-pink rounded-full flex items-center justify-center shadow-sm"
            >
              <Heart className="text-white w-6 h-6 fill-current" />
            </motion.div>
            <span className="text-3xl font-display font-bold tracking-tight">
              tinko<span className="text-brand-purple">beats</span>
            </span>
          </div>
          <p className="text-gray-400 text-xl max-w-md leading-relaxed mb-10">
            Crafting happiness one bead at a time. Join our creative community and let your imagination run wild!
          </p>
          <div className="flex gap-6">
            <motion.a whileHover={{ y: -5 }} href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-purple transition-colors">
              <Instagram className="w-6 h-6" />
            </motion.a>
            <motion.a whileHover={{ y: -5 }} href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-purple transition-colors">
              <Facebook className="w-6 h-6" />
            </motion.a>
            <motion.a whileHover={{ y: -5 }} href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-purple transition-colors">
              <Twitter className="w-6 h-6" />
            </motion.a>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-display font-bold mb-8 text-brand-pink">Quick Links</h4>
          <ul className="space-y-4 text-lg text-gray-400">
            <li><a href="#products" className="hover:text-white transition-colors">Beads & Products</a></li>
            <li><a href="#events" className="hover:text-white transition-colors">Events & Parties</a></li>
            <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-display font-bold mb-8 text-brand-purple">Contact Us</h4>
          <ul className="space-y-6 text-lg text-gray-400">
            <li className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-brand-purple shrink-0" />
              <span>123 Bead Street, Creative City, CC 12345</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-brand-purple shrink-0" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-brand-purple shrink-0" />
              <span>hello@tinkobeats.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/10 text-center text-gray-500 font-medium">
        <p>&copy; {new Date().getFullYear()} tinkobeats. All rights reserved. Made with <Heart className="w-4 h-4 inline text-brand-pink fill-current" /> for creativity.</p>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-purple/5 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-brand-pink/5 blur-[120px] -z-10" />
    </footer>
  );
}
