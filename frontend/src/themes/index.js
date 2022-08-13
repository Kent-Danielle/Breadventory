import { extendTheme } from "@chakra-ui/react";
import { TableStyles as Table } from "./components/TableStyle";

export const theme = extendTheme({
	colors: {
		carbon: {
			50: "#fff6ef",
			100: "#ffd9bf",
			200: "#ffb584",
			300: "#ff8432",
			400: "#fb6400",
			500: "#d45500",
			600: "#b34800",
			700: "#903a00",
			800: "#7a3100",
			900: "#592400",
		},
	},
	components: {
		Table,
	},
});
