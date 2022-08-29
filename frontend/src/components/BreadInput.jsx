import { useState, useContext } from "react";
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
	Center,
} from "@chakra-ui/react";
import { FormContext } from "./FormPage";

function BreadInput(props) {
	const { prevOrder, setPrevOrder, todayOrders, setTodayOrder, step } =
		useContext(FormContext);
	const [value, setValue] = useState(
		step == 0 ? prevOrder[props.bread] : todayOrders[props.bread]
	);
	const [showTooltip, setShowTooltip] = useState(false);

	function handleChange(value) {
		setValue(value);

		if (step == 0) {
			setPrevOrder((prev) => ({ ...prev, [props.bread]: value }));
		} else if (step == 2) {
			setTodayOrder((prev) => ({ ...prev, [props.bread]: value }));
		}
	}

	return (
		<Flex mt={["1rem"]} flexWrap={"wrap"} justifyContent={"space-between"}>
			<Center>
				<Text alignItems={"center"} display={"flex"} fontSize={["md", "lg"]}>
					{props.bread}
				</Text>
				{step == 2 && (
					<Text
						height={"fit-content"}
						alignItems={"center"}
						display={"flex"}
						bg={"gray.400"}
						color="white"
						borderRadius={"md"}
						px={["0.3rem"]}
						ms={["0.4rem"]}
					>
						{prevOrder[props.bread]}
					</Text>
				)}
			</Center>

			<NumberInput
				w={["25%", "15%"]}
				size={["sm", "md"]}
				min={0}
				max={100}
				onChange={handleChange}
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
				onChange={handleChange}
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
