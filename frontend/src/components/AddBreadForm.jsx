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

function AddBreadForm() {
	const [error, setError] = useState("");
	const [show, setShow] = useState(false);
	const togglePassword = () => setShow(!show);

	const navigate = useNavigate();
	return (
		<>
			<Button
				opacity={0.85}
				alignSelf={"flex-start"}
				mb={"2em"}
				px={"1.5em"}
				py={"1em"}
				boxShadow={"xl"}
				onClick={() => {
					navigate("/home");
				}}
			>
				Return
			</Button>
			<Formik
				initialValues={{ bread: "", category: "", specialAllowance: 0, badSellDeduction: 0 }}
				validationSchema={Yup.object({
					username: Yup.string()
						.required("Bread name required")
						.min(3, "Bread name is too short"),
					password: Yup.number().required("Password is too short"),
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
						h="100vh"
						justifyContent={"flex-start"}
						onSubmit={formik.handleSubmit}
					>
						<Heading alignSelf={"start"} mb={"2rem"}>
							Add new bread here!
						</Heading>
						<FormControl
							isInvalid={formik.errors.username && formik.touched.username}
						>
							<FormLabel>Bread name</FormLabel>
							<Field
								as={Input}
								name="username"
								placeholder="Enter username..."
								{...formik.getFieldProps("username")}
							/>
							<FormErrorMessage>{formik.errors.username}</FormErrorMessage>
						</FormControl>
						<Button alignSelf={"end"} my={"2rem"} type="submit">
							Add bread
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
		</>
	);
}

export default AddBreadForm;
