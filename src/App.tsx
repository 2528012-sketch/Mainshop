/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import AuthScreen from './AuthScreen';
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Camera, 
  WifiOff, 
  Package, 
  ShoppingCart, 
  ShieldCheck, 
  BarChart3, 
  Bell, 
  IndianRupee,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  AlertCircle,
  Sun,
  Moon,
  CheckCircle2,
  Volume2,
  Smartphone,
  Globe2,
  FileText,
  Play,
  Pause,
  Menu,
  X
} from 'lucide-react';

const Button = ({ children, onClick, className = "", variant = "primary" }: any) => {
  const baseStyle = "px-6 py-3 font-bold brutal-border brutal-shadow hover:brutal-shadow-hover active:brutal-shadow-active transition-all flex items-center justify-center gap-2 cursor-pointer select-none";
  const variants = {
    primary: "bg-[var(--primary)] text-white hover:opacity-90",
    secondary: "bg-[var(--card-bg)] text-[var(--text-color)] hover:bg-[var(--bg-color)]",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}
    >
      {children}
    </button>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, gradientClass }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className="p-5 bg-[var(--card-bg)] brutal-border brutal-shadow hover:brutal-shadow-hover transition-all cursor-pointer select-none flex flex-col justify-start h-full"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={`w-16 h-16 rounded-xl mb-4 flex items-center justify-center brutal-border shrink-0 ${gradientClass}`}>
        <Icon size={28} className="text-white drop-shadow-md" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="font-medium opacity-80 leading-relaxed text-sm">{desc}</p>
      </div>
      {!isOpen && <p className="text-xs font-bold opacity-50 mt-auto pt-2 flex items-center gap-1"><ChevronRight size={14}/> Click to reveal</p>}
    </div>
  );
};

const FaqCard = ({ q, a }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className="bg-[var(--card-bg)] brutal-border brutal-shadow hover:brutal-shadow-hover p-5 transition-all cursor-pointer select-none"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center text-lg font-bold">
        <span className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[var(--primary)] rounded-none brutal-border hidden sm:block"></div>
          {q}
        </span>
        <span className="text-2xl font-bold opacity-60 leading-none">{isOpen ? '-' : '+'}</span>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="font-medium opacity-80 pl-5 border-l-4 border-[var(--primary)] ml-1 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      title: "Khata / Credit",
      headline: "Manage credit easier now",
      desc: "Show issued udhaar and collect payments faster with automated WhatsApp reminders.",
      bgColor: "bg-blue-100",
      titleColor: "text-blue-800",
      badges: [
        { icon: <BookOpen size={16} />, text: "Instant Reminders" },
        { icon: <ShieldCheck size={16} />, text: "Secure Backup" },
        { icon: <IndianRupee size={16} />, text: "Faster Recovery" }
      ],
      imagePanel: (
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl brutal-border relative overflow-hidden flex items-center justify-center p-6 shadow-inner">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl w-full max-w-sm text-white shadow-xl">
             <div className="flex items-center gap-3 mb-6">
               <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center brutal-border"><BookOpen size={24} /></div>
               <div>
                 <div className="font-bold text-lg">Smart Khata</div>
                 <div className="text-xs opacity-80">Verified Account</div>
               </div>
             </div>
             <div className="space-y-4">
               <div className="bg-white/10 p-3 rounded flex justify-between items-center brutal-border">
                 <span>Ramesh Kumar</span>
                 <span className="font-bold text-red-200">-₹500</span>
               </div>
               <div className="bg-white/10 p-3 rounded flex justify-between items-center brutal-border">
                 <span>Suresh Singh</span>
                 <span className="font-bold text-green-200">+₹1200</span>
               </div>
             </div>
          </div>
        </div>
      )
    },
    {
      title: "Billing (POS)",
      headline: "Generate bills in seconds now",
      desc: "Create GST or non-GST bills instantly. Print or share directly to your customer's phone.",
      bgColor: "bg-emerald-100",
      titleColor: "text-emerald-800",
      badges: [
        { icon: <FileText size={16} />, text: "Quick Print" },
        { icon: <Globe2 size={16} />, text: "GST Ready" },
        { icon: <Smartphone size={16} />, text: "Share easily" }
      ],
      imagePanel: (
         <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl brutal-border relative overflow-hidden flex items-center justify-center p-6 shadow-inner">
           <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl w-full max-w-sm text-white shadow-xl">
             <div className="text-center mb-6 border-b border-white/20 pb-4">
               <div className="font-extrabold text-2xl">INVOICE</div>
               <div className="text-xs opacity-80">#INV-2026-001</div>
             </div>
             <div className="space-y-3 text-sm">
               <div className="flex justify-between"><span>Rice (5kg)</span><span>₹300</span></div>
               <div className="flex justify-between"><span>Dal (2kg)</span><span>₹240</span></div>
               <div className="flex justify-between border-t border-white/20 pt-2 font-bold text-lg">
                 <span>Total</span><span>₹540</span>
               </div>
             </div>
             <button className="w-full mt-6 bg-white text-teal-800 font-bold py-2 rounded brutal-border">Share Bill</button>
           </div>
         </div>
      )
    },
    {
      title: "Inventory (Stock)",
      headline: "Track your stock easily now",
      desc: "Never run out of best-selling items. Get alerts and reorder with a single tap.",
      bgColor: "bg-orange-100",
      titleColor: "text-orange-800",
      badges: [
        { icon: <Package size={16} />, text: "Live Stock" },
        { icon: <AlertCircle size={16} />, text: "Low Alerts" },
        { icon: <ShoppingCart size={16} />, text: "1-Click Order" }
      ],
      imagePanel: (
         <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl brutal-border relative overflow-hidden flex items-center justify-center p-6 shadow-inner">
           <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl w-full max-w-sm text-white shadow-xl">
             <h4 className="font-bold mb-4 flex items-center gap-2"><AlertCircle size={20}/> Low Stock Alerts</h4>
             <div className="space-y-3">
               <div className="bg-white/10 p-3 rounded flex justify-between items-center brutal-border">
                 <span className="font-medium">Aashirvaad Atta</span>
                 <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">2 Left</span>
               </div>
               <div className="bg-white/10 p-3 rounded flex justify-between items-center brutal-border">
                 <span className="font-medium">Tata Salt</span>
                 <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded font-bold">5 Left</span>
               </div>
             </div>
             <button className="w-full mt-6 bg-white text-red-700 font-bold py-2 rounded brutal-border">Reorder Stock</button>
           </div>
         </div>
      )
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  return (
    <div className="w-full max-w-6xl mx-auto mt-16 mb-24 brutal-border brutal-shadow bg-[var(--card-bg)] rounded-3xl overflow-hidden relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
       <div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, idx) => (
            <div key={idx} className={`w-full flex-shrink-0 flex flex-col md:flex-row min-h-[450px] ${slide.bgColor}`}>
               {/* Left Content */}
               <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center">
                  <div className={`text-sm font-extrabold uppercase tracking-widest mb-4 ${slide.titleColor}`}>{slide.title}</div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-[#050543] leading-tight mb-6">{slide.headline}</h2>
                  <p className="text-lg opacity-80 mb-8 font-medium text-[#050543]">{slide.desc}</p>
                  
                  <div className="flex flex-wrap gap-4 mt-auto">
                    {slide.badges.map((b, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 text-[#050543]">
                        <div className="w-12 h-12 rounded-full bg-[var(--card-bg)] brutal-border flex items-center justify-center shadow-sm">
                          <div className={slide.titleColor}>{b.icon}</div>
                        </div>
                        <span className="text-xs font-bold whitespace-nowrap">{b.text}</span>
                      </div>
                    ))}
                  </div>
               </div>
               
               {/* Right Image Panel */}
               <div className="w-full md:w-1/2 p-6 md:p-10 flex items-center justify-center">
                  {slide.imagePanel}
               </div>
            </div>
          ))}
       </div>
       
       {/* Navigation Controls */}
       <div className="absolute bottom-6 right-6 md:right-1/2 md:translate-x-1/2 flex items-center gap-3 bg-[var(--card-bg)] px-4 py-2 rounded-full brutal-border shadow-md z-10 text-[var(--text-color)]">
          <button onClick={() => setCurrentSlide(prev => prev===0?2:prev-1)} className="p-1.5 hover:bg-[var(--bg-color)] rounded-full transition-colors"><ChevronLeft size={20}/></button>
          <button onClick={() => setIsPaused(!isPaused)} className="p-1.5 hover:bg-[var(--bg-color)] rounded-full transition-colors">
            {isPaused ? <Play size={16}/> : <Pause size={16}/>}
          </button>
          <button onClick={() => setCurrentSlide(prev => (prev+1)%3)} className="p-1.5 hover:bg-[var(--bg-color)] rounded-full transition-colors"><ChevronRight size={20}/></button>
       </div>
    </div>
  );
}

export default function App() {
const [currentView, setCurrentView] = useState<'landing' | 'auth'>('landing'); // <-- ADD THIS LINE
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('English');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-dot-grid font-sans overflow-x-hidden selection:bg-[var(--primary)] selection:text-white pb-24 md:pb-0 z-0 relative">
      
      {/* Hamburger Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-[var(--bg-color)]/60 backdrop-blur-sm transition-opacity" onClick={() => setIsMenuOpen(false)}></div>
          <div className="relative w-80 h-full bg-[var(--card-bg)]/90 backdrop-blur-md border-l-2 border-[var(--border-color)] p-6 flex flex-col brutal-shadow animate-in slide-in-from-right-full duration-300">
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 p-2 brutal-border bg-[var(--bg-color)] hover:bg-[var(--primary)] hover:text-white transition-colors">
              <X size={24} />
            </button>
            <nav className="mt-16 flex flex-col gap-6 text-[var(--text-color)]">
              <a href="#" className="text-2xl font-black hover:text-[var(--primary)] transition-colors">Home</a>
              <a href="#" className="text-2xl font-black hover:text-[var(--primary)] transition-colors">Profile</a>
              
              <div className="mt-4">
                <h4 className="text-lg font-bold mb-4 opacity-70 uppercase tracking-widest">Features</h4>
                <ul className="flex flex-col gap-5 pl-4 border-l-4 border-[var(--primary)] font-bold text-xl opacity-80">
                  <li className="hover:text-[var(--primary)] hover:opacity-100 cursor-pointer transition-colors">Financial Report</li>
                  <li className="hover:text-[var(--primary)] hover:opacity-100 cursor-pointer transition-colors">Billing (POS)</li>
                  <li className="hover:text-[var(--primary)] hover:opacity-100 cursor-pointer transition-colors">Inventory (Stock)</li>
                  <li className="hover:text-[var(--primary)] hover:opacity-100 cursor-pointer transition-colors">OCR Scanner</li>
                  <li className="hover:text-[var(--primary)] hover:opacity-100 cursor-pointer transition-colors">Khata / Credit</li>
                </ul>
              </div>
            </nav>
            <div className="mt-auto">
              <Button 
  variant="secondary" 
  className="!py-2 !px-6 !text-base"
  onClick={() => setCurrentView('auth')}
>
  Login / Sign Up
</Button>
            </div>
          </div>
        </div>
      )}

      {/* Top Nav (Trust Anchor) */}
      <header className="sticky top-0 z-40 bg-[var(--card-bg)] border-b-2 border-[var(--border-color)] px-4 py-3 flex justify-between items-center brutal-shadow">
        <div className="flex flex-col">
          <div className="font-extrabold text-lg md:text-xl leading-none tracking-tight flex items-center gap-2">
            <div className="w-6 h-6 bg-[var(--primary)] text-white text-xs flex items-center justify-center brutal-border hidden sm:flex">
              S
            </div>
            SmartDukaan
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#16A34A] mt-1.5 uppercase tracking-wide">
            <div className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></div>
            सुरक्षित (Saved Offline)
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div 
            className="flex border-2 border-[var(--border-color)] text-xs font-bold bg-[var(--bg-color)] overflow-hidden cursor-pointer select-none brutal-shadow hover:brutal-shadow-hover transition-all" 
            onClick={() => setLang(lang === 'English' ? 'हिन्दी' : 'English')}
          >
             <span className={`px-3 py-1.5 transition-colors ${lang === 'English' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--border-color)] hover:text-[var(--bg-color)]'}`}>English</span>
             <span className={`px-3 py-1.5 transition-colors ${lang === 'हिन्दी' ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--border-color)] hover:text-[var(--bg-color)]'}`}>हिन्दी</span>
          </div>
          
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-1.5 border-2 border-[var(--border-color)] bg-[var(--bg-color)] hover:bg-[var(--primary)] hover:text-white transition-colors brutal-shadow hover:brutal-shadow-hover"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="p-1.5 border-2 border-[var(--border-color)] bg-[var(--bg-color)] hover:bg-[var(--primary)] hover:text-white transition-colors brutal-shadow hover:brutal-shadow-hover"
          >
            <Menu size={18} />
          </button>
          
          <div className="hidden md:flex gap-3 ml-2">
           <Button 
  variant="primary" 
  className="w-full !py-4 text-xl"
  onClick={() => {
    setIsMenuOpen(false); // Close the mobile menu first
    setCurrentView('auth');
  }}
>
  Login / Sign Up
</Button>
          </div>
        </div>
      </header>
      {currentView === 'auth' ? ( <AuthScreen onBack={() => setCurrentView('landing')} /> ) : ( <>
      <main className="max-w-6xl mx-auto px-4 pt-12 md:pt-20">
        
        {/* Hero Section */}
        <section className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
            Ab udhar 'रिकॉर्ड' karna hua <br className="hidden md:block"/>
            <span className="text-indigo-600 inline-block mt-2 px-4 py-1 bg-[var(--card-bg)] brutal-border brutal-shadow -rotate-1">
               aasan
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-medium opacity-80 max-w-2xl mx-auto leading-relaxed">
            SmartDukaan replaces your old traditional khata and supplier bills to simple and modern solution.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="text-xl px-10 py-4 w-full sm:w-auto">
              Start your Khata <ChevronRight size={24} />
            </Button>
            <Button variant="secondary" className="text-xl px-10 py-4 w-full sm:w-auto hidden md:flex">
               Watch Demo <Volume2 size={24} />
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-bold opacity-70">
            <span className="flex items-center gap-2"><CheckCircle2 size={18} /> No Credit Card Required</span>
            <span className="flex items-center gap-2"><ShieldCheck size={18} /> Safe & Secure</span>
            <span className="flex items-center gap-2"><Globe2 size={18} /> Made for Bharat</span>
          </div>
        </section>

        {/* Hero Slider replacing Dashboard Preview */}
        <HeroSlider />

        {/* Features Section */}
        <section className="mb-32">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-tight">Features:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <FeatureCard 
              icon={BarChart3} 
              title="Financial Report" 
              desc="Get detailed insights into your daily sales, profits, and overall business health."
              gradientClass="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500"
            />
            <FeatureCard 
              icon={FileText} 
              title="Billing (POS)" 
              desc="Generate instant GST and non-GST bills. Print or share directly via WhatsApp." 
              gradientClass="bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600"
            />
            <FeatureCard 
              icon={Package} 
              title="Inventory (Stock)" 
              desc="Track live stock levels, get low inventory alerts, and manage all your items easily." 
              gradientClass="bg-gradient-to-br from-pink-400 via-rose-500 to-red-500"
            />
            <FeatureCard 
              icon={Camera} 
              title="OCR Scanner" 
              desc="Simply take a photo of handwritten supplier bills to automatically update stock." 
              gradientClass="bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600"
            />
            <FeatureCard 
              icon={BookOpen} 
              title="Khata / Credit" 
              desc="Record customer udhaar digitally and send automatic payment reminders." 
              gradientClass="bg-gradient-to-br from-violet-400 via-fuchsia-500 to-pink-500"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-32 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 tracking-tight">FAQs (Frequently Asked Questions):</h2>
          <div className="space-y-4">
            <FaqCard 
              q="Is my data safe?" 
              a="Yes. Your data is encrypted and backed up securely. Only you have access to your customer's Khata details." 
            />
            <FaqCard 
              q="How do I record my inventory?" 
              a="You can simply scan your supplier's bill using our OCR scanner, or enter the items manually. The app automatically updates your stock levels instantly." 
            />
            <FaqCard 
              q="Do I need Wi-Fi or data always?" 
              a="Not at all. SmartDukaan is designed for areas with bad networks. Make entries offline, and the app will sync when you get a signal." 
            />
            <FaqCard 
              q="Is it really free?" 
              a="The core Khata and Stock tracking features are 100% free forever. We only charge for premium supplier integrations." 
            />
          </div>
        </section>
      </main>

      {/* Desktop Footer */}
      <footer className="bg-[var(--border-color)] text-[var(--bg-color)] py-12 px-4 border-t-4 border-[var(--primary)] hidden md:block mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--primary)] flex items-center justify-center text-white dark:text-black font-bold brutal-border shadow-[2px_2px_0px_0px_var(--bg-color)]">SD</div>
              <span className="font-bold tracking-tight text-xl text-white dark:text-black">SmartDukaan</span>
            </div>
            <p className="text-sm font-medium opacity-80 max-w-sm mt-2">Your shop's digital companion. Manage khata, inventory, and bills offline securely.</p>
          </div>
          
          <div className="flex flex-col items-end gap-6">
            <div className="flex gap-6 text-sm font-bold opacity-80">
              <a href="#" className="hover:text-white hover:underline transition-all">Privacy Policy</a>
              <a href="#" className="hover:text-white hover:underline transition-all">Terms of Service</a>
              <a href="#" className="hover:text-white hover:underline transition-all">Help Center</a>
            </div>
            <p className="text-xs font-bold opacity-50 tracking-widest uppercase">© 2026 SmartDukaan Technologies.</p>
          </div>
        </div>
      </footer>
      </> )}
      {/* NBU Mobile Bottom Nav (Fixed) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--card-bg)] border-t-2 border-[var(--border-color)] px-2 py-2 brutal-shadow md:hidden flex justify-around items-end pb-safe">
        
        {/* Tab 1: Khata */}
        <button className="flex flex-col items-center justify-center text-[var(--primary)] focus:outline-none w-16 mb-1">
          <BookOpen size={24} className="mb-1" />
          <span className="text-[10px] font-bold">खाता / Khata</span>
        </button>

        {/* Tab 2: Stock */}
        <button className="flex flex-col items-center justify-center text-[var(--text-color)] opacity-60 hover:opacity-100 focus:outline-none w-16 mb-1 transition-opacity">
          <Package size={24} className="mb-1" />
          <span className="text-[10px] font-bold">सामान / Stock</span>
        </button>

        {/* Tab 3: FAB Scan Bill */}
        <button className="flex flex-col items-center justify-center -mt-8 focus:outline-none relative group z-10 w-20">
          <div className="w-14 h-14 bg-[var(--primary)] flex items-center justify-center text-white brutal-border brutal-shadow active:brutal-shadow-active transition-all group-hover:-translate-y-1 group-hover:brutal-shadow-hover rounded-full">
            <Camera size={26} />
          </div>
          <span className="text-[11px] font-extrabold text-[var(--text-color)] mt-1">बिल स्कैन</span>
        </button>

        {/* Tab 4: Hisaab */}
        <button className="flex flex-col items-center justify-center text-[var(--text-color)] opacity-60 hover:opacity-100 focus:outline-none w-16 mb-1 transition-opacity">
          <BarChart3 size={24} className="mb-1" />
          <span className="text-[10px] font-bold">हिसाब / Report</span>
        </button>

      </nav>
    </div>
  );
}
