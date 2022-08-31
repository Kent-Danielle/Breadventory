import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	Alert,
	AlertIcon,
	AlertTitle,
	Button,
	Text,
	ModalBody,
	Flex,
	Heading,
	FormControl,
	FormLabel,
	Input,
	Select,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	ModalCloseButton,
	ButtonGroup,
} from "@chakra-ui/react";
import { useContext, useState, useEffect, useRef } from "react";
import { ModalContext } from "./Home";
import { useNavigate } from "react-router-dom";

function EditModal(props) {
	const { bread, category, specialAllowance, badSellDeduction } = props.bread;
	const test = useRef(bread);
	const navigate = useNavigate();
	const { isEditModalOpen, toggleEditModal, toggleDeleteModal } =
		useContext(ModalContext);
	const [error, setError] = useState(false);
	const [formValue, setFormValue] = useState({
		breadName: null,
		category: null,
		specialAllowance: null,
		badSellDeduction: null,
	});

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
		const response = await fetch(
			"https://breadventory.herokuapp.com/data/editBread",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formValue,
					oldBread: bread,
					oldCategory: category,
					oldSpecialAllowance: specialAllowance,
					oldBadSellDeduction: badSellDeduction,
				}),
			}
		);

		if (response.ok) {
			toggleEditModal();
			window.location.reload();
		} else {
			setError(true);
		}
	}

	return (
		<>
			<Modal
				size={["xs", "sm"]}
				isOpen={isEditModalOpen}
				onClose={() => {
					setError(false);
					setFormValue({
						breadName: "",
						category: "",
						specialAllowance: 0,
						badSellDeduction: 0,
					});
					toggleEditModal();
				}}
				isCentered
			>
				<ModalOverlay onClick={toggleEditModal} />

				<ModalContent>
					<ModalCloseButton onClick={toggleEditModal} />
					<ModalBody pb={0} p={"1rem"} fontSize={["md", "lg"]}>
						{error ? (
							<Alert
								borderRadius={"lg"}
								w={["100%"]}
								alignSelf={"center"}
								status="error"
							>
								<AlertIcon />
								<AlertTitle>Error occured: bread can't be edited.</AlertTitle>
							</Alert>
						) : (
							<>
								<Flex
									as="form"
									onSubmit={handleSubmit}
									direction={"column"}
									justifyContent={"flex-start"}
								>
									<Heading
										color={"carbon.300"}
										alignSelf={"start"}
										my={"2rem"}
										size={["lg"]}
									>
										Edit {bread}
									</Heading>

									<FormControl isRequired>
										<FormLabel>Bread name</FormLabel>
										<Input
											id="breadName"
											defaultValue={bread}
											onChange={handleChange}
										/>
									</FormControl>

									<FormControl isRequired mt={"1.5rem"}>
										<FormLabel>Bread category</FormLabel>
										<Select
											id="category"
											defaultValue={category}
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
											Set the number of breads to be added to the order when
											it's on sale
										</Text>
										<Flex
											mt={"1rem"}
											alignItems={"center"}
											justifyContent={"space-between"}
										>
											<NumberInput
												w={["25%", "20%"]}
												size={["md", "lg"]}
												min={0}
												max={20}
												onChange={(val) =>
													handleNumberInput("specialAllowance", val)
												}
												value={
													formValue.specialAllowance
														? formValue.specialAllowance
														: specialAllowance
												}
											>
												<NumberInputField />
												<NumberInputStepper>
													<NumberIncrementStepper />
													<NumberDecrementStepper />
												</NumberInputStepper>
											</NumberInput>
											<Slider
												w={["70%", "75%"]}
												min={0}
												max={100}
												onChange={(val) =>
													handleNumberInput("specialAllowance", val)
												}
												value={
													formValue.specialAllowance
														? formValue.specialAllowance
														: specialAllowance
												}
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
											Set the number of breads to be deducted from the order
											when it's selling slow
										</Text>
										<Flex
											mt={"1rem"}
											alignItems={"center"}
											justifyContent={"space-between"}
										>
											<NumberInput
												w={["25%", "20%"]}
												size={["md", "lg"]}
												min={0}
												max={20}
												onChange={(val) =>
													handleNumberInput("badSellDeduction", val)
												}
												value={
													formValue.badSellDeduction
														? formValue.badSellDeduction
														: badSellDeduction
												}
											>
												<NumberInputField />
												<NumberInputStepper>
													<NumberIncrementStepper />
													<NumberDecrementStepper />
												</NumberInputStepper>
											</NumberInput>
											<Slider
												w={["70%", "75%"]}
												min={0}
												max={100}
												onChange={(val) =>
													handleNumberInput("badSellDeduction", val)
												}
												value={
													formValue.badSellDeduction
														? formValue.badSellDeduction
														: badSellDeduction
												}
											>
												<SliderTrack>
													<SliderFilledTrack />
												</SliderTrack>
												<SliderThumb />
											</Slider>
										</Flex>
									</FormControl>

									<ButtonGroup
										display={"flex"}
										justifyContent={"flex-end"}
										mt={"2rem"}
									>
										<Button
											colorScheme="carbon"
											variant={"ghost"}
											onClick={() => {
												toggleDeleteModal();
											}}
										>
											Delete bread
										</Button>
										<Button colorScheme="orange" type="submit">
											Edit bread
										</Button>
									</ButtonGroup>
								</Flex>
							</>
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

export default EditModal;
