/**
 * Boilerplate code to access modules
 */
const express = require("express");
const router = express.Router();
/**
 * Mongoose Schema
 */
const Bread = require("../Models/bread");

const DAYS = [
	"sunday",
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
];

router.post("/test", (req, res) => {
	res.json("Hello");
});

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

router.post("/addOrder", async (req, res) => {
	try {
		const order = {
			[day]: req.body.order,
		};

		console.log(order);

		const bread = await Bread.findOne({ bread: req.body.bread });

		const length = bread.orderHistory.length;

		if (length < 1 || bread.orderHistory[length - 1].saturday != NaN) {
			// Push a new array
			const updatedBread = await Bread.findOneAndUpdate(
				{ bread: req.body.bread },
				{ $push: { orderHistory: order } },
				{ new: true }
			);
		} else {
			// Update the existing array
			bread.orderHistory[length - 1].day = req.body.order;

			await bread.save();
		}
		res.send("SuccessF");
	} catch (err) {
		console.log(err, "error");
		res.send(err);
	}
});

module.exports = router;
