import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactSession } from "react-client-session"

function Login() {
	const navigate = useNavigate()

	// Redirect user if they're logged in or not
	useEffect(() => {
		const isLoggedIn = ReactSession.get("loggedIn");

		if (isLoggedIn) {
			navigate("/home");
		} else {
			navigate("/login");
		}
	}, []);

	return <h1>Home Page lmao</h1>;
}

export default Login;
