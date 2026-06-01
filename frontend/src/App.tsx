import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  Stethoscope, 
  ShieldCheck, 
  ChevronDown, 
  User, 
  ClipboardList,
  Bone,
  Droplets,
  Heart,
  Scale,
  Thermometer,
  Zap,
  Search,
  Trash2,
  BookOpen,
  Cpu,
  Book,
  Layers,
  Shield,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---
interface PredictionData {
  id?: number;
  date?: string;
  formData?: any;
  status: string;
  prediction: string;
  confidence: string;
  explanation: string;
  recommendations?: string[]; 
}

// --- Components ---
const Navbar = ({ onStart, view, setView }: { onStart: () => void, view: string, setView: (v: 'home' | 'form' | 'result' | 'history' | 'education' | 'about') => void }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navTo = (targetView: 'home' | 'history' | 'education' | 'about') => {
    setView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileOpen(false);
  };

  // Lock scroll when menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white/50 shadow-sm print:hidden transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navTo('home')}>
            {/* Logo Rebalytix */}
            <img 
              src="/favicon.png" 
              alt="Logo Rebalytix" 
              className="w-10 h-10 md:w-11 md:h-11 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300" 
            />
            <div>
              <h1 className="font-display font-black text-lg md:text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-teal-600">Rebalytix AI</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">Med-Tech Skrining</p>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
            <button onClick={() => navTo('home')} className={cn("hover:text-emerald-600 transition-colors", view === 'home' && "text-emerald-600")}>Beranda</button>
            <button onClick={() => navTo('history')} className={cn("hover:text-emerald-600 transition-colors", view === 'history' && "text-emerald-600")}>Riwayat</button>
            <button onClick={() => navTo('education')} className={cn("hover:text-emerald-600 transition-colors", view === 'education' && "text-emerald-600")}>Edukasi Ginjal</button>
            <button onClick={() => navTo('about')} className={cn("hover:text-emerald-600 transition-colors", view === 'about' && "text-emerald-600")}>Tentang</button>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Primary action button - Clean & Simple */}
            <button 
              onClick={onStart}
              className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white px-5 md:px-6 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Prediksi</span>
              <span className="animate-slide-right inline-block">
                <ArrowRight size={18} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <div 
        className={cn(
          "fixed inset-0 z-[100] transition-all duration-300 md:hidden",
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-900/95 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />
        
        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-8">
          {/* Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <img src="/favicon.png" alt="Logo Rebalytix" className="w-12 h-12 object-contain drop-shadow-lg" />
            <div>
              <h2 className="font-display font-black text-2xl text-white">Rebalytix AI</h2>
              <p className="text-xs text-emerald-300 uppercase tracking-widest font-bold">Med-Tech Skrining</p>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col items-center gap-6 w-full max-w-xs">
            <button 
              onClick={() => navTo('home')} 
              className={cn(
                "w-full text-center py-4 px-6 rounded-2xl text-lg font-bold transition-all",
                view === 'home' 
                  ? "bg-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]" 
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
            >
              Beranda
            </button>
            <button 
              onClick={() => navTo('history')} 
              className={cn(
                "w-full text-center py-4 px-6 rounded-2xl text-lg font-bold transition-all",
                view === 'history' 
                  ? "bg-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]" 
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
            >
              Riwayat
            </button>
            <button 
              onClick={() => navTo('education')} 
              className={cn(
                "w-full text-center py-4 px-6 rounded-2xl text-lg font-bold transition-all",
                view === 'education' 
                  ? "bg-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]" 
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
            >
              Edukasi Ginjal
            </button>
            <button 
              onClick={() => navTo('about')} 
              className={cn(
                "w-full text-center py-4 px-6 rounded-2xl text-lg font-bold transition-all",
                view === 'about' 
                  ? "bg-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]" 
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
            >
              Tentang
            </button>
          </nav>

          {/* Footer Text */}
          <p className="mt-12 text-sm text-slate-400 text-center">
            Sistem Deteksi Gagal Ginjal Kronis<br/>Berbasis AI Machine Learning
          </p>
        </div>
      </div>
    </>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color }: any) => (
  <div className="group bg-white/70 backdrop-blur-lg border border-white/60 p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(16,185,129,0.1)] hover:-translate-y-2 transition-all duration-300">
    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner", color)}>
      <Icon size={28} className="text-slate-700" />
    </div>
    <h3 className="font-display font-bold text-xl mb-3 text-slate-800">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed font-medium">{description}</p>
  </div>
);

// Helper penentu status (Normal, Warning, Danger) untuk Frontend
const getIndicatorStatus = (label: string, value: number) => {
  const val = Number(value);
  const lbl = label.toLowerCase();
  
  if (lbl.includes('hb') || lbl.includes('hemoglobin')) {
    if (val >= 12 && val <= 17) return 'normal';
    return 'danger';
  }
  if (lbl.includes('kolesterol') || lbl.includes('chol')) {
    if (val < 200) return 'normal';
    if (val >= 200 && val <= 239) return 'warning';
    return 'danger';
  }
  if (lbl.includes('bmi') || lbl.includes('body mass index')) {
    if (val >= 18.5 && val <= 24.9) return 'normal';
    return 'danger'; // < 18.5 atau > 24.9 langsung merah
  }
  if (lbl.includes('bp') || lbl.includes('tekanan darah')) {
    if (val >= 90 && val <= 120) return 'normal';
    if (val > 120 && val <= 139) return 'warning';
    return 'danger'; // < 90 langsung merah (Hipotensi)
  }
  if (lbl.includes('ureum')) {
    if (val >= 15 && val <= 50) return 'normal';
    return 'danger'; // < 15 atau > 50 merah
  }
  if (lbl.includes('kreatinin')) {
    if (val >= 0.6 && val <= 1.2) return 'normal';
    return 'danger'; // < 0.6 atau > 1.2 merah
  }
  if (lbl.includes('puasa')) {
    if (val >= 70 && val <= 100) return 'normal';
    if (val > 100 && val <= 125) return 'warning';
    return 'danger'; // < 70 (Hipoglikemia) merah
  }
  if (lbl.includes('2 jam') || lbl.includes('g2h')) {
    if (val < 140) return 'normal';
    if (val >= 140 && val <= 199) return 'warning';
    return 'danger';
  }
  return 'normal';
};

// Helper warna Tailwind
const getStatusColors = (status: string) => {
  if (status === 'warning') return {
    bg: 'bg-amber-50/50 border-amber-200/50',
    text: 'text-amber-600'
  };
  if (status === 'danger') return {
    bg: 'bg-rose-50/50 border-rose-200/50',
    text: 'text-rose-600'
  };
  return {
    bg: 'bg-emerald-50/50 border-emerald-200/50',
    text: 'text-emerald-600'
  };
};
export default function App() {
  const [view, setView] = useState<'home' | 'form' | 'result' | 'history' | 'education' | 'about'>('home');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [eduTab, setEduTab] = useState<'pengertian' | 'jenis' | 'pencegahan' | 'komplikasi' | 'faq'>('pengertian');
  
  const [history, setHistory] = useState<PredictionData[]>(() => {
    try {
      const saved = localStorage.getItem('predictionHistory');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Laki-laki',
    hb: '',
    cholesterol: '',
    bmi: '',
    bp: '',
    ureum: '',
    creatinine: '',
    gdp: '',
    g2h: ''
  });
  const [prediction, setPrediction] = useState<PredictionData | null>(null);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Mengarah ke server Render (Backend yang sudah Live)
     const dataSiapKirim = {
        hb: parseFloat(formData.hb?.toString().replace(/,/g, '.')) || 0,
        cholesterol: parseFloat(formData.cholesterol?.toString().replace(/,/g, '.')) || 0,
        bmi: parseFloat(formData.bmi?.toString().replace(/,/g, '.')) || 0,
        bp: parseFloat(formData.bp?.toString().replace(/,/g, '.')) || 0,
        ureum: parseFloat(formData.ureum?.toString().replace(/,/g, '.')) || 0,
        creatinine: parseFloat(formData.creatinine?.toString().replace(/,/g, '.')) || 0,
        gdp: parseFloat(formData.gdp?.toString().replace(/,/g, '.')) || 0,
        g2h: parseFloat(formData.g2h?.toString().replace(/,/g, '.')) || 0,
      };
      const response = await fetch('https://web-deteksi-gagal-ginjal-kronis-final.onrender.com/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataSiapKirim)
      });

      if (!response.ok) {
        throw new Error('Server merespons dengan error');
      }

      const data = await response.json();
      
      const histData: PredictionData = {
        ...data,
        formData,
        date: new Date().toISOString(),
        id: Date.now()
      };
      
      const newHistory = [histData, ...history];
      setHistory(newHistory);
      localStorage.setItem('predictionHistory', JSON.stringify(newHistory));

      setPrediction(histData);
      setView('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Gagal terhubung ke server:", err);
      alert("Gagal terhubung! Pastikan backend di Render sudah aktif.");
    } finally {
      setLoading(false);
    }
  };

  const handleNewPatient = () => {
    setFormData({
      name: '',
      age: '',
      gender: 'Laki-laki',
      hb: '',
      cholesterol: '',
      bmi: '',
      bp: '',
      ureum: '',
      creatinine: '',
      gdp: '',
      g2h: ''
    });
    setPrediction(null);
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteHistory = (e: React.MouseEvent, idToDelete: number) => {
    e.stopPropagation(); 
    if (window.confirm("Apakah Anda yakin ingin menghapus data pasien ini?")) {
      const updatedHistory = history.filter(item => item.id !== idToDelete);
      setHistory(updatedHistory);
      localStorage.setItem('predictionHistory', JSON.stringify(updatedHistory));
    }
  };

  const filteredHistory = history.filter(item => {
    const patientName = item.formData?.name?.toLowerCase() || '';
    return patientName.includes(searchQuery.toLowerCase());
  });

  const getParamsList = (data: any) => {
    if (!data) return [];
    const g = data.gender;
    const hb = Number(data.hb);
    const isHbNormal = g === 'Laki-laki' ? hb >= 13 : hb >= 12;
    const hbIdeal = g === 'Laki-laki' ? '13-17' : '12-15';

    return [
      { label: "Hemoglobin (Hb)", val: data.hb, unit: "g/dL", ideal: hbIdeal, normal: isHbNormal },
      { label: "Kolesterol (Chol)", val: data.cholesterol, unit: "mg/dL", ideal: "< 200", normal: Number(data.cholesterol) <= 200 },
      { label: "Body Mass Index (BMI)", val: data.bmi, unit: "kg/m²", ideal: "18.5-24.9", normal: Number(data.bmi) <= 25 },
      { label: "Tekanan Darah (BP)", val: data.bp, unit: "mmHg", ideal: "90-120", normal: Number(data.bp) <= 130 },
      { label: "Kadar Ureum", val: data.ureum, unit: "mg/dL", ideal: "15-50", normal: Number(data.ureum) <= 50 },
      { label: "Kreatinin", val: data.creatinine, unit: "mg/dL", ideal: "0.6-1.2", normal: Number(data.creatinine) <= 1.2 },
      { label: "Gula Darah Puasa", val: data.gdp, unit: "mg/dL", ideal: "70-100", normal: Number(data.gdp) <= 125 },
      { label: "Gula 2 Jam", val: data.g2h, unit: "mg/dL", ideal: "< 140", normal: Number(data.g2h) <= 140 }
    ];
  };

  const eduTabs = [
    { id: 'pengertian', label: 'Pengertian', icon: Book },
    { id: 'jenis', label: 'Stadium & Jenis', icon: Layers },
    { id: 'pencegahan', label: 'Pencegahan', icon: Shield },
    { id: 'komplikasi', label: 'Komplikasi', icon: AlertTriangle },
    { id: 'faq', label: 'F.A.Q', icon: HelpCircle }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 print:bg-white relative overflow-hidden text-slate-800 flex flex-col">
      
      {/* GLOBAL DYNAMIC BACKGROUND (MESH & GLASS) */}
      <div className="fixed inset-0 z-[-1] pointer-events-none print:hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal-400/20 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-[30%] left-[50%] w-[400px] h-[400px] bg-sky-300/15 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMTUsMjMsNDIsMC4wMykiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent_90%)]" />
      </div>

      <Navbar onStart={() => { setView('form'); window.scrollTo(0,0); }} view={view} setView={setView} />

<div className="flex-1">
  <AnimatePresence mode="wait">
    {view === 'home' && (
      <motion.main 
        key="home"
        id="beranda"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 py-32 print:hidden"
      >
        {/* HERO SECTION */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/60 backdrop-blur-md text-teal-700 rounded-full text-xs font-black uppercase tracking-widest border border-white/80 shadow-[0_4px_15px_rgba(20,184,166,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              AI Medical Screening
            </div>
            <h2 className="text-5xl lg:text-[72px] font-display font-black leading-[1.05] tracking-tight text-slate-900">
              Rebalytix AI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-800">
                Deteksi Gagal Ginjal
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed font-medium">
              Sistem prediksi canggih berbasis <b className="text-slate-800">Hybrid Ensemble Machine Learning</b> untuk mendeteksi risiko disfungsi ginjal kronis secara dini melalui 8 parameter laboratorium Anda.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <button 
                onClick={() => { setView('form'); window.scrollTo(0,0); }} 
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white h-16 px-10 rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 cursor-pointer w-full sm:w-auto justify-center animate-gentle-pulse"
              >
                Mulai Prediksi
              </button>
              <button 
                onClick={() => { setView('education'); window.scrollTo(0,0); }}
                className="bg-white/80 backdrop-blur-md border border-white hover:border-emerald-200 text-slate-700 h-16 px-8 rounded-2xl font-bold text-lg hover:bg-white/80 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3 cursor-pointer w-full sm:w-auto justify-center"
              >
                Pelajari Ginjal <BookOpen size={20} className="text-emerald-600" />
              </button>
            </div>
          </div>

          {/* Kolom kanan - Ilustrasi */}
          <div className="relative hidden lg:flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/40 to-teal-200/40 rounded-full blur-3xl"></div>
              <div className="relative bg-white/40 backdrop-blur-sm p-8 rounded-3xl border border-white/60 shadow-2xl">
                <div className="w-80 h-80 bg-gradient-to-br from-emerald-100 to-teal-50 rounded-2xl flex items-center justify-center">
                  <Activity size={120} className="text-emerald-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SEKSI QUICK FITUR */}
        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          <FeatureCard 
            icon={Zap} 
            title="Prediksi Cepat" 
            description="Hasil analisis AI dalam hitungan detik dengan akurasi tinggi"
            color="bg-gradient-to-br from-amber-100 to-orange-50"
          />
          <FeatureCard 
            icon={Shield} 
            title="Data Aman" 
            description="Privasi terjamin dengan enkripsi standar medis"
            color="bg-gradient-to-br from-blue-100 to-cyan-50"
          />
          <FeatureCard 
            icon={TrendingUp} 
            title="Akurat & Terpercaya" 
            description="Berbasis ensemble model dengan validasi klinis"
            color="bg-gradient-to-br from-emerald-100 to-teal-50"
          />
        </div>
      </motion.main>
    )}
  </AnimatePresence>
</div>
                {/* GAMBAR GINJAL */}
                <div className="relative flex justify-center lg:justify-end items-center min-h-[450px]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 to-teal-300/20 rounded-[100px] rotate-12 blur-3xl -z-10" />
                  <motion.div 
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full max-w-md relative z-10 flex justify-center"
                  >
                    <img 
                      src="/ginjal.png" 
                      alt="Ilustrasi Ginjal Rebalytix AI" 
                      className="w-full h-auto object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.15)]"
                    />
                    <div className="absolute -bottom-6 -right-2 sm:bottom-4 sm:-right-12 bg-white/80 backdrop-blur-xl p-5 rounded-[28px] flex items-center gap-5 border border-white/60 shadow-[0_20px_40px_-10px_rgba(16,185,129,0.15)] z-20 hover:-translate-y-1 transition-transform cursor-default">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-2xl flex items-center justify-center shadow-inner">
                        <CheckCircle2 size={28} />
                      </div>
                      <div className="pr-2">
                        <p className="text-[11px] uppercase font-black text-emerald-600 tracking-widest mb-0.5">Sistem Siap</p>
                        <p className="font-bold text-slate-800 text-lg leading-tight">AI Engine Active</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* SEKSI QUICK FITUR */}
              <div className="grid md:grid-cols-3 gap-8 relative z-10">
                <FeatureCard 
                  icon={ClipboardList} 
                  title="Skrining Deteksi Dini" 
                  description="Mengevaluasi probabilitas gangguan fungsional saringan ginjal menggunakan kompilasi data laboratorium."
                  color="bg-emerald-100/50 text-emerald-700"
                />
                <FeatureCard 
                  icon={Activity} 
                  title="8 Parameter Kunci" 
                  description="Analisis integratif terhadap bio-indikator klinis yang merepresentasikan laju filtrasi dan metabolisme."
                  color="bg-teal-100/50 text-teal-700"
                />
                <FeatureCard 
                  icon={Stethoscope} 
                  title="Rekomendasi Dinamis" 
                  description="Menghasilkan anjuran edukasi medis personal yang disesuaikan dengan parameter spesifik abnormal pasien."
                  color="bg-teal-100/50 text-teal-700"
                />
              </div>
            </motion.main>
          )}

          {view === 'education' && (
            <motion.div 
              key="education"
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-6xl mx-auto px-6 py-32 relative z-10 print:hidden"
            >
              <div className="mb-12">
                <button 
                  onClick={() => { setView('home'); window.scrollTo(0,0); }}
                  className="group inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-200/60 shadow-sm transition-all mb-8 cursor-pointer"
                >
                  <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Kembali ke Beranda
                </button>
                <div className="max-w-3xl space-y-4">
                  <h3 className="text-4xl font-display font-black text-slate-900 md:text-5xl tracking-tight">
                    Edukasi Kesehatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Ginjal</span>
                  </h3>
                  <p className="text-slate-600 font-medium text-lg leading-relaxed">
                    Pusat informasi lengkap mengenai patofisiologi, pencegahan, dan penanganan Gagal Ginjal Kronis (GGK).
                  </p>
                </div>
              </div>

              {/* LAYOUT SIDEBAR & KONTEN */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                
                {/* SIDEBAR NAVIGATION */}
                <div className="w-full md:w-72 shrink-0 flex flex-col gap-2 sticky top-28">
                  {eduTabs.map((tab) => {
                    const isActive = eduTab === tab.id;
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setEduTab(tab.id as any)}
                        className={cn(
                          "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 cursor-pointer text-left",
                          isActive 
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_8px_20px_rgba(16,185,129,0.25)]" 
                            : "bg-white/60 text-slate-600 hover:bg-white/90 hover:text-emerald-600 shadow-sm"
                        )}
                      >
                        <Icon size={20} className={cn(isActive ? "text-white" : "text-emerald-600")} />
                        {tab.label}
                      </button>
                    )
                  })}
                </div>

                {/* CONTENT AREA */}
                <div className="flex-1 bg-white/80 backdrop-blur-2xl p-8 sm:p-12 rounded-[40px] border border-white shadow-[0_15px_50px_rgba(0,0,0,0.04)] min-h-[500px]">
                  <AnimatePresence mode="wait">
                    
                    {eduTab === 'pengertian' && (
                      <motion.div key="pengertian" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner mb-6">
                          <Book size={32} />
                        </div>
                        <h4 className="text-3xl font-display font-black text-slate-900">Pengertian GGK</h4>
                        <p className="text-slate-600 leading-relaxed text-lg text-justify font-medium">
                          Penyakit Ginjal Kronis (GGK) atau <i>Chronic Kidney Disease (CKD)</i> adalah kondisi di mana terjadi penurunan fungsi ginjal secara progresif dan irreversible (tidak dapat pulih kembali) yang berlangsung selama lebih dari 3 bulan.
                        </p>
                        <p className="text-slate-600 leading-relaxed text-lg text-justify font-medium">
                          Ginjal yang sehat bertugas menyaring limbah metabolisme, kelebihan cairan, dan racun dari dalam darah untuk dikeluarkan menjadi urine. Pada penderita GGK, unit penyaring terkecil di dalam ginjal yang disebut <b>Nefron</b> mengalami kerusakan struktural.
                        </p>
                        <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-3xl mt-4">
                          <h5 className="font-black text-rose-700 mb-2 flex items-center gap-2"><AlertTriangle size={18}/> Kenapa Disebut "Silent Killer"?</h5>
                          <p className="text-slate-700 text-base font-medium leading-relaxed">
                            Ginjal memiliki mekanisme kompensasi yang luar biasa. Jika sebagian nefron rusak, nefron yang sehat akan bekerja ekstra keras untuk mengambil alih tugasnya. Akibatnya, pasien sering kali <b>tidak merasakan gejala apa pun</b> hingga kerusakan ginjal sudah mencapai tahap akhir (Stadium 4 atau 5).
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {eduTab === 'jenis' && (
                      <motion.div key="jenis" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
                        <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center shadow-inner mb-6">
                          <Layers size={32} />
                        </div>
                        <h4 className="text-3xl font-display font-black text-slate-900">Stadium Penyakit Ginjal</h4>
                        <p className="text-slate-600 leading-relaxed text-lg font-medium mb-6">
                          Tingkat keparahan Gagal Ginjal Kronis diklasifikasikan ke dalam 5 stadium berdasarkan nilai <b>Laju Filtrasi Glomerulus (GFR)</b>, yaitu angka yang menunjukkan seberapa baik ginjal menyaring darah per menit.
                        </p>
                        <div className="space-y-4">
                          {[
                            { stage: "Stadium 1", gfr: "GFR ≥ 90", desc: "Kerusakan ginjal ringan dengan fungsi ginjal yang masih normal. Gejala tidak terlihat, namun mungkin ditemukan protein dalam urine." },
                            { stage: "Stadium 2", gfr: "GFR 60 - 89", desc: "Penurunan fungsi ginjal ringan. Mirip stadium 1, deteksi sering kali terjadi secara tidak sengaja melalui tes darah/urine." },
                            { stage: "Stadium 3", gfr: "GFR 30 - 59", desc: "Penurunan fungsi ginjal tingkat sedang. Tubuh mulai menumpuk limbah (uremia). Pasien mulai merasa mudah lelah dan tekanan darah naik." },
                            { stage: "Stadium 4", gfr: "GFR 15 - 29", desc: "Kerusakan ginjal berat. Gejala mulai nyata seperti pembengkakan kaki (edema), mual, dan anemia kronis. Persiapan cuci darah mulai dilakukan." },
                            { stage: "Stadium 5 (ESRD)", gfr: "GFR < 15", desc: "Gagal Ginjal Terminal. Ginjal sudah kehilangan 85-90% fungsinya. Pasien wajib menjalani prosedur cuci darah rutin (Hemodialisis) atau transplantasi ginjal untuk bertahan hidup." }
                          ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-md transition-all">
                              <div className="w-20 shrink-0">
                                <span className={cn("px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider", i >= 3 ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700")}>{item.stage}</span>
                              </div>
                              <div>
                                <h5 className="font-black text-slate-800 mb-1">{item.gfr} <span className="text-xs font-bold text-slate-400">mL/min</span></h5>
                                <p className="text-slate-600 text-sm font-medium">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {eduTab === 'pencegahan' && (
                      <motion.div key="pencegahan" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
                        <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center shadow-inner mb-6">
                          <Shield size={32} />
                        </div>
                        <h4 className="text-3xl font-display font-black text-slate-900">Langkah Pencegahan</h4>
                        <p className="text-slate-600 leading-relaxed text-lg font-medium mb-6">
                          Mencegah jauh lebih baik daripada mengobati. Karena kerusakan ginjal bersifat permanen, menjaga kesehatan 8 parameter medis Anda adalah kunci utama pencegahan GGK.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-3">
                            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black">1</div>
                            <h5 className="font-black text-slate-800 text-lg">Kontrol Gula Darah</h5>
                            <p className="text-slate-600 text-sm font-medium leading-relaxed">Diabetes adalah penyebab utama gagal ginjal. Kadar gula tinggi secara menahun akan merusak pembuluh darah kapiler di dalam saringan ginjal.</p>
                          </div>
                          <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-3">
                            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black">2</div>
                            <h5 className="font-black text-slate-800 text-lg">Jaga Tekanan Darah</h5>
                            <p className="text-slate-600 text-sm font-medium leading-relaxed">Hipertensi (tekanan darah tinggi) merusak dinding saringan ginjal secara paksa. Batasi konsumsi garam (natrium) maksimal 1 sendok teh per hari.</p>
                          </div>
                          <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-3">
                            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black">3</div>
                            <h5 className="font-black text-slate-800 text-lg">Hidrasi yang Cukup</h5>
                            <p className="text-slate-600 text-sm font-medium leading-relaxed">Minum air putih 2 liter (8 gelas) sehari membantu ginjal membersihkan natrium, urea, dan racun dari dalam tubuh secara optimal.</p>
                          </div>
                          <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-3">
                            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black">4</div>
                            <h5 className="font-black text-slate-800 text-lg">Hati-Hati Konsumsi Obat</h5>
                            <p className="text-slate-600 text-sm font-medium leading-relaxed">Hindari penggunaan obat pereda nyeri (NSAID seperti ibuprofen) secara berlebihan dan jangka panjang karena dapat meracuni sel-nefron ginjal.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {eduTab === 'komplikasi' && (
                      <motion.div key="komplikasi" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
                        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center shadow-inner mb-6">
                          <AlertTriangle size={32} />
                        </div>
                        <h4 className="text-3xl font-display font-black text-slate-900">Komplikasi Penyakit</h4>
                        <p className="text-slate-600 leading-relaxed text-lg font-medium mb-6 text-justify">
                          Ginjal bukan sekadar alat penyaring urine, melainkan organ sentral yang memproduksi hormon pengatur sel darah merah, mengelola vitamin D untuk tulang, dan menjaga keseimbangan cairan paru-paru. Kegagalan fungsi ginjal memicu kegagalan berantai pada organ lain.
                        </p>
                        <div className="space-y-4">
                          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><Activity size={20}/></div>
                            <div>
                              <h5 className="font-black text-slate-800 text-lg">Anemia Akut</h5>
                              <p className="text-slate-600 text-sm font-medium leading-relaxed mt-1">Ginjal sehat memproduksi hormon Eritropoetin untuk merangsang sel darah merah. GGK menyebabkan produksi hormon ini terhenti, memicu anemia berat yang membuat pasien lemas ekstrem.</p>
                            </div>
                          </div>
                          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><Activity size={20}/></div>
                            <div>
                              <h5 className="font-black text-slate-800 text-lg">Edema (Pembengkakan Paru & Kaki)</h5>
                              <p className="text-slate-600 text-sm font-medium leading-relaxed mt-1">Ketidakmampuan membuang kelebihan cairan membuat air menumpuk di jaringan tubuh, menyebabkan kaki bengkak hebat dan sesak napas akut jika cairan mengisi paru-paru.</p>
                            </div>
                          </div>
                          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><Activity size={20}/></div>
                            <div>
                              <h5 className="font-black text-slate-800 text-lg">Hiperkalemia (Lonjakan Kalium)</h5>
                              <p className="text-slate-600 text-sm font-medium leading-relaxed mt-1">Ginjal yang rusak gagal membuang kalium dari darah. Penumpukan kalium yang drastis dapat menyebabkan henti jantung mendadak secara fatal.</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {eduTab === 'faq' && (
                      <motion.div key="faq" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
                        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner mb-6">
                          <HelpCircle size={32} />
                        </div>
                        <h4 className="text-3xl font-display font-black text-slate-900">Pertanyaan Umum (FAQ)</h4>
                        
                        <div className="space-y-4 mt-6">
                          <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl">
                            <h5 className="font-black text-slate-800 text-lg mb-2">Apakah Gagal Ginjal Kronis bisa disembuhkan secara total?</h5>
                            <p className="text-slate-600 font-medium leading-relaxed">Tidak. Berbeda dengan cedera ginjal akut (AKI) yang bisa sembuh, Gagal Ginjal Kronis (GGK) bersifat irreversible. Kerusakan jaringan nefron tidak bisa regenerasi. Pengobatan ditujukan untuk memperlambat perburukan dan mengontrol komplikasi, bukan mengembalikan fungsi awal.</p>
                          </div>
                          <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl">
                            <h5 className="font-black text-slate-800 text-lg mb-2">Kenapa nilai Kreatinin dan Ureum menjadi acuan utama sistem AI ini?</h5>
                            <p className="text-slate-600 font-medium leading-relaxed">Kreatinin murni disaring dan dibuang oleh ginjal. Jika ginjal mengalami kerusakan saringan, kreatinin tidak bisa keluar melalui urine dan akhirnya menumpuk di dalam darah. Oleh karena itu, peningkatan kreatinin dalam darah adalah bukti paling valid adanya penurunan laju filtrasi ginjal.</p>
                          </div>
                          <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl">
                            <h5 className="font-black text-slate-800 text-lg mb-2">Apakah sering menahan buang air kecil menyebabkan GGK?</h5>
                            <p className="text-slate-600 font-medium leading-relaxed">Secara tidak langsung, ya. Sering menahan kencing dapat menyebabkan urin naik kembali ke ginjal (refluks) atau memicu infeksi saluran kemih (ISK) yang berulang. Infeksi ginjal yang berulang dapat merusak struktur ginjal secara kronis jika tidak ditangani dengan baik.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'about' && (
            <motion.div 
              key="about"
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto px-6 py-32 relative z-10 print:hidden"
            >
              <div className="mb-12">
                <button 
                  onClick={() => { setView('home'); window.scrollTo(0,0); }}
                  className="group inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-200/60 shadow-sm transition-all mb-8 cursor-pointer"
                >
                  <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Kembali ke Beranda
                </button>
                <div className="max-w-3xl space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-100/50 text-teal-800 rounded-full text-xs font-black uppercase tracking-widest border border-teal-200/50 backdrop-blur-sm">
                    Arsitektur Komputasi AI
                  </div>
                  <h3 className="text-4xl font-display font-black text-slate-900 leading-tight">
                    Hybrid Machine Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Ensemble</span>
                  </h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-justify text-lg">
                    Aplikasi ini mengintegrasikan dua arsitektur klasifikasi <i>Supervised Learning</i> mutakhir: <b>XGBoost</b> untuk memproses pola data bergradien kompleks, dan <b>Random Forest</b> untuk mencegah indikasi <i>overfitting</i> via ribuan pohon keputusan acak.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 p-10 sm:p-14 rounded-[48px] shadow-2xl relative overflow-hidden text-slate-300 mb-12">
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="grid sm:grid-cols-2 gap-12 relative z-10">
                  <div className="space-y-5 border-b sm:border-b-0 sm:border-r border-slate-700/50 pb-10 sm:pb-0 sm:pr-10">
                    <h5 className="font-black text-white text-2xl flex items-center gap-3">
                      <Zap className="text-emerald-400" size={28} /> XGBoost
                    </h5>
                    <p className="text-base leading-relaxed text-justify font-medium text-slate-400">
                      <i>Extreme Gradient Boosting</i> mengeliminasi deviasi prediksi secara iteratif. Algoritma ini sangat peka dalam melacak korelasi non-linear antar parameter klinis, misal menganalisis lonjakan tekanan darah sistolik yang bersilangan dengan batas ambang kreatinin.
                    </p>
                  </div>
                  <div className="space-y-5">
                    <h5 className="font-black text-white text-2xl flex items-center gap-3">
                      <Cpu className="text-teal-400" size={28} /> Random Forest
                    </h5>
                    <p className="text-base leading-relaxed text-justify font-medium text-slate-400">
                      Mengompilasi agregasi keputusan dari ratusan subsampel rekam medis (<i>bagging method</i>). Hal ini menjamin bahwa sistem AI tidak sekadar menghafal data tunggal, namun menyepakati pola klinis patologis secara mayoritas absolut.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-md p-8 rounded-[32px] border border-white shadow-sm flex items-start gap-4">
                 <div className="mt-1 p-2 bg-emerald-100 text-emerald-700 rounded-xl"><Info size={20}/></div>
                 <p className="text-slate-600 font-medium leading-relaxed">
                   <b>Tujuan Fungsional:</b> Melalui fusi komputasional (<i>Soft Voting</i>), Rebalytix AI sanggup menekan angka bias statistik secara signifikan. Sistem ini dirancang murni sebagai alat pendukung keputusan klinis dini (<i>early decision support system</i>) agar rujukan medis dapat dilakukan sebelum disfungsi ginjal menjadi permanen.
                 </p>
              </div>
            </motion.div>
          )}

          {view === 'form' && (
            <motion.div 
              key="form"
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-4xl mx-auto px-6 py-32 print:hidden relative z-10"
            >
              <div className="mb-12 text-center md:text-left">
                <button 
                  onClick={() => { setView('home'); window.scrollTo(0,0); }}
                  className="group inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-200/60 shadow-sm transition-all mb-8 cursor-pointer"
                >
                  <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Kembali
                </button>
                <h2 className="text-4xl lg:text-[56px] font-display font-black text-slate-900 tracking-tight">Input Data Pasien</h2>
                <p className="text-slate-600 mt-4 text-lg font-medium">Lengkapi form rekam medis di bawah ini untuk memulai komputasi AI.</p>
              </div>

              <form onSubmit={handlePredict} className="grid md:grid-cols-2 gap-8">
                
                {/* Biodata Section */}
                <div className="md:col-span-2 bg-white/70 backdrop-blur-xl p-8 sm:p-10 rounded-[40px] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                  <h3 className="font-display font-black text-xl mb-8 flex items-center gap-3 text-slate-800">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl"><User size={24} /></div> 
                    Identitas & Demografi
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Nama Lengkap</label>
                      <input 
                        type="text" required
                        placeholder="Contoh: Budi Santoso"
                        className="h-16 bg-white/50 border border-slate-200 rounded-2xl px-5 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:bg-white shadow-inner transition-all placeholder:text-slate-400"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Usia <span className="text-slate-400 font-bold normal-case">(Tahun)</span></label>
                      <input 
                        type="number" required min="1" max="120"
                        placeholder="Contoh: 45"
                        className="h-16 bg-white/50 border border-slate-200 rounded-2xl px-5 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:bg-white shadow-inner transition-all placeholder:text-slate-400"
                        value={formData.age}
                        onChange={e => setFormData({...formData, age: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Jenis Kelamin</label>
                      <select 
                        className="h-16 bg-white/50 border border-slate-200 rounded-2xl px-5 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:bg-white shadow-inner transition-all cursor-pointer"
                        value={formData.gender}
                        onChange={e => setFormData({...formData, gender: e.target.value})}
                      >
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Parameter Kiri */}
                <div className="space-y-6">
                  
                  {/* 1. Hemoglobin */}
                  <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[32px] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-emerald-100 transition-all group flex flex-col gap-4">
                    <label className="text-base font-black text-slate-800 flex items-center justify-between">
                      <span className="flex items-center gap-3"><Droplets size={20} className="text-pink-500" /> Hemoglobin (Hb)</span>
                      <span className="text-slate-400 text-xs tracking-widest uppercase">g/dL</span>
                    </label>
                    <input 
                      type="text" 
                      inputMode="decimal" 
                      required 
                      placeholder="12,5"
                      className="h-16 bg-slate-50/50 border border-slate-200 rounded-2xl px-5 font-mono text-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:bg-white shadow-inner transition-all placeholder:text-slate-300"
                      value={formData.hb} 
                      onChange={e => setFormData({...formData, hb: e.target.value})}
                    />
                  </div>
                  
                  {/* 2. Kolesterol */}
                  <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[32px] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-emerald-100 transition-all group flex flex-col gap-4">
                    <label className="text-base font-black text-slate-800 flex items-center justify-between">
                      <span className="flex items-center gap-3"><Heart size={20} className="text-rose-500" /> Kolesterol (Chol)</span>
                      <span className="text-slate-400 text-xs tracking-widest uppercase">mg/dL</span>
                    </label>
                    <input 
                      type="text" 
                      inputMode="decimal" 
                      required 
                      placeholder="190,5"
                      className="h-16 bg-slate-50/50 border border-slate-200 rounded-2xl px-5 font-mono text-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:bg-white shadow-inner transition-all placeholder:text-slate-300"
                      value={formData.cholesterol} 
                      onChange={e => setFormData({...formData, cholesterol: e.target.value})}
                    />
                  </div>

                  {/* 3. BMI */}
                  <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[32px] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-emerald-100 transition-all group flex flex-col gap-4">
                    <label className="text-base font-black text-slate-800 flex items-center justify-between">
                      <span className="flex items-center gap-3"><Scale size={20} className="text-indigo-500" /> Body Mass Index (BMI)</span>
                      <span className="text-slate-400 text-xs tracking-widest uppercase">kg/m²</span>
                    </label>
                    <input 
                      type="text" 
                      inputMode="decimal" 
                      required 
                      placeholder="24,2"
                      className="h-16 bg-slate-50/50 border border-slate-200 rounded-2xl px-5 font-mono text-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:bg-white shadow-inner transition-all placeholder:text-slate-300"
                      value={formData.bmi} 
                      onChange={e => setFormData({...formData, bmi: e.target.value})}
                    />
                  </div>

                  {/* 4. Tekanan Darah (BP) */}
                  <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[32px] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-emerald-100 transition-all group flex flex-col gap-4">
                    <label className="text-base font-black text-slate-800 flex items-center justify-between">
                      <span className="flex items-center gap-3"><Activity size={20} className="text-orange-500" /> Tekanan Darah (BP)</span>
                      <span className="text-slate-400 text-xs tracking-widest uppercase">MMHG</span>
                    </label>
                    <input 
                      type="text" 
                      inputMode="decimal" 
                      required 
                      placeholder="120"
                      className="h-16 bg-slate-50/50 border border-slate-200 rounded-2xl px-5 font-mono text-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:bg-white shadow-inner transition-all placeholder:text-slate-300"
                      value={formData.bp} 
                      onChange={e => setFormData({...formData, bp: e.target.value})}
                    />
                  </div>
                </div>

                {/* Parameter Kanan */}
                <div className="space-y-6">
                  <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[32px] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-emerald-100 transition-all group flex flex-col gap-4">
                    <label className="text-base font-black text-slate-800 flex items-center justify-between">
                      <span className="flex items-center gap-3"><Thermometer size={20} className="text-amber-500" /> Kadar Ureum</span>
                      <span className="text-slate-400 text-xs tracking-widest uppercase">mg/dL</span>
                    </label>
                    <input 
                      type="number" step="0.1" required placeholder="25,5"
                      className="h-16 bg-slate-50/50 border border-slate-200 rounded-2xl px-5 font-mono text-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:bg-white shadow-inner transition-all placeholder:text-slate-300"
                      value={formData.ureum} onChange={e => setFormData({...formData, ureum: e.target.value})}
                    />
                  </div>
                  
                  <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[32px] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-emerald-100 transition-all group flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                    <label className="text-base font-black text-slate-800 flex items-center justify-between relative z-10">
                      <span className="flex items-center gap-3"><Stethoscope size={20} className="text-amber-500" /> Kreatinin (Creat)</span>
                      <span className="text-slate-400 text-xs tracking-widest uppercase">mg/dL</span>
                    </label>
                    <input 
                      type="number" step="0.01" required placeholder="0,85"
                      className="h-16 bg-slate-50/30 border border-slate-200/50 rounded-2xl px-5 font-mono text-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500/40 focus:border-slate-500 focus:bg-white shadow-inner transition-all placeholder:text-slate-300 relative z-10"
                      value={formData.creatinine} onChange={e => setFormData({...formData, creatinine: e.target.value})}
                    />
                  </div>

                  <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[32px] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-emerald-100 transition-all group flex flex-col gap-4">
                    <label className="text-base font-black text-slate-800 flex items-center justify-between">
                      <span className="flex items-center gap-3"><Bone size={20} className="text-purple-500" /> Gula Darah Puasa (GDP)</span>
                      <span className="text-slate-400 text-xs tracking-widest uppercase">mg/dL</span>
                    </label>
                    <input 
                      type="number" required placeholder="95"
                      className="h-16 bg-slate-50/50 border border-slate-200 rounded-2xl px-5 font-mono text-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:bg-white shadow-inner transition-all placeholder:text-slate-300"
                      value={formData.gdp} onChange={e => setFormData({...formData, gdp: e.target.value})}
                    />
                  </div>

                  <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[32px] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-emerald-100 transition-all group flex flex-col gap-4">
                    <label className="text-base font-black text-slate-800 flex items-center justify-between">
                      <span className="flex items-center gap-3"><Zap size={20} className="text-yellow-500" /> Gula 2 Jam (G2H)</span>
                      <span className="text-slate-400 text-xs tracking-widest uppercase">mg/dL</span>
                    </label>
                    <input 
                      type="number" required placeholder="120"
                      className="h-16 bg-slate-50/50 border border-slate-200 rounded-2xl px-5 font-mono text-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:bg-white shadow-inner transition-all placeholder:text-slate-300"
                      value={formData.g2h} onChange={e => setFormData({...formData, g2h: e.target.value})}
                    />
                  </div>
                </div>

                <div className="md:col-span-2 pt-8">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white h-20 w-full rounded-[32px] font-black text-2xl shadow-[0_15px_40px_rgba(16,185,129,0.3)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.5)] disabled:opacity-50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-4 cursor-pointer"
                  >
                    {loading ? (
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin shadow-lg" />
                        Mengkalkulasi Probabilitas AI...
                      </div>
                    ) : (
                      <>Jalankan Prediksi AI <ArrowRight size={28} /></>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {view === 'result' && prediction && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-4xl mx-auto px-6 py-32 relative z-10"
            >
              {/* --- WEB UI (Disembunyikan saat Print) --- */}
              <div className="space-y-8 print:hidden">
                
                {/* 1. KOTAK HASIL PREDIKSI */}
                <div className="bg-white/80 backdrop-blur-2xl p-8 sm:p-12 rounded-[48px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white space-y-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-200/60">
                    <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight">Diagnosis Laporan</h2>
                    <div className="px-5 py-2.5 bg-emerald-50 text-emerald-700 rounded-2xl text-xs font-black uppercase tracking-widest border border-emerald-200/60 shadow-sm flex items-center gap-2">
                      <Activity size={16} /> Hybrid Ensemble
                    </div>
                  </div>

                  <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-200/50 grid grid-cols-2 gap-4">
                     <div>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Nama Pasien</p>
                       <p className="font-black text-lg text-slate-800">{prediction.formData?.name}</p>
                     </div>
                     <div>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Usia & Gender</p>
                       <p className="font-black text-lg text-slate-800">{prediction.formData?.age} Thn / {prediction.formData?.gender}</p>
                     </div>
                  </div>

                  <div className={cn(
                    "p-10 sm:p-14 rounded-[40px] text-center space-y-4 border transition-all relative overflow-hidden",
                    prediction.prediction === "Risiko Tinggi" 
                      ? "bg-gradient-to-b from-pink-50 to-rose-50/30 border-pink-200 shadow-[0_10px_40px_rgba(244,63,94,0.15)]" 
                      : "bg-gradient-to-b from-emerald-50 to-teal-50/30 border-emerald-200 shadow-[0_10px_40px_rgba(16,185,129,0.15)]"
                  )}>
                    <div className={cn(
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-50 -z-10",
                      prediction.prediction === "Risiko Tinggi" ? "bg-rose-400" : "bg-emerald-400"
                    )}/>

                    <p className={cn(
                      "text-xs font-black uppercase tracking-[0.3em]",
                      prediction.prediction === "Risiko Tinggi" ? "text-rose-600" : "text-emerald-700"
                    )}>Klasifikasi Risiko</p>
                    
                    <h3 className={cn(
                      "text-5xl sm:text-7xl font-display font-black tracking-tighter drop-shadow-sm",
                      prediction.prediction === "Risiko Tinggi" ? "text-rose-700" : "text-emerald-800"
                    )}>{prediction.prediction}</h3>
                    
                    <div className="pt-6 flex flex-col items-center justify-center gap-4 max-w-sm mx-auto">
                      <p className={cn("font-mono text-2xl font-black", prediction.prediction === "Risiko Tinggi" ? "text-rose-600" : "text-emerald-700")}>
                        {prediction.confidence}% <span className="text-sm font-bold opacity-70 uppercase tracking-widest">Skor Risiko</span>
                      </p>
                      <div className={cn("h-3 w-full rounded-full overflow-hidden border shadow-inner", prediction.prediction === "Risiko Tinggi" ? "bg-rose-100 border-rose-200" : "bg-emerald-100 border-emerald-200")}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${prediction.confidence}%` }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                          className={cn("h-full rounded-full", prediction.prediction === "Risiko Tinggi" ? "bg-gradient-to-r from-rose-500 to-pink-600" : "bg-gradient-to-r from-emerald-500 to-teal-400")}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* KOTAK VISUALISASI PARAMETER (PETA INDIKATOR) */}
                <div className="bg-white/80 backdrop-blur-2xl p-8 sm:p-12 rounded-[48px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white space-y-8">
                  <h4 className="text-2xl font-display font-black text-slate-900 flex items-center gap-4 mb-2">
                    {/* Ikon sudah diubah jadi hijau senada */}
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                      <Activity size={24} />
                    </div>
                    Peta Indikator Klinis
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {getParamsList(prediction.formData).map((item, idx) => {
                      // Panggil fungsi detektor status yang baru
                      const status = getIndicatorStatus(item.label, Number(item.val));
                      const colors = getStatusColors(status);
                      
                      return (
                        <div key={idx} className={cn(
                          "p-5 rounded-[24px] flex justify-between items-center border transition-all hover:-translate-y-1 hover:shadow-md",
                          colors.bg
                        )}>
                          <div>
                            <p className="font-bold text-slate-800 text-[15px]">{item.label}</p>
                            <p className="text-[11px] text-slate-500 mt-1 font-bold tracking-widest uppercase">Target: {item.ideal} {item.unit}</p>
                          </div>
                          <div className={cn(
                            "font-mono font-black text-xl text-right",
                            colors.text
                          )}>
                            {item.val} <span className="text-xs font-bold">{item.unit}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. KOTAK REKOMENDASI MEDIS DINAMIS */}
                <div className="bg-white/80 backdrop-blur-2xl p-8 sm:p-12 rounded-[48px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white space-y-8">
                  <h4 className="text-2xl font-display font-black text-slate-900 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shadow-inner">
                      <ShieldCheck size={24} />
                    </div>
                    Tindakan Preventif
                  </h4>
                  
                  <div className="space-y-5">
                    {prediction.recommendations && prediction.recommendations.length > 0 ? (
                      prediction.recommendations.map((rec, index) => (
                        <div key={index} className="bg-white/60 backdrop-blur-sm border border-slate-200/80 p-6 rounded-[28px] flex gap-5 items-start shadow-sm hover:shadow-md transition-all group">
                          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-black text-sm flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                            {index + 1}
                          </div>
                          <p className="text-slate-600 text-base font-medium leading-relaxed pt-1">{rec}</p>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="bg-white/60 border border-slate-200/80 p-6 rounded-[28px] flex gap-5 items-start shadow-sm">
                          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-black text-sm flex items-center justify-center shrink-0">1</div>
                          <p className="text-slate-600 text-base font-medium leading-relaxed pt-1">Konsultasikan hasil ini dengan dokter spesialis nefrologi terdekat.</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* 3. KOTAK KESIMPULAN MEDIS & TOMBOL AKSI */}
                <div className="bg-slate-900 p-8 sm:p-12 rounded-[48px] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none"/>
                  <div className="space-y-6 relative z-10">
                    <h4 className="text-2xl font-display font-black text-white flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400">
                        <Info size={24} />
                      </div>
                      Konklusi Eksekutif
                    </h4>
                    <p className="text-slate-300 text-lg leading-relaxed bg-white/5 backdrop-blur-md p-8 rounded-[32px] border border-white/10 font-medium">
                      {prediction.explanation}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-10 mt-10 border-t border-white/10 relative z-10">
                    <button onClick={() => { setView('home'); window.scrollTo(0,0); }} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white h-16 flex-1 justify-center rounded-[24px] text-base font-bold transition-all cursor-pointer flex items-center gap-3">
                      Beranda
                    </button>
                    <button onClick={handleNewPatient} className="bg-white text-slate-900 hover:bg-slate-100 h-16 flex-[1.5] justify-center rounded-[24px] text-base font-black shadow-lg transition-all cursor-pointer flex items-center gap-3">
                      <User size={20}/> Pasien Baru
                    </button>
                    <button 
                      onClick={() => {
                        const originalTitle = document.title;
                                                
                        const patientName = prediction.formData?.name || 'Pasien';
                        const docId = prediction.id || Date.now();
                                                
                        document.title = `Laporan-Rebalytix-${patientName}-${docId}`;
                                         
                        window.print();
                                           
                        document.title = originalTitle;
                      }} 
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white h-16 flex-[1.5] justify-center rounded-[24px] text-base font-black shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.4)] hover:-translate-y-1 transition-all cursor-pointer flex items-center gap-3"
                    >
                      Cetak Dokumen PDF
                    </button>
                  </div>
                </div>
              </div>

{/* --- TEMPLATE PDF RESMI 8 PARAMETER (DIPERTAHANKAN) --- */}
              <div className="hidden print:block text-black bg-white font-sans w-full max-w-4xl mx-auto p-4">
                
                <div className="border-b-4 border-slate-800 pb-4 mb-8 flex justify-between items-end">
                  <div>
                    <h1 className="text-3xl font-black tracking-tight uppercase">Hasil Prediksi</h1>
                    <h2 className="text-xl font-bold text-slate-600 uppercase mt-1">Risiko Gagal Ginjal Kronis</h2>
                  </div>
                  <div className="text-right">
                    <h3 className="font-bold text-lg">Rebalytix AI</h3>
                    <p className="text-sm">Model: Ensemble Learning</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-bold bg-slate-100 p-2 mb-3 border-l-4 border-slate-800 uppercase text-sm tracking-wider">Informasi Pasien</h3>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr><td className="py-1 w-32 text-slate-600">Nama Lengkap</td><td className="font-bold">: {prediction.formData?.name || '-'}</td></tr>
                        <tr><td className="py-1 text-slate-600">Usia</td><td className="font-bold">: {prediction.formData?.age || '-'} Tahun</td></tr>
                        <tr><td className="py-1 text-slate-600">Jenis Kelamin</td><td className="font-bold">: {prediction.formData?.gender || '-'}</td></tr>
                        <tr><td className="py-1 text-slate-600">Tanggal Analisis</td><td className="font-bold">: {new Date(prediction.date || Date.now()).toLocaleDateString('id-ID')}</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold bg-slate-100 p-2 mb-3 border-l-4 border-slate-800 uppercase text-sm tracking-wider">Hasil Diagnosis AI</h3>
                    <div className="border border-slate-300 p-4 rounded-lg bg-slate-50">
                      <p className="text-sm text-slate-500 uppercase tracking-widest mb-1">Skor Risiko</p>
                      <p className="text-4xl font-black mb-3">{prediction.confidence}%</p>
                      
                      <p className="text-sm text-slate-500 uppercase tracking-widest mb-1">Status</p>
                      <p className={cn(
                        "text-xl font-bold uppercase",
                        prediction.prediction === "Risiko Tinggi" ? "text-pink-600" : "text-emerald-600"
                      )}>{prediction.prediction}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-bold bg-slate-100 p-2 mb-3 border-l-4 border-slate-800 uppercase text-sm tracking-wider">8 Parameter Klinis Input</h3>
                  <table className="w-full border-collapse border border-slate-300 text-sm text-left">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="border border-slate-300 p-3 font-bold w-1/3">Parameter</th>
                        <th className="border border-slate-300 p-3 font-bold">Nilai</th>
                        <th className="border border-slate-300 p-3 font-bold">Satuan</th>
                        <th className="border border-slate-300 p-3 font-bold">Status AI</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-300 p-3">Hemoglobin (Hb)</td>
                        <td className="border border-slate-300 p-3 font-mono font-bold">{prediction.formData?.hb || '-'}</td>
                        <td className="border border-slate-300 p-3">g/dL</td>
                        <td className="border border-slate-300 p-3 font-bold">
                          { (prediction.formData?.gender === 'Laki-laki' && Number(prediction.formData?.hb) >= 13 && Number(prediction.formData?.hb) <= 17) || (prediction.formData?.gender === 'Perempuan' && Number(prediction.formData?.hb) >= 12 && Number(prediction.formData?.hb) <= 15) ? <span className="text-emerald-600">Normal</span> : <span className="text-pink-600">Di luar rentang</span> }
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="border border-slate-300 p-3">Kolesterol (Chol)</td>
                        <td className="border border-slate-300 p-3 font-mono font-bold">{prediction.formData?.cholesterol || '-'}</td>
                        <td className="border border-slate-300 p-3">mg/dL</td>
                        <td className="border border-slate-300 p-3 font-bold">
                          { Number(prediction.formData?.cholesterol) < 200 ? <span className="text-emerald-600">Normal</span> : <span className="text-pink-600">Di luar rentang</span> }
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-3">Body Mass Index (BMI)</td>
                        <td className="border border-slate-300 p-3 font-mono font-bold">{prediction.formData?.bmi || '-'}</td>
                        <td className="border border-slate-300 p-3">kg/m²</td>
                        <td className="border border-slate-300 p-3 font-bold">
                          { Number(prediction.formData?.bmi) >= 18.5 && Number(prediction.formData?.bmi) < 25 ? <span className="text-emerald-600">Normal</span> : <span className="text-pink-600">Di luar rentang</span> }
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="border border-slate-300 p-3">Tekanan Darah (BP)</td>
                        <td className="border border-slate-300 p-3 font-mono font-bold">{prediction.formData?.bp || '-'}</td>
                        <td className="border border-slate-300 p-3">mmHg</td>
                        <td className="border border-slate-300 p-3 font-bold">
                          { Number(prediction.formData?.bp) >= 90 && Number(prediction.formData?.bp) <= 120 ? <span className="text-emerald-600">Normal</span> : <span className="text-pink-600">Di luar rentang</span> }
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-3">Kadar Ureum</td>
                        <td className="border border-slate-300 p-3 font-mono font-bold">{prediction.formData?.ureum || '-'}</td>
                        <td className="border border-slate-300 p-3">mg/dL</td>
                        <td className="border border-slate-300 p-3 font-bold">
                          { Number(prediction.formData?.ureum) >= 15 && Number(prediction.formData?.ureum) <= 50 ? <span className="text-emerald-600">Normal</span> : <span className="text-pink-600">Di luar rentang</span> }
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="border border-slate-300 p-3">Creatinine (Kreatinin)</td>
                        <td className="border border-slate-300 p-3 font-mono font-bold">{prediction.formData?.creatinine || '-'}</td>
                        <td className="border border-slate-300 p-3">mg/dL</td>
                        <td className="border border-slate-300 p-3 font-bold">
                          { Number(prediction.formData?.creatinine) >= 0.6 && Number(prediction.formData?.creatinine) <= 1.2 ? <span className="text-emerald-600">Normal</span> : <span className="text-pink-600">Di luar rentang</span> }
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-3">Gula Darah Puasa (GDP)</td>
                        <td className="border border-slate-300 p-3 font-mono font-bold">{prediction.formData?.gdp || '-'}</td>
                        <td className="border border-slate-300 p-3">mg/dL</td>
                        <td className="border border-slate-300 p-3 font-bold">
                          { Number(prediction.formData?.gdp) >= 70 && Number(prediction.formData?.gdp) <= 100 ? <span className="text-emerald-600">Normal</span> : <span className="text-pink-600">Di luar rentang</span> }
                        </td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="border border-slate-300 p-3">Gula 2 Jam (G2H)</td>
                        <td className="border border-slate-300 p-3 font-mono font-bold">{prediction.formData?.g2h || '-'}</td>
                        <td className="border border-slate-300 p-3">mg/dL</td>
                        <td className="border border-slate-300 p-3 font-bold">
                          { Number(prediction.formData?.g2h) < 140 ? <span className="text-emerald-600">Normal</span> : <span className="text-pink-600">Di luar rentang</span> }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mb-12">
  <h3 className="text-lg font-bold bg-slate-100 p-2 mb-3 border-l-4 border-slate-800 uppercase text-sm tracking-wider">
    Rekomendasi Medis Berbasis AI
  </h3>
  <div className="pl-4">
    {prediction.recommendations && prediction.recommendations.length > 0 ? (
      prediction.recommendations.map((rec, index) => (
        <p key={index} className="mb-2 text-sm leading-relaxed text-justify break-inside-avoid">
          <span className="font-bold mr-2">{index + 1}.</span> {rec}
        </p>
      ))
    ) : (
      <>
        <p className="mb-2 text-sm leading-relaxed break-inside-avoid">
          <span className="font-bold mr-2">1.</span>Konsultasikan hasil ini dengan dokter spesialis nefrologi terdekat.
        </p>
        <p className="mb-2 text-sm leading-relaxed break-inside-avoid">
          <span className="font-bold mr-2">2.</span>Jaga asupan cairan dan kurangi konsumsi garam berlebih setiap hari.
        </p>
      </>
    )}
  </div>
</div>

              <div className="border-t-2 border-slate-300 pt-4 text-xs text-slate-500 flex justify-between mt-auto">
                  <div>
                    <p className="font-bold text-slate-800">ID Dokumen: REB-{prediction.id || Date.now()}</p>
                    <p>ⓘ Disclaimer: Laporan ini dihasilkan secara otomatis oleh sistem kecerdasan buatan untuk tujuan skrining.</p>
                    <p>Mohon jadikan laporan ini sebagai referensi untuk konsultasi dengan tenaga medis profesional.</p>
                  </div>
                <div className="text-right">
                  <p>Dianalisis pada: {new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB</p>
                  <p className="font-bold mt-1 text-slate-800">Rebalytix AI v1.0</p>
                </div>
              </div>
            </div>
            </motion.div>
          )}
                    
          {view === 'history' && (
            <motion.div 
              key="history"
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto px-6 py-32 relative z-10 print:hidden"
            >
              <div className="mb-12">
                <button 
                  onClick={() => { setView('home'); window.scrollTo(0,0); }}
                  className="group inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-200/60 shadow-sm transition-all mb-8 cursor-pointer"
                >
                  <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Kembali
                </button>
                <h2 className="text-4xl lg:text-[56px] font-display font-black text-slate-900 flex items-center gap-6 tracking-tight">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
                    <ClipboardList size={32} />
                  </div>
                  Riwayat Prediksi
                </h2>
                <p className="text-slate-600 mt-5 text-lg font-medium">Arsip diagnostik pasien tersimpan otomatis secara lokal di perangkat Anda.</p>
              </div>

              {history.length > 0 && (
                <div className="mb-8 relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Search size={20} className="text-emerald-600/70" />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari berdasarkan nama pasien..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-16 pl-14 pr-5 bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[24px] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-medium text-slate-700 placeholder:text-slate-400 text-lg"
                  />
                </div>
              )}

              <div className="space-y-6">
                {history.length === 0 ? (
                  <div className="bg-white/60 backdrop-blur-xl p-16 rounded-[40px] border border-white shadow-sm text-center flex flex-col items-center">
                    <div className="w-24 h-24 bg-white rounded-3xl shadow-inner flex items-center justify-center text-slate-300 mb-6">
                      <Activity size={40} />
                    </div>
                    <h3 className="font-black text-2xl text-slate-800 mb-3">Belum ada rekam medis</h3>
                    <p className="text-slate-500 font-medium max-w-md">Lakukan prediksi pertama Anda. Hasil komputasi AI akan direkam dan ditampilkan pada halaman ini.</p>
                    <button onClick={() => { setView('form'); window.scrollTo(0,0); }} className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-14 rounded-2xl font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer mt-8 flex items-center gap-3">
                      Buka Form Prediksi <ArrowRight size={18}/>
                    </button>
                  </div>
                ) : filteredHistory.length === 0 ? (
                  <div className="bg-white/60 backdrop-blur-xl p-12 rounded-[40px] border border-white shadow-sm text-center flex flex-col items-center">
                    <div className="w-20 h-20 bg-white rounded-3xl shadow-inner flex items-center justify-center text-slate-300 mb-6">
                      <Search size={32} />
                    </div>
                    <h3 className="font-black text-xl text-slate-800 mb-2">Pasien tidak ditemukan</h3>
                    <p className="text-slate-500 font-medium">Kata kunci pencarian "{searchQuery}" tidak cocok dengan data rekam medis mana pun.</p>
                  </div>
                ) : (
                  filteredHistory.map((item) => (
                    <div key={item.id} className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-[32px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row gap-6 md:items-center cursor-pointer group" onClick={() => { setPrediction(item); setView('result'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                      <div className="flex-1 space-y-3">
                         <div className="flex flex-wrap items-center gap-4">
                           <h4 className="font-black text-2xl text-slate-800">{item.formData?.name || 'Pasien Anonim'}</h4>
                           <span className={cn(
                             "px-4 py-1.5 text-[11px] font-black uppercase tracking-widest rounded-full shadow-sm",
                             item.prediction === "Risiko Tinggi" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
                           )}>
                             {item.prediction}
                           </span>
                         </div>
                         <p className="text-slate-500 font-medium flex items-center gap-2">
                           <User size={16} className="opacity-50"/> {item.formData?.age} Tahun • {item.formData?.gender} 
                           <span className="px-2 opacity-30">|</span> 
                           {new Date(item.date || '').toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                         </p>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-8 pt-4 md:pt-0 border-t md:border-none border-slate-200/50">
                         <div className="text-left md:text-right">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Skor Risiko</p>
                           <p className="font-black text-3xl text-slate-800">{item.confidence}%</p>
                         </div>
                         <div className="flex items-center gap-3">
                           <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12 group-hover:shadow-[0_10px_20px_rgba(16,185,129,0.3)]">
                             <ArrowRight size={24} />
                           </div>
                           <button 
                             onClick={(e) => handleDeleteHistory(e, item.id!)}
                             className="w-14 h-14 bg-rose-50/50 border border-rose-100 rounded-2xl shadow-sm flex items-center justify-center text-rose-400 hover:bg-rose-500 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-[0_10px_20px_rgba(244,63,94,0.3)] z-10"
                             title="Hapus riwayat pasien"
                           >
                             <Trash2 size={22} />
                           </button>
                         </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Footer Branding */}
      <footer className="py-12 border-t border-slate-200/50 mt-auto print:hidden relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
            <div className="w-10 h-10 bg-slate-200/50 rounded-xl flex items-center justify-center text-slate-600">
              <Activity size={20} />
            </div>
            <span className="font-display font-black text-slate-800 text-lg">Rebalytix AI</span>
          </div>
          <p className="text-slate-500 text-sm font-semibold">© 2026 Rebalytix AI - Identifikasi Risiko Penyakit Ginjal Kronis</p>
        </div>
      </footer>
    </div>
  );
}