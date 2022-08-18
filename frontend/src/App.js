import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { ReactSession } from "react-client-session";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import Redirect from "./components/Redirect";
import { theme } from "./themes/index";
import FormPage from "./components/FormPage";

function App() {
	ReactSession.setStoreType("localStorage");

	return (
		<ChakraProvider resetCSS theme={theme}>
			<Flex justifyContent={"center"} height={"100%"}>
				<Flex
					bgColor="white"
					width={["30em", "48em"]}
					padding={["1.4em", "2em"]}
					direction={"column"}
					overflowY={"auto"}
				>
					<Routes>
						<Route path="/" element={<Redirect />} />
						<Route path="/login" element={<Login />} />
						<Route path="/home" element={<Home />} />
						<Route path="/formpage" element={<FormPage />} />
					</Routes>
				</Flex>
			</Flex>
		</ChakraProvider>
	);
}

export default App;
