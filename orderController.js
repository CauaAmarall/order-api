const db = require("./db");

exports.createOrder = (req, res) => {

  const body = req.body;

  try {

    // mapping dos campos
    const orderId = body.numeroPedido.split("-")[0];
    const value = body.valorTotal;
    const creationDate = new Date(body.dataCriacao);

    const items = body.items.map(item => ({
      productId: parseInt(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem
    }));


    db.query(
      "INSERT INTO Orders (orderId, value, creationDate) VALUES (?, ?, ?)",
      [orderId, value, creationDate],
      (err) => {

        if (err) {
          return res.status(500).json({ error: err.message });
        }

        items.forEach(item => {

          db.query(
            "INSERT INTO Items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)",
            [orderId, item.productId, item.quantity, item.price]
          );

        });

        res.status(201).json({
          message: "Pedido criado com sucesso",
          orderId: orderId
        });

      }
    );

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


exports.getOrder = (req, res) => {

  const orderId = req.params.orderId;

  db.query(
    "SELECT * FROM Orders WHERE orderId = ?",
    [orderId],
    (err, order) => {

      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (order.length === 0) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }

      db.query(
        "SELECT productId, quantity, price FROM Items WHERE orderId = ?",
        [orderId],
        (err, items) => {

          if (err) {
            return res.status(500).json({ error: err.message });
          }

          res.status(200).json({
            orderId: order[0].orderId,
            value: order[0].value,
            creationDate: order[0].creationDate,
            items: items
          });

        }
      );

    }
  );

};