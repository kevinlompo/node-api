import express from "express";
import { addItem, getItem, listItems, removeItem, updateItem } from "./db.js";

const app = express();
const logger = (req, res, next) => {
  const url = req.url;
  const method = req.method;
  const body = req.body;
  const time = new Date().toISOString();
  console.log(`Log ${time}: ${method} ${url} ${JSON.stringify(body, null, 2)}`);
  next();
};
// req => logger => res

app.use(express.json());
app.use(express.static('./public'))
app.use("/api", logger);

//list
app.get("/api/items", (req, res) => {
  res.json(listItems());
});
//create
app.post("/api/item", async (req, res) => {
  const item = req.body;
  await addItem(item);
  res.json(getItem(item.id));
});
//update
app.patch("/api/item/:id", async (req, res) => {
  const item = req.body;
  const id = parseInt(req.params.id);
  await updateItem(id, item);
  res.json(getItem(id));
});
//delete
app.delete("/api/item/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await removeItem(id);
  res.send();
});
//detail
app.get("/api/item/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json(getItem(id));
});

app.all("*", (_, res) => {
  res.status(404).end();
});

app.listen(3300, () => {
  console.log("Server started on port 3300");
});
