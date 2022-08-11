import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
} from "@chakra-ui/react";
import TableRow from "./TableRow";

function CollapsibleTable(props) {
	console.log("hi");
	let breadSet = new Set();

	props.breads.forEach((element) => {
		breadSet.add(element.bread);
	});

	let breadOrder = props.orders.filter(function (order) {
		return breadSet.has(order.bread);
	});

	return (
		<Accordion allowMultiple mb={"1em"}>
			<AccordionItem border={"none"} borderRadius={"lg"}>
				<h2>
					<AccordionButton>
						<AccordionIcon />
						<Box ms={"1em"} flex="1" textAlign="left">
							{props.breadCategory}
						</Box>
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<TableContainer>
						<Table variant="simpleF">
							<Thead>
								<Tr>
									<Th></Th>
									<Th>Sn</Th>
									<Th>M</Th>
									<Th>T</Th>
									<Th>W</Th>
									<Th>Th</Th>
									<Th>F</Th>
									<Th>St</Th>
								</Tr>
							</Thead>
							<Tbody>
								{breadOrder.map((bread, index) => (
									<TableRow
										key={index}
										breadName={bread.bread}
										sundayOrder={bread.sunday}
										mondayOrder={bread.monday}
										tuesdayOrder={bread.tuesday}
										wednesdayOrder={bread.wednesday}
										thursdayOrder={bread.thursday}
										fridayOrder={bread.friday}
										saturdayOrder={bread.saturday}
									/>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
}

export default CollapsibleTable;
