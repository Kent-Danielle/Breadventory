import {
	Alert,
	AlertIcon,
	AlertTitle,
	Flex,
	Button,
	FormControl,
	FormLabel,
	InputRightElement,
	Input,
	Heading,
	InputGroup,
	FormErrorMessage,
	Select,
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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddBreadForm() {
	const [formValue, setFormValue] = useState({
		breadName: "",
		category: "",
		specialAllowance: 0,
		badSellDeduction: 0,
	});

	useEffect(() => {
		const isLoggedIn = checkLogInStatus();

		isLoggedIn ? navigate("/home") : navigate("/login");
	}, []);


	function handleChange(event) {
		const id = event.target.id;
		const value = event.target.value;
		setFormValue((prev) => ({
			...prev,
			[id]: value,
		}));
	}

	function handleNumberInput(id, value) {
		setFormValue((prev) => ({
			...prev,
			[id]: value,
		}));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const response = await fetch("/data/addBread", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formValue),
		});

		if (response.status == 200) {
			navigate("/home");
		}
	}

	const navigate = useNavigate();
	return (
		<>
			<Button
				opacity={0.85}
				alignSelf={"flex-start"}
				mb={"2em"}
				px={"1.5em"}
				py={"1em"}
				boxShadow={"md"}
				onClick={() => {
					navigate("/home");
				}}
			>
				Return
			</Button>
			<Flex
				as="form"
				onSubmit={handleSubmit}
				direction={"column"}
				h="100vh"
				justifyContent={"flex-start"}
			>
				<Heading color={"carbon.300"} alignSelf={"start"} my={"2rem"}>
					Add new bread here!
				</Heading>

				<FormControl>
					<FormLabel>Bread name</FormLabel>
					<Input
						id="breadName"
						value={formValue.breadName}
						onChange={handleChange}
					/>
				</FormControl>

				<FormControl mt={"1.5rem"}>
					<FormLabel>Bread category</FormLabel>
					<Select
						id="category"
						value={formValue.category}
						onChange={handleChange}
						placeholder="Select category..."
					>
						<option value="Not Cooled">Not Cooled</option>
						<option value="Cooled">Cooled</option>
						<option value="Loaves">Loaves</option>
						<option value="Cookies">Cookies</option>
						<option value="Assorted">Assorted</option>
					</Select>
				</FormControl>

				<FormControl mt={"1.5rem"}>
					<FormLabel mb={0}>Special allowance</FormLabel>
					<Text fontSize={["sm"]} color={"gray.500"}>
						Set the number of breads to be added to the order when it's on sale
					</Text>
					<Flex
						mt={"1rem"}
						alignItems={"center"}
						justifyContent={"space-between"}
					>
						<NumberInput
							w={["25%", "15%"]}
							size={["md", "lg"]}
							min={0}
							max={20}
							onChange={(val) => handleNumberInput("specialAllowance", val)}
							defaultValue={0}
							value={formValue.specialAllowance}
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<Slider
							w={["70%", "80%"]}
							min={0}
							max={100}
							onChange={(val) => handleNumberInput("specialAllowance", val)}
							defaultValue={0}
							value={formValue.specialAllowance}
						>
							<SliderTrack>
								<SliderFilledTrack />
							</SliderTrack>

							<SliderThumb />
						</Slider>
					</Flex>
				</FormControl>

				<FormControl mt={"1.5rem"}>
					<FormLabel mb={0}>Bad Sale Deduction</FormLabel>
					<Text fontSize={["sm"]} color={"gray.500"}>
						Set the number of breads to be deducted from the order when it's
						selling slow
					</Text>
					<Flex
						mt={"1rem"}
						alignItems={"center"}
						justifyContent={"space-between"}
					>
						<NumberInput
							w={["25%", "15%"]}
							size={["md", "lg"]}
							min={0}
							max={20}
							onChange={(val) => handleNumberInput("badSellDeduction", val)}
							defaultValue={0}
							value={formValue.badSellDeduction}
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<Slider
							w={["70%", "80%"]}
							min={0}
							max={100}
							onChange={(val) => handleNumberInput("badSellDeduction", val)}
							defaultValue={0}
							value={formValue.badSellDeduction}
						>
							<SliderTrack>
								<SliderFilledTrack />
							</SliderTrack>
							=
							<SliderThumb />
						</Slider>
					</Flex>
				</FormControl>

				<Button alignSelf={"end"} my={"2rem"} type="submit">
					Add bread
				</Button>
			</Flex>
		</>
	);
}

export default AddBreadForm;
