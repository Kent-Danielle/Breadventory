const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	sunday: { type: Number },
	monday: { type: Number },
	tuesday: { type: Number },
	wednesday: { type: Number },
	thursday: { type: Number },
	friday: { type: Number },
	saturday: { type: Number },
});

const breadSchema = new mongoose.Schema({
	bread: {
		type: String,
		required: true,
	},
	category: {
		type: String
	},
	orderHistory: orderSchema,
});

module.exports = mongoose.model("user", userSchema);
