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

function CollapsibleTable(props) {
	return (
		<Accordion allowMultiple mb={"1em"}>
			<AccordionItem border={"none"} borderRadius={"lg"}>
				<h2>
					<AccordionButton>
						<AccordionIcon />
						<Box ms={"1em"} flex="1" textAlign="left">
							Bread Category
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
								<Tr>
									<Td>Bread</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
								</Tr>
								<Tr>
									<Td>Bread</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
								</Tr>
								<Tr>
									<Td>Bread</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
									<Td isNumeric>5</Td>
								</Tr>
							</Tbody>
						</Table>
					</TableContainer>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
}

export default CollapsibleTable;
