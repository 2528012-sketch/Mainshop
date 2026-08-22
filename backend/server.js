require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-shopkeeper-key-2026';

// --- MIDDLEWARE ---
app.use(express.json());
app.use(cors());

// --- MONGODB CONNECTION ---
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopkeeperDB', {
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));


// ==========================================
// 1. DATABASE SCHEMAS & MODELS
// ==========================================

// User Auth Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// Inventory Schema
const inventorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, default: 'General' }
});
const Inventory = mongoose.model('Inventory', inventorySchema);

// Transaction (Billing) Schema
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: Array,
  totalAmount: Number,
  paymentMethod: { type: String, enum: ['CASH', 'UPI', 'KHATA'] },
  date: { type: Date, default: Date.now }
});
const Transaction = mongoose.model('Transaction', transactionSchema);

// Khata (Credit Ledger) Schema
const khataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: String,
  phone: String,
  dueAmount: Number,
  status: { type: String, enum: ['UNPAID', 'PAID'], default: 'UNPAID' },
  date: { type: Date, default: Date.now }
});
const Khata = mongoose.model('Khata', khataSchema);


// ==========================================
// 2. AUTHENTICATION ROUTES (Public)
// ==========================================

// Sign Up Route
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ error: 'Username or email already exists.' });

    // Hash password and save
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find User
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials.' });

    // Verify Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials.' });

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });

    res.json({ message: 'Login successful', token, username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login.' });
  }
});


// ==========================================
// 3. AUTH MIDDLEWARE (Protects Routes below)
// ==========================================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
    req.user = user; // Attach user info (userId) to request
    next();
  });
};


// ==========================================
// 4. PROTECTED API ROUTES (Requires Login)
// ==========================================

// --- INVENTORY ROUTES ---
app.get('/api/inventory', authenticateToken, async (req, res) => {
  try {
    const items = await Inventory.find({ userId: req.user.userId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

app.post('/api/inventory', authenticateToken, async (req, res) => {
  try {
    const newItem = new Inventory({ ...req.body, userId: req.user.userId });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// --- BILLING / TRANSACTION ROUTES ---
app.post('/api/billing', authenticateToken, async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, customerDetails } = req.body;

    // 1. Save Transaction
    const newTx = new Transaction({ 
      userId: req.user.userId, 
      items, 
      totalAmount, 
      paymentMethod 
    });
    await newTx.save();

    // 2. Reduce Stock in Inventory
    for (let item of items) {
      await Inventory.findByIdAndUpdate(item._id, { $inc: { stock: -item.qty } });
    }

    // 3. If Khata (Credit), create ledger entry
    if (paymentMethod === 'KHATA') {
      const newKhata = new Khata({
        userId: req.user.userId,
        customerName: customerDetails.name,
        phone: customerDetails.phone,
        dueAmount: totalAmount
      });
      await newKhata.save();
    }

    res.status(201).json({ message: 'Checkout successful!', transaction: newTx });
  } catch (err) {
    res.status(500).json({ error: 'Checkout failed' });
  }
});

// --- KHATA / LEDGER ROUTES ---
app.get('/api/khata', authenticateToken, async (req, res) => {
  try {
    const khataList = await Khata.find({ userId: req.user.userId, status: 'UNPAID' });
    res.json(khataList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Khata records' });
  }
});

app.post('/api/khata/pay/:id', authenticateToken, async (req, res) => {
  try {
    await Khata.findByIdAndUpdate(req.params.id, { status: 'PAID' });
    res.json({ message: 'Khata marked as paid!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update Khata status' });
  }
});

// --- START SERVER ---
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));