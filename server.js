const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/shopkeeper_complete_db')
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// ================= SCHEMAS =================
const transactionSchema = new mongoose.Schema({
  store: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['CREDIT', 'DEBIT'], required: true },
  phoneNumber: { type: String, required: true },
  displayAmount: { type: String, required: true },
  date: { type: Date, default: Date.now }
});
const Transaction = mongoose.model('Transaction', transactionSchema);

const inventorySchema = new mongoose.Schema({
  name: { type: Map, of: String, required: true }, // { en: '', hi: '' }
  sku: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  threshold: { type: Number, default: 5 }
});
const Inventory = mongoose.model('Inventory', inventorySchema);

const khataSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  balance: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});
const Khata = mongoose.model('Khata', khataSchema);

const profileSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  ownerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  gstin: { type: String, required: true }
});
const Profile = mongoose.model('Profile', profileSchema);

// ================= API ROUTES =================

// 1. Transactions Ledger
app.get('/api/transactions', async (req, res) => {
  try {
    const lang = req.query.lang || 'en';
    const txs = await Transaction.find().sort({ date: -1 });
    const formatted = txs.map(t => ({
      id: t._id,
      store: t.store,
      phoneNumber: t.phoneNumber,
      type: t.type,
      displayAmount: t.displayAmount,
      date: t.date
    }));
    res.json({ success: true, data: formatted });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POS Checkout / Transaction Creation
app.post('/api/transactions', async (req, res) => {
  try {
    const { storeNames, amount, type, phoneNumber, paymentMethod, customerName } = req.body;
    
    if (!phoneNumber || !phoneNumber.trim()) {
      return res.status(400).json({ success: false, error: 'Customer phone number is compulsory!' });
    }

    // Exclude Credit Checkouts from immediate cash sales revenue ledger
    if (paymentMethod === 'KHATA') {
      await Khata.create({
        customerName: customerName || 'Credit Customer',
        phoneNumber,
        balance: amount
      });
      return res.json({ success: true, message: 'Added to Khata ledger successfully and omitted from immediate sales.' });
    }

    const displayAmountSymbol = type === 'CREDIT' ? '+' : '-';
    const tx = await Transaction.create({
      store: storeNames?.en || 'Main Store',
      amount,
      type,
      phoneNumber,
      displayAmount: `${displayAmountSymbol}$${amount.toFixed(2)}`
    });

    res.json({ success: true, data: tx });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Inventory Management
app.get('/api/inventory', async (req, res) => {
  try {
    const lang = req.query.lang || 'en';
    const items = await Inventory.find();
    const formatted = items.map(i => ({
      id: i._id,
      name: i.name instanceof Map ? i.name.get(lang) || i.name.get('en') : (i.name[lang] || i.name.en || i.name),
      sku: i.sku,
      price: i.price,
      stock: i.stock,
      category: i.category,
      threshold: i.threshold
    }));
    res.json({ success: true, data: formatted });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/inventory', async (req, res) => {
  try {
    const { itemNames, sku, price, stock, category, threshold } = req.body;
    const item = await Inventory.create({
      name: itemNames,
      sku,
      price,
      stock,
      category,
      threshold: threshold || 5
    });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Khata / Credit Ledger & Settlement
app.get('/api/khata', async (req, res) => {
  try {
    const khataList = await Khata.find();
    res.json({ success: true, data: khataList });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Khata Settlement: Mark as paid -> removes credit entry and records green settlement transaction in ledger
app.delete('/api/khata/:id', async (req, res) => {
  try {
    const khataRecord = await Khata.findById(req.params.id);
    if (!khataRecord) {
      return res.status(404).json({ success: false, error: 'Khata record not found' });
    }

    await Transaction.create({
      store: 'Khata Settlement Received',
      amount: khataRecord.balance,
      type: 'CREDIT',
      phoneNumber: khataRecord.phoneNumber,
      displayAmount: `+$${khataRecord.balance.toFixed(2)}`
    });

    await Khata.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Khata settlement recorded successfully in transactions ledger.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Financial Reports
app.get('/api/reports/financial', async (req, res) => {
  try {
    const txs = await Transaction.find();
    let totalRevenue = 0;
    let totalExpenses = 0;

    txs.forEach(t => {
      if (t.type === 'CREDIT') totalRevenue += t.amount;
      if (t.type === 'DEBIT') totalExpenses += t.amount;
    });

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalExpenses,
        netBalance: totalRevenue - totalExpenses,
        totalTransactions: txs.length
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. OCR Scanner Simulation
app.post('/api/ocr/scan', (req, res) => {
  res.json({
    success: true,
    data: {
      extractedStore: 'Automated Receipt Supermart',
      extractedAmount: 250.00,
      extractedPhone: '+919876543210'
    }
  });
});

// 6. Shop Profile (Compulsory Address and GSTIN)
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne() || {
      shopName: 'My Retail Store',
      ownerName: 'Admin',
      phone: '+91 9876543210',
      address: '',
      gstin: ''
    };
    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/profile', async (req, res) => {
  try {
    const { shopName, ownerName, phone, address, gstin } = req.body;
    
    if (!address || !address.trim() || !gstin || !gstin.trim()) {
      return res.status(400).json({ success: false, error: 'Shop Address and GSTIN are strictly compulsory before saving changes.' });
    }

    await Profile.deleteMany({});
    const profile = await Profile.create({ shopName, ownerName, phone, address, gstin });
    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => console.log('Enterprise Backend running smoothly on port 5000'));