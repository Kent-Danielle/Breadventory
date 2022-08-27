import { Tr, Td, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

function TableRow(props) {
	return (
		<Tr>
			<Td>
				<Menu>
					<MenuButton>{props.breadName}</MenuButton>
					<MenuList>
						<MenuItem>Edit Bread</MenuItem>
						<MenuItem color={"red.500"}>Delete Bread</MenuItem>
					</MenuList>
				</Menu>
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
