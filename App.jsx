import React, { useState, useEffect } from 'react';

// Backend URL configured for your sync system
const BACKEND_URL = "https://friendly-capybara-vpg4w9j55qqgcx67p-3000.app.github.dev";

export default function ShopkeeperApp() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Core App States
  const [inventory, setInventory] = useState([
    { id: 1, name: "Basmati Rice (5kg)", category: "Grains", stock: 45, price: 550 },
    { id: 2, name: "Toor Dal (1kg)", category: "Pulses", stock: 30, price: 140 },
    { id: 3, name: "Sunflower Oil (1L)", category: "Oils", stock: 15, price: 130 },
  ]);

  const [khataLedger, setKhataLedger] = useState([
    { id: 101, customer: "Ramesh Kumar", phone: "9876543210", amount: 450, type: "Due" },
    { id: 102, customer: "Sunita Sharma", phone: "9123456789", amount: 1200, type: "Paid" }
  ]);

  const [posCart, setPosCart] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", category: "", stock: "", price: "" });
  const [newKhata, setNewKhata] = useState({ customer: "", phone: "", amount: "", type: "Due" });
  const [receiptScanResult, setReceiptScanResult] = useState(null);

  // ==========================================
  // SYNC & OFFLINE QUEUE ENGINE (Part 2 Integration)
  // ==========================================
  
  // Save offline actions locally
  const queueAction = (type, actionData) => {
    let queue = JSON.parse(localStorage.getItem("offline_queue")) || [];
    queue.push({
      id: Date.now(),
      type: type,
      data: actionData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("offline_queue", JSON.stringify(queue));
    console.log(`Action [${type}] saved to local offline queue.`);
  };

  // Flush local queue to backend when reconnected
  const flushQueue = async () => {
    let queue = JSON.parse(localStorage.getItem("offline_queue")) || [];
    if (queue.length === 0) return;

    console.log(`Connection restored! Attempting to sync ${queue.length} items...`);

    for (let i = 0; i < queue.length; i++) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/sync`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(queue[i])
        });

        if (response.ok) {
          queue.splice(i, 1);
          i--;
          localStorage.setItem("offline_queue", JSON.stringify(queue));
        } else {
          break;
        }
      } catch (error) {
        console.log("Sync interrupted: Connection lost again.");
        break;
      }
    }
  };

  // Monitor network state changes
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      flushQueue();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ==========================================
  // INTEGRATED SUBMISSION HANDLERS
  // ==========================================

  // 1. Inventory Handler with Offline Fallback
  const handleAddInventory = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.stock || !newItem.price) return;
    
    const itemPayload = { 
      id: Date.now(), 
      ...newItem, 
      stock: Number(newItem.stock), 
      price: Number(newItem.price) 
    };

    setInventory([itemPayload, ...inventory]);

    if (navigator.onLine) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/sync`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "ADD_INVENTORY", data: itemPayload })
        });
        if (!response.ok) throw new Error("Server error");
        alert("Item added and synced online successfully!");
      } catch (error) {
        queueAction("ADD_INVENTORY", itemPayload);
        alert("Network dropped! Item saved locally and queued for sync.");
      }
    } else {
      queueAction("ADD_INVENTORY", itemPayload);
      alert("Offline mode: Item saved locally. Will sync automatically when online.");
    }

    setNewItem({ name: "", category: "", stock: "", price: "" });
  };

  // 2. Khata Ledger Handler with Offline Fallback
  const handleAddKhata = async (e) => {
    e.preventDefault();
    if (!newKhata.customer || !newKhata.amount) return;
    
    const khataPayload = { 
      id: Date.now(), 
      ...newKhata, 
      amount: Number(newKhata.amount) 
    };

    setKhataLedger([khataPayload, ...khataLedger]);

    if (navigator.onLine) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/sync`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "ADD_KHATA", data: khataPayload })
        });
        if (!response.ok) throw new Error("Server error");
        alert("Khata entry added and synced successfully!");
      } catch (error) {
        queueAction("ADD_KHATA", khataPayload);
        alert("Network dropped! Khata saved locally and queued.");
      }
    } else {
      queueAction("ADD_KHATA", khataPayload);
      alert("Offline mode: Khata saved locally. Will sync when reconnected.");
    }

    setNewKhata({ customer: "", phone: "", amount: "", type: "Due" });
  };

  // 3. POS Checkout Handler with Offline Fallback
  const handleCompleteCheckout = async () => {
    if (posCart.length === 0) return;
    
    const totalAmount = posCart.reduce((sum, i) => sum + i.price, 0);
    const billPayload = {
      billId: `BILL-${Date.now()}`,
      items: posCart,
      total: totalAmount,
      createdAt: new Date().toISOString()
    };

    if (navigator.onLine) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/sync`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "POS_BILL", data: billPayload })
        });
        if (!response.ok) throw new Error("Sync failed");
        alert("Bill completed and synced online!");
      } catch (err) {
        queueAction("POS_BILL", billPayload);
        alert("Connection lost during checkout. Bill saved offline.");
      }
    } else {
      queueAction("POS_BILL", billPayload);
      alert("Offline mode: Bill saved locally. Will sync when reconnected.");
    }

    setPosCart([]);
  };

  const simulateScanReceipt = () => {
    setReceiptScanResult({
      vendor: "Metro Wholesale",
      total: 2450,
      itemsFound: 4,
      date: new Date().toLocaleDateString()
    });
  };

  return (
    <div style={styles.appContainer}>
      {/* Top Bar Header */}
      <header style={styles.header}>
        <h1>🛒 Shopkeeper's Dashboard</h1>
        <div style={{ ...styles.badge, backgroundColor: isOnline ? '#d4edda' : '#f8d7da', color: isOnline ? '#155724' : '#721c24' }}>
          {isOnline ? "🟢 Online Mode" : "🔴 Offline - Sync Queued"}
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav style={styles.navTabs}>
        <button style={{ ...styles.tabBtn, backgroundColor: activeTab === 'inventory' ? '#007BFF' : '#e0e0e0', color: activeTab === 'inventory' ? '#fff' : '#333' }} onClick={() => setActiveTab('inventory')}>📦 Inventory</button>
        <button style={{ ...styles.tabBtn, backgroundColor: activeTab === 'pos' ? '#007BFF' : '#e0e0e0', color: activeTab === 'pos' ? '#fff' : '#333' }} onClick={() => setActiveTab('pos')}>💰 POS Billing</button>
        <button style={{ ...styles.tabBtn, backgroundColor: activeTab === 'khata' ? '#007BFF' : '#e0e0e0', color: activeTab === 'khata' ? '#fff' : '#333' }} onClick={() => setActiveTab('khata')}>📒 Khata Ledger</button>
        <button style={{ ...styles.tabBtn, backgroundColor: activeTab === 'scanner' ? '#007BFF' : '#e0e0e0', color: activeTab === 'scanner' ? '#fff' : '#333' }} onClick={() => setActiveTab('scanner')}>📷 Receipt Scanner</button>
      </nav>

      {/* Main Content Sections */}
      <main style={styles.mainContent}>
        
        {/* 1. INVENTORY SECTION */}
        {activeTab === 'inventory' && (
          <div>
            <h3>Inventory Management</h3>
            <form onSubmit={handleAddInventory} style={styles.form}>
              <input type="text" placeholder="Item Name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} style={styles.input} required />
              <input type="text" placeholder="Category" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} style={styles.input} required />
              <input type="number" placeholder="Stock" value={newItem.stock} onChange={e => setNewItem({...newItem, stock: e.target.value})} style={styles.input} required />
              <input type="number" placeholder="Price (₹)" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} style={styles.input} required />
              <button type="submit" style={styles.btnPrimary}>Add Item</button>
            </form>

            <div style={styles.scrollContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.stickyHeader}><th style={styles.th}>Name</th><th style={styles.th}>Category</th><th style={styles.th}>Stock</th><th style={styles.th}>Price</th></tr>
                </thead>
                <tbody>
                  {inventory.map(item => (
                    <tr key={item.id} style={styles.tr}>
                      <td style={styles.td}>{item.name}</td>
                      <td style={styles.td}>{item.category}</td>
                      <td style={styles.td}>{item.stock}</td>
                      <td style={styles.td}>₹{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. POS BILLING SECTION */}
        {activeTab === 'pos' && (
          <div>
            <h3>POS Billing & GST System</h3>
            <p style={{fontSize: '14px', color: '#666'}}>Select items from inventory to compile a quick bill.</p>
            <div style={styles.scrollContainer}>
              {inventory.map(item => (
                <div key={item.id} style={styles.posItemCard}>
                  <span>{item.name} - ₹{item.price}</span>
                  <button style={styles.btnSmall} onClick={() => setPosCart([...posCart, item])}>Add to Bill</button>
                </div>
              ))}
            </div>
            <div style={styles.billSummary}>
              <h4>Current Bill Total: ₹{posCart.reduce((sum, i) => sum + i.price, 0)}</h4>
              <button style={styles.btnPrimary} onClick={handleCompleteCheckout}>Complete Checkout</button>
            </div>
          </div>
        )}

        {/* 3. KHATA LEDGER SECTION */}
        {activeTab === 'khata' && (
          <div>
            <h3>Khata Credit Ledger</h3>
            <form onSubmit={handleAddKhata} style={styles.form}>
              <input type="text" placeholder="Customer Name" value={newKhata.customer} onChange={e => setNewKhata({...newKhata, customer: e.target.value})} style={styles.input} required />
              <input type="text" placeholder="Phone Number" value={newKhata.phone} onChange={e => setNewKhata({...newKhata, phone: e.target.value})} style={styles.input} />
              <input type="number" placeholder="Amount (₹)" value={newKhata.amount} onChange={e => setNewKhata({...newKhata, amount: e.target.value})} style={styles.input} required />
              <select value={newKhata.type} onChange={e => setNewKhata({...newKhata, type: e.target.value})} style={styles.input}>
                <option value="Due">Due</option>
                <option value="Paid">Paid</option>
              </select>
              <button type="submit" style={styles.btnPrimary}>Add Khata</button>
            </form>

            <div style={styles.scrollContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.stickyHeader}><th style={styles.th}>Customer</th><th style={styles.th}>Phone</th><th style={styles.th}>Amount</th><th style={styles.th}>Status</th></tr>
                </thead>
                <tbody>
                  {khataLedger.map(k => (
                    <tr key={k.id} style={styles.tr}>
                      <td style={styles.td}>{k.customer}</td>
                      <td style={styles.td}>{k.phone || 'N/A'}</td>
                      <td style={styles.td}>₹{k.amount}</td>
                      <td style={{...styles.td, color: k.type === 'Due' ? 'red' : 'green'}}>{k.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. RECEIPT SCANNER SECTION */}
        {activeTab === 'scanner' && (
          <div style={{textAlign: 'center', padding: '20px'}}>
            <h3>AI Receipt Scanner</h3>
            <p>Upload or snap a wholesale vendor bill to auto-populate inventory.</p>
            <button style={styles.btnPrimary} onClick={simulateScanReceipt}>Simulate Scanning Receipt</button>
            {receiptScanResult && (
              <div style={styles.scanBox}>
                <h4>Receipt Processed Successfully!</h4>
                <p>Vendor: {receiptScanResult.vendor}</p>
                <p>Total Items Detected: {receiptScanResult.itemsFound}</p>
                <p>Total Amount: ₹{receiptScanResult.total}</p>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}

// Styles Layout
const styles = {
  appContainer: { maxWidth: '950px', margin: '20px auto', fontFamily: 'Arial, sans-serif', padding: '15px', backgroundColor: '#fcfcfc', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eaeaea', paddingBottom: '10px' },
  badge: { padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' },
  navTabs: { display: 'flex', gap: '10px', margin: '20px 0', flexWrap: 'wrap' },
  tabBtn: { padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  mainContent: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' },
  form: { display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' },
  input: { padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', flex: '1 1 140px' },
  btnPrimary: { padding: '9px 18px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  scrollContainer: { maxHeight: '350px', overflowY: 'auto', border: '1px solid #eaeaea', borderRadius: '6px' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  stickyHeader: { position: 'sticky', top: 0, backgroundColor: '#f8f9fa' },
  th: { padding: '10px', borderBottom: '2px solid #ddd', fontSize: '13px' },
  tr: { borderBottom: '1px solid #f1f1f1' },
  td: { padding: '10px', fontSize: '13px', color: '#444' },
  posItemCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' },
  btnSmall: { padding: '5px 10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  billSummary: { marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '6px', textAlign: 'right' },
  scanBox: { marginTop: '20px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '6px', display: 'inline-block', textAlign: 'left' }
};