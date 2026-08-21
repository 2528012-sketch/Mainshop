import React, { useState, useEffect } from 'react';

const translations = {
  en: {
    title: "Shopkeeper Dashboard",
    ownerSub: "Owner: Admin | Phone: 9876543210",
    reports: "Financial Reports & Ledger",
    billing: "Billing (POS)",
    inventory: "Inventory (Stock)",
    ocr: "OCR Scanner",
    khata: "Khata / Credit",
    profile: "Shop Profile",
    light: "☀️ Light",
    dark: "🌙 Dark",
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
    // Billing
    searchLabel: "Type to search inventory items",
    searchPlaceholder: "Search product name...",
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
    cashMode: "Cash / UPI (Immediate Revenue)",
    khataMode: "Khata / Credit (Udhar)",
    completeCheckout: "Complete Checkout",
    checkoutSuccessKhata: "Checked out to Khata successfully!",
    checkoutSuccessCash: "Bill processed with GST & stock deducted!",
    phoneError: "Phone number must be exactly 10 digits.",
    cartError: "Please add items to the bill cart.",
    // OCR
    ocrTitle: "Live Optical Character Recognition (OCR) Scanner",
    ocrSub: "Upload a receipt image to automatically extract text and values.",
    scanningText: "Scanning Receipt Text...",
    extractedHeading: "Successfully Extracted Data:",
    storeNameLabel: "Store Name:",
    totalAmountLabel: "Total Amount:",
    phoneNumLabel: "Phone Number:",
    // Khata
    khataTitle: "Khata / Credit Ledger Book",
    noKhata: "No active credit balances.",
    dueBalance: "Due Balance:",
    markPaid: "Mark as Paid",
    // Reports
    ledgerMetrics: "Financial Ledger Metrics",
    totalRevenue: "Total Revenue (Credits)",
    netBalance: "Net Balance",
    recentLedger: "Recent Transaction Ledger",
    refreshLedger: "Refresh Ledger",
    noTransactions: "No transactions recorded yet.",
    // Profile
    profileTitle: "Shop Profile & Settings",
    shopNameLabel: "Shop Name",
    ownerNameLabel: "Owner Name",
    phoneNumLabelProfile: "Phone (10 Digits)",
    addressLabel: "Shop Address * (Compulsory)",
    addressPlaceholder: "14/2 Park Street",
    gstinLabel: "GSTIN * (Compulsory)",
    gstinPlaceholder: "19AABCT1332L1ZS",
    saveProfile: "Save Profile",
    profileSuccess: "Profile saved successfully!",
    addressGstinRequired: "Shop Address and GSTIN are strictly compulsory before saving changes."
  },
  hi: {
    title: "दुकानदार डैशबोर्ड",
    ownerSub: "मालिक: एडमिन | फोन: 9876543210",
    reports: "वित्तीय रिपोर्ट और बहीखाता",
    billing: "बिलिंग (POS)",
    inventory: "इन्वेंट्री (स्टॉक)",
    ocr: "OCR स्कैनर",
    khata: "खाता / उधार",
    profile: "दुकान प्रोफ़ाइल",
    light: "☀️ लाइट",
    dark: "🌙 डार्क",
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
    // Billing
    searchLabel: "इन्वेंट्री आइटम खोजने के लिए टाइप करें",
    searchPlaceholder: "उत्पाद का नाम खोजें...",
    noMatch: "कोई मेल खाता उत्पाद नहीं मिला",
    addBtn: "+ जोड़ें",
    activeCart: "सक्रिय कार्ट आइटम",
    noCart: "अभी तक कोई आइटम नहीं जोड़ा गया है।",
    billSummary: "बिल सारांश और जीएसटी",
    subtotal: "उप-योग (Subtotal):",
    gstRate: "जीएसटी दर:",
    gst0: "0% जीएसटी",
    gst5: "5% जीएसटी (CGST 2.5% + SGST 2.5%)",
    gst12: "12% जीएसटी (CGST 6% + SGST 6%)",
    gst18: "18% जीएसटी (CGST 9% + SGST 9%)",
    totalTax: "कुल कर (जीएसटी राशि):",
    grandTotal: "कुल योग (Grand Total):",
    customerName: "ग्राहक का नाम",
    customerNamePlaceholder: "राहुल कुमार",
    customerPhone: "ग्राहक का फोन नंबर * (10 अंक)",
    phonePlaceholder: "9876543210",
    checkoutMode: "चेकआउट मोड",
    cashMode: "नकद / यूपीआई (तत्काल आय)",
    khataMode: "खाता / उधार",
    completeCheckout: "चेकआउट पूरा करें",
    checkoutSuccessKhata: "खाता में सफलतापूर्वक चेकआउट हो गया!",
    checkoutSuccessCash: "जीएसटी और स्टॉक कटौती के साथ बिल प्रोसेस हो गया!",
    phoneError: "फोन नंबर ठीक 10 अंकों का होना चाहिए।",
    cartError: "कृपया बिल कार्ट में आइटम जोड़ें।",
    // OCR
    ocrTitle: "लाइव ऑप्टिकल कैरेक्टर रिकग्निशन (OCR) स्कैनर",
    ocrSub: "टेक्स्ट और वैल्यू स्वचालित रूप से निकालने के लिए रसीद की छवि अपलोड करें।",
    scanningText: "रसीद का पाठ स्कैन किया जा रहा है...",
    extractedHeading: "सफलतापूर्वक निकाला गया डेटा:",
    storeNameLabel: "स्टोर का नाम:",
    totalAmountLabel: "कुल राशि:",
    phoneNumLabel: "फोन नंबर:",
    // Khata
    khataTitle: "खाता / क्रेडिट बहीखाता",
    noKhata: "कोई सक्रिय क्रेडिट बकाया नहीं है।",
    dueBalance: "बकाया राशि:",
    markPaid: "भुगतान के रूप में चिह्नित करें",
    // Reports
    ledgerMetrics: "वित्तीय बहीखाता मेट्रिक्स",
    totalRevenue: "कुल राजस्व (क्रेडिट)",
    netBalance: "शुद्ध शेष (Net Balance)",
    recentLedger: "हालिया लेनदेन बहीखाता",
    refreshLedger: "बहीखाता रीफ्रेश करें",
    noTransactions: "अभी तक कोई लेनदेन दर्ज नहीं किया गया है।",
    // Profile
    profileTitle: "दुकान प्रोफ़ाइल और सेटिंग्स",
    shopNameLabel: "दुकान का नाम",
    ownerNameLabel: "मालिक का नाम",
    phoneNumLabelProfile: "फोन (10 अंक)",
    addressLabel: "दुकान का पता * (अनिवार्य)",
    addressPlaceholder: "14/2 पार्क स्ट्रीट",
    gstinLabel: "जीएसटीआईएन (GSTIN) * (अनिवार्य)",
    gstinPlaceholder: "19AABCT1332L1ZS",
    saveProfile: "प्रोफ़ाइल सहेजें",
    profileSuccess: "प्रोफ़ाइल सफलतापूर्वक सहेजी गई!",
    addressGstinRequired: "परिवर्तन सहेजने से पहले दुकान का पता और जीएसटीटीआईएन अनिवार्य हैं।"
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('dark');

  const currentTheme = themes[theme];
  const t = translations[lang];

  return (
    <div style={{ ...styles.appContainer, background: currentTheme.bg, color: currentTheme.text }}>
      <header style={{ ...styles.header, background: currentTheme.headerBg, borderColor: currentTheme.border }}>
        <div style={styles.headerLeft}>
          <button onClick={() => setLang(prev => prev === 'en' ? 'hi' : 'en')} style={styles.hindiBtn}>
            {lang === 'en' ? '🇮🇳 हिंदी (Hindi)' : '🇬🇧 English'}
          </button>
          <div>
            <h1 style={styles.dashboardTitle}>{t.title}</h1>
            <p style={styles.dashboardSub}>{t.ownerSub}</p>
          </div>
        </div>

        <div style={styles.navMenu}>
          <button onClick={() => setActiveTab('reports')} style={styles.navLink(activeTab === 'reports', currentTheme)}>{t.reports}</button>
          <button onClick={() => setActiveTab('billing')} style={styles.navLink(activeTab === 'billing', currentTheme)}>{t.billing}</button>
          <button onClick={() => setActiveTab('inventory')} style={styles.navLink(activeTab === 'inventory', currentTheme)}>{t.inventory}</button>
          <button onClick={() => setActiveTab('ocr')} style={styles.navLink(activeTab === 'ocr', currentTheme)}>{t.ocr}</button>
          <button onClick={() => setActiveTab('khata')} style={styles.navLink(activeTab === 'khata', currentTheme)}>{t.khata}</button>
          <button onClick={() => setActiveTab('profile')} style={styles.navLink(activeTab === 'profile', currentTheme)}>{t.profile}</button>
          
          <button onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')} style={styles.themeToggleBtn}>
            {theme === 'dark' ? t.light : t.dark}
          </button>
        </div>
      </header>

      <main style={styles.mainContent}>
        {activeTab === 'reports' && <ReportsView lang={lang} t={t} theme={currentTheme} />}
        {activeTab === 'inventory' && <InventoryView lang={lang} t={t} theme={currentTheme} />}
        {activeTab === 'billing' && <BillingView lang={lang} t={t} theme={currentTheme} />}
        {activeTab === 'ocr' && <OCRView t={t} theme={currentTheme} />}
        {activeTab === 'khata' && <KhataView t={t} theme={currentTheme} />}
        {activeTab === 'profile' && <ProfileView t={t} theme={currentTheme} />}
      </main>
    </div>
  );
}

/* ================= COMPONENT VIEWS ================= */

function InventoryView({ lang, t, theme }) {
  const [inventory, setInventory] = useState([]);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });

  const fetchInventory = () => {
    // Inventory cleared out by default or fetched empty
    setInventory([]);
  };

  useEffect(() => { fetchInventory(); }, [lang]);

  const handleAddItem = async (e) => {
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
          inventory.map(item => (
            <div key={item.id} style={{ ...styles.tableRow, borderColor: theme.border, alignItems: 'center' }}>
              <span style={{ flex: 2, fontWeight: '500' }}>{item.name}</span>
              <span style={{ flex: 1 }}>₹{Number(item.price).toFixed(2)}</span>
              <div style={{ flex: 1.5, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input 
                  type="number" 
                  min="0"
                  defaultValue={item.stock} 
                  key={`${item.id}-${item.stock}`} 
                  id={`stock-input-${item.id}`}
                  style={{ width: '60px', padding: '6px', textAlign: 'center', background: theme.inputBg, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: '4px' }} 
                />
                <button 
                  type="button" 
                  onClick={() => {
                    const val = document.getElementById(`stock-input-${item.id}`).value;
                    handleStockUpdate(item.id, val);
                  }} 
                  style={{ ...styles.submitBtn, padding: '6px 10px', fontSize: '12px' }}
                >
                  {t.updateBtn}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function BillingView({ lang, t, theme }) {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [gstRate, setGstRate] = useState(5);
  const [msg, setMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    setInventory([]);
  }, [lang]);

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

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

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

    setMsg({ text: paymentMethod === 'KHATA' ? t.checkoutSuccessKhata : t.checkoutSuccessCash, type: 'success' });
    setPhoneNumber(''); setCustomerName(''); setCart([]);
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
                  <div 
                    key={item.id} 
                    style={{ padding: '10px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <div>
                      <strong>{item.name}</strong>
                      <div style={{ fontSize: '12px', opacity: 0.8 }}>₹{item.price} | Stock: {item.stock}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <input 
                        type="number" 
                        min="1" 
                        max={item.stock} 
                        defaultValue="1" 
                        id={`qty-input-${item.id}`} 
                        style={{ width: '45px', padding: '4px', textAlign: 'center', background: theme.inputBg, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: '4px' }} 
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          const inputVal = document.getElementById(`qty-input-${item.id}`).value;
                          addToCart(item, inputVal);
                        }} 
                        style={{ ...styles.submitBtn, padding: '5px 10px', fontSize: '12px' }}
                      >
                        {t.addBtn}
                      </button>
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
                  <input 
                    type="number" 
                    min="1" 
                    value={item.quantity} 
                    onChange={(e) => updateCartItemQuantity(item.id, e.target.value)} 
                    style={{ width: '45px', padding: '4px', textAlign: 'center', background: theme.inputBg, color: theme.text, border: `1px solid ${theme.border}`, borderRadius: '4px' }}
                  />
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

        <form onSubmit={handleBill} style={styles.form}>
          <div>
            <label style={styles.label}>{t.customerName}</label>
            <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder={t.customerNamePlaceholder} style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
          </div>
          <div>
            <label style={styles.label}>{t.customerPhone}</label>
            <input 
              type="tel" 
              maxLength="10" 
              value={phoneNumber} 
              onChange={e => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} 
              placeholder={t.phonePlaceholder} 
              required 
              style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} 
            />
          </div>
          <div>
            <label style={styles.label}>{t.checkoutMode}</label>
            <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }}>
              <option value="CASH">{t.cashMode}</option>
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

function OCRView({ t, theme }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedData, setExtractedData] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      runOCR(file);
    }
  };

  const runOCR = (file) => {
    setScanning(true);
    setProgress(50);
    setTimeout(() => {
      setScanning(false);
      setProgress(100);
      setExtractedData({
        extractedStore: 'Retail Store',
        extractedAmount: 150.00,
        extractedPhone: '9876543210'
      });
    }, 1000);
  };

  return (
    <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border, maxWidth: '650px', margin: 'auto' }}>
      <h2 style={styles.cardTitle}>{t.ocrTitle}</h2>
      <p style={styles.subText}>{t.ocrSub}</p>
      
      <div style={{ marginBottom: '20px' }}>
        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
      </div>

      {imagePreview && (
        <div style={{ marginBottom: '15px', textAlign: 'center' }}>
          <img src={imagePreview} alt="Receipt Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '6px', border: `1px solid ${theme.border}` }} />
        </div>
      )}

      {scanning && (
        <div style={{ margin: '15px 0', textAlign: 'center' }}>
          <p style={{ fontWeight: 'bold' }}>{t.scanningText} {progress}%</p>
          <div style={{ width: '100%', background: theme.inputBg, borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, background: '#6366f1', height: '100%', transition: 'width 0.2s' }}></div>
          </div>
        </div>
      )}

      {extractedData && (
        <div style={{ marginTop: '15px', background: theme.inputBg, padding: '15px', borderRadius: '6px', border: `1px solid ${theme.border}` }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', color: '#10b981' }}>{t.extractedHeading}</h3>
          <p><strong>{t.storeNameLabel}</strong> {extractedData.extractedStore}</p>
          <p><strong>{t.totalAmountLabel}</strong> ₹{extractedData.extractedAmount.toFixed(2)}</p>
          <p><strong>{t.phoneNumLabel}</strong> {extractedData.extractedPhone}</p>
        </div>
      )}
    </div>
  );
}

function KhataView({ t, theme }) {
  const [khataList, setKhataList] = useState([]);

  const markAsPaid = (id) => {
    setKhataList(prev => prev.filter(k => k._id !== id));
  };

  return (
    <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border }}>
      <h2 style={styles.cardTitle}>{t.khataTitle}</h2>
      {khataList.length === 0 ? <p style={styles.subText}>{t.noKhata}</p> : (
        khataList.map(k => (
          <div key={k._id} style={{ ...styles.tableRow, borderColor: theme.border, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>{k.customerName}</strong> ({k.phoneNumber})
              <div style={{ fontSize: '12px', color: '#ef4444' }}>{t.dueBalance} ₹{k.balance.toFixed(2)}</div>
            </div>
            <button type="button" onClick={() => markAsPaid(k._id)} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              {t.markPaid}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

function ReportsView({ lang, t, theme }) {
  const [report, setReport] = useState({ totalRevenue: 0.00, netBalance: 0.00 });
  const [transactions, setTransactions] = useState([]);

  const fetchData = () => {
    // Clean mock transactions without dollar symbols
    setTransactions([
      { id: '1', store: 'Main Store', phoneNumber: '9876543210', date: new Date(), type: 'CREDIT', displayAmount: '+₹1,250.00' },
      { id: '2', store: 'Main Store', phoneNumber: '9123456789', date: new Date(), type: 'CREDIT', displayAmount: '+₹450.00' }
    ]);
    setReport({ totalRevenue: 1700.00, netBalance: 1700.00 });
  };

  useEffect(() => { fetchData(); }, [lang]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border }}>
        <h2 style={styles.cardTitle}>{t.ledgerMetrics}</h2>
        {report && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
            <div style={{ background: theme.inputBg, padding: '15px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
              <p style={styles.subText}>{t.totalRevenue}</p>
              <h3 style={{ color: '#10b981', margin: '5px 0 0' }}>+₹{report.totalRevenue.toFixed(2)}</h3>
            </div>
            <div style={{ background: theme.inputBg, padding: '15px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
              <p style={styles.subText}>{t.netBalance}</p>
              <h3 style={{ color: '#3b82f6', margin: '5px 0 0' }}>₹{report.netBalance.toFixed(2)}</h3>
            </div>
          </div>
        )}
      </div>

      <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={styles.cardTitle}>{t.recentLedger}</h2>
          <button onClick={fetchData} style={styles.submitBtn}>{t.refreshLedger}</button>
        </div>
        {transactions.length === 0 ? <p style={styles.subText}>{t.noTransactions}</p> : (
          transactions.map(tx => (
            <div key={tx.id} style={{ ...styles.tableRow, borderColor: theme.border, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
    </div>
  );
}

function ProfileView({ t, theme }) {
  const [shopName, setShopName] = useState('My Shop');
  const [ownerName, setOwnerName] = useState('Admin');
  const [phone, setPhone] = useState('9876543210');
  const [address, setAddress] = useState('14/2 Park Street');
  const [gstin, setGstin] = useState('19AABCT1332L1ZS');
  const [msg, setMsg] = useState({ text: '', type: '' });

  const saveProfile = (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setMsg({ text: 'Phone number must be exactly 10 digits.', type: 'error' });
      return;
    }
    if (!address || !address.trim() || !gstin || !gstin.trim()) {
      setMsg({ text: t.addressGstinRequired, type: 'error' });
      return;
    }
    setMsg({ text: t.profileSuccess, type: 'success' });
  };

  return (
    <div style={{ ...styles.card, background: theme.cardBg, borderColor: theme.border, maxWidth: '600px', margin: 'auto' }}>
      <h2 style={styles.cardTitle}>{t.profileTitle}</h2>
      <form onSubmit={saveProfile} style={styles.form}>
        <div>
          <label style={styles.label}>{t.shopNameLabel}</label>
          <input type="text" value={shopName} onChange={e => setShopName(e.target.value)} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
        </div>
        <div>
          <label style={styles.label}>{t.ownerNameLabel}</label>
          <input type="text" value={ownerName} onChange={e => setOwnerName(e.target.value)} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
        </div>
        <div>
          <label style={styles.label}>{t.phoneNumLabelProfile}</label>
          <input 
            type="tel" 
            maxLength="10" 
            value={phone} 
            onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} 
            required 
            style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} 
          />
        </div>
        <div>
          <label style={styles.label}>{t.addressLabel}</label>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder={t.addressPlaceholder} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
        </div>
        <div>
          <label style={styles.label}>{t.gstinLabel}</label>
          <input type="text" value={gstin} onChange={e => setGstin(e.target.value)} placeholder={t.gstinPlaceholder} required style={{ ...styles.input, background: theme.inputBg, color: theme.text, borderColor: theme.border }} />
        </div>
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
  tableRow: { display: 'flex', padding: '12px 0', borderBottom: '1px solid', justifyContent: 'space-between', fontSize: '14px' }
};