import Dexie from 'dexie';

export const db = new Dexie('ShopkeeperDB');

db.version(1).stores({
  inventory: '++id, name, price, stock, barcode',
  ledger: '++id, customerName, phone, amount, type, date',
  sales: '++id, items, total, date'
});