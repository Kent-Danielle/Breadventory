import { Tr, Td, Text } from "@chakra-ui/react";
import { ModalContext } from "./Home";
import { useContext } from "react";

function TableRow(props) {
	const { toggleEditModal } = useContext(ModalContext);
	return (
		<Tr>
			<Td
				onClick={() => {
					toggleEditModal(props.data);
				}}
				textDecor={"underline"}
				_hover={{
					background	: "gray.50",
				}}
			>
				{props.breadName}
			</Td>

			<Td isNumeric>{props.sundayOrder}</Td>
			<Td isNumeric>{props.mondayOrder}</Td>
			<Td isNumeric>{props.tuesdayOrder}</Td>
			<Td isNumeric>{props.wednesdayOrder}</Td>
			<Td isNumeric>{props.thursdayOrder}</Td>
			<Td isNumeric>{props.fridayOrder}</Td>
			<Td isNumeric>{props.saturdayOrder}</Td>
		</Tr>
	);
}

export default TableRow;
