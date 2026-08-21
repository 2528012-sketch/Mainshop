import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000/api";

const translations = {
  en: {
    dashboardTitle: "Shopkeeper Dashboard",
    owner: "Owner",
    phone: "Phone",
    analytics: "Financial Reports",
    billing: "Billing (POS)",
    inventory: "Inventory (Stock)",
    ocr: "OCR Scanner",
    khata: "Khata / Credit",
    profile: "Shop Profile",
    lightMode: "Light",
    darkMode: "Dark",
    
    finReportsTitle: "Financial Statements & Analysis",
    finReportsSub: "Health metrics and asset summary for your retail store operations.",
    totalKhataDue: "Total Credit Due",
    khataSub: "Total unpaid balance across accounts.",
    inventoryTotalVal: "Inventory Total Value",
    inventoryValSub: "Total market value of current stock on shelves.",
    salesRevenue: "Total Sales Revenue",
    salesRevSub: "Total recorded completed sales volume.",
    recentTransactions: "Recent Transactions Ledger",
    custName: "Customer Name",
    payMethod: "Payment Method",
    totalAmt: "Total Amount",
    date: "Date",

    newBillTitle: "Create New Bill - Search Items & Enter Quantity",
    searchItemLabel: "Search Item Name",
    searchPlaceholder: "Type to search...",
    noMatch: "No matches found",
    qtyLabel: "Quantity",
    addBtn: "Add",
    stockRefTitle: "Available Stock List Reference",
    price: "Price",
    availStock: "Available Stock",
    activeCart: "Active Cart Summary",
    cartEmpty: "Cart is empty. Search and add items from above.",
    subtotal: "Subtotal",
    cgst: "CGST (Central Tax 2.5%)",
    sgst: "SGST (State Tax 2.5%)",
    totalGst: "Total Tax (5% GST)",
    grandTotal: "Grand Total",
    checkoutBtn: "Complete Bill (Checkout)",
    cash: "Cash",
    upi: "UPI",
    khataCredit: "Khata / Credit",

    addNewProd: "Add New Product",
    prodName: "Product Name",
    prodPlaceholder: "e.g., Basmati Rice 5kg",
    sellingPrice: "Selling Price",
    initStockQty: "Initial Stock Quantity",
    lowStockThreshold: "Low Stock Alert Threshold",
    saveItem: "Save Item",
    inventoryDetails: "Inventory Stock Details",
    inventoryHint: "You can change quantity directly inside the stock box.",
    threshold: "Threshold",
    lowStockAlert: "Low Stock",

    ocrTitle: "OCR Supplier Invoice Scanner",
    ocrSub: "Upload a picture of your wholesaler's invoice to automatically import items.",
    uploadInvImg: "Upload Invoice Image",
    scanning: "Scanning invoice via OCR...",
    extractedItems: "Extracted Items Ready for Import:",
    action: "Action",
    addToInventory: "Add to Inventory",

    khataLedgerTitle: "Add or Update Khata / Credit Account",
    custNamePlaceholder: "e.g., Ramesh Verma",
    phonePlaceholder: "9876543210 (10 digits max)",
    dueAmount: "Due Amount",
    duePlaceholder: "500",
    saveKhata: "Save Khata Entry",
    khataLedger: "Khata / Credit Ledger",
    dueBal: "Due Balance",
    markAsPaid: "Mark as Paid",

    profileTitle: "Shopkeeper Profile",
    profileSub: "Set your business name, billing credentials, and contact details.",
    shopNameLabel: "Shop / Business Name",
    ownerNameLabel: "Owner's Name",
    emailLabel: "Email Address",
    gstinLabel: "GSTIN Number",
    upiIdLabel: "UPI ID",
    fullAddressLabel: "Full Shop Address",
    saveProfile: "Save Profile Settings",
    profileUpdated: "Shopkeeper profile updated successfully!",
    profileError: "Error updating profile.",
  },
  hi: {
    dashboardTitle: "दुकानदार का डैशबोर्ड",
    owner: "मालिक",
    phone: "फोन",
    analytics: "वित्तीय रिपोर्ट",
    billing: "बिलिंग (POS)",
    inventory: "इन्वेंट्री (स्टॉक)",
    ocr: "OCR स्कैनर",
    khata: "खाता / उधार",
    profile: "दुकान प्रोफाइल",
    lightMode: "लाइट",
    darkMode: "डार्क",
    
    finReportsTitle: "वित्तीय विवरण और विश्लेषण",
    finReportsSub: "आपकी खुदरा दुकान के संचालन के लिए स्वास्थ्य मेट्रिक्स और परिसंपत्ति सारांश।",
    totalKhataDue: "कुल बकाया उधार",
    khataSub: "खातों में कुल अवैतनिक शेष राशि।",
    inventoryTotalVal: "इन्वेंट्री कुल मूल्य",
    inventoryValSub: "शेल्फ पर मौजूद वर्तमान स्टॉक का कुल बाजार मूल्य।",
    salesRevenue: "कुल बिक्री राजस्व",
    salesRevSub: "कुल दर्ज की गई पूर्ण बिक्री मात्रा।",
    recentTransactions: "हाल के लेनदेन लेज़र",
    custName: "ग्राहक का नाम",
    payMethod: "भुगतान का तरीका",
    totalAmt: "कुल राशि",
    date: "दिनांक",

    newBillTitle: "नया बिल बनाएं - आइटम खोजें और मात्रा दर्ज करें",
    searchItemLabel: "आइटम का नाम खोजें",
    searchPlaceholder: "टाइप करें...",
    noMatch: "कोई मिलान नहीं मिला",
    qtyLabel: "मात्रा",
    addBtn: "जोड़ें",
    stockRefTitle: "उपलब्ध स्टॉक सूची संदर्भ",
    price: "मूल्य",
    availStock: "उपलब्ध स्टॉक",
    activeCart: "सक्रिय कार्ट सारांश",
    cartEmpty: "कार्ट खाली है। ऊपर से आइटम खोजकर जोड़ें।",
    subtotal: "उप-योग",
    cgst: "CGST (केंद्रीय कर 2.5%)",
    sgst: "SGST (राज्य कर 2.5%)",
    totalGst: "कुल कर (5% GST)",
    grandTotal: "कुल योग",
    checkoutBtn: "बिल पूरा करें",
    cash: "नकद",
    upi: "UPI",
    khataCredit: "खाता / उधार",

    addNewProd: "नया उत्पाद जोड़ें",
    prodName: "उत्पाद का नाम",
    prodPlaceholder: "जैसे: बासमती चावल 5kg",
    sellingPrice: "विक्रय मूल्य",
    initStockQty: "प्रारंभिक स्टॉक मात्रा",
    lowStockThreshold: "कम स्टॉक चेतावनी सीमा",
    saveItem: "आइटम सहेजें",
    inventoryDetails: "इन्वेंट्री स्टॉक विवरण",
    inventoryHint: "आप सीधे स्टॉक बॉक्स में मात्रा बदलकर अपडेट कर सकते हैं।",
    threshold: "चेतावनी सीमा",
    lowStockAlert: "कम स्टॉक",

    ocrTitle: "OCR सप्लायर इनवॉइस स्कैनर",
    ocrSub: "थोक विक्रेता के चालान की तस्वीर अपलोड करें ताकि आइटम स्वचालित रूप से जुड़ सकें।",
    uploadInvImg: "चालान इमेज अपलोड करें",
    scanning: "OCR द्वारा इनवॉइस स्कैन किया जा रहा है...",
    extractedItems: "आयात के लिए तैयार निकाले गए आइटम:",
    action: "कार्रवाई",
    addToInventory: "इन्वेंट्री में जोड़ें",

    khataLedgerTitle: "खाता / उधार खाता जोड़ें या अपडेट करें",
    custNamePlaceholder: "जैसे: रमेश वर्मा",
    phonePlaceholder: "9876543210 (अधिकतम 10 अंक)",
    dueAmount: "बकाया राशि",
    duePlaceholder: "500",
    saveKhata: "खाता प्रविष्टि सहेजें",
    khataLedger: "खाता / उधार लेज़र",
    dueBal: "बकाया राशि",
    markAsPaid: "भुगतान हो गया (क्लियर करें)",

    profileTitle: "दुकानदार प्रोफाइल",
    profileSub: "अपने व्यवसाय का नाम, बिलिंग क्रेडेंशियल और संपर्क विवरण सेट करें।",
    shopNameLabel: "दुकान / व्यवसाय का नाम",
    ownerNameLabel: "मालिक का नाम",
    emailLabel: "ईमेल पता",
    gstinLabel: "GSTIN नंबर",
    upiIdLabel: "UPI ID",
    fullAddressLabel: "दुकान का पूरा पता",
    saveProfile: "प्रोफाइल सेटिंग सहेजें",
    profileUpdated: "दुकानदार की प्रोफाइल सफलतापूर्वक अपडेट हो गई है!",
    profileError: "प्रोफाइल अपडेट करने में त्रुटि।",
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState("hi"); 

  const t = translations[lang];

  // Core Data States
  const [store, setStore] = useState({});
  const [inventory, setInventory] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [khataList, setKhataList] = useState([]);

  // Profile Form States
  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gstin, setGstin] = useState("");
  const [upiId, setUpiId] = useState("");

  // Billing Cart & Search States
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItemForBill, setSelectedItemForBill] = useState(null);
  const [billQty, setBillQty] = useState(1);

  // New Inventory Item States
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemStock, setNewItemStock] = useState("");
  const [newItemThreshold, setNewItemThreshold] = useState("5");

  // Khata / Credit Input States
  const [khataName, setKhataName] = useState("");
  const [khataPhone, setKhataPhone] = useState("");
  const [khataAmount, setKhataAmount] = useState("");

  // OCR Invoice Scanner States
  const [ocrText, setOcrText] = useState("");
  const [ocrScanning, setOcrScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API_BASE}/dashboard`);
      const data = await res.json();
      if (res.ok) {
        setStore(data.store || {});
        setInventory(data.inventory || []);
        setTransactions(data.transactions || []);
        setKhataList(data.khataRecords || []);

        if (data.store) {
          setShopName(data.store.shopName || "");
          setOwnerName(data.store.ownerName || "");
          setPhone(data.store.phone || "");
          setEmail(data.store.email || "");
          setAddress(data.store.address || "");
          setGstin(data.store.gstin || "");
          setUpiId(data.store.upiId || "");
        }
      }
    } catch (err) {
      console.error("Error communicating with backend server", err);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!shopName.trim() || !ownerName.trim()) {
      alert("Shop name and Owner name are required.");
      return;
    }
    if (!address.trim() || !gstin.trim()) {
      alert("Address and GSTIN are compulsory fields.");
      return;
    }
    if (phone && phone.replace(/\D/g, "").length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/store`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopName, ownerName, phone, email, address, gstin, upiId })
      });
      const data = await res.json();
      if (res.ok) {
        setStore(data);
        alert(t.profileUpdated);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(t.profileError);
    }
  };

  const addToCartCustom = (product, quantity) => {
    const qty = Number(quantity);
    if (product.stock < qty) {
      alert(`Insufficient stock! Current stock: ${product.stock}`);
      return;
    }
    setCart(prev => {
      const existing = prev.find(item => item.inventoryId === product.id);
      if (existing) {
        return prev.map(item => 
          item.inventoryId === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { inventoryId: product.id, name: product.name, unitPrice: Number(product.price), quantity: qty }];
    });
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const cgst = subtotal * 0.025; 
  const sgst = subtotal * 0.025; 
  const totalGst = cgst + sgst;  
  const grandTotal = subtotal + totalGst;

  const handleCheckout = async () => {
    if (!customerName || !customerName.trim()) {
      alert("Customer Name is compulsory for checkout!");
      return;
    }
    if (customerPhone && customerPhone.replace(/\D/g, "").length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
    if (cart.length === 0) return alert("Cart is empty!");

    try {
      const res = await fetch(`${API_BASE}/pos/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          phone: customerPhone.trim(),
          items: cart,
          paymentMethod,
          subtotal,
          gst: totalGst,
          grandTotal
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert(paymentMethod === "Khata / Credit" ? "Transaction complete & customer moved to Khata ledger!" : "Transaction recorded successfully!");
        setCart([]);
        setCustomerName("");
        setCustomerPhone("");
        fetchDashboard();
      } else {
        alert(`Checkout failed: ${data.error}`);
      }
    } catch (err) {
      alert("Network error during checkout.");
    }
  };

  const handleAddInventory = async (e) => {
    e.preventDefault();
    if (!newItemName.trim()) {
      alert("Product name is compulsory.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/inventory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newItemName.trim(),
          price: Number(newItemPrice),
          stock: Math.max(0, Number(newItemStock)),
          threshold: Number(newItemThreshold)
        })
      });
      if (res.ok) {
        alert("Product added successfully!");
        setNewItemName(""); setNewItemPrice(""); setNewItemStock(""); setNewItemThreshold("5");
        fetchDashboard();
      }
    } catch (err) {
      alert("Error adding item.");
    }
  };

  const handleUpdateStockQty = async (item, newStockVal) => {
    const updatedStock = Math.max(0, Number(newStockVal) || 0);
    setInventory(prev => prev.map(inv => inv.id === item.id ? { ...inv, stock: updatedStock } : inv));

    try {
      await fetch(`${API_BASE}/inventory/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: item.name,
          price: Number(item.price),
          stock: updatedStock,
          threshold: Number(item.threshold || 5)
        })
      });
    } catch (err) {
      console.error("Error updating stock quantity", err);
      fetchDashboard();
    }
  };

  const handleAddKhata = async (e) => {
    e.preventDefault();
    if (!khataName.trim()) {
      alert("Customer name is compulsory.");
      return;
    }
    if (khataPhone && khataPhone.replace(/\D/g, "").length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/khata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: khataName.trim(), phone: khataPhone.trim(), balanceDue: Number(khataAmount) })
      });
      if (res.ok) {
        alert("Khata entry saved successfully!");
        setKhataName(""); setKhataPhone(""); setKhataAmount("");
        fetchDashboard();
      }
    } catch (err) {
      alert("Error saving khata.");
    }
  };

  const handleMarkKhataPaid = async (khataId) => {
    if (!window.confirm("Are you sure this credit has been fully paid?")) return;
    try {
      const res = await fetch(`${API_BASE}/khata/${khataId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchDashboard();
      } else {
        alert("Failed to settle khata entry.");
      }
    } catch (err) {
      alert("Network error clearing khata.");
    }
  };

  const handleSimulateOCRScan = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setOcrScanning(true);
    setTimeout(() => {
      const parsedMockItems = [
        { name: "Cadbury Dairy Milk 10pc", price: 200, stock: 25, threshold: 5 },
        { name: "Bisleri Water Bottle 1L", price: 20, stock: 40, threshold: 10 }
      ];
      setScannedItems(parsedMockItems);
      setOcrText(`Scanned invoice: ${file.name}\n- 2 items successfully parsed.`);
      setOcrScanning(false);
    }, 1500);
  };

  const handleImportScannedItem = async (item) => {
    try {
      const res = await fetch(`${API_BASE}/inventory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        alert(`${item.name} added to inventory!`);
        fetchDashboard();
      }
    } catch (err) {
      alert("Failed to import item.");
    }
  };

  const totalKhataDue = khataList.reduce((acc, k) => acc + Number(k.balanceDue || 0), 0);
  const totalInventoryValue = inventory.reduce((acc, i) => acc + (Number(i.price) * Number(i.stock || 0)), 0);
  const totalSalesRevenue = transactions.reduce((acc, t) => acc + Number(t.total || 0), 0);

  const theme = darkMode ? { bg: "#0f172a", card: "#1e293b", text: "#f8fafc", border: "#334155" } : { bg: "#f8fafc", card: "#ffffff", text: "#1e293b", border: "#e2e8f0" };

  return (
    <div style={{ fontFamily: "sans-serif", background: theme.bg, color: theme.text, minHeight: "100vh", padding: "20px" }}>
      
      {/* Header Navigation Bar */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: theme.card, padding: "15px 25px", borderRadius: "10px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button 
            onClick={() => setLang(lang === "en" ? "hi" : "en")} 
            style={{ padding: "8px 12px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
          >
            {lang === "en" ? "हिंदी (Hindi)" : "English"}
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: "20px" }}>{store.shopName || t.dashboardTitle}</h1>
            <small style={{ opacity: 0.7 }}>{t.owner}: {store.ownerName} | {t.phone}: {store.phone}</small>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={() => setActiveTab("analytics")} style={tabStyle(activeTab === "analytics")}>{t.analytics}</button>
          <button onClick={() => setActiveTab("billing")} style={tabStyle(activeTab === "billing")}>{t.billing}</button>
          <button onClick={() => setActiveTab("inventory")} style={tabStyle(activeTab === "inventory")}>{t.inventory}</button>
          <button onClick={() => setActiveTab("ocr")} style={tabStyle(activeTab === "ocr")}>{t.ocr}</button>
          <button onClick={() => setActiveTab("khata")} style={tabStyle(activeTab === "khata")}>{t.khata}</button>
          <button onClick={() => setActiveTab("profile")} style={tabStyle(activeTab === "profile")}>{t.profile}</button>
          <button onClick={() => setDarkMode(!darkMode)} style={{ padding: "8px 12px", background: theme.border, border: "none", borderRadius: "6px", cursor: "pointer", color: theme.text }}>
            {darkMode ? `☀️ ${t.lightMode}` : `🌙 ${t.darkMode}`}
          </button>
        </div>
      </header>

      {/* WINDOW 1: FINANCIAL ANALYTICS */}
      {activeTab === "analytics" && (
        <div style={{ background: theme.card, padding: "30px", borderRadius: "10px", maxWidth: "900px", margin: "0 auto" }}>
          <h2>{t.finReportsTitle}</h2>
          <p style={{ opacity: 0.7, marginBottom: "25px" }}>{t.finReportsSub}</p>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "30px" }}>
            <div style={{ background: theme.bg, padding: "20px", borderRadius: "8px", borderLeft: "4px solid #ef4444" }}>
              <h4 style={{ margin: "0 0 10px 0" }}>{t.totalKhataDue}</h4>
              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#ef4444", margin: 0 }}>₹{totalKhataDue.toFixed(2)}</p>
              <small style={{ opacity: 0.7 }}>{t.khataSub}</small>
            </div>
            <div style={{ background: theme.bg, padding: "20px", borderRadius: "8px", borderLeft: "4px solid #4f46e5" }}>
              <h4 style={{ margin: "0 0 10px 0" }}>{t.inventoryTotalVal}</h4>
              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#4f46e5", margin: 0 }}>₹{totalInventoryValue.toFixed(2)}</p>
              <small style={{ opacity: 0.7 }}>{t.inventoryValSub}</small>
            </div>
            <div style={{ background: theme.bg, padding: "20px", borderRadius: "8px", borderLeft: "4px solid #10b981" }}>
              <h4 style={{ margin: "0 0 10px 0" }}>{t.salesRevenue}</h4>
              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981", margin: 0 }}>₹{totalSalesRevenue.toFixed(2)}</p>
              <small style={{ opacity: 0.7 }}>{t.salesRevSub}</small>
            </div>
          </div>

          <h3>{t.recentTransactions}</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: `2px solid ${theme.border}` }}>
                <th style={thStyle}>{t.custName}</th><th style={thStyle}>{t.payMethod}</th><th style={thStyle}>{t.totalAmt}</th><th style={thStyle}>{t.date}</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tr => {
                const isSettlement = tr.paymentMethod === "Khata Settlement";
                return (
                  <tr key={tr.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                    <td style={tdStyle}>{tr.customerName}</td>
                    <td style={tdStyle}>{tr.paymentMethod}</td>
                    <td style={{ ...tdStyle, color: isSettlement ? "#10b981" : "#10b981", fontWeight: "bold" }}>
                      {isSettlement ? `+₹${Number(tr.total).toFixed(2)}` : `₹${Number(tr.total).toFixed(2)}`}
                    </td>
                    <td style={tdStyle}>{new Date(tr.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* WINDOW 2: BILLING */}
      {activeTab === "billing" && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
          <div style={{ background: theme.card, padding: "20px", borderRadius: "10px" }}>
            <h3>{t.newBillTitle}</h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "10px", marginTop: "15px", alignItems: "end", position: "relative" }}>
              <div style={{ position: "relative" }}>
                <label style={labelStyle}>{t.searchItemLabel}</label>
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder} 
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setSelectedItemForBill(null);
                  }}
                  style={inputStyle(theme)} 
                />

                {searchQuery.trim() !== "" && !selectedItemForBill && (
                  <ul style={{ position: "absolute", zIndex: 10, width: "100%", background: theme.card, border: `1px solid ${theme.border}`, borderRadius: "4px", maxHeight: "150px", overflowY: "auto", margin: 0, padding: 0, listStyle: "none", boxShadow: "0 4px 6px rgba(0,0,0,0.2)" }}>
                    {inventory
                      .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map(item => (
                        <li 
                          key={item.id} 
                          onClick={() => {
                            setSelectedItemForBill(item);
                            setSearchQuery(item.name);
                          }}
                          style={{ padding: "8px 12px", cursor: "pointer", borderBottom: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between" }}
                        >
                          <span>{item.name}</span>
                          <span style={{ opacity: 0.7, fontSize: "12px" }}>₹{item.price} ({t.availStock}: {item.stock})</span>
                        </li>
                      ))}
                    {inventory.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                      <li style={{ padding: "8px 12px", opacity: 0.5, fontSize: "13px" }}>{t.noMatch}</li>
                    )}
                  </ul>
                )}
              </div>

              <div>
                <label style={labelStyle}>{t.qtyLabel}</label>
                <input 
                  type="number" 
                  min="1" 
                  value={billQty} 
                  onChange={e => setBillQty(Math.max(1, parseInt(e.target.value) || 1))} 
                  style={inputStyle(theme)} 
                />
              </div>

              <div>
                <button 
                  type="button"
                  onClick={() => {
                    if (!selectedItemForBill) {
                      alert("Please select a valid item.");
                      return;
                    }
                    addToCartCustom(selectedItemForBill, billQty);
                    setSearchQuery("");
                    setSelectedItemForBill(null);
                    setBillQty(1);
                  }}
                  style={{ width: "100%", padding: "8px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", marginBottom: "12px" }}
                >
                  {t.addBtn}
                </button>
              </div>
            </div>

            <h4 style={{ marginTop: "25px" }}>{t.stockRefTitle}</h4>
            <div style={{ maxHeight: "200px", overflowY: "auto", border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "10px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: `1px solid ${theme.border}` }}>
                    <th style={thStyle}>{t.prodName}</th><th style={thStyle}>{t.price}</th><th style={thStyle}>{t.availStock}</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map(item => (
                    <tr key={item.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                      <td style={tdStyle}>{item.name}</td>
                      <td style={tdStyle}>₹{Number(item.price).toFixed(2)}</td>
                      <td style={tdStyle}>{item.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ background: theme.card, padding: "20px", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3>{t.activeCart}</h3>
              <label style={labelStyle}>{t.custName} *</label>
              <input type="text" placeholder="Required" value={customerName} onChange={e => setCustomerName(e.target.value)} style={inputStyle(theme)} required />
              
              <label style={labelStyle}>{t.phone}</label>
              <input type="text" maxLength="10" placeholder="10-digit mobile" value={customerPhone} onChange={e => setCustomerPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} style={inputStyle(theme)} />

              <div style={{ maxHeight: "150px", overflowY: "auto", marginBottom: "15px" }}>
                {cart.length === 0 ? <p style={{ opacity: 0.5, fontSize: "13px" }}>{t.cartEmpty}</p> : cart.map((c, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                    <span>{c.name} (x{c.quantity})</span>
                    <span>₹{(c.unitPrice * c.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: "10px", marginBottom: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}><span>{t.subtotal}:</span><span>₹{subtotal.toFixed(2)}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", opacity: 0.8, marginTop: "4px" }}><span>{t.cgst}:</span><span>₹{cgst.toFixed(2)}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", opacity: 0.8 }}><span>{t.sgst}:</span><span>₹{sgst.toFixed(2)}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "600", marginTop: "2px", marginBottom: "6px" }}><span>{t.totalGst}:</span><span>₹{totalGst.toFixed(2)}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "16px", marginTop: "8px", borderTop: `1px dashed ${theme.border}`, paddingTop: "6px" }}><span>{t.grandTotal}:</span><span>₹{grandTotal.toFixed(2)}</span></div>
              </div>
              <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} style={{ ...inputStyle(theme), marginBottom: "12px" }}>
                <option value="Cash">{t.cash}</option>
                <option value="UPI">{t.upi}</option>
                <option value="Khata / Credit">{t.khataCredit}</option>
              </select>
              <button onClick={handleCheckout} style={{ width: "100%", padding: "12px", background: "#10b981", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>{t.checkoutBtn}</button>
            </div>
          </div>
        </div>
      )}

      {/* WINDOW 3: INVENTORY MANAGEMENT */}
      {activeTab === "inventory" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
          <form onSubmit={handleAddInventory} style={{ background: theme.card, padding: "20px", borderRadius: "10px", height: "fit-content" }}>
            <h3>{t.addNewProd}</h3>
            <label style={labelStyle}>{t.prodName} *</label>
            <input type="text" placeholder={t.prodPlaceholder} value={newItemName} onChange={e => setNewItemName(e.target.value)} style={inputStyle(theme)} required />
            <label style={labelStyle}>{t.sellingPrice} *</label>
            <input type="number" step="0.01" value={newItemPrice} onChange={e => setNewItemPrice(e.target.value)} style={inputStyle(theme)} required />
            <label style={labelStyle}>{t.initStockQty} *</label>
            <input type="number" min="0" value={newItemStock} onChange={e => setNewItemStock(e.target.value)} style={inputStyle(theme)} required />
            <label style={labelStyle}>{t.lowStockThreshold} *</label>
            <input type="number" min="0" value={newItemThreshold} onChange={e => setNewItemThreshold(e.target.value)} style={inputStyle(theme)} required />
            <button type="submit" style={{ width: "100%", padding: "10px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>{t.saveItem}</button>
          </form>

          <div style={{ background: theme.card, padding: "20px", borderRadius: "10px" }}>
            <h3>{t.inventoryDetails}</h3>
            <p style={{ fontSize: "12px", opacity: 0.7, marginBottom: "10px" }}>{t.inventoryHint}</p>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: `2px solid ${theme.border}` }}>
                  <th style={thStyle}>{t.prodName}</th><th style={thStyle}>{t.price}</th><th style={thStyle}>{t.availStock}</th><th style={thStyle}>{t.threshold}</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => {
                  const isLow = Number(item.stock) <= Number(item.threshold);
                  return (
                    <tr key={item.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                      <td style={tdStyle}>{item.name}</td>
                      <td style={tdStyle}>₹{Number(item.price).toFixed(2)}</td>
                      <td style={tdStyle}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <input 
                            type="number" 
                            min="0"
                            value={item.stock} 
                            onChange={(e) => handleUpdateStockQty(item, e.target.value)}
                            style={{ width: "70px", padding: "4px", borderRadius: "4px", border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, fontWeight: "bold" }}
                          />
                          {isLow && <span style={{ color: "#ef4444", fontSize: "11px", fontWeight: "600" }}>⚠️ {t.lowStockAlert}</span>}
                        </div>
                      </td>
                      <td style={tdStyle}>{item.threshold}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* WINDOW 4: OCR INVOICE SCANNER */}
      {activeTab === "ocr" && (
        <div style={{ background: theme.card, padding: "30px", borderRadius: "10px", maxWidth: "800px", margin: "0 auto" }}>
          <h2>{t.ocrTitle}</h2>
          <p style={{ opacity: 0.7, marginBottom: "20px" }}>{t.ocrSub}</p>
          
          <div style={{ border: `2px dashed ${theme.border}`, padding: "30px", textAlign: "center", borderRadius: "8px", marginBottom: "20px" }}>
            <input type="file" accept="image/*" onChange={handleSimulateOCRScan} style={{ display: "none" }} id="invoice-upload" />
            <label htmlFor="invoice-upload" style={{ cursor: "pointer", background: "#4f46e5", color: "#fff", padding: "10px 20px", borderRadius: "6px", fontWeight: "bold" }}>{t.uploadInvImg}</label>
            {ocrScanning && <p style={{ marginTop: "15px", color: "#4f46e5" }}>{t.scanning}</p>}
          </div>

          {ocrText && (
            <div style={{ background: theme.bg, padding: "15px", borderRadius: "6px", marginBottom: "20px", whiteSpace: "pre-line", fontSize: "14px" }}>
              {ocrText}
            </div>
          )}

          {scannedItems.length > 0 && (
            <div>
              <h4>{t.extractedItems}</h4>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: `2px solid ${theme.border}` }}>
                    <th style={thStyle}>{t.prodName}</th><th style={thStyle}>{t.price}</th><th style={thStyle}>{t.availStock}</th><th style={thStyle}>{t.action}</th>
                  </tr>
                </thead>
                <tbody>
                  {scannedItems.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: `1px solid ${theme.border}` }}>
                      <td style={tdStyle}>{item.name}</td>
                      <td style={tdStyle}>₹{item.price}</td>
                      <td style={tdStyle}>{item.stock}</td>
                      <td style={tdStyle}>
                        <button onClick={() => handleImportScannedItem(item)} style={{ background: "#10b981", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>{t.addToInventory}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* WINDOW 5: KHATA / CREDIT LEDGER */}
      {activeTab === "khata" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
          <form onSubmit={handleAddKhata} style={{ background: theme.card, padding: "20px", borderRadius: "10px", height: "fit-content" }}>
            <h3>{t.khataLedgerTitle}</h3>
            <label style={labelStyle}>{t.custName} *</label>
            <input type="text" placeholder={t.custNamePlaceholder} value={khataName} onChange={e => setKhataName(e.target.value)} style={inputStyle(theme)} required />
            
            <label style={labelStyle}>{t.phone}</label>
            <input type="text" maxLength="10" placeholder={t.phonePlaceholder} value={khataPhone} onChange={e => setKhataPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} style={inputStyle(theme)} />
            
            <label style={labelStyle}>{t.dueAmount} *</label>
            <input type="number" step="0.01" placeholder={t.duePlaceholder} value={khataAmount} onChange={e => setKhataAmount(e.target.value)} style={inputStyle(theme)} required />
            <button type="submit" style={{ width: "100%", padding: "10px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>{t.saveKhata}</button>
          </form>

          <div style={{ background: theme.card, padding: "20px", borderRadius: "10px" }}>
            <h3>{t.khataLedger}</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: `2px solid ${theme.border}` }}>
                  <th style={thStyle}>{t.custName}</th><th style={thStyle}>{t.phone}</th><th style={thStyle}>{t.dueBal}</th><th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {khataList.length === 0 ? (
                  <tr><td colSpan="4" style={{ textAlign: "center", padding: "15px", opacity: 0.5 }}>No active credit accounts due.</td></tr>
                ) : (
                  khataList.map(k => (
                    <tr key={k.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                      <td style={tdStyle}>{k.customer}</td>
                      <td style={tdStyle}>{k.phone}</td>
                      <td style={{ ...tdStyle, color: "#ef4444", fontWeight: "bold" }}>₹{Number(k.balanceDue).toFixed(2)}</td>
                      <td style={tdStyle}>
                        <button 
                          onClick={() => handleMarkKhataPaid(k.id)}
                          style={{ background: "#10b981", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}
                        >
                          ✓ {t.markAsPaid}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* WINDOW 6: OWNER PROFILE */}
      {activeTab === "profile" && (
        <div style={{ background: theme.card, padding: "30px", borderRadius: "10px", maxWidth: "700px", margin: "0 auto" }}>
          <h2>{t.profileTitle}</h2>
          <p style={{ opacity: 0.7, marginBottom: "20px" }}>{t.profileSub}</p>
          <form onSubmit={handleUpdateProfile}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div>
                <label style={labelStyle}>{t.shopNameLabel} *</label>
                <input type="text" value={shopName} onChange={e => setShopName(e.target.value)} style={inputStyle(theme)} required />
              </div>
              <div>
                <label style={labelStyle}>{t.ownerNameLabel} *</label>
                <input type="text" value={ownerName} onChange={e => setOwnerName(e.target.value)} style={inputStyle(theme)} required />
              </div>
              <div>
                <label style={labelStyle}>{t.phone}</label>
                <input type="text" maxLength="10" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} style={inputStyle(theme)} />
              </div>
              <div>
                <label style={labelStyle}>{t.emailLabel}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle(theme)} />
              </div>
              <div>
                <label style={labelStyle}>{t.gstinLabel} *</label>
                <input type="text" value={gstin} onChange={e => setGstin(e.target.value)} style={inputStyle(theme)} required />
              </div>
              <div>
                <label style={labelStyle}>{t.upiIdLabel}</label>
                <input type="text" value={upiId} onChange={e => setUpiId(e.target.value)} style={inputStyle(theme)} />
              </div>
            </div>
            <div style={{ marginTop: "15px" }}>
              <label style={labelStyle}>{t.fullAddressLabel} *</label>
              <textarea value={address} onChange={e => setAddress(e.target.value)} style={{ ...inputStyle(theme), height: "80px", resize: "vertical" }} required />
            </div>
            <button type="submit" style={{ marginTop: "15px", width: "100%", padding: "12px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>{t.saveProfile}</button>
          </form>
        </div>
      )}

    </div>
  );
}

const tabStyle = (active) => ({
  background: active ? "#4f46e5" : "transparent",
  color: active ? "#fff" : "inherit",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600"
});

const labelStyle = { display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px" };
const inputStyle = (theme) => ({ width: "100%", padding: "8px", marginBottom: "12px", borderRadius: "4px", border: `1px solid ${theme.border}`, background: theme.card, color: theme.text, boxSizing: "border-box" });
const thStyle = { padding: "10px", fontSize: "13px" };
const tdStyle = { padding: "10px", fontSize: "14px" };