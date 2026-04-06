/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import EventSection from "./components/EventSection";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { motion, useScroll, useSpring } from "motion/react";

function HomePage() {
  const [content, setContent] = useState<any>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    fetch("/api/content")
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error("Failed to fetch content", err));
  }, []);

  if (!content) return null;

  return (
    <div className="relative min-h-screen selection:bg-brand-pink/50 selection:text-brand-purple">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-brand-purple origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero content={content.hero} />
        <ProductSection />
        <EventSection />
        
        <section id="about" className="py-24 px-6 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 bg-brand-yellow/20 p-8 rounded-[3rem] border-4 border-brand-yellow/30">
                <img 
                  src={content.about.image} 
                  alt="Our story" 
                  className="w-full h-auto rounded-[2rem] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-brand-yellow/10 rounded-full blur-3xl" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-display font-black text-gray-900 mb-8">
                {content.about.title}
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {content.about.text1}
              </p>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                {content.about.text2}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-pink text-white px-10 py-4 rounded-full font-black text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Learn More About Us
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
