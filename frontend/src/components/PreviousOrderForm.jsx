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
import { useContext } from "react";
import CollapsibleHeaders from "./CollapsibleHeader";
import { FormContext } from "./FormPage";

function PreviousOrderForm(props) {
	const { loaded, breads, orders } = useContext(FormContext);

	return (
		<>
			{props.isEmpty
				? breads.map((bread, index) => {
						return (
							<CollapsibleHeaders
								key={index}
								variant="form"
								breadCategory={bread._id}
								breads={bread.records}
								orders={orders}
							/>
						);
				  })
				: loaded && <Heading>Already ordered</Heading>}
		</>
	);
}

export default PreviousOrderForm;
