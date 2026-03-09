const express = require("express");
const cors = require("cors");

const orderController = require("./orderController");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/order", orderController.createOrder);

app.get("/order/:orderId", orderController.getOrder);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});