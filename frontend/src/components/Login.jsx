import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Flex,
	Button,
	FormControl,
	FormLabel,
	InputRightElement,
	Input,
	Heading,
	InputGroup,
	FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFormik } from "formik";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Login() {
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [show, setShow] = useState(false);
	const togglePassword = () => setShow(!show);
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validationSchema: Yup.object({
			username: Yup.string()
				.required("Username required")
				.min(3, "Username is too short"),
			password: Yup.string().required("Password is too short"),
		}),
		onSubmit: async (values) => {
			console.log(values);
			const { username, password } = values;
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
		},
	});

	return (
		<Flex
			direction={"column"}
			as="form"
			mx="auto"
			w={["90%", 500]}
			h="100vh"
			justifyContent={"center"}
			onSubmit={formik.handleSubmit}
		>
			<Heading alignSelf={"start"} mb={"2rem"}>
				Sign Up
			</Heading>
			<FormControl
				isInvalid={formik.errors.username && formik.touched.username}
			>
				<FormLabel>Username</FormLabel>
				<Input
					onChange={formik.handleChange}
					value={formik.values.username}
					name="username"
					placeholder="Enter username..."
					onBlur={formik.handleBlur}
				/>
				<FormErrorMessage>{formik.errors.username}</FormErrorMessage>
			</FormControl>
			<FormControl
				isInvalid={formik.errors.password && formik.touched.password}
			>
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input
						value={formik.values.password}
						onChange={formik.handleChange}
						type={show ? "text" : "password"}
						name="password"
						placeholder="Enter password..."
						onBlur={formik.handleBlur}
					/>
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={togglePassword}>
							{show ? "Hide" : "Show"}
						</Button>
					</InputRightElement>
				</InputGroup>
				<FormErrorMessage>{formik.errors.password}</FormErrorMessage>
			</FormControl>
			<Button alignSelf={"end"} my={"2rem"} type="submit">
				Log in
			</Button>
			<Alert
				borderRadius={"lg"}
				visibility={error === "" ? "hidden" : "visible"}
				w={["100%", "80%"]}
				alignSelf={"center"}
				status="error"
			>
				<AlertIcon />
				<AlertTitle>{error}</AlertTitle>
			</Alert>
		</Flex>
	);
}

export default Login;
