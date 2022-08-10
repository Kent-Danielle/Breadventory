import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactSession } from "react-client-session";
import { Flex, Spacer } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import CollapsibleTable from "./CollapsibleTable";

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

	return (
		<Flex justifyContent={"center"} bgColor="#FF6600" height={"100%"}>
			<Flex
				bgColor="gray.50"
				width={["30em", "48em"]}
				padding={["1.4em", "2em"]}
				direction={"column"}
			>
				<Button
					alignSelf={"flex-start"}
					mb={"2em"}
					borderRadius={"full"}
					px={"1.5em"}
					bgColor="#FF6600"
					color="white"
				>
					Add Bread
				</Button>
				<CollapsibleTable />
			</Flex>
		</Flex>
	);
}

export default Login;
