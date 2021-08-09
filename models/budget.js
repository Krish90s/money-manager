const mongoose = require("mongoose");
const Joi = require("joi");

const budgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    default: 0,
  },
});

const Budget = new mongoose.model("Budget", budgetSchema);

function validateBudget(budget) {
  const schema = Joi.object({
    amount: Joi.number().required(),
  });
  return schema.validate(budget);
}

exports.Budget = Budget;
exports.validate = validateBudget;
