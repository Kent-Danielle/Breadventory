import { useState } from "react";

function Login() {
	// Set state for input fields
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	/**
	 * Handle submit event of form.
	 * Submits a POST request to backend API for auth
	 */
	async function authenticateUser(event) {
		// To prevent the website from reloading
		event.preventDefault();

		// Send the POST request containint the input values from the form taken from the state
		const response = await fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		});

		const data = await response.json();

		if (data.loggedIn) {
			localStorage.setItem("loggedIn", true);
			window.location.href = "/home";
		} else {
			setError(data.e);
		}
	}

	return (
		<div>
			<form onSubmit={authenticateUser}>
				<input
					type="text"
					placeholder="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				></input>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				></input>
				<input type="submit" value="Login" />
			</form>
			<p>{error}</p>
		</div>
	);
}

export default Login;