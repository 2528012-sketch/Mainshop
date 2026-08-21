const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-Memory Database Stores
let storeProfile = {
  shopName: "General Store / किराना स्टोर",
  ownerName: "Rajesh Sharma",
  phone: "9876543210",
  email: "rajesh@store.com",
  address: "123 Market Street, New Delhi",
  gstin: "07AAAAA0000A1Z5",
  upiId: "rajesh@upi"
};

let inventory = [
  { id: 1, name: "Basmati Rice 5kg", price: 450, stock: 12, threshold: 5 },
  { id: 2, name: "Sugar 1kg", price: 55, stock: 3, threshold: 5 },
  { id: 3, name: "Toor Dal 1kg", price: 130, stock: 15, threshold: 4 }
];

let transactions = [
  {
    id: 1,
    customerName: "Amit Kumar",
    items: [{ name: "Sugar 1kg", quantity: 2, unitPrice: 55 }],
    paymentMethod: "Cash",
    subtotal: 110,
    gst: 5.5,
    total: 115.5,
    createdAt: new Date().toISOString()
  }
];

let khataRecords = [
  { id: 1, customer: "Ramesh Verma", phone: "9123456780", balanceDue: 450 }
];

// Helper validation for 10-digit phone number
const isValidPhone = (phone) => {
  if (!phone) return true;
  const cleanPhone = String(phone).trim();
  return /^\d{10}$/.test(cleanPhone);
};

// 1. Get Dashboard Summary
app.get("/api/dashboard", (req, res) => {
  const sanitizedInventory = inventory.map(item => ({
    ...item,
    stock: Math.max(0, Number(item.stock) || 0)
  }));

  res.json({
    store: storeProfile,
    inventory: sanitizedInventory,
    transactions,
    khataRecords
  });
});

// 2. Update Store Profile (Address & GSTIN now compulsory)
app.put("/api/store", (req, res) => {
  const { ownerName, phone, shopName, address, gstin } = req.body;
  if (!shopName || !ownerName || !address || !address.trim() || !gstin || !gstin.trim()) {
    return res.status(400).json({ error: "Shop name, Owner name, Address, and GSTIN are compulsory." });
  }
  if (phone && !isValidPhone(phone)) {
    return res.status(400).json({ error: "Phone number must be exactly 10 digits." });
  }
  storeProfile = { ...storeProfile, ...req.body };
  res.json(storeProfile);
});

// 3. Add Inventory Item
app.post("/api/inventory", (req, res) => {
  const { name, price, stock, threshold } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Product name is compulsory." });
  }
  const newItem = {
    id: Date.now(),
    name: name.trim(),
    price: Number(price),
    stock: Math.max(0, Number(stock)),
    threshold: Number(threshold || 5)
  };
  inventory.push(newItem);
  res.status(201).json(newItem);
});

// 4. Update Inventory Item
app.put("/api/inventory/:id", (req, res) => {
  const itemId = Number(req.params.id);
  const { name, price, stock, threshold } = req.body;
  
  const item = inventory.find(i => i.id === itemId);
  if (!item) return res.status(404).json({ error: "Item not found" });

  if (name !== undefined) {
    if (!name.trim()) return res.status(400).json({ error: "Product name cannot be empty." });
    item.name = name.trim();
  }
  if (price !== undefined) item.price = Number(price);
  if (stock !== undefined) item.stock = Math.max(0, Number(stock));
  if (threshold !== undefined) item.threshold = Number(threshold);

  res.json(item);
});

// 5. Checkout & Safely Deduct Stock (Khata checkout skips transaction ledger)
app.post("/api/pos/checkout", (req, res) => {
  const { customerName, phone, items, paymentMethod, subtotal, gst, grandTotal } = req.body;
  
  if (!customerName || !customerName.trim()) {
    return res.status(400).json({ error: "Customer name is compulsory for checkout." });
  }
  if (!items || items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  for (let cartItem of items) {
    const invItem = inventory.find(i => i.id === cartItem.inventoryId);
    if (!invItem) {
      return res.status(404).json({ error: `Product ID ${cartItem.inventoryId} not found` });
    }
    if (invItem.stock < cartItem.quantity) {
      return res.status(400).json({ error: `Insufficient stock for ${invItem.name}. Available: ${invItem.stock}` });
    }
  }

  items.forEach(cartItem => {
    const invItem = inventory.find(i => i.id === cartItem.inventoryId);
    if (invItem) {
      invItem.stock = Math.max(0, invItem.stock - cartItem.quantity);
    }
  });

  // Only record in transactions if payment method is NOT Khata / Credit
  if (paymentMethod !== "Khata / Credit") {
    const newTransaction = {
      id: Date.now(),
      customerName: customerName.trim(),
      items,
      paymentMethod,
      subtotal,
      gst,
      total: grandTotal,
      createdAt: new Date().toISOString()
    };
    transactions.unshift(newTransaction);
  }

  // If payment method is Khata / Credit, update customer credit balance
  if (paymentMethod === "Khata / Credit") {
    const existingKhata = khataRecords.find(k => k.customer.toLowerCase() === customerName.trim().toLowerCase());
    if (existingKhata) {
      existingKhata.balanceDue = Number(existingKhata.balanceDue) + Number(grandTotal);
      if (phone && isValidPhone(phone)) existingKhata.phone = phone.trim();
    } else {
      khataRecords.push({
        id: Date.now(),
        customer: customerName.trim(),
        phone: phone && isValidPhone(phone) ? phone.trim() : "N/A",
        balanceDue: Number(grandTotal)
      });
    }
  }

  res.status(201).json({ message: "Checkout processed successfully" });
});

// 6. Add Khata Record
app.post("/api/khata", (req, res) => {
  const { customer, phone, balanceDue } = req.body;
  if (!customer || !customer.trim()) {
    return res.status(400).json({ error: "Customer name is compulsory for Khata entry." });
  }
  if (phone && !isValidPhone(phone)) {
    return res.status(400).json({ error: "Phone number must be exactly 10 digits." });
  }

  const cleanCustomer = customer.trim();
  const existing = khataRecords.find(k => k.customer.toLowerCase() === cleanCustomer.toLowerCase());
  
  if (existing) {
    existing.balanceDue = Number(existing.balanceDue) + Number(balanceDue);
    if (phone && isValidPhone(phone)) existing.phone = phone.trim();
    return res.status(200).json(existing);
  }

  const newKhata = {
    id: Date.now(),
    customer: cleanCustomer,
    phone: phone && isValidPhone(phone) ? phone.trim() : "N/A",
    balanceDue: Number(balanceDue)
  };
  khataRecords.push(newKhata);
  res.status(201).json(newKhata);
});

// 7. Delete/Settle Khata Record (Mark as Paid -> Records green income in transactions)
app.delete("/api/khata/:id", (req, res) => {
  const khataId = Number(req.params.id);
  const targetKhata = khataRecords.find(k => k.id === khataId);

  if (!targetKhata) {
    return res.status(404).json({ error: "Khata record not found" });
  }

  // Push settlement to transactions ledger as incoming money
  transactions.unshift({
    id: Date.now(),
    customerName: `${targetKhata.customer} (Khata Settled)`,
    items: [],
    paymentMethod: "Khata Settlement",
    subtotal: targetKhata.balanceDue,
    gst: 0,
    total: targetKhata.balanceDue,
    createdAt: new Date().toISOString()
  });

  khataRecords = khataRecords.filter(k => k.id !== khataId);
  res.json({ message: "Khata marked as paid, removed, and logged into transactions successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));