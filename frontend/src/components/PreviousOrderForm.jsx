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
	Heading,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import CollapsibleTable from "./CollapsibleTable";
import { OrderContext } from "./FormPage";

function PreviousOrderForm(props) {
	const { prevOrder, setPrevOrder, loaded, setLoaded } =
		useContext(OrderContext);

	let [breads, setBreads] = useState([]);
	let [orders, setOrders] = useState([]);
	let [isEmpty, setIsEmpty] = useState(false);

	useEffect(() => {
		let tempOrder = {};
		async function fetchBread() {
			const response1 = await fetch("/data/getBreads", {
				method: "GET",
			});

			const result1 = await response1.json();

			const response2 = await fetch("/data/getPrevOrders", {
				method: "GET",
			});

			const { weekOrders, day } = await response2.json();

			setBreads(result1);
			setOrders(weekOrders);

			weekOrders.forEach((order) => {
				if (order[day] === null) {
					setIsEmpty(true);
				}
				tempOrder[order.bread] = order[day] === null ? 0 : order[day];
			});

			setPrevOrder((prev) => ({ ...prev, ...tempOrder }));
			setLoaded(true);
		}

		fetchBread();
	}, []);

	return (
		<>
			{isEmpty ? (
				breads.map((bread, index) => {
					return (
						<CollapsibleTable
							key={index}
							variant="form"
							breadCategory={bread._id}
							breads={bread.records}
							orders={orders}
						/>
					);
				})
			) : (
				<Heading>Already ordered</Heading>
			)}
		</>
	);
}

export default PreviousOrderForm;
