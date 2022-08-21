const mongoose = require("mongoose");

const breadSchema = new mongoose.Schema({
	bread: {
		type: String,
		required: true,
		unique: true,
	},
	specialAllowance: {
		type: Number,
	},
	badSellDeduction: {
		type: Number
	},
	category: {
		type: String,
	}
});

module.exports = mongoose.model("bread", breadSchema);
