import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { ReactSession } from "react-client-session";
import { ChakraProvider } from "@chakra-ui/react";
import overrides from "./themes/index";
import { extendTheme } from "@chakra-ui/react";

function App() {
	ReactSession.setStoreType("localStorage");

	const theme = extendTheme(overrides);

	return (
		<ChakraProvider theme={theme}>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</ChakraProvider>
	);
}

export default App;
