import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function setLogInStatus(value) {
	const TTL = 43200000; // 12 hours in milliseconds

	const now = new Date();

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const loginStatus = {
		value: value,
		expiry: now.getTime() + TTL,
	};
	localStorage.setItem("loginStatus", JSON.stringify(loginStatus));
}

function checkLogInStatus() {
	const itemStr = localStorage.getItem("loginStatus");
	// if the item doesn't exist, return null
	if (!itemStr) {
		return false;
	}
	const item = JSON.parse(itemStr);
	const now = new Date();
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem("loginStatus");
		return false;
	}
	return item.value;
}

function Redirect() {
	const navigate = useNavigate();
	useEffect(() => {
		const isLoggedIn = checkLogInStatus();

		isLoggedIn ? navigate("/home") : navigate("/login");
	}, []);
}

export { setLogInStatus, checkLogInStatus };
export default Redirect;
