import {
	Alert,
	AlertIcon,
	AlertTitle,
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
import { Field, Formik, useFormik } from "formik";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Login() {
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [show, setShow] = useState(false);
	const togglePassword = () => setShow(!show);

	return (
		<Formik
			initialValues={{ username: "", password: "" }}
			validationSchema={Yup.object({
				username: Yup.string()
					.required("Username required")
					.min(3, "Username is too short"),
				password: Yup.string().required("Password is too short"),
			})}
			onSubmit={async (values) => {
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
			}}
		>
			{(formik) => (
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
						<Field
							as={Input}
							name="username"
							placeholder="Enter username..."
							{...formik.getFieldProps("username")}
						/>
						<FormErrorMessage>{formik.errors.username}</FormErrorMessage>
					</FormControl>
					<FormControl
						isInvalid={formik.errors.password && formik.touched.password}
					>
						<FormLabel>Password</FormLabel>
						<InputGroup>
							<Field
								as={Input}
								type={show ? "text" : "password"}
								name="password"
								placeholder="Enter password..."
								{...formik.getFieldProps("password")}
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
			)}
		</Formik>
	);
}

export default Login;
