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

function titleCase(str) {
	return str
		.toLowerCase()
		.split(" ")
		.map(function (word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
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

function getPreviousSunday(date = new Date()) {
	const previousMonday = new Date();
	previousMonday.setDate(date.getDate() - date.getDay());
	previousMonday.setHours(0, 0, 0, 0);
	return previousMonday;
}

router.post("/deleteBread", async (req, res) => {
	const { breadName } = req.body

	try {
		await Bread.deleteOne({bread: breadName})

		res.status(200).send("success")
	} catch(err) {
		console.log(err);
		res.status(500).send("Error occured! Cannot add new bread at the moment.");
	}

})

router.post("/addBreads", async (req, res) => {
	const newBreads = req.body;

	newBreads.forEach(async (newBread) => {
		try {
			const bread = new Bread({
				bread: newBread.bread,
				category: newBread.category,
				specialAllowance: newBread.specialAllowance,
				badSellDeduction: newBread.badSellDeduction,
			});

			await bread.save();
		} catch (err) {
			res.json(err);
		}
	});

	res.send("success");
});

router.post("/addBread", async (req, res) => {
	const newBread = req.body;
	newBread.breadName = titleCase(newBread.breadName);

	try {
		const bread = await Bread.findOneAndUpdate(
			{ bread: newBread.breadName },
			{
				bread: newBread.breadName,
				category: newBread.category,
				specialAllowance: parseInt(newBread.specialAllowance),
				badSellDeduction: parseInt(newBread.badSellDeduction),
			},
			{ upsert: true, new: true, setDefaultsOnInsert: false }
		);

		res.status(200).send("success");
	} catch (err) {
		console.log(err);
		res.status(500).send("Error occured! Cannot add new bread at the moment.");
	}
});

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

		res.send(newOrder);
	} catch (err) {
		res.send(err);
	}
});

router.post("/calculateOrder", async (req, res) => {
	const { prevOrder, saleStatus } = req.body;
	let todayOrders = {};

	for (const bread in prevOrder) {
		if (saleStatus[bread] == null) {
			todayOrders[bread] = prevOrder[bread];
		} else {
			console.log("hi");
			const fetchedBread = await Bread.findOne({
				bread: bread,
			});

			const { specialAllowance, badSellDeduction } = fetchedBread;

			console.log(specialAllowance, badSellDeduction);

			if (saleStatus[bread]) {
				todayOrders[bread] = prevOrder[bread] + specialAllowance;
			} else if (!saleStatus[bread]) {
				todayOrders[bread] = prevOrder[bread] - badSellDeduction;
			}
		}
	}

	res.send(todayOrders);
});

router.post("/addTodayOrders", (req, res) => {
	const date = new Date();
	const day = DAYS[date.getDay()];
	const weekOf = getPreviousSunday(date);

	const todayOrders = req.body;

	Object.keys(todayOrders).forEach(async (bread) => {
		try {
			const prevOrder = await Order.findOneAndUpdate(
				{ $and: [{ bread: bread }, { weekOf: weekOf }] },
				{ [day]: todayOrders[bread] },
				{ upsert: true, new: true, setDefaultsOnInsert: true }
			);
		} catch (err) {
			res.send(err);
		}
	});

	res.status(200).json();
});

router.get("/getBreads", async (req, res) => {
	const sortOrder = ["Not Cooled", "Cooled", "Loaves", "Cookies", "Assorted"];

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
				const newOrder = new Order({ bread: bread.bread, weekOf, weekOf });
				await newOrder.save();
			}
		});

		await sleep(10);

		weekOrders = await Order.find({ weekOf: weekOf });

		res.send(weekOrders);
	} catch (err) {
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
				const newOrder = new Order({ bread: bread.bread, weekOf, weekOf });
				await newOrder.save();
			}
		});

		await sleep(10);

		weekOrders = await Order.find({ weekOf: weekOf });

		res.send({ weekOrders: weekOrders, day: day });
	} catch (err) {
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
		} catch (err) {
			res.send(err);
		}
	});

	res.status(200).json();
});

module.exports = router;
