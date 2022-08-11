const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  bread: {type: String, required: true},
	weekOf: { type: Date, required: true},
	sunday: { type: mongoose.Schema.Types.Mixed, default: NaN },
	monday: { type: mongoose.Schema.Types.Mixed, default: NaN },
	tuesday: { type: mongoose.Schema.Types.Mixed, default: NaN },
	wednesday: { type: mongoose.Schema.Types.Mixed, default: NaN },
	thursday: { type: mongoose.Schema.Types.Mixed, default: NaN },
	friday: { type: mongoose.Schema.Types.Mixed, default: NaN },
	saturday: { type: mongoose.Schema.Types.Mixed, default: NaN },
});

module.exports = mongoose.model("order", orderSchema);
