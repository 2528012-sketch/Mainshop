import React from 'react';
import { Store, ShieldCheck, TrendingUp, Globe, FileText, Zap, ArrowRight } from 'lucide-react';

export default function Landing({ onNavigateLogin, onNavigateSignup }) {
  return (
    <>
      {/* Global CSS Reset injected to eliminate white borders */}
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html {
          margin: 0;
          padding: 0;
          background-color: #070b14;
          width: 100%;
          overflow-x: hidden;
        }
      `}</style>

      <div style={styles.container}>
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <div style={styles.badge}>
            <Zap size={14} color="#818cf8" />
            <span>Next-Gen Retail & Billing Suite for Modern Merchants</span>
          </div>

          <h1 style={styles.heroTitle}>
            Manage Your Store, POS & Ledger <span style={styles.highlight}>Effortlessly</span>
          </h1>

          <p style={styles.heroSubtitle}>
            From lightning-fast barcode billing and digital UPI QR integration to automated Khata credit tracking, multi-language support, and smart document OCR. Built to power local stores into the future with SmartDukaan.
          </p>

          <div style={styles.ctaGroup}>
            <button onClick={onNavigateSignup} style={styles.primaryBtn}>
              Create Free Store Account <ArrowRight size={18} />
            </button>
            <button onClick={onNavigateLogin} style={styles.secondaryBtn}>
              Owner Login
            </button>
          </div>
        </div>

        {/* Features Grid Section */}
        <div style={styles.featuresContainer}>
          <h2 style={styles.sectionHeading}>Everything You Need to Run Your SmartDukaan</h2>
          
          <div style={styles.grid}>
            {/* Card 1: Smart POS Billing */}
            <div style={styles.card}>
              <div style={styles.iconBox}><Store size={22} color="#6366f1" /></div>
              <h3 style={styles.cardTitle}>Smart POS Billing</h3>
              <p style={styles.cardDesc}>
                Live search autocomplete, quick cart adjustment, and multi-tier GST support (0%, 5%, 12%, 18%).
              </p>
            </div>

            {/* Card 2: Khata & Credit Book */}
            <div style={styles.card}>
              <div style={styles.iconBox}><ShieldCheck size={22} color="#10b981" /></div>
              <h3 style={styles.cardTitle}>Khata & Credit Book</h3>
              <p style={styles.cardDesc}>
                Keep track of customer 'Udhar' balances easily, send reminders, and clear entries upon payment.
              </p>
            </div>

            {/* Card 3: Advanced Financial Ledger */}
            <div style={styles.card}>
              <div style={styles.iconBox}><TrendingUp size={22} color="#f59e0b" /></div>
              <h3 style={styles.cardTitle}>Advanced Financial Ledger</h3>
              <p style={styles.cardDesc}>
                Real-time calculation of total revenue, net balances, daily operational expenses, and inventory evaluation.
              </p>
            </div>

            {/* Card 4: Smart Document OCR */}
            <div style={styles.card}>
              <div style={styles.iconBox}><FileText size={22} color="#ec4899" /></div>
              <h3 style={styles.cardTitle}>Smart Document OCR</h3>
              <p style={styles.cardDesc}>
                Upload vendor bills, invoices, or receipts to automatically extract, parse, and structure data instantly using local AI vision.
              </p>
            </div>

            {/* Card 5: Bilingual Support */}
            <div style={styles.card}>
              <div style={styles.iconBox}><Globe size={22} color="#3b82f6" /></div>
              <h3 style={styles.cardTitle}>Bilingual Support</h3>
              <p style={styles.cardDesc}>
                Switch seamlessly between English and Hindi to match your preferred operating environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    background: '#070b14',
    color: '#f8fafc',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    paddingBottom: '60px',
    margin: 0,
    overflowX: 'hidden'
  },
  heroSection: {
    textAlign: 'center',
    padding: '70px 20px 50px 20px',
    maxWidth: '900px',
    margin: '0 auto'
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    color: '#818cf8',
    marginBottom: '24px',
    fontWeight: '500'
  },
  heroTitle: {
    fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
    fontWeight: '800',
    lineHeight: '1.2',
    marginBottom: '20px',
    letterSpacing: '-0.02em'
  },
  highlight: {
    color: '#818cf8'
  },
  heroSubtitle: {
    fontSize: '1.05rem',
    lineHeight: '1.6',
    color: '#94a3b8',
    marginBottom: '35px',
    maxWidth: '750px',
    margin: '0 auto 35px auto'
  },
  ctaGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap'
  },
  primaryBtn: {
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    color: '#fff',
    border: 'none',
    padding: '14px 26px',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
  },
  secondaryBtn: {
    background: '#1e293b',
    color: '#f8fafc',
    border: '1px solid #334155',
    padding: '14px 26px',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  featuresContainer: {
    maxWidth: '1300px',
    margin: '40px auto 0 auto',
    padding: '0 20px',
    textAlign: 'center'
  },
  sectionHeading: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '35px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    textAlign: 'left'
  },
  card: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
  },
  iconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4px'
  },
  cardTitle: {
    fontSize: '1.15rem',
    fontWeight: '600',
    margin: 0,
    color: '#f8fafc'
  },
  cardDesc: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: '#94a3b8',
    margin: 0
  }
};