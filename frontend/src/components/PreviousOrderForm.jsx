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
import { useState, useEffect, useContext } from "react";
import CollapsibleTable from "./CollapsibleTable";
import { OrderContext } from "./FormPage";

const DAYS = [
	"sunday",
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
];

function PreviousOrderForm(props) {
	const { prevOrder, setPrevOrder } = useContext(OrderContext);

	let [breads, setBreads] = useState([]);
	let [orders, setOrders] = useState([]);

	useEffect(() => {
		let tempOrder = {};
		const date = new Date();
		const day = DAYS[date.getDay()];

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

			result2.forEach((order) => {
				tempOrder[order.bread] = order[day] === null ? 0 : order[day]
			});

			console.log(tempOrder)
			setPrevOrder((prev) => ({...prev, ...tempOrder}))
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
