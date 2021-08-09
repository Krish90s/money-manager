const { Budget, validate } = require("../models/budget");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const Budgets = await Budget.find().sort("name");
  res.send(Budgets);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let budget = new Budget({
    amount: req.body.amount,
  });
  budget = await budget.save();
  res.send(budget);
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const budget = await Budget.findByIdAndUpdate(
    req.params.id,
    { amount: req.body.amount },
    { new: true }
  );
  if (!budget) return res.status(404).send("Budget not set");
  budget.amount = req.body.amount;
  res.send(budget);
});

module.exports = router;
