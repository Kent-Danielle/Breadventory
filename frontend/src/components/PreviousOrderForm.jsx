import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	Box,
	Flex,
	Text,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	SliderMark,
	Tooltip,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import CollapsibleTable from "./CollapsibleTable";

function PreviousOrderForm(props) {
	let [breads, setBreads] = useState([]);
	let [orders, setOrders] = useState([]);

	useEffect(() => {
		async function fetchBread() {
			const response1 = await fetch("/data/getBreads", {
				method: "GET",
			});

			const result1 = await response1.json();

			const response2 = await fetch("/data/getOrders", {
				method: "GET",
			});

			const result2 = await response2.json();

			setBreads(result1);
			setOrders(result2);
		}

		fetchBread();
	}, []);

	return (
		<>
			{breads.map((bread, index) => {
				return (
					<CollapsibleTable
						key={index}
						variant="form"
						breadCategory={bread._id}
						breads={bread.records}
						orders={orders}
					/>
				);
			})}
		</>
	);
}

export default PreviousOrderForm;
