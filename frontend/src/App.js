import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { ReactSession } from "react-client-session";
import { ChakraProvider } from "@chakra-ui/react";
import overrides from "./themes/index";
import { theme } from "./themes/index";

function App() {
	ReactSession.setStoreType("localStorage");

	return (
		<ChakraProvider resetCSS theme={theme}>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</ChakraProvider>
	);
}

export default App;
