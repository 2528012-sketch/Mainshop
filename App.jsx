import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('dark');

  const currentTheme = themes[theme];

  return (
    <div style={{ ...styles.appContainer, background: currentTheme.bg, color: currentTheme.text }}>
      {/* Top Header Navigation */}
      <header style={{ ...styles.header, background: currentTheme.headerBg, borderColor: currentTheme.border }}>
        <div style={styles.headerLeft}>
          <button onClick={() => setLang(prev => prev === 'en' ? 'hi' : 'en')} style={styles.hindiBtn}>
            {lang === 'en' ? 'हिंदी (Hindi)' : 'English'}
          </button>
          <div>
            <h1 style={styles.dashboardTitle}>Shopkeeper Dashboard</h1>
            <p style={styles.dashboardSub}>Owner: Admin | Phone: +91 9876543210</p>
          </div>
        </div>

        <div style={styles.navMenu}>
          <button onClick={() => setActiveTab('ledger')} style={styles.navLink(activeTab === 'ledger', currentTheme)}>Transaction Ledger</button>
          <button onClick={() => setActiveTab('reports')} style={styles.navLink(activeTab === 'reports', currentTheme)}>Financial Reports</button>
          <button onClick={() => setActiveTab('billing')} style={styles.navLink(activeTab === 'billing', currentTheme)}>Billing (POS)</button>
          <button onClick={() => setActiveTab('inventory')} style={styles.navLink(activeTab === 'inventory', currentTheme)}>Inventory (Stock)</button>
          <button onClick={() => setActiveTab('ocr')} style={styles.navLink(activeTab === 'ocr', currentTheme)}>OCR Scanner</button>
          <button onClick={() => setActiveTab('khata')} style={styles.navLink(activeTab === 'khata', currentTheme)}>Khata / Credit</button>
          <button onClick={() => setActiveTab('profile')} style={styles.navLink(activeTab === 'profile', currentTheme)}>Shop Profile</button>
          
          <button onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')} style={styles.themeToggleBtn}>
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </header>

      {/* Main Container Views */}
      <main style={styles.mainContent}>
        {activeTab === 'ledger' && <LedgerView lang={lang} theme={currentTheme} />}
        {activeTab === 'inventory' && <InventoryView lang={lang} theme={currentTheme} />}
        {activeTab === 'billing' && <BillingView lang={lang} theme={currentTheme} />}
        {activeTab === 'reports' && <ReportsView theme={currentTheme} />}
        {activeTab === 'ocr' && <OCRView theme={currentTheme} />}
        {activeTab === 'khata' && <KhataView theme={currentTheme} />}
        {activeTab === 'profile' && <ProfileView theme={currentTheme} />}
      </main>
    </div>
  );
}

/* ================= COMPONENT VIEWS ================= */

function LedgerView({ lang, theme }) {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = () => {
    fetch(`http://localhost:5000/api/transactions?lang=${lang}`)
      .then(res => res.json())
      .then(data => { if (data.success) setTransactions(data.data); });
  };

  useEffect(() => { fetchTransactions(); }, [lang]);

  return (
    <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={styles.cardTitle}>Recent Transaction Ledger</h2>
        <button onClick={fetchTransactions} style={styles.submitBtn}>Refresh Ledger</button>
      </div>
      {transactions.length === 0 ? <p style={styles.subText}>No transactions recorded yet.</p> : (
        transactions.map(tx => (
          <div key={tx.id} style={{ ...styles.tableRow, borderColor: theme.border, display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>{tx.store}</strong>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>Phone: {tx.phoneNumber} • {new Date(tx.date).toLocaleDateString()}</div>
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '16px', color: tx.type === 'CREDIT' ? '#10b981' : '#ef4444' }}>
              {tx.displayAmount}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function InventoryView({ lang, theme }) {
  const [inventory, setInventory] = useState([]);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [threshold, setThreshold] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });

  const fetchInventory = () => {
    fetch(`http://localhost:5000/api/inventory?lang=${lang}`)
      .then(res => res.json())
      .then(data => { if (data.success) setInventory(data.data); });
  };

  useEffect(() => { fetchInventory(); }, [lang]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemNames: { en: productName, hi: productName },
        sku: 'SKU-' + Math.floor(1000 + Math.random() * 9000),
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        category: 'General',
        threshold: parseInt(threshold || 5, 10)
      })
    });
    const result = await res.json();
    if (result.success) {
      setMsg({ text: lang === 'hi' ? 'उत्पाद सफलतापूर्वक जोड़ा गया!' : 'Item successfully added!', type: 'success' });
      setProductName(''); setPrice(''); setStock(''); setThreshold('');
      fetchInventory();
    }
  };

  return (
    <div style={styles.gridContainer}>
      <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border }}>
        <h2 style={styles.cardTitle}>{lang === 'hi' ? 'नया उत्पाद जोड़ें' : 'Add New Product'}</h2>
        <form onSubmit={handleAddItem} style={styles.form}>
          <div>
            <label style={styles.label}>{lang === 'hi' ? 'उत्पाद का नाम *' : 'Product Name *'}</label>
            <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="e.g. Rice 5kg" required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
          </div>
          <div>
            <label style={styles.label}>{lang === 'hi' ? 'बिक्री मूल्य *' : 'Selling Price *'}</label>
            <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder="450" required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
          </div>
          <div>
            <label style={styles.label}>{lang === 'hi' ? 'प्रारंभिक स्टॉक मात्रा *' : 'Initial Stock Quantity *'}</label>
            <input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="8" required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
          </div>
          <div>
            <label style={styles.label}>{lang === 'hi' ? 'कम स्टॉक चेतावनी सीमा *' : 'Low Stock Alert Threshold *'}</label>
            <input type="number" value={threshold} onChange={e => setThreshold(e.target.value)} placeholder="5" required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
          </div>
          <button type="submit" style={styles.submitBtn}>{lang === 'hi' ? 'आइटम सहेजें' : 'Save Item'}</button>
          {msg.text && <p style={{ color: msg.type === 'success' ? '#10b981' : '#ef4444', margin: 0, fontSize: '13px' }}>{msg.text}</p>}
        </form>
      </div>

      <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border }}>
        <h2 style={styles.cardTitle}>{lang === 'hi' ? 'इन्वेंट्री स्टॉक विवरण' : 'Inventory Stock Details'}</h2>
        <p style={styles.subText}>{lang === 'hi' ? 'आप स्टॉक बॉक्स के अंदर सीधे मात्रा बदल सकते हैं।' : 'You can change quantity directly inside the stock box.'}</p>
        
        <div style={styles.tableHeader}>
          <span style={{ flex: 2 }}>Product Name</span>
          <span style={{ flex: 1 }}>Price</span>
          <span style={{ flex: 1 }}>Available Stock</span>
          <span style={{ flex: 1 }}>Threshold</span>
        </div>

        {inventory.length === 0 ? <p style={styles.subText}>No stock available.</p> : (
          inventory.map(item => (
            <div key={item.id} style={{ ...styles.tableRow, borderColor: theme.border }}>
              <span style={{ flex: 2, fontWeight: '500' }}>{item.name}</span>
              <span style={{ flex: 1 }}>${item.price.toFixed(2)}</span>
              <span style={{ flex: 1, fontWeight: 'bold', color: item.stock < item.threshold ? '#ef4444' : '#10b981' }}>{item.stock}</span>
              <span style={{ flex: 1 }}>{item.threshold}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function BillingView({ theme }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleBill = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        storeNames: { en: 'Main Store' },
        amount: parseFloat(amount),
        type: 'CREDIT',
        phoneNumber,
        customerName,
        paymentMethod
      })
    });
    const data = await res.json();
    if (data.success) {
      setMsg({ text: paymentMethod === 'KHATA' ? 'Checked out to Khata successfully!' : 'Bill processed successfully!', type: 'success' });
      setPhoneNumber(''); setAmount(''); setCustomerName('');
    } else {
      setMsg({ text: data.error, type: 'error' });
    }
  };

  return (
    <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border, maxWidth: '600px', margin: 'auto' }}>
      <h2 style={styles.cardTitle}>Billing & POS Checkout</h2>
      <form onSubmit={handleBill} style={styles.form}>
        <div>
          <label style={styles.label}>Customer Name</label>
          <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="John Doe" style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
        </div>
        <div>
          <label style={styles.label}>Customer Phone Number * (Compulsory)</label>
          <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="+919876543210" required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
        </div>
        <div>
          <label style={styles.label}>Amount ($)</label>
          <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
        </div>
        <div>
          <label style={styles.label}>Checkout Mode</label>
          <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }}>
            <option value="CASH">Cash / UPI (Immediate Revenue)</option>
            <option value="KHATA">Khata / Credit (Udhar - Excluded from immediate sales)</option>
          </select>
        </div>
        <button type="submit" style={styles.submitBtn}>Checkout & Save</button>
        {msg.text && <p style={{ color: msg.type === 'success' ? '#10b981' : '#ef4444' }}>{msg.text}</p>}
      </form>
    </div>
  );
}

function KhataView({ theme }) {
  const [khataList, setKhataList] = useState([]);

  const fetchKhata = () => {
    fetch('http://localhost:5000/api/khata')
      .then(res => res.json())
      .then(data => { if (data.success) setKhataList(data.data); });
  };

  useEffect(() => { fetchKhata(); }, []);

  const markAsPaid = async (id) => {
    const res = await fetch(`http://localhost:5000/api/khata/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      fetchKhata();
    }
  };

  return (
    <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border }}>
      <h2 style={styles.cardTitle}>Khata / Credit Ledger Book</h2>
      <p style={styles.subText}>Marking entries as paid records a positive green transaction settlement in your main ledger.</p>
      {khataList.length === 0 ? <p style={styles.subText}>No active credit balances.</p> : (
        khataList.map(k => (
          <div key={k._id} style={{ ...styles.tableRow, borderColor: theme.border, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>{k.customerName}</strong> ({k.phoneNumber})
              <div style={{ fontSize: '12px', color: '#ef4444' }}>Due Balance: ${k.balance.toFixed(2)}</div>
            </div>
            <button onClick={() => markAsPaid(k._id)} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              Mark as Paid (भुगतान हो गया)
            </button>
          </div>
        ))
      )}
    </div>
  );
}

function ReportsView({ theme }) {
  const [report, setReport] = useState(null);
  useEffect(() => {
    fetch('http://localhost:5000/api/reports/financial')
      .then(res => res.json())
      .then(data => { if (data.success) setReport(data.data); });
  }, []);

  return (
    <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border }}>
      <h2 style={styles.cardTitle}>Financial Reports & Metrics</h2>
      {report && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
          <div style={{ background: theme.inputBg, padding: '15px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
            <p style={styles.subText}>Total Revenue (Credits)</p>
            <h3 style={{ color: '#10b981', margin: '5px 0 0' }}>+${report.totalRevenue.toFixed(2)}</h3>
          </div>
          <div style={{ background: theme.inputBg, padding: '15px', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
            <p style={styles.subText}>Total Expenses (Debits)</p>
            <h3 style={{ color: '#ef4444', margin: '5px 0 0' }}>-${report.totalExpenses.toFixed(2)}</h3>
          </div>
          <div style={{ background: theme.inputBg, padding: '15px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
            <p style={styles.subText}>Net Balance</p>
            <h3 style={{ color: '#3b82f6', margin: '5px 0 0' }}>${report.netBalance.toFixed(2)}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

function OCRView({ theme }) {
  const [result, setResult] = useState(null);
  const scan = async () => {
    const res = await fetch('http://localhost:5000/api/ocr/scan', { method: 'POST' });
    const data = await res.json();
    if (data.success) setResult(data.data);
  };

  return (
    <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border, maxWidth: '600px', margin: 'auto' }}>
      <h2 style={styles.cardTitle}>OCR Receipt Scanner</h2>
      <p style={styles.subText}>Automatically scan slips to pull data.</p>
      <button onClick={scan} style={styles.submitBtn}>Simulate OCR Scan</button>
      {result && (
        <div style={{ marginTop: '15px', background: theme.inputBg, padding: '15px', borderRadius: '6px' }}>
          <p><strong>Store:</strong> {result.extractedStore}</p>
          <p><strong>Amount:</strong> ${result.extractedAmount}</p>
          <p><strong>Phone:</strong> {result.extractedPhone}</p>
        </div>
      )}
    </div>
  );
}

function ProfileView({ theme }) {
  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gstin, setGstin] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setShopName(data.data.shopName);
          setOwnerName(data.data.ownerName);
          setPhone(data.data.phone);
          setAddress(data.data.address || '');
          setGstin(data.data.gstin || '');
        }
      });
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    if (!address || !address.trim() || !gstin || !gstin.trim()) {
      setMsg({ text: 'Shop Address and GSTIN are strictly compulsory before saving changes.', type: 'error' });
      return;
    }
    const res = await fetch('http://localhost:5000/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shopName, ownerName, phone, address, gstin })
    });
    const data = await res.json();
    if (data.success) {
      setMsg({ text: 'Profile saved successfully!', type: 'success' });
    } else {
      setMsg({ text: data.error, type: 'error' });
    }
  };

  return (
    <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border, maxWidth: '600px', margin: 'auto' }}>
      <h2 style={styles.cardTitle}>Shop Profile & Settings</h2>
      <form onSubmit={saveProfile} style={styles.form}>
        <div>
          <label style={styles.label}>Shop Name</label>
          <input type="text" value={shopName} onChange={e => setShopName(e.target.value)} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
        </div>
        <div>
          <label style={styles.label}>Owner Name</label>
          <input type="text" value={ownerName} onChange={e => setOwnerName(e.target.value)} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
        </div>
        <div>
          <label style={styles.label}>Phone</label>
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
        </div>
        <div>
          <label style={styles.label}>Shop Address * (Compulsory)</label>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="14/2 Park Street" required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
        </div>
        <div>
          <label style={styles.label}>GSTIN * (Compulsory)</label>
          <input type="text" value={gstin} onChange={e => setGstin(e.target.value)} placeholder="19AABCT1332L1ZS" required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
        </div>
        <button type="submit" style={styles.submitBtn}>Save Profile</button>
        {msg.text && <p style={{ color: msg.type === 'success' ? '#10b981' : '#ef4444', margin: '5px 0 0' }}>{msg.text}</p>}
      </form>
    </div>
  );
}

/* ================= THEMES & STYLING ================= */
const themes = {
  dark: { bg: '#0f172a', headerBg: '#1e293b', cardBg: '#1e293b', text: '#f8fafc', subText: '#94a3b8', border: '#334155', inputBg: '#0f172a' },
  light: { bg: '#f1f5f9', headerBg: '#ffffff', cardBg: '#ffffff', text: '#0f172a', subText: '#64748b', border: '#cbd5e1', inputBg: '#f8fafc' }
};

const styles = {
  appContainer: { minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', paddingBottom: '40px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', borderBottom: '1px solid', flexWrap: 'wrap', gap: '15px' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '15px' },
  hindiBtn: { background: '#6366f1', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
  dashboardTitle: { margin: 0, fontSize: '20px', fontWeight: '700' },
  dashboardSub: { margin: '2px 0 0', fontSize: '12px', opacity: 0.7 },
  navMenu: { display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' },
  navLink: (active, theme) => ({ background: active ? '#6366f1' : 'transparent', color: active ? '#fff' : theme.text, border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }),
  themeToggleBtn: { background: 'transparent', border: '1px solid currentColor', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  mainContent: { maxWidth: '1300px', margin: '30px auto', padding: '0 20px' },
  gridContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '25px' },
  card: { padding: '25px', borderRadius: '12px', border: '1px solid', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
  cardTitle: { margin: '0 0 15px 0', fontSize: '18px', fontWeight: '700' },
  subText: { fontSize: '13px', opacity: 0.7, marginBottom: '15px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '5px' },
  input: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid', fontSize: '14px', outline: 'none' },
  submitBtn: { background: '#6366f1', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' },
  tableHeader: { display: 'flex', padding: '10px 0', borderBottom: '2px solid rgba(100,100,100,0.2)', fontWeight: 'bold', fontSize: '13px', opacity: 0.8 },
  tableRow: { display: 'flex', padding: '12px 0', borderBottom: '1px solid', alignItems: 'center', fontSize: '14px' }
};