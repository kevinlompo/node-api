import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "data", "todo.json");
const db = new Low(new JSONFile(file));

const initDb = async () => {
  await db.read();
  if (JSON.stringify(db.data) == "{}") db.data = { items: [] };
  await db.write();
};

initDb();

export const listItems = () => {
  return db.data.items;
};

export const getItem = (id) => {
  const { items } = db.data;
  return items.find((item) => item.id === id);
};

export const addItem = async (item) => {
  db.data.items.push(item);
  await db.write();
};

export const updateItem = async (id, { id: _id, ...item }) => {
  const oldItem = getItem(id);
  if (oldItem) {
    Object.assign(oldItem, item);
  }
  await db.write();
};

export const removeItem = async (id) => {
  db.data.items = db.data.items.filter((item) => item.id !== id);
  await db.write();
};
