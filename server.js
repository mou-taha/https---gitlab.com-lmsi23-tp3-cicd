const express = require("express");
const app = express();
app.use(express.json());
const pricing = {
  free: 0,
  standard: 10,
  pro: 30,
  advanced: 50,
  VIP: 60,
};
const tax = 0.2;
// Votre API sera disponible à l'adresse http://localhost:3003/api/pricing
app.post("/api/pricing", (req, res) => {
  const plan = req.body.plan;
  const quantity = req.body.quantity;
  if (pricing[plan] === undefined || quantity < 1 || quantity > 100) {
    return res.status(400).send("Invalid parameters");
  }
  const price = pricing[plan] * quantity;
  const vat = price * tax;
  const totalPrice = price + vat;
  return res.json({ price, vat, totalPrice });
});
app.all("/api/test", (req, res) => {
  console.log("req.body", req.body);
  console.log("req.query", req.query);
  return res.json({ ok: "true" });
});
const port = process.env.PORT || 3003;
module.exports = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
