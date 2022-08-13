import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { ReactSession } from "react-client-session";
import { ChakraProvider } from "@chakra-ui/react";
import Redirect from "./components/Redirect";
import { theme } from "./themes/index";

function App() {
	ReactSession.setStoreType("localStorage");

	return (
		<ChakraProvider resetCSS theme={theme}>
			<Routes>
				<Route path="/" element={<Redirect />} />
				<Route path="/login" element={<Login />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</ChakraProvider>
	);
}

export default App;
