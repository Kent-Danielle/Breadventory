import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	SlideFade,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Flex,
	Text,
	TableContainer,
} from "@chakra-ui/react";
import TableRow from "./TableRow";
import BreadInput from "./BreadInput";
import SaleInput from "./SaleInput";

function CollapsibleHeaders(props) {
	let breadSet = new Set();

	props.breads.forEach((element) => {
		breadSet.add(element.bread);
	});

	let breadOrder = props.orders.filter(function (order) {
		return breadSet.has(order.bread);
	});

	function getContent(variant) {
		switch (variant) {
			case "home":
				return (
					<TableContainer>
						<Table>
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
				);
			case "form":
				return (
					<>
						{breadOrder.map((bread, index) => {
							return <BreadInput bread={bread.bread} key={index} />;
						})}
					</>
				);
			case "sale":
				return (
					<>
						<Flex width={["53%", "28%"]} justifyContent={"space-around"}>
							<Text>Special</Text>
							<Text>Bad Seller</Text>
						</Flex>
						{breadOrder.map((bread, index) => {
							return <SaleInput key={index} bread={bread.bread} />;
						})}
					</>
				);
			default:
				throw new Error("Unknown variant");
		}
	}

	return (
		<SlideFade in={true} offsetY={30}>
			<Accordion defaultIndex={[(props.variant == "home" && 0)]} allowMultiple mb={"1em"}>
				<AccordionItem border={"none"} borderRadius={"lg"}>
					<h2>
						<AccordionButton
							bg={"carbon.400"}
							boxShadow={"xl"}
							color={"white "}
							opacity={0.85}
							borderRadius={"md"}
							_hover={{
								bg: "carbon.500",
							}}
						>
							<AccordionIcon />
							<Box ms={"1em"} flex="1" textAlign="left">
								{props.breadCategory}
							</Box>
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>{getContent(props.variant)}</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</SlideFade>
	);
}

export default CollapsibleHeaders;
