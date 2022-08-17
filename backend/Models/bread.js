const mongoose = require("mongoose");

const breadSchema = new mongoose.Schema({
	bread: {
		type: String,
		required: true,
		unique: true,
	},
	yesterdayOrder: {
		type: mongoose.Schema.Types.Mixed,
		default: NaN,
	},
	todayOrder: {
		type: mongoose.Schema.Types.Mixed,
		default: NaN,
	},
	category: {
		type: String,
	},
	orderHistory: [mongoose.ObjectId],
});

module.exports = mongoose.model("bread", breadSchema);
