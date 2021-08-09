const mongoose = require("mongoose");
const Joi = require("joi");

const transactionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = new mongoose.model("Transaction", transactionSchema);

function validateTransaction(transaction) {
  const schema = Joi.object({
    text: Joi.string().required(),
    amount: Joi.number().required(),
  });
  return schema.validate(transaction);
}

exports.Transaction = Transaction;
exports.validate = validateTransaction;
