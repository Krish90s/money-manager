const { Transaction, validate } = require("../models/transaction");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const Transactions = await Transaction.find().sort("name");
  res.send(Transactions);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let transaction = new Transaction({
    text: req.body.text,
    amount: req.body.amount,
  });
  transaction = await transaction.save();
  res.send(transaction);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text, amount: req.body.amount },
    { new: true }
  );
  if (!transaction) return res.status(404).send("Transaction not Found");
  transaction.text = req.body.text;
  transaction.amount = req.body.amount;
  res.send(transaction);
});

router.delete("/:id", async (req, res) => {
  const transaction = await Transaction.findByIdAndRemove(req.params.id);
  if (!transaction) return res.status(404).send("Transaction not Found");
  res.send(transaction);
});

router.get("/:id", async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) return res.status(404).send("Transaction not Found");
  res.send(transaction);
});

module.exports = router;
