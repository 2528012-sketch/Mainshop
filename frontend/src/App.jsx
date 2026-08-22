import React, { useState, useEffect } from 'react';
import Landing from './Landing.jsx';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';

// ================= TRANSLATIONS =================
const translations = {
  en: {
    title: "Merchant Portal",
    ownerSub: "Owner: Admin",
    reports: "Financial Reports",
    billing: "Billing (POS)",
    inventory: "Inventory (Stock)",
    expenses: "Expense Tracker",
    khata: "Khata / Credit",
    ocrTab: "OCR Scanner", // New Tab Translation
    profile: "Shop Profile",
    light: "☀️ Light",
    dark: "🌙 Dark",
    logout: "Logout",
    // Inventory
    addProduct: "Add New Product",
    productName: "Product Name *",
    productNamePlaceholder: "e.g. Rice 5kg",
    sellingPrice: "Selling Price (₹) *",
    pricePlaceholder: "450",
    initialStock: "Initial Stock Quantity *",
    stockPlaceholder: "20",
    saveItem: "Save Item",
    itemAddedSuccess: "Item successfully added!",
    stockManagement: "Inventory Stock Management",
    tableProdName: "Product Name",
    tablePrice: "Price",
    tableStockInput: "Total Stock Input",
    updateBtn: "Update",
    noStock: "No stock available.",
    lowStockWarning: "⚠️ Low Stock (< 5)",
    // Billing
    searchLabel: "Live Autocomplete Search",
    searchPlaceholder: "Type to search product name...",
    noMatch: "No matching products found",
    addBtn: "+ Add",
    activeCart: "Active Cart Items",
    noCart: "No items added yet.",
    billSummary: "Bill Summary & GST",
    subtotal: "Subtotal:",
    gstRate: "GST Rate:",
    gst0: "0% GST",
    gst5: "5% GST (CGST 2.5% + SGST 2.5%)",
    gst12: "12% GST (CGST 6% + SGST 6%)",
    gst18: "18% GST (CGST 9% + SGST 9%)",
    totalTax: "Total Tax (GST Amount):",
    grandTotal: "Grand Total:",
    customerName: "Customer Name",
    customerNamePlaceholder: "John Doe",
    customerPhone: "Customer Phone Number * (10 Digits)",
    phonePlaceholder: "9876543210",
    checkoutMode: "Checkout Mode",
    cashMode: "Cash Payment",
    upiMode: "UPI / Digital QR Payment",
    khataMode: "Khata / Credit (Udhar)",
    completeCheckout: "Complete Checkout",
    checkoutSuccessKhata: "Checked out to Khata & Ledger successfully!",
    checkoutSuccessCash: "Bill processed, stock deducted, & added to ledger!",
    phoneError: "Phone number must be exactly 10 digits.",
    cartError: "Please add items to the bill cart.",
    digitalPaymentBox: "📱 Scan & Pay via UPI",
    scanInstruction: "Scan this QR code using GPay, PhonePe, or Paytm to pay:",
    // OCR Scanner
    ocrTitle: "Smart Document OCR",
    ocrDesc: "Upload bills, invoices, or receipts to automatically parse data using your local AI vision engine.",
    ocrUploadBtn: "Upload Document",
    ocrProcessing: "Processing Document...",
    ocrSuccess: "Data extracted successfully!",
    // Expenses
    expenseTitle: "Expense Tracker",
    descLabel: "Description *",
    descPlaceholder: "e.g. Electricity Bill",
    amountLabel: "Amount (₹) *",
    amountPlaceholder: "1500",
    categoryLabel: "Category",
    catUtilities: "Utilities",
    catSupply: "Supplies",
    catMisc: "Miscellaneous",
    addExpenseBtn: "Add Expense",
    recentExpenses: "Recent Expenses",
    totalExpenses: "Total Expenses",
    noExpenses: "No expenses recorded yet.",
    expenseSuccess: "Expense added successfully!",
    // Khata
    khataTitle: "Customer Khata / Credit Ledger",
    noKhata: "No active credit dues.",
    markPaid: "Mark as Paid",
    // Reports
    ledgerMetrics: "Financial Reports & Ledger Metrics",
    totalRevenue: "Total Revenue (Cash + UPI)",
    netBalance: "Net Balance (Revenue - Expenses)",
    totalInventoryCost: "Total Stock Value (Cost)",
    recentLedger: "Recent Transactions Ledger",
    noTransactions: "No transactions recorded yet.",
    // Profile
    profileTitle: "Shop Profile Settings",
    shopNameLabel: "Shop Name *",
    ownerNameLabel: "Owner Name *",
    phoneNumLabelProfile: "Phone Number * (10 Digits)",
    addressLabel: "Shop Address *",
    gstinLabel: "GSTIN *",
    saveProfile: "Save Profile Changes",
    addressGstinRequired: "Address and GSTIN are required fields.",
    profileSuccess: "Profile updated successfully!"
  },
  hi: {
    title: "व्यापारी पोर्टल",
    ownerSub: "मालिक: एडमिन",
    reports: "वित्तीय रिपोर्ट",
    billing: "बिलिंग (POS)",
    inventory: "इन्वेंट्री (स्टॉक)",
    expenses: "खर्च ट्रैकर",
    khata: "खाता / उधार",
    ocrTab: "ओसीआर स्कैनर", // New Tab Translation
    profile: "दुकान प्रोफ़ाइल",
    light: "☀️ लाइट",
    dark: "🌙 डार्क",
    logout: "लॉग आउट",
    // Inventory
    addProduct: "नया उत्पाद जोड़ें",
    productName: "उत्पाद का नाम *",
    productNamePlaceholder: "उदा. चावल 5kg",
    sellingPrice: "बिक्री मूल्य (₹) *",
    pricePlaceholder: "450",
    initialStock: "प्रारंभिक स्टॉक मात्रा *",
    stockPlaceholder: "20",
    saveItem: "आइटम सहेजें",
    itemAddedSuccess: "उत्पाद सफलतापूर्वक जोड़ा गया!",
    stockManagement: "इन्वेंट्री स्टॉक प्रबंधन",
    tableProdName: "उत्पाद का नाम",
    tablePrice: "मूल्य",
    tableStockInput: "कुल स्टॉक इनपुट",
    updateBtn: "अपडेट करें",
    noStock: "कोई स्टॉक उपलब्ध नहीं है।",
    lowStockWarning: "⚠️ कम स्टॉक (< 5)",
    // Billing
    searchLabel: "लाइव ऑटो कम्प्लीट खोज",
    searchPlaceholder: "उत्पाद का नाम खोजें...",
    noMatch: "कोई मेल खाता उत्पाद नहीं मिला",
    addBtn: "+ जोड़ें",
    activeCart: "सक्रिय कार्ट आइटम",
    noCart: "अभी तक कोई आइटम नहीं जोड़ा गया है।",
    billSummary: "बिल सारांश और जीएसटी",
    subtotal: "उप-योग:",
    gstRate: "जीएसटी दर:",
    gst0: "0% जीएसटी",
    gst5: "5% जीएसटी",
    gst12: "12% जीएसटी",
    gst18: "18% जीएसटी",
    totalTax: "कुल कर (जीएसटी राशि):",
    grandTotal: "कुल योग:",
    customerName: "ग्राहक का नाम",
    customerNamePlaceholder: "राहुल कुमार",
    customerPhone: "ग्राहक का फोन नंबर * (10 अंक)",
    phonePlaceholder: "9876543210",
    checkoutMode: "चेकआउट मोड",
    cashMode: "नकद भुगतान",
    upiMode: "UPI / डिजिटल QR भुगतान",
    khataMode: "खाता / उधार",
    completeCheckout: "चेकआउट पूरा करें",
    checkoutSuccessKhata: "खाता में सफलतापूर्वक चेकआउट हो गया!",
    checkoutSuccessCash: "बिल प्रोसेस हो गया और बहीखाता में जुड़ गया!",
    phoneError: "फोन नंबर ठीक 10 अंकों का होना चाहिए।",
    cartError: "कृपया बिल कार्ट में आइटम जोड़ें।",
    digitalPaymentBox: "📱 UPI से स्कैन और भुगतान करें",
    scanInstruction: "भुगतान करने के लिए GPay, PhonePe या Paytm से इस QR को स्कैन करें:",
    // OCR Scanner
    ocrTitle: "स्मार्ट दस्तावेज़ ओसीआर",
    ocrDesc: "अपने स्थानीय एआई विज़न इंजन का उपयोग करके डेटा पार्स करने के लिए बिल या इनवॉइस अपलोड करें।",
    ocrUploadBtn: "दस्तावेज़ अपलोड करें",
    ocrProcessing: "दस्तावेज़ प्रोसेस हो रहा है...",
    ocrSuccess: "डेटा सफलतापूर्वक निकाला गया!",
    // Expenses
    expenseTitle: "खर्च ट्रैकर",
    descLabel: "विवरण *",
    descPlaceholder: "उदा. बिजली का बिल",
    amountLabel: "राशि (₹) *",
    amountPlaceholder: "1500",
    categoryLabel: "श्रेणी",
    catUtilities: "यूटिलिटीज़",
    catSupply: "आपूर्ति",
    catMisc: "विविध",
    addExpenseBtn: "खर्च जोड़ें",
    recentExpenses: "हाल के खर्चे",
    totalExpenses: "कुल खर्चे",
    noExpenses: "अभी तक कोई खर्च दर्ज नहीं किया गया है।",
    expenseSuccess: "खर्च सफलतापूर्वक जोड़ा गया!",
    // Khata
    khataTitle: "ग्राहक खाता / उधार बही",
    noKhata: "कोई सक्रिय उधार बकाया नहीं है।",
    markPaid: "भुगतान हो गया चिह्नित करें",
    // Reports
    ledgerMetrics: "वित्तीय रिपोर्ट और बहीखाता मेट्रिक्स",
    totalRevenue: "कुल आय (नकद + UPI)",
    netBalance: "शुद्ध शेष (आय - खर्चे)",
    totalInventoryCost: "कुल स्टॉक मूल्य (लागत)",
    recentLedger: "हाल के लेन-देन का बहीखाता",
    noTransactions: "अभी तक कोई लेन-देन दर्ज नहीं किया गया है।",
    // Profile
    profileTitle: "दुकान प्रोफ़ाइल सेटिंग्स",
    shopNameLabel: "दुकान का नाम *",
    ownerNameLabel: "मालिक का नाम *",
    phoneNumLabelProfile: "फ़ोन नंबर * (10 अंक)",
    addressLabel: "दुकान का पता *",
    gstinLabel: "जीएसटी आईएन (GSTIN) *",
    saveProfile: "प्रोफ़ाइल परिवर्तन सहेजें",
    addressGstinRequired: "पता और जीएसटी (GSTIN) आवश्यक क्षेत्र हैं।",
    profileSuccess: "प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई!"
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); 
  const [token, setToken] = useState(null);
  const [activeTab, setActiveTab] = useState('reports');
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('dark');
  
  const [profile, setProfile] = useState({
    shopName: 'SmartDukaan',
    ownerName: 'Admin',
    phone: '9876543210',
    address: '14/2 Park Street',
    gstin: '19AABCT1332L1ZS'
  });

  const [inventory, setInventory] = useState([
    { id: 'ID-1001', name: 'Aashirvaad Atta 5kg', price: 240, stock: 3 },
    { id: 'ID-1002', name: 'Fortune Sun Oil 1L', price: 135, stock: 25 },
    { id: 'ID-1003', name: 'Tata Salt 1kg', price: 28, stock: 4 }
  ]);

  const [transactions, setTransactions] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [report, setReport] = useState({ totalRevenue: 0.00 });
  const [khataList, setKhataList] = useState([]);

  const currentTheme = themes[theme];
  const t = translations[lang];

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentView('landing');
  };

  const totalExpensesSum = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const netBalanceVal = report.totalRevenue - totalExpensesSum;

  if (currentView === 'landing' && !token) {
    return (
      <Landing 
        onNavigateLogin={() => setCurrentView('login')} 
        onNavigateSignup={() => setCurrentView('signup')} 
      />
    );
  }

  if (currentView === 'login') {
    return <LoginView onLoginSuccess={(tok, userData) => {
      localStorage.setItem('token', tok);
      setToken(tok);
      if (userData) setProfile(prev => ({ ...prev, ...userData }));
      setCurrentView('dashboard');
    }} onSwitchToSignup={() => setCurrentView('signup')} onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'signup') {
    return <SignupView onSignupSuccess={() => setCurrentView('login')} onSwitchToLogin={() => setCurrentView('login')} onBack={() => setCurrentView('landing')} />;
  }

  return (
    <div style={{ ...styles.appContainer, background: currentTheme.bg, color: currentTheme.text }}>
      <header style={{ ...styles.header, background: currentTheme.headerBg, borderColor: currentTheme.border }}>
        <div style={styles.headerLeft}>
          <button onClick={() => setLang(prev => prev === 'en' ? 'hi' : 'en')} style={styles.hindiBtn}>
            {lang === 'en' ? '🇮🇳 हिंदी (Hindi)' : '🇬🇧 English'}
          </button>
          <div>
            <h1 style={styles.dashboardTitle}>{profile.shopName} ({t.title})</h1>
            <p style={styles.dashboardSub}>{t.ownerSub}: {profile.ownerName} | Ph: {profile.phone}</p>
          </div>
        </div>

        <div style={styles.navMenu}>
          <button onClick={() => setActiveTab('reports')} style={styles.navLink(activeTab === 'reports', currentTheme)}>{t.reports}</button>
          <button onClick={() => setActiveTab('billing')} style={styles.navLink(activeTab === 'billing', currentTheme)}>{t.billing}</button>
          <button onClick={() => setActiveTab('inventory')} style={styles.navLink(activeTab === 'inventory', currentTheme)}>{t.inventory}</button>
          <button onClick={() => setActiveTab('expenses')} style={styles.navLink(activeTab === 'expenses', currentTheme)}>{t.expenses}</button>
          <button onClick={() => setActiveTab('khata')} style={styles.navLink(activeTab === 'khata', currentTheme)}>{t.khata}</button>
          <button onClick={() => setActiveTab('ocr')} style={styles.navLink(activeTab === 'ocr', currentTheme)}>{t.ocrTab}</button>
          <button onClick={() => setActiveTab('profile')} style={styles.navLink(activeTab === 'profile', currentTheme)}>{t.profile}</button>
          
          <button onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')} style={styles.themeToggleBtn}>
            {theme === 'dark' ? t.light : t.dark}
          </button>
          
          <button onClick={handleLogout} style={styles.logoutBtn}>
            {t.logout}
          </button>
        </div>
      </header>

      <main style={styles.mainContent}>
        {activeTab === 'reports' && <ReportsView t={t} theme={currentTheme} inventory={inventory} transactions={transactions} report={report} totalExpenses={totalExpensesSum} netBalance={netBalanceVal} />}
        {activeTab === 'inventory' && <InventoryView t={t} theme={currentTheme} inventory={inventory} setInventory={setInventory} />}
        {activeTab === 'billing' && (
          <BillingView 
            t={t} 
            theme={currentTheme} 
            inventory={inventory} 
            setInventory={setInventory}
            setTransactions={setTransactions}
            setReport={setReport}
            setKhataList={setKhataList}
          />
        )}
        {activeTab === 'expenses' && <ExpensesView t={t} theme={currentTheme} expenses={expenses} setExpenses={setExpenses} />}
        {activeTab === 'khata' && <KhataView t={t} theme={currentTheme} khataList={khataList} setKhataList={setKhataList} />}
        {activeTab === 'ocr' && <OcrView t={t} theme={currentTheme} />}
        {activeTab === 'profile' && <ProfileView t={t} theme={currentTheme} profile={profile} setProfile={setProfile} />}
      </main>
    </div>
  );
}

/* ================= STANDALONE OCR VIEW ================= */

function OcrView({ t, theme }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a preview if it's an image
    if (file.type.startsWith('image/')) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null); // Clear if PDF
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError(null);
    setSuccessData(null);

    try {
      const response = await fetch('http://localhost:8001/api/ocr-bill', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`OCR processing failed with status ${response.status}`);
      }

      const result = await response.json();
      setLoading(false);
      setSuccessData(result);
    } catch (err) {
      console.error(err);
      setError('Failed to connect to local OCR microservice on port 8001.');
      setLoading(false);
    }
  };

  return (
    <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border, maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={styles.cardTitle}>{t.ocrTab}</h2>
      
      <div style={{ background: theme.inputBg, border: `1px solid ${theme.border}`, padding: '24px', borderRadius: '10px', color: theme.text, textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
          <FileText size={48} color="#6366f1" />
        </div>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{t.ocrTitle}</h4>
        <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px auto' }}>
          {t.ocrDesc}
        </p>

        <label style={{ background: '#6366f1', color: '#fff', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 'bold' }}>
          <Upload size={18} />
          {loading ? t.ocrProcessing : t.ocrUploadBtn}
          <input type="file" accept=".pdf,.png,.jpg,.jpeg,.tiff,.bmp" onChange={handleFileUpload} style={{ display: 'none' }} disabled={loading} />
        </label>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
          {error}
        </div>
      )}

      {(successData || imagePreview) && (
        <div style={{ marginTop: '30px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          
          {/* Display original image if available */}
          {imagePreview && (
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h4 style={{ marginBottom: '10px' }}>Document Preview</h4>
              <img src={imagePreview} alt="Uploaded Document" style={{ width: '100%', borderRadius: '8px', border: `1px solid ${theme.border}` }} />
            </div>
          )}

          {/* Display extracted JSON Data */}
          {successData && (
            <div style={{ flex: 1, minWidth: '300px', background: theme.inputBg, padding: '20px', borderRadius: '8px', border: `1px solid ${theme.border}` }}>
              <div style={{ fontSize: '16px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', marginBottom: '15px' }}>
                <CheckCircle2 size={20} />
                {t.ocrSuccess}
              </div>
              <h4 style={{ marginBottom: '10px' }}>Extracted Data (JSON):</h4>
              <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '6px', fontSize: '13px', overflowX: 'auto', color: theme.text }}>
                {JSON.stringify(successData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ================= AUTH VIEWS ================= */

function LoginView({ onLoginSuccess, onSwitchToSignup, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        onLoginSuccess(data.token, data.user);
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch (err) {
      setError('Cannot connect to backend server. Make sure server.js is running.');
    }
  };

  return (
    <div style={authStyles.loginBodyRed}>
      <div style={authStyles.cardRed}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ ...authStyles.titleRed, margin: 0 }}>SmartDukaan Login</h1>
          <button onClick={onBack} style={{ background: 'transparent', border: '1px solid #f87171', color: '#f87171', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>← Back to Home</button>
        </div>
        {error && <p style={{ color: '#f87171', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your username" style={authStyles.inputFieldRed} required />
          </div>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" style={authStyles.inputFieldRed} required />
          </div>
          <button type="submit" style={authStyles.submitBtnRed}>Login</button>
        </form>
        <div style={authStyles.signupText}>
          Don't have an account? <span onClick={onSwitchToSignup} style={authStyles.linkRed}>Sign Up</span>
        </div>
      </div>
    </div>
  );
}

function SignupView({ onSignupSuccess, onSwitchToLogin, onBack }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    shopName: '',
    ownerName: '',
    phone: '',
    address: '',
    gstin: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => onSignupSuccess(), 1500);
      } else {
        setError(data.error || 'Registration failed.');
      }
    } catch (err) {
      setError('Cannot connect to backend server.');
    }
  };

  return (
    <div style={authStyles.loginBodyBlue}>
      <div style={authStyles.cardBlue}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ ...authStyles.titleBlue, margin: 0 }}>SmartDukaan Signup</h1>
          <button onClick={onBack} style={{ background: 'transparent', border: '1px solid #60a5fa', color: '#60a5fa', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>← Back to Home</button>
        </div>
        {error && <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
        {success && <p style={{ color: '#10b981', marginBottom: '1rem', fontSize: '0.9rem' }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Username *</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Choose a username" style={authStyles.inputFieldBlue} required />
          </div>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="eg: something@gmail.com" style={authStyles.inputFieldBlue} required />
          </div>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Password *</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" style={authStyles.inputFieldBlue} required />
          </div>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Shop Name *</label>
            <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} placeholder="e.g. Sharma General Store" style={authStyles.inputFieldBlue} required />
          </div>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Owner Name *</label>
            <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="e.g. Rajesh Sharma" style={authStyles.inputFieldBlue} required />
          </div>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Phone Number (10 Digits) *</label>
            <input type="tel" maxLength="10" name="phone" value={formData.phone} onChange={handleChange} placeholder="9876543210" style={authStyles.inputFieldBlue} required />
          </div>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Shop Address * (Compulsory)</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="14/2 Park Street" style={authStyles.inputFieldBlue} required />
          </div>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>GSTIN * (Compulsory)</label>
            <input type="text" name="gstin" value={formData.gstin} onChange={handleChange} placeholder="19AABCT1332L1ZS" style={authStyles.inputFieldBlue} required />
          </div>
          <button type="submit" style={authStyles.submitBtnBlue}>Complete Sign Up</button>
        </form>
        <div style={authStyles.signupText}>
          Already have an account? <span onClick={onSwitchToLogin} style={authStyles.linkBlue}>Login</span>
        </div>
      </div>
    </div>
  );
}

/* ================= DASHBOARD MODULE VIEWS ================= */

function InventoryView({ t, theme, inventory, setInventory }) {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleAddItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: 'ID-' + Math.floor(1000 + Math.random() * 9000),
      name: productName,
      price: parseFloat(price),
      stock: parseInt(stock, 10)
    };
    setInventory(prev => [...prev, newItem]);
    setMsg({ text: t.itemAddedSuccess, type: 'success' });
    setProductName(''); setPrice(''); setStock('');
  };

  const handleStockUpdate = (id, updatedStockVal) => {
    const parsedStock = parseInt(updatedStockVal, 10);
    if (isNaN(parsedStock) || parsedStock < 0) return;
    setInventory(prev => prev.map(item => item.id === id ? { ...item, stock: parsedStock } : item));
  };

  return (
    <div style={styles.gridContainer}>
      <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border }}>
        <h2 style={styles.cardTitle}>{t.addProduct}</h2>
        <form onSubmit={handleAddItem} style={styles.form}>
          <div>
            <label style={styles.label}>{t.productName}</label>
            <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder={t.productNamePlaceholder} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
          </div>
          <div>
            <label style={styles.label}>{t.sellingPrice}</label>
            <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder={t.pricePlaceholder} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
          </div>
          <div>
            <label style={styles.label}>{t.initialStock}</label>
            <input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder={t.stockPlaceholder} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
          </div>
          <button type="submit" style={styles.submitBtn}>{t.saveItem}</button>
          {msg.text && <p style={{ color: msg.type === 'success' ? '#10b981' : '#ef4444', margin: 0, fontSize: '13px' }}>{msg.text}</p>}
        </form>
      </div>

      <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border }}>
        <h2 style={styles.cardTitle}>{t.stockManagement}</h2>
        <div style={styles.tableHeader}>
          <span style={{ flex: 2 }}>{t.tableProdName}</span>
          <span style={{ flex: 1 }}>{t.tablePrice}</span>
          <span style={{ flex: 1.5 }}>{t.tableStockInput}</span>
        </div>
        {inventory.length === 0 ? <p style={styles.subText}>{t.noStock}</p> : (
          inventory.map(item => {
            const isLowStock = item.stock < 5;
            return (
              <div key={item.id} style={{ ...styles.tableRow, borderColor: theme.border, alignItems: 'center' }}>
                <div style={{ flex: 2 }}>
                  <span style={{ fontWeight: '500', display: 'block' }}>{item.name}</span>
                  {isLowStock && <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 'bold' }}>{t.lowStockWarning}</span>}
                </div>
                <span style={{ flex: 1 }}>₹{Number(item.price).toFixed(2)}</span>
                <div style={{ flex: 1.5, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input type="number" min="0" defaultValue={item.stock} id={`stock-input-${item.id}`} style={{ width: '60px', padding: '6px', textAlign: 'center', background: theme.inputBg, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: '4px' }} />
                  <button type="button" onClick={() => { const val = document.getElementById(`stock-input-${item.id}`).value; handleStockUpdate(item.id, val); }} style={{ ...styles.submitBtn, padding: '6px 10px', fontSize: '12px' }}>{t.updateBtn}</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function BillingView({ t, theme, inventory, setInventory, setTransactions, setReport, setKhataList }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [gstRate, setGstRate] = useState(5);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const filteredInventory = inventory.filter(item => 
    searchTerm.trim() && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product, addQty = 1) => {
    const qtyToAdd = parseInt(addQty, 10);
    if (isNaN(qtyToAdd) || qtyToAdd <= 0) return;

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity + qtyToAdd > product.stock) {
          alert('Cannot add more than available stock!');
          return prev;
        }
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qtyToAdd } : item);
      } else {
        if (qtyToAdd > product.stock) {
          alert('Requested quantity exceeds available stock!');
          return prev;
        }
        return [...prev, { id: product.id, name: product.name, price: product.price, quantity: qtyToAdd, maxStock: product.stock }];
      }
    });
    setSearchTerm('');
  };

  const updateCartItemQuantity = (id, newQty) => {
    const qty = parseInt(newQty, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        if (qty > item.maxStock) {
          alert(`Cannot exceed available stock limit (${item.maxStock})!`);
          return item;
        }
        return { ...item, quantity: qty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gstAmount = (subtotal * gstRate) / 100;
  const grandTotal = subtotal + gstAmount;

  const handleBill = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      setMsg({ text: t.phoneError, type: 'error' });
      return;
    }
    if (cart.length === 0) {
      setMsg({ text: t.cartError, type: 'error' });
      return;
    }

    setInventory(prevInv => {
      return prevInv.map(prod => {
        const cartItemMatch = cart.find(c => c.id === prod.id);
        if (cartItemMatch) {
          return { ...prod, stock: Math.max(0, prod.stock - cartItemMatch.quantity) };
        }
        return prod;
      });
    });

    const newTx = {
      id: 'TX-' + Math.floor(1000 + Math.random() * 9000),
      store: customerName ? `${customerName}'s Order` : 'Walk-in Customer',
      phoneNumber: phoneNumber,
      date: new Date(),
      type: paymentMethod,
      displayAmount: `+₹${grandTotal.toFixed(2)}`,
      numericAmount: grandTotal
    };

    setTransactions(prev => [newTx, ...prev]);

    if (paymentMethod === 'CASH' || paymentMethod === 'UPI') {
      setReport(prev => ({ totalRevenue: prev.totalRevenue + grandTotal }));
      setMsg({ text: t.checkoutSuccessCash, type: 'success' });
    } else {
      setKhataList(prev => [...prev, {
        _id: 'KH-' + Math.floor(1000 + Math.random() * 9000),
        customerName: customerName || 'Valued Customer',
        phoneNumber: phoneNumber,
        amount: grandTotal
      }]);
      setMsg({ text: t.checkoutSuccessKhata, type: 'success' });
    }

    setPhoneNumber(''); 
    setCustomerName(''); 
    setCart([]);
  };

  return (
    <div style={styles.gridContainer}>
      <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border, position: 'relative' }}>
        <h2 style={styles.cardTitle}>{t.billing}</h2>

        <div style={{ marginBottom: '20px', position: 'relative' }}>
          <label style={styles.label}>{t.searchLabel}</label>
          <input 
            type="text" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            placeholder={t.searchPlaceholder} 
            style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} 
          />
          {searchTerm.trim() && (
            <div style={{ position: 'absolute', top: '75px', left: 0, right: 0, background: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '6px', zIndex: 10, maxHeight: '220px', overflowY: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              {filteredInventory.length === 0 ? (
                <div style={{ padding: '10px', fontSize: '13px', opacity: 0.7 }}>{t.noMatch}</div>
              ) : (
                filteredInventory.map(item => (
                  <div key={item.id} style={{ padding: '10px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{item.name}</strong>
                      <div style={{ fontSize: '12px', opacity: 0.8 }}>₹{item.price} | Stock: {item.stock}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <input type="number" min="1" max={item.stock} defaultValue="1" id={`qty-input-${item.id}`} style={{ width: '45px', padding: '4px', textAlign: 'center', background: theme.inputBg, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: '4px' }} />
                      <button type="button" onClick={() => { const inputVal = document.getElementById(`qty-input-${item.id}`).value; addToCart(item, inputVal); }} style={{ ...styles.submitBtn, padding: '5px 10px', fontSize: '12px' }}>{t.addBtn}</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>{t.activeCart}</h4>
          {cart.length === 0 ? <p style={styles.subText}>{t.noCart}</p> : (
            cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${theme.border}` }}>
                <span style={{ flex: 1.5 }}>{item.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1.5, justifyContent: 'flex-end' }}>
                  <input type="number" min="1" value={item.quantity} onChange={(e) => updateCartItemQuantity(item.id, e.target.value)} style={{ width: '45px', padding: '4px', textAlign: 'center', background: theme.inputBg, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: '4px' }} />
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  <button type="button" onClick={() => removeFromCart(item.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '2px 6px' }}>X</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border }}>
        <h2 style={styles.cardTitle}>{t.billSummary}</h2>
        <div style={{ background: theme.inputBg, padding: '12px', borderRadius: '8px', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{t.subtotal}</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{t.gstRate}</span>
            <select value={gstRate} onChange={e => setGstRate(Number(e.target.value))} style={{ padding: '4px', background: theme.cardBg, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: '4px' }}>
              <option value={0}>{t.gst0}</option>
              <option value={5}>{t.gst5}</option>
              <option value={12}>{t.gst12}</option>
              <option value={18}>{t.gst18}</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', opacity: 0.8 }}>
            <span>{t.totalTax}</span>
            <span>+₹{gstAmount.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', borderTop: `1px solid ${theme.border}`, paddingTop: '6px', marginTop: '4px' }}>
            <span>{t.grandTotal}</span>
            <span style={{ color: '#10b981' }}>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {paymentMethod === 'UPI' && (
          <div style={{ background: theme.inputBg, border: '2px dashed #6366f1', padding: '15px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#6366f1' }}>{t.digitalPaymentBox}</h4>
            <p style={{ fontSize: '12px', margin: '0 0 10px 0', opacity: 0.8 }}>{t.scanInstruction}</p>
            <div style={{ background: '#fff', padding: '10px', display: 'inline-block', borderRadius: '6px' }}>
              <img src="/qr.jpeg" alt="Shop UPI QR Code" style={{ display: 'block', width: '130px', height: '130px', objectFit: 'contain' }} />
            </div>
            <div style={{ fontSize: '11px', marginTop: '8px', opacity: 0.7 }}>Amount to collect: ₹{grandTotal.toFixed(2)}</div>
          </div>
        )}

        <form onSubmit={handleBill} style={styles.form}>
          <div>
            <label style={styles.label}>{t.customerName}</label>
            <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder={t.customerNamePlaceholder} style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
          </div>
          <div>
            <label style={styles.label}>{t.customerPhone}</label>
            <input type="tel" maxLength="10" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder={t.phonePlaceholder} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
          </div>
          <div>
            <label style={styles.label}>{t.checkoutMode}</label>
            <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }}>
              <option value="CASH">{t.cashMode}</option>
              <option value="UPI">{t.upiMode}</option>
              <option value="KHATA">{t.khataMode}</option>
            </select>
          </div>
          <button type="submit" style={styles.submitBtn}>{t.completeCheckout}</button>
          {msg.text && <p style={{ color: msg.type === 'success' ? '#10b981' : '#ef4444', margin: '5px 0 0' }}>{msg.text}</p>}
        </form>
      </div>
    </div>
  );
}

function ExpensesView({ t, theme, expenses, setExpenses }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Utilities');
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newExpense = {
      id: 'EXP-' + Math.floor(1000 + Math.random() * 9000),
      description,
      amount: parseFloat(amount),
      category,
      date: new Date()
    };
    setExpenses(prev => [newExpense, ...prev]);
    setMsg({ text: t.expenseSuccess, type: 'success' });
    setDescription(''); setAmount('');
  };

  const totalExpenseSum = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div style={styles.gridContainer}>
      <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border }}>
        <h2 style={styles.cardTitle}>{t.expenseTitle}</h2>
        <form onSubmit={handleAddExpense} style={styles.form}>
          <div>
            <label style={styles.label}>{t.descLabel}</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder={t.descPlaceholder} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
          </div>
          <div>
            <label style={styles.label}>{t.amountLabel}</label>
            <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder={t.amountPlaceholder} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
          </div>
          <div>
            <label style={styles.label}>{t.categoryLabel}</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }}>
              <option value="Utilities">{t.catUtilities}</option>
              <option value="Supplies">{t.catSupply}</option>
              <option value="Miscellaneous">{t.catMisc}</option>
            </select>
          </div>
          <button type="submit" style={styles.submitBtn}>{t.addExpenseBtn}</button>
          {msg.text && <p style={{ color: msg.type === 'success' ? '#10b981' : '#ef4444', margin: 0, fontSize: '13px' }}>{msg.text}</p>}
        </form>
      </div>

      <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={styles.cardTitle}>{t.recentExpenses}</h2>
          <span style={{ background: '#ef4444', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold' }}>
            {t.totalExpenses}: ₹{totalExpenseSum.toFixed(2)}
          </span>
        </div>
        {expenses.length === 0 ? <p style={styles.subText}>{t.noExpenses}</p> : (
          expenses.map(exp => (
            <div key={exp.id} style={{ ...styles.tableRow, borderColor: theme.border, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{exp.description}</strong>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>{exp.category} • {new Date(exp.date).toLocaleDateString()}</div>
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#ef4444' }}>-₹{exp.amount.toFixed(2)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function KhataView({ t, theme, khataList, setKhataList }) {
  const markAsPaid = (id) => setKhataList(prev => prev.filter(k => k._id !== id));

  return (
    <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border }}>
      <h2 style={styles.cardTitle}>{t.khataTitle}</h2>
      {khataList.length === 0 ? <p style={styles.subText}>{t.noKhata}</p> : (
        khataList.map(k => (
          <div key={k._id} style={{ ...styles.tableRow, borderColor: theme.border, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>{k.customerName}</strong> ({k.phoneNumber})
              <div style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '13px' }}>Due: ₹{k.amount.toFixed(2)}</div>
            </div>
            <button type="button" onClick={() => markAsPaid(k._id)} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>{t.markPaid}</button>
          </div>
        ))
      )}
    </div>
  );
}

function ReportsView({ t, theme, inventory, transactions, report, totalExpenses, netBalance }) {
  const totalInventoryCost = inventory.reduce((sum, item) => sum + (Number(item.price) * Number(item.stock)), 0);

  const getBadgeStyle = (type) => {
    let bg = '#3b82f6';
    if (type === 'UPI') bg = '#8b5cf6';
    if (type === 'KHATA') bg = '#f59e0b';
    return {
      display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '11px',
      fontWeight: 'bold', color: '#fff', backgroundColor: bg, marginLeft: '8px', textTransform: 'uppercase'
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border }}>
        <h2 style={styles.cardTitle}>{t.ledgerMetrics}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
          <div style={{ background: theme.inputBg, padding: '15px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
            <p style={styles.subText}>{t.totalRevenue}</p>
            <h3 style={{ color: '#10b981', margin: '5px 0 0' }}>+₹{report.totalRevenue.toFixed(2)}</h3>
          </div>
          <div style={{ background: theme.inputBg, padding: '15px', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
            <p style={styles.subText}>{t.totalExpenses}</p>
            <h3 style={{ color: '#ef4444', margin: '5px 0 0' }}>-₹{totalExpenses.toFixed(2)}</h3>
          </div>
          <div style={{ background: theme.inputBg, padding: '15px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
            <p style={styles.subText}>{t.netBalance}</p>
            <h3 style={{ color: '#3b82f6', margin: '5px 0 0' }}>₹{netBalance.toFixed(2)}</h3>
          </div>
          <div style={{ background: theme.inputBg, padding: '15px', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
            <p style={styles.subText}>{t.totalInventoryCost}</p>
            <h3 style={{ color: '#f59e0b', margin: '5px 0 0' }}>₹{totalInventoryCost.toFixed(2)}</h3>
          </div>
        </div>
      </div>

      <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border }}>
        <h2 style={styles.cardTitle}>{t.recentLedger}</h2>
        {transactions.length === 0 ? <p style={styles.subText}>{t.noTransactions}</p> : (
          transactions.map(tx => (
            <div key={tx.id} style={{ ...styles.tableRow, borderColor: theme.border, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <strong>{tx.store}</strong>
                  <span style={getBadgeStyle(tx.type)}>{tx.type}</span>
                </div>
                <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '2px' }}>Phone: {tx.phoneNumber} • {new Date(tx.date).toLocaleDateString()}</div>
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '16px', color: tx.type === 'KHATA' ? '#f59e0b' : '#10b981' }}>
                {tx.displayAmount}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ProfileView({ t, theme, profile, setProfile }) {
  const [formData, setFormData] = useState(profile);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const saveProfile = (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      setMsg({ text: 'Phone number must be exactly 10 digits.', type: 'error' });
      return;
    }
    if (!formData.address.trim() || !formData.gstin.trim()) {
      setMsg({ text: t.addressGstinRequired, type: 'error' });
      return;
    }
    setProfile(formData);
    setMsg({ text: t.profileSuccess, type: 'success' });
  };

  return (
    <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border, maxWidth: '600px', margin: 'auto' }}>
      <h2 style={styles.cardTitle}>{t.profileTitle}</h2>
      <form onSubmit={saveProfile} style={styles.form}>
        <div><label style={styles.label}>{t.shopNameLabel}</label><input type="text" name="shopName" value={formData.shopName} onChange={handleChange} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} /></div>
        <div><label style={styles.label}>{t.ownerNameLabel}</label><input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} /></div>
        <div><label style={styles.label}>{t.phoneNumLabelProfile}</label><input type="tel" maxLength="10" name="phone" value={formData.phone} onChange={handleChange} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} /></div>
        <div><label style={styles.label}>{t.addressLabel}</label><input type="text" name="address" value={formData.address} onChange={handleChange} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} /></div>
        <div><label style={styles.label}>{t.gstinLabel}</label><input type="text" name="gstin" value={formData.gstin} onChange={handleChange} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} /></div>
        <button type="submit" style={styles.submitBtn}>{t.saveProfile}</button>
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

const authStyles = {
  loginBodyRed: {
    backgroundColor: '#120404',
    backgroundImage: 'radial-gradient(circle at center, rgba(153, 27, 27, 0.2) 0%, rgba(18, 4, 4, 0.95) 70%)',
    backgroundAttachment: 'fixed', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#d1d5db', fontFamily: 'system-ui, sans-serif'
  },
  cardRed: {
    backgroundColor: '#14110f', border: '1px solid rgba(220, 38, 38, 0.2)', borderRadius: '1.5rem', width: '100%', maxWidth: '440px', padding: '2.5rem', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
  },
  titleRed: { fontSize: '2rem', fontWeight: '700', color: '#f87171' },
  inputFieldRed: { width: '100%', backgroundColor: '#1a1614', border: '1px solid #292524', borderRadius: '0.5rem', padding: '0.75rem 1rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', marginTop: '5px' },
  submitBtnRed: { width: '100%', background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)', border: 'none', borderRadius: '0.5rem', padding: '0.8rem', color: '#ffffff', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '1rem' },
  linkRed: { color: '#f87171', cursor: 'pointer', fontWeight: '500' },

  loginBodyBlue: {
    backgroundColor: '#040912',
    backgroundImage: 'radial-gradient(circle at center, rgba(30, 58, 138, 0.25) 0%, rgba(4, 9, 18, 0.95) 70%)',
    backgroundAttachment: 'fixed', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#d1d5db', fontFamily: 'system-ui, sans-serif', padding: '20px 0'
  },
  cardBlue: {
    backgroundColor: '#0b1120', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '1.5rem', width: '100%', maxWidth: '460px', padding: '2.5rem', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
  },
  titleBlue: { fontSize: '1.8rem', fontWeight: '700', color: '#60a5fa' },
  inputFieldBlue: { width: '100%', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '0.5rem', padding: '0.75rem 1rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', marginTop: '5px' },
  submitBtnBlue: { width: '100%', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', border: 'none', borderRadius: '0.5rem', padding: '0.8rem', color: '#ffffff', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '1.2rem' },
  linkBlue: { color: '#60a5fa', cursor: 'pointer', fontWeight: '500' },

  inputGroup: { marginBottom: '1rem' },
  label: { display: 'block', fontSize: '0.85rem', color: '#d1d5db', marginBottom: '0.2rem' },
  signupText: { textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#9ca3af' }
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
  logoutBtn: { background: '#ef4444', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' },
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
  tableRow: { display: 'flex', padding: '12px 0', borderBottom: '1px solid', justifyContent: 'space-between', fontSize: '14px' }
};