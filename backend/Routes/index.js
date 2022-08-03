/**
 * Boilerplate code to access modules
 */
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
/**
 * Mongoose Schema
 */
const User = require("../Models/user");
const user = require("../Models/user");


router.post("/logout", (req, res) => {
	if (req.session.loggedIn) {
		//destroy the current session when logged out
		req.session.destroy(function (error) {
			if (error) {
				res.send("Unable to log out");
			} else {
				// session deleted, redirect to home
				res.redirect("/");
			}
		});
	}
});

router.post("/login", async (req, res) => {
	// Destructure req.body properties into var
	const { username, password } = req.body;
	// Find the username
	const user = await User.findOne({ username: username });

	try {
		// Throw an error if no username found or wrong password
		if (user == null) {
			throw "Authentication Failed";
		}
		// Reverse the hashing to compare password
		const isCorrectPassword = await bcrypt.compare(password, user.password);
		if (isCorrectPassword) {
			req.session.loggedIn = true;
			req.session.username = username;
			
			res.json({loggedIn: true});
		} else {
			throw "Authentication Failed";
		}
	} catch (e) {
		res.status(500).json({loggedIn: false, error: e});
	}
});

router.post("/register", async (req, res) => {
	// Destructure req.body properties into var
	console.log(req.body);
	const { username, password } = req.body;

	try {
		// Hash
		const salt = await bcrypt.genSalt();
		hashedPassword = await bcrypt.hash(password, salt);
	} catch {
		res.status(500).send("Password hashing failed");
	}

	// Check db for duplicate username
	let isUsernameUnique = await User.findOne({ username: username });

	if (isUsernameUnique) {
		res.send({
			success: false,
			message: "Username is not unique",
		});
	} else {
		try {
			const user = new User({
				username: username,
				password: hashedPassword,
				isApproved: false,
			});
			await user.save();
			res.redirect("/login");
		} catch (result) {
			res.send(result);
		}
	}
});

module.exports = router;
