const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	sunday: { type: mongoose.Schema.Types.Mixed, default: NaN },
	monday: { type: mongoose.Schema.Types.Mixed, default: NaN },
	tuesday: { type: mongoose.Schema.Types.Mixed, default: NaN },
	wednesday: { type: mongoose.Schema.Types.Mixed, default: NaN },
	thursday: { type: mongoose.Schema.Types.Mixed, default: NaN },
	friday: { type: mongoose.Schema.Types.Mixed, default: NaN },
	saturday: { type: mongoose.Schema.Types.Mixed, default: NaN },
});

const breadSchema = new mongoose.Schema({
	bread: {
		type: String,
		required: true,
		unique: true,
	},
	category: {
		type: String,
	},
	orderHistory: [orderSchema],
});

module.exports = mongoose.model("bread", breadSchema);
