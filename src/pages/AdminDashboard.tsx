import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Save, LogOut, Layout, Image as ImageIcon, Type, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchContent();
  }, [navigate]);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/content");
      const data = await response.json();
      setContent(data);
    } catch (err) {
      console.error("Failed to fetch content", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: "", text: "" });
    const token = localStorage.getItem("adminToken");

    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Content updated successfully!" });
      } else {
        const data = await response.json();
        if (response.status === 401) {
          localStorage.removeItem("adminToken");
          navigate("/admin/login");
        }
        setMessage({ type: "error", text: data.error || "Failed to update content" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-pink/5 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-brand-purple border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-pink/5 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-display font-black text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-500 font-medium text-lg">Manage your tinkobeats website content here.</p>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={saving}
              className="bg-brand-purple text-white px-8 py-3 rounded-2xl font-black shadow-lg hover:shadow-brand-purple/20 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? "Saving..." : "Save Changes"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-white text-gray-600 border-2 border-gray-100 px-6 py-3 rounded-2xl font-bold shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </motion.button>
          </div>
        </header>

        {message.text && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-2xl flex items-center gap-3 font-bold ${
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {message.text}
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-12">
          {/* Hero Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 rounded-[3rem] shadow-xl border-2 border-brand-pink/10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-brand-pink/20 rounded-xl flex items-center justify-center">
                <Layout className="w-6 h-6 text-brand-pink" />
              </div>
              <h2 className="text-2xl font-display font-black text-gray-900">Hero Section</h2>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider flex items-center gap-2">
                  <Type className="w-4 h-4" /> Hero Title
                </label>
                <input 
                  type="text" 
                  value={content.hero.title}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 focus:border-brand-purple focus:ring-0 transition-all outline-none font-medium text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider flex items-center gap-2">
                  <Type className="w-4 h-4" /> Hero Subtitle
                </label>
                <textarea 
                  rows={3}
                  value={content.hero.subtitle}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 focus:border-brand-purple focus:ring-0 transition-all outline-none font-medium text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Hero Image URL
                </label>
                <input 
                  type="text" 
                  value={content.hero.image}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, image: e.target.value } })}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 focus:border-brand-purple focus:ring-0 transition-all outline-none font-medium"
                />
                <div className="mt-4 aspect-video rounded-2xl overflow-hidden border-2 border-gray-100 bg-gray-50">
                  <img src={content.hero.image} alt="Hero Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </motion.section>

          {/* About Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-10 rounded-[3rem] shadow-xl border-2 border-brand-pink/10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-brand-purple/20 rounded-xl flex items-center justify-center">
                <Layout className="w-6 h-6 text-brand-purple" />
              </div>
              <h2 className="text-2xl font-display font-black text-gray-900">About Section</h2>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider flex items-center gap-2">
                  <Type className="w-4 h-4" /> About Title
                </label>
                <input 
                  type="text" 
                  value={content.about.title}
                  onChange={(e) => setContent({ ...content, about: { ...content.about, title: e.target.value } })}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 focus:border-brand-purple focus:ring-0 transition-all outline-none font-medium text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider flex items-center gap-2">
                  <Type className="w-4 h-4" /> About Text 1
                </label>
                <textarea 
                  rows={3}
                  value={content.about.text1}
                  onChange={(e) => setContent({ ...content, about: { ...content.about, text1: e.target.value } })}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 focus:border-brand-purple focus:ring-0 transition-all outline-none font-medium text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider flex items-center gap-2">
                  <Type className="w-4 h-4" /> About Text 2
                </label>
                <textarea 
                  rows={3}
                  value={content.about.text2}
                  onChange={(e) => setContent({ ...content, about: { ...content.about, text2: e.target.value } })}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 focus:border-brand-purple focus:ring-0 transition-all outline-none font-medium text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> About Image URL
                </label>
                <input 
                  type="text" 
                  value={content.about.image}
                  onChange={(e) => setContent({ ...content, about: { ...content.about, image: e.target.value } })}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 px-6 focus:border-brand-purple focus:ring-0 transition-all outline-none font-medium"
                />
                <div className="mt-4 aspect-video rounded-2xl overflow-hidden border-2 border-gray-100 bg-gray-50">
                  <img src={content.about.image} alt="About Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
