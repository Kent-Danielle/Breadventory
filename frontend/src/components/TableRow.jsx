import {
	Tr,
	Td,
} from "@chakra-ui/react";

function TableRow(props) {
	return (
		<Tr>
			<Td>{props.breadName}</Td>
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
