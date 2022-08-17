import { useState } from "react";
import {
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
	Tooltip,
} from "@chakra-ui/react";

function BreadInput(props) {
	const [value, setValue] = useState(30);
	const [showTooltip, setShowTooltip] = useState(false);

	return (
		<Flex mt={["1rem"]} flexWrap={"wrap"} justifyContent={"space-between"}> 
			<Text alignItems={"center"} display={"flex"} fontSize={["md", "lg"]}>{props.bread}</Text>
			<NumberInput
				w={["25%", "15%"]}
				size={["sm", "md"]}
				min={0}
				max={100}
				onChange={(value) => setValue(value)}
				defaultValue={value}
				value={value}
			>
				<NumberInputField />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
			<Slider
				mt={["2rem"]}
				w="100%"
				min={0}
				max={100}
				onChange={(value) => setValue(value)}
				value={value}
				defaultValue={value}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
			>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<Tooltip
					hasArrow
					bg="teal.500"
					color="white"
					placement="top"
					isOpen={showTooltip}
					label={value}
				>
					<SliderThumb />
				</Tooltip>
			</Slider>
		</Flex>
	);
}

export default BreadInput;
