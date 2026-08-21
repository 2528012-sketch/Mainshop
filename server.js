const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json()); // Crucial: Parses incoming JSON payloads
app.use(cors());

// Setup SQLite database connection
const db = new sqlite3.Database('./shop.db', (err) => {
  if (err) console.error('Error opening database', err.message);
  else console.log('Connected to SQLite database.');
});

// Create tables if they don't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS store (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shopName TEXT,
    ownerName TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    gstin TEXT,
    upiId TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    stock INTEGER,
    threshold INTEGER
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerName TEXT,
    paymentMethod TEXT,
    subtotal REAL,
    gst REAL,
    total REAL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS khata (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer TEXT,
    phone TEXT,
    balanceDue REAL
  )`);
  
  // Seed default store profile if empty
  db.get(`SELECT COUNT(*) as count FROM store`, (err, row) => {
    if (row && row.count === 0) {
      db.run(`INSERT INTO store (shopName, ownerName, phone, email, address, gstin, upiId) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ["The Shopkeeper's Day", "Store Owner", "9876543210", "owner@shop.com", "Main Market", "27AAAAA0000A1Z5", "shop@upi"]);
    }
  });
});

// Dashboard data route
app.get('/api/dashboard', (req, res) => {
  db.get(`SELECT * FROM store LIMIT 1`, (err, store) => {
    db.all(`SELECT * FROM inventory`, (err, inventory) => {
      db.all(`SELECT * FROM transactions ORDER BY createdAt DESC`, (err, transactions) => {
        db.all(`SELECT * FROM khata`, (err, khataRecords) => {
          res.json({ store, inventory, transactions, khataRecords });
        });
      });
    });
  });
});

// Update Owner Profile route
app.put('/api/store', (req, res) => {
  const { shopName, ownerName, phone, email, address, gstin, upiId } = req.body;
  db.run(`UPDATE store SET shopName = ?, ownerName = ?, phone = ?, email = ?, address = ?, gstin = ?, upiId = ? WHERE id = 1`,
    [shopName, ownerName, phone, email, address, gstin, upiId], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get(`SELECT * FROM store LIMIT 1`, (err, store) => {
        res.json(store);
      });
    });
});

// Add Inventory Route (Safely parses numbers)
app.post('/api/inventory', (req, res) => {
  let { name, price, stock, threshold } = req.body;
  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({ error: "Missing required inventory parameters" });
  }

  const parsedPrice = Number(price);
  const parsedStock = Number(stock);
  const parsedThreshold = Number(threshold || 5);

  db.run(`INSERT INTO inventory (name, price, stock, threshold) VALUES (?, ?, ?, ?)`,
    [name, parsedPrice, parsedStock, parsedThreshold], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, price: parsedPrice, stock: parsedStock, threshold: parsedThreshold });
    });
});

// Add Khata / Credit entry
app.post('/api/khata', (req, res) => {
  const { customer, phone, balanceDue } = req.body;
  db.run(`INSERT INTO khata (customer, phone, balanceDue) VALUES (?, ?, ?)`,
    [customer, phone, Number(balanceDue)], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, customer, phone, balanceDue: Number(balanceDue) });
    });
});

// POS Checkout route
app.post('/api/pos/checkout', (req, res) => {
  const { customerName, items, paymentMethod, subtotal, gst, grandTotal } = req.body;
  db.run(`INSERT INTO transactions (customerName, paymentMethod, subtotal, gst, total) VALUES (?, ?, ?, ?, ?)`,
    [customerName, paymentMethod, subtotal, gst, grandTotal], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      const txId = this.lastID;
      
      items.forEach(item => {
        db.run(`UPDATE inventory SET stock = stock - ? WHERE id = ?`, [item.quantity, item.inventoryId]);
      });
      
      res.json({ success: true, transactionId: txId });
    });
});

app.listen(5000, () => {
  console.log('Backend server running on port 5000');
});