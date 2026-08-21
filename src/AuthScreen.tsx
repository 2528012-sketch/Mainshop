import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function AuthScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-in fade-in duration-500 relative z-10">
      
      {/* Auth Card */}
      <div className="bg-[var(--card-bg)] brutal-border brutal-shadow rounded-3xl w-full max-w-md p-6 sm:p-8 relative">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute -top-5 -left-4 bg-[var(--card-bg)] brutal-border p-2 rounded-full hover:bg-[var(--bg-color)] transition-colors brutal-shadow z-20"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Trust Anchor Badge */}
        <div className="absolute -top-4 -right-4 bg-[var(--primary)] text-white text-xs font-bold px-3 py-1 brutal-border brutal-shadow rotate-3">
          100% Secure
        </div>

        <div className="text-center mb-8 mt-2">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">SmartDukaan</h1>
          <p className="font-medium opacity-80 text-sm">Manage your Khata & Stock seamlessly.</p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('login')} 
            className={`flex-1 py-2 font-bold brutal-border transition-all ${activeTab === 'login' ? 'brutal-shadow bg-[var(--primary)] text-white' : 'hover:bg-[var(--bg-color)]'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setActiveTab('signup')} 
            className={`flex-1 py-2 font-bold brutal-border transition-all ${activeTab === 'signup' ? 'brutal-shadow bg-[var(--primary)] text-white' : 'hover:bg-[var(--bg-color)]'}`}
          >
            Sign Up
          </button>
        </div>

        {/* LOGIN FORM */}
        {activeTab === 'login' && (
          <form className="space-y-4 animate-in fade-in zoom-in-95 duration-300" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block font-bold mb-1 text-sm">Username</label>
              <input type="text" placeholder="Enter your username" className="w-full bg-[var(--bg-color)] brutal-border p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] font-medium" />
            </div>
            <div>
              <label className="block font-bold mb-1 text-sm">Password</label>
              <input type="password" placeholder="Enter your password" className="w-full bg-[var(--bg-color)] brutal-border p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] font-medium" />
            </div>
            <div className="text-right">
              <a href="#" className="text-sm font-bold text-[var(--primary)] hover:underline">Forgot Password?</a>
            </div>
            <button type="submit" className="w-full bg-[var(--primary)] text-white font-bold py-3 mt-2 brutal-border brutal-shadow hover:brutal-shadow-hover active:brutal-shadow-active transition-all">
              Login securely
            </button>
          </form>
        )}

        {/* SIGNUP FORM */}
        {activeTab === 'signup' && (
          <form className="space-y-4 animate-in fade-in zoom-in-95 duration-300" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block font-bold mb-1 text-sm">Store / Username</label>
              <input type="text" placeholder="Choose a username" className="w-full bg-[var(--bg-color)] brutal-border p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] font-medium" />
            </div>
            <div>
              <label className="block font-bold mb-1 text-sm">Email</label>
              <input type="email" placeholder="eg: store@gmail.com" className="w-full bg-[var(--bg-color)] brutal-border p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] font-medium" />
            </div>
            <div>
              <label className="block font-bold mb-1 text-sm">Password</label>
              <input type="password" placeholder="Create a password" className="w-full bg-[var(--bg-color)] brutal-border p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] font-medium" />
            </div>
            <button type="submit" className="w-full bg-[var(--primary)] text-white font-bold py-3 mt-2 brutal-border brutal-shadow hover:brutal-shadow-hover active:brutal-shadow-active transition-all">
              Create Account
            </button>
          </form>
        )}

        <div className="flex items-center text-center my-6 font-bold opacity-50">
          <div className="flex-1 border-t-2 border-[var(--border-color)]"></div>
          <span className="px-4 text-xs">OR</span>
          <div className="flex-1 border-t-2 border-[var(--border-color)]"></div>
        </div>

        {/* Google Auth Button */}
        <button className="w-full bg-[var(--card-bg)] font-bold py-3 brutal-border brutal-shadow hover:brutal-shadow-hover active:brutal-shadow-active transition-all flex items-center justify-center gap-3">
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
}