import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { Fade } from "@mui/material";
function Login() {
	const navigate = useNavigate();

	// Redirect user if they're logged in or not
	useEffect(() => {
		const isLoggedIn = ReactSession.get("loggedIn");

		if (isLoggedIn) {
			navigate("/home");
		} else {
			navigate("/login");
		}
	}, []);

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
			ReactSession.set("loggedIn", true);
			navigate("/home");
		} else {
			setError(data.error);
		}
	}

	const theme = createTheme();

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs" sx={{ minHeight: "100%" }}>
				<Box
					height="100vh"
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						alignContent: "center",
						justifyContent: "center",
					}}
				>
					<Typography
						component="h1"
						variant="h4"
						textAlign="left"
						sx={{ width: "100%" }}
					>
						Welcome
					</Typography>
					<Box
						component="form"
						onSubmit={authenticateUser}
						noValidate
						sx={{ mt: 2 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							type="text"
							name="username"
							autoFocus
							onChange={(e) => setUsername(e.target.value)}
							value={username}
							variant="standard"
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							variant="standard"
						/>
						<Box
							sx={{ display: "flex", mb: 4, mt: 8 }}
							justifyContent="flex-end"
						>
							<Button
								type="submit"
								variant="contained"
								sx={{ minWidth: "25%" }}
							>
								Sign In
							</Button>
						</Box>
						<Fade in={true}>
							<Alert
								variant="outlined"
								severity="error"
								sx={{ mb: 12, visibility: (error === "" ? "hidden" : "visible")}}
							>
								{error}
							</Alert>
						</Fade>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default Login;
