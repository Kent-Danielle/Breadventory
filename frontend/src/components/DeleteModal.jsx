import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { ModalContext } from "./Home";

function DeleteModal(props) {
  const { isDeleteModalOpen, toggleDeleteModal } = useContext(ModalContext);

	async function deleteBread() {
		const response = await fetch("/data/deleteBread", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				breadName: props.bread,
			}),
		});

    const result = await response.json()

    if (response.ok) {
      toggleDeleteModal()
    } else {
      console.log(result)
    }
	}

	
	return (
		<>
			<Modal
				size={["xs", "sm"]}
				isOpen={isDeleteModalOpen}
				onClose={toggleDeleteModal}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader pb={0} px={"1rem"} fontSize={["md", "xl"]}>
						Do you want to delete "
						<Text color="red.400" width={"fit-content"} display={"inline"}>
							{props.bread}
						</Text>
						" ?
					</ModalHeader>
					<ModalFooter pt={"1rem"} justifyContent={"center"}>
						<Button
							onClick={deleteBread}
							colorScheme="orange"
							mr={3}
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
