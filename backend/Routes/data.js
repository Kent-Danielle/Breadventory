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

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

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
	const sortOrder = ["Not Cooled", "Cooled", "Loafs", "Cookies", "Assorted"];

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

		result.sort(function (a, b) {
			return sortOrder.indexOf(a._id) - sortOrder.indexOf(b._id);
		});

		res.send(result);
	} catch (err) {
		res.send(err);
	}
});

router.get("/getOrders", async (req, res) => {
	const date = new Date();
	const weekOf = getPreviousSunday(date);
	try {
		let breads = await Bread.find({});
		let weekOrders = await Order.find({ weekOf: weekOf });

		let orderSet = new Set();

		weekOrders.forEach((weekOrder) => {
			orderSet.add(weekOrder.bread);
		});

		breads.forEach(async (bread) => {
			if (!orderSet.has(bread.bread)) {
				console.log("Adding");
				const newOrder = new Order({ bread: bread.bread, weekOf, weekOf });
				await newOrder.save();
			}
		});

		await sleep(10);

		weekOrders = await Order.find({ weekOf: weekOf });

		res.send(weekOrders);
	} catch (err) {
		console.log(err);
		res.send({ error: err, msg: "hi" });
	}
});

router.get("/getPrevOrders", async (req, res) => {
	let date = new Date();
	date.setDate(date.getDate() - 1);
	let day = DAYS[date.getDay()];
	const weekOf = getPreviousSunday(date);

	try {
		let breads = await Bread.find({});
		let weekOrders = await Order.find({ weekOf: weekOf });

		let orderSet = new Set();

		weekOrders.forEach((weekOrder) => {
			orderSet.add(weekOrder.bread);
		});

		breads.forEach(async (bread) => {
			if (!orderSet.has(bread.bread)) {
				console.log("Adding");
				const newOrder = new Order({ bread: bread.bread, weekOf, weekOf });
				await newOrder.save();
			}
		});

		await sleep(10);

		weekOrders = await Order.find({ weekOf: weekOf });

		console.log(day, weekOf);

		res.send({ weekOrders: weekOrders, day: day });
	} catch (err) {
		console.log(err);
		res.send({ error: err, msg: "hi" });
	}
});

router.post("/addPrevOrders", (req, res) => {
	let date = new Date();
	date.setDate(date.getDate() - 1);
	let day = DAYS[date.getDay()];
	const weekOf = getPreviousSunday(date);

	const prevOrders = req.body;

	Object.keys(prevOrders).forEach(async (bread) => {
		try {
			const prevOrder = await Order.findOneAndUpdate(
				{ $and: [{ bread: bread }, { weekOf: weekOf }] },
				{ [day]: prevOrders[bread] },
				{ upsert: true, new: true, setDefaultsOnInsert: true }
			);

			await Bread.updateOne(
				{ bread: bread },
				{ $push: { orderHistory: prevOrder._id } }
			);
		} catch (err) {
			console.log(err);
			res.send(err);
		}
	});

	res.status(200).json();
});

module.exports = router;
