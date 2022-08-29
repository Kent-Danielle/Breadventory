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
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ModalContext } from "./Home";

function DeleteModal(props) {
	const { bread } = props.bread;
	const { isDeleteModalOpen, toggleDeleteModal } = useContext(ModalContext);
	const [error, setError] = useState(false);

	async function deleteBread() {
		const response = await fetch("https://breadventory.herokuapp.com/data/deleteBread", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				breadName: bread,
			}),
		});

		if (response.ok) {
			toggleDeleteModal();
			window.location.reload();
		} else {
			setError(true);
		}
	}

	return (
		<>
			<Modal
				size={["xs", "sm"]}
				isOpen={isDeleteModalOpen}
				onClose={() => {
					setError(false);
					toggleDeleteModal();
				}}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						textAlign={"center"}
						pb={0}
						px={"1rem"}
						fontSize={["md", "lg"]}
					>
						{error ? (
							<Alert
								borderRadius={"lg"}
								w={["100%"]}
								alignSelf={"center"}
								status="error"
							>
								<AlertIcon />
								<AlertTitle>Error occured: bread can't be deleted.</AlertTitle>
							</Alert>
						) : (
							<>
								Do you want to delete "
								<Text color="red.400" width={"fit-content"} display={"inline"}>
									{bread}
								</Text>
								" ?
							</>
						)}
					</ModalHeader>

					<ModalFooter pt={"1rem"} justifyContent={"center"}>
						<Button
							onClick={deleteBread}
							colorScheme="orange"
							mr={3}
							isDisabled={error}
						>
							Delete
						</Button>
						<Button onClick={toggleDeleteModal} variant="ghost">
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default DeleteModal;
