/**
 * Boilerplate code to access modules
 */
const express = require("express");
const router = express.Router();
/**
 * Mongoose Schema
 */
const Bread = require("../Models/bread");
const Order = require("../Models/order");

const DAYS = [
	"sunday",
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
];

router.post("/addBread", async (req, res) => {
	try {
		const bread = new Bread({
			bread: req.body.bread,
			category: req.body.category,
			orderHistory: req.body.orderHistory,
		});

		await bread.save();
		res.send("success");
	} catch (err) {
		console.log(err, "error");
		res.json(err);
	}
});

function getPreviousSunday(date = new Date()) {
	const previousMonday = new Date();
	previousMonday.setDate(date.getDate() - date.getDay());
	previousMonday.setHours(0, 0, 0, 0);
	return previousMonday;
}

router.post("/addOrder", async (req, res) => {
	const date = new Date();
	const day = DAYS[date.getDay()];
	const weekOf = getPreviousSunday(date);

	const { bread, order } = req.body;

	try {
		const newOrder = await Order.findOneAndUpdate(
			{ $and: [{ bread: bread }, { weekOf: weekOf }] },
			{ [day]: order },
			{ upsert: true, new: true, setDefaultsOnInsert: true }
		);

		await Bread.updateOne(
			{ bread: bread },
			{ $push: { orderHistory: newOrder._id } }
		);

		res.send(newOrder);
	} catch (err) {
		res.send(err);
	}
});

router.get("/getBreads", async (req, res) => {
	try {
		const result = await Bread.aggregate([
			{
				$group: {
					_id: "$category",
					records: {
						$push: "$$ROOT",
					},
				},
			},
		]);
		res.send(result);
	} catch (err) {
		res.send(err);
	}
});

router.get("/getOrders", async (req, res) => {
	const date = new Date();
	const weekOf = getPreviousSunday(date);
	try {
		const result = await Order.find({ weekOf: weekOf });
		res.send(result);
	} catch (err) {
		res.send(err);
	}
});

module.exports = router;
