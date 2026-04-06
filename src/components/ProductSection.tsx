import { motion } from "motion/react";
import { ShoppingBag, Star, Heart, ArrowRight } from "lucide-react";

export default function ProductSection() {
  const products = [
    { id: 1, name: "Pastel Dream Beads", price: "$12.99", category: "Retail", color: "bg-brand-pink", image: "https://picsum.photos/seed/bead1/400/400" },
    { id: 2, name: "Crystal Clear Glass", price: "$15.50", category: "Retail", color: "bg-brand-purple", image: "https://picsum.photos/seed/bead2/400/400" },
    { id: 3, name: "Handmade Flower Bracelet", price: "$24.00", category: "Finished", color: "bg-brand-yellow", image: "https://picsum.photos/seed/bead3/400/400" },
    { id: 4, name: "Ocean Breeze Necklace", price: "$32.00", category: "Finished", color: "bg-brand-mint", image: "https://picsum.photos/seed/bead4/400/400" },
  ];

  return (
    <section id="products" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-display font-black text-gray-900 mb-4">
              Our <span className="text-brand-purple">Bead</span> Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-xl">
              From raw materials to exquisite finished jewelry, explore our curated selection of high-quality beads and handmade treasures.
            </p>
          </motion.div>
          
          <motion.button
            whileHover={{ x: 10 }}
            className="flex items-center gap-2 text-brand-purple font-bold text-lg group"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className={`relative aspect-square rounded-[2rem] overflow-hidden ${product.color}/20 mb-6 shadow-sm group-hover:shadow-xl transition-all`}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                  {product.category}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg text-brand-purple hover:bg-brand-purple hover:text-white transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                </motion.button>
              </div>
              
              <div className="px-2">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-1">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-brand-purple">{product.price}</span>
                  <div className="flex gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
