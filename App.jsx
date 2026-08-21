import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000/api";

export default function App() {
  const [activeTab, setActiveTab] = useState("analytics"); // Set Financial Analytics as the default first window
  const [darkMode, setDarkMode] = useState(true); // Default to Dark Mode

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

  // POS Cart State
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  // New Inventory Item States
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemStock, setNewItemStock] = useState("");
  const [newItemThreshold, setNewItemThreshold] = useState("5");

  // Khata Input States
  const [khataName, setKhataName] = useState("");
  const [khataPhone, setKhataPhone] = useState("");
  const [khataAmount, setKhataAmount] = useState("");

  // OCR Invoice Scanner States
  const [ocrText, setOcrText] = useState("");
  const [ocrScanning, setOcrScanning] = useState(false);
  const [scannedItems, setScannedItems] = useState("");

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
    try {
      const res = await fetch(`${API_BASE}/store`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopName, ownerName, phone, email, address, gstin, upiId })
      });
      const data = await res.json();
      if (res.ok) {
        setStore(data);
        alert("Owner Profile updated successfully!");
      }
    } catch (err) {
      alert("Error updating owner profile.");
    }
  };

  const addToCart = (product) => {
    if (product.stock <= 0) return alert("Product is out of stock!");
    setCart(prev => {
      const existing = prev.find(item => item.inventoryId === product.id);
      if (existing) {
        return prev.map(item => 
          item.inventoryId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { inventoryId: product.id, name: product.name, unitPrice: Number(product.price), quantity: 1 }];
    });
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const cgst = subtotal * 0.025; // 2.5% CGST
  const sgst = subtotal * 0.025; // 2.5% SGST
  const totalGst = cgst + sgst;  // Total 5% GST breakdown
  const grandTotal = subtotal + totalGst;

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Cart is empty!");
    try {
      const res = await fetch(`${API_BASE}/pos/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName || "Walk-in Customer",
          items: cart,
          paymentMethod,
          subtotal,
          gst: totalGst,
          grandTotal
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Transaction recorded successfully!");
        setCart([]);
        setCustomerName("");
        fetchDashboard();
      } else {
        alert(`Checkout failed: ${data.error}`);
      }
    } catch (err) {
      alert("Network error processing transaction.");
    }
  };

  const handleAddInventory = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/inventory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newItemName,
          price: newItemPrice,
          stock: newItemStock,
          threshold: newItemThreshold
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

  const handleAddKhata = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/khata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: khataName, phone: khataPhone, balanceDue: khataAmount })
      });
      if (res.ok) {
        alert("Khata entry saved successfully!");
        setKhataName(""); setKhataPhone(""); setKhataAmount("");
        fetchDashboard();
      }
    } catch (err) {
      alert("Error updating Khata/Credit ledger.");
    }
  };

  const handleSimulateOCRScan = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setOcrScanning(true);
    setTimeout(() => {
      const parsedMockItems = [
        { name: "Cadbury Dairy Milk 10pk", price: 200, stock: 25, threshold: 5 },
        { name: "Bisleri Water Bottle 1L", price: 20, stock: 40, threshold: 10 }
      ];
      setScannedItems(parsedMockItems);
      setOcrText(`Scanned Invoice from Supplier: ${file.name}\n- Extracted 2 items successfully.`);
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
        alert(`Successfully imported ${item.name} into inventory!`);
        fetchDashboard();
      }
    } catch (err) {
      alert("Failed to import scanned item.");
    }
  };

  // Financial calculations
  const totalKhataDue = khataList.reduce((acc, k) => acc + Number(k.balanceDue || 0), 0);
  const totalInventoryValue = inventory.reduce((acc, i) => acc + (Number(i.price) * Number(i.stock || 0)), 0);
  const totalSalesRevenue = transactions.reduce((acc, t) => acc + Number(t.total || 0), 0);

  const theme = darkMode ? { bg: "#0f172a", card: "#1e293b", text: "#f8fafc", border: "#334155" } : { bg: "#f8fafc", card: "#ffffff", text: "#1e293b", border: "#e2e8f0" };

  return (
    <div style={{ fontFamily: "sans-serif", background: theme.bg, color: theme.text, minHeight: "100vh", padding: "20px" }}>
      
      {/* Header with Reordered and Renamed Navigation Tabs */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: theme.card, padding: "15px 25px", borderRadius: "10px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", marginBottom: "20px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "20px" }}>{store.shopName || "The Shopkeeper's Day"}</h1>
          <small style={{ opacity: 0.7 }}>Owner: {store.ownerName} | Ph: {store.phone}</small>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={() => setActiveTab("analytics")} style={tabStyle(activeTab === "analytics")}>Financial Analytics</button>
          <button onClick={() => setActiveTab("billing")} style={tabStyle(activeTab === "billing")}>Billing</button>
          <button onClick={() => setActiveTab("inventory")} style={tabStyle(activeTab === "inventory")}>Inventory</button>
          <button onClick={() => setActiveTab("ocr")} style={tabStyle(activeTab === "ocr")}>OCR Scanner</button>
          <button onClick={() => setActiveTab("khata")} style={tabStyle(activeTab === "khata")}>Khata/Credit</button>
          <button onClick={() => setActiveTab("profile")} style={tabStyle(activeTab === "profile")}>Owner Profile</button>
          <button onClick={() => setDarkMode(!darkMode)} style={{ padding: "8px 12px", background: theme.border, border: "none", borderRadius: "6px", cursor: "pointer", color: theme.text }}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      {/* TAB 1: ISOLATED FINANCIAL ANALYTICS WINDOW */}
      {activeTab === "analytics" && (
        <div style={{ background: theme.card, padding: "30px", borderRadius: "10px", maxWidth: "900px", margin: "0 auto" }}>
          <h2>Detailed Financial Breakdown</h2>
          <p style={{ opacity: 0.7, marginBottom: "25px" }}>Comprehensive health metrics and asset summaries for your retail store operations.</p>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "30px" }}>
            <div style={{ background: theme.bg, padding: "20px", borderRadius: "8px", borderLeft: "4px solid #ef4444" }}>
              <h4 style={{ margin: "0 0 10px 0" }}>Total Outstanding Credit</h4>
              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#ef4444", margin: 0 }}>₹{totalKhataDue.toFixed(2)}</p>
              <small style={{ opacity: 0.7 }}>Unpaid customer balances across {khataList.length} accounts.</small>
            </div>
            <div style={{ background: theme.bg, padding: "20px", borderRadius: "8px", borderLeft: "4px solid #4f46e5" }}>
              <h4 style={{ margin: "0 0 10px 0" }}>Inventory Valuation</h4>
              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#4f46e5", margin: 0 }}>₹{totalInventoryValue.toFixed(2)}</p>
              <small style={{ opacity: 0.7 }}>Total market worth of current stock on shelves.</small>
            </div>
            <div style={{ background: theme.bg, padding: "20px", borderRadius: "8px", borderLeft: "4px solid #10b981" }}>
              <h4 style={{ margin: "0 0 10px 0" }}>Total Sales Revenue</h4>
              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981", margin: 0 }}>₹{totalSalesRevenue.toFixed(2)}</p>
              <small style={{ opacity: 0.7 }}>Lifetime recorded completed sales volume.</small>
            </div>
          </div>

          <h3>Recent Store Transactions Ledger</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: `2px solid ${theme.border}` }}>
                <th style={thStyle}>Customer</th><th style={thStyle}>Payment Method</th><th style={thStyle}>Total Amount</th><th style={thStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <td style={tdStyle}>{t.customerName}</td>
                  <td style={tdStyle}>{t.paymentMethod}</td>
                  <td style={{ ...tdStyle, color: "#10b981", fontWeight: "bold" }}>₹{Number(t.total).toFixed(2)}</td>
                  <td style={tdStyle}>{new Date(t.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: BILLING DESK (With Explained GST) */}
      {activeTab === "billing" && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
          <div style={{ background: theme.card, padding: "20px", borderRadius: "10px" }}>
            <h3>Inventory Catalog (Click to add to cart)</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px", marginTop: "15px" }}>
              {inventory.map(item => {
                const isLowStock = item.stock <= item.threshold;
                return (
                  <div key={item.id} onClick={() => addToCart(item)} style={{ border: `1px solid ${isLowStock ? "#ef4444" : theme.border}`, padding: "12px", borderRadius: "8px", cursor: "pointer", background: item.stock > 0 ? theme.card : "#334155", position: "relative" }}>
                    {isLowStock && <span style={{ position: "absolute", top: "5px", right: "5px", background: "#ef4444", color: "#fff", fontSize: "10px", padding: "2px 5px", borderRadius: "4px" }}>Low Stock</span>}
                    <h4 style={{ margin: "0 0 6px 0" }}>{item.name}</h4>
                    <p style={{ margin: 0, color: "#10b981", fontWeight: "bold" }}>₹{Number(item.price).toFixed(2)}</p>
                    <small style={{ opacity: 0.7 }}>Stock: {item.stock} (Alert: {item.threshold})</small>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ background: theme.card, padding: "20px", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3>Active Cart</h3>
              <input type="text" placeholder="Customer Name" value={customerName} onChange={e => setCustomerName(e.target.value)} style={inputStyle(theme)} />
              <div style={{ maxHeight: "180px", overflowY: "auto", marginBottom: "15px" }}>
                {cart.length === 0 ? <p style={{ opacity: 0.5, fontSize: "13px" }}>Cart is empty. Click items from catalog.</p> : cart.map((c, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                    <span>{c.name} (x{c.quantity})</span>
                    <span>₹{(c.unitPrice * c.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: "10px", marginBottom: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", opacity: 0.8, marginTop: "4px" }}><span>CGST (2.5%):</span><span>₹{cgst.toFixed(2)}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", opacity: 0.8 }}><span>SGST (2.5%):</span><span>₹{sgst.toFixed(2)}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "600", marginTop: "2px", marginBottom: "6px" }}><span>Total Tax (5% GST):</span><span>₹{totalGst.toFixed(2)}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "16px", marginTop: "8px", borderTop: `1px dashed ${theme.border}`, paddingTop: "6px" }}><span>Grand Total:</span><span>₹{grandTotal.toFixed(2)}</span></div>
              </div>
              <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} style={{ ...inputStyle(theme), marginBottom: "12px" }}>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Khata / Credit">Khata / Credit</option>
              </select>
              <button onClick={handleCheckout} style={{ width: "100%", padding: "12px", background: "#10b981", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>Complete Checkout</button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INVENTORY MANAGEMENT */}
      {activeTab === "inventory" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
          <form onSubmit={handleAddInventory} style={{ background: theme.card, padding: "20px", borderRadius: "10px", height: "fit-content" }}>
            <h3>Add Product</h3>
            <label style={labelStyle}>Product Name</label>
            <input type="text" placeholder="e.g. Basmati Rice 5kg" value={newItemName} onChange={e => setNewItemName(e.target.value)} style={inputStyle(theme)} required />
            <label style={labelStyle}>Selling Price (₹)</label>
            <input type="number" step="0.01" value={newItemPrice} onChange={e => setNewItemPrice(e.target.value)} style={inputStyle(theme)} required />
            <label style={labelStyle}>Initial Stock Quantity</label>
            <input type="number" value={newItemStock} onChange={e => setNewItemStock(e.target.value)} style={inputStyle(theme)} required />
            <label style={labelStyle}>Low Stock Alert Threshold</label>
            <input type="number" value={newItemThreshold} onChange={e => setNewItemThreshold(e.target.value)} style={inputStyle(theme)} required />
            <button type="submit" style={{ width: "100%", padding: "10px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>Save Item</button>
          </form>

          <div style={{ background: theme.card, padding: "20px", borderRadius: "10px" }}>
            <h3>Inventory Stock Overview</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: `2px solid ${theme.border}` }}>
                  <th style={thStyle}>Name</th><th style={thStyle}>Price</th><th style={thStyle}>Stock</th><th style={thStyle}>Alert Limit</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => {
                  const isLow = item.stock <= item.threshold;
                  return (
                    <tr key={item.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                      <td style={tdStyle}>{item.name}</td>
                      <td style={tdStyle}>₹{Number(item.price).toFixed(2)}</td>
                      <td style={{ ...tdStyle, color: isLow ? "#ef4444" : "#10b981", fontWeight: "bold" }}>
                        {item.stock} {isLow && "⚠️ Low"}
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

      {/* TAB 4: OCR INVOICE SCANNER */}
      {activeTab === "ocr" && (
        <div style={{ background: theme.card, padding: "30px", borderRadius: "10px", maxWidth: "800px", margin: "0 auto" }}>
          <h2>OCR Supplier Invoice Scanner</h2>
          <p style={{ opacity: 0.7, marginBottom: "20px" }}>Upload a wholesaler invoice image to automatically parse items and restock inventory.</p>
          
          <div style={{ border: `2px dashed ${theme.border}`, padding: "30px", textAlign: "center", borderRadius: "8px", marginBottom: "20px" }}>
            <input type="file" accept="image/*" onChange={handleSimulateOCRScan} style={{ display: "none" }} id="invoice-upload" />
            <label htmlFor="invoice-upload" style={{ cursor: "pointer", background: "#4f46e5", color: "#fff", padding: "10px 20px", borderRadius: "6px", fontWeight: "bold" }}>Upload Invoice Image</label>
            {ocrScanning && <p style={{ marginTop: "15px", color: "#4f46e5" }}>Scanning invoice text via OCR...</p>}
          </div>

          {ocrText && (
            <div style={{ background: theme.bg, padding: "15px", borderRadius: "6px", marginBottom: "20px", whiteSpace: "pre-line", fontSize: "14px" }}>
              {ocrText}
            </div>
          )}

          {scannedItems.length > 0 && (
            <div>
              <h4>Extracted Items Ready for Import:</h4>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: `2px solid ${theme.border}` }}>
                    <th style={thStyle}>Product Name</th><th style={thStyle}>Price</th><th style={thStyle}>Stock Qty</th><th style={thStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {scannedItems.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: `1px solid ${theme.border}` }}>
                      <td style={tdStyle}>{item.name}</td>
                      <td style={tdStyle}>₹{item.price}</td>
                      <td style={tdStyle}>{item.stock}</td>
                      <td style={tdStyle}>
                        <button onClick={() => handleImportScannedItem(item)} style={{ background: "#10b981", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Import to Inventory</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: KHATA / CREDIT LEDGER */}
      {activeTab === "khata" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
          <form onSubmit={handleAddKhata} style={{ background: theme.card, padding: "20px", borderRadius: "10px", height: "fit-content" }}>
            <h3>Add / Update Credit Account</h3>
            <label style={labelStyle}>Customer Name</label>
            <input type="text" placeholder="e.g. Ramesh Verma" value={khataName} onChange={e => setKhataName(e.target.value)} style={inputStyle(theme)} required />
            <label style={labelStyle}>Phone Number</label>
            <input type="text" placeholder="9876543210" value={khataPhone} onChange={e => setKhataPhone(e.target.value)} style={inputStyle(theme)} required />
            <label style={labelStyle}>Amount Due (₹)</label>
            <input type="number" step="0.01" placeholder="500" value={khataAmount} onChange={e => setKhataAmount(e.target.value)} style={inputStyle(theme)} required />
            <button type="submit" style={{ width: "100%", padding: "10px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>Save Khata Entry</button>
          </form>

          <div style={{ background: theme.card, padding: "20px", borderRadius: "10px" }}>
            <h3>Khata / Credit Ledger</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: `2px solid ${theme.border}` }}>
                  <th style={thStyle}>Customer Name</th><th style={thStyle}>Phone</th><th style={thStyle}>Balance Due</th>
                </tr>
              </thead>
              <tbody>
                {khataList.map(k => (
                  <tr key={k.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                    <td style={tdStyle}>{k.customer}</td>
                    <td style={tdStyle}>{k.phone}</td>
                    <td style={{ ...tdStyle, color: "#ef4444", fontWeight: "bold" }}>₹{Number(k.balanceDue).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: OWNER PROFILE */}
      {activeTab === "profile" && (
        <div style={{ background: theme.card, padding: "30px", borderRadius: "10px", maxWidth: "700px", margin: "0 auto" }}>
          <h2>Store Owner Profile</h2>
          <p style={{ opacity: 0.7, marginBottom: "20px" }}>Configure your business credentials, billing header, and contact data.</p>
          <form onSubmit={handleUpdateProfile}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div>
                <label style={labelStyle}>Shop / Business Name</label>
                <input type="text" value={shopName} onChange={e => setShopName(e.target.value)} style={inputStyle(theme)} required />
              </div>
              <div>
                <label style={labelStyle}>Owner Name</label>
                <input type="text" value={ownerName} onChange={e => setOwnerName(e.target.value)} style={inputStyle(theme)} required />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle(theme)} required />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle(theme)} />
              </div>
              <div>
                <label style={labelStyle}>GSTIN Number</label>
                <input type="text" value={gstin} onChange={e => setGstin(e.target.value)} style={inputStyle(theme)} />
              </div>
              <div>
                <label style={labelStyle}>UPI ID (for QR billing)</label>
                <input type="text" value={upiId} onChange={e => setUpiId(e.target.value)} style={inputStyle(theme)} />
              </div>
            </div>
            <div style={{ marginTop: "15px" }}>
              <label style={labelStyle}>Store Address</label>
              <textarea value={address} onChange={e => setAddress(e.target.value)} style={{ ...inputStyle(theme), height: "80px", resize: "vertical" }} />
            </div>
            <button type="submit" style={{ marginTop: "15px", width: "100%", padding: "12px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>Save Profile Settings</button>
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