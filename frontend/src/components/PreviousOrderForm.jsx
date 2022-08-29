import { Center, Flex, Heading } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import CollapsibleHeaders from "./CollapsibleHeader";
import { FormContext } from "./FormPage";

function PreviousOrderForm(props) {
	const { loaded, breads, orders } = useContext(FormContext);

	return (
		<>
			{props.isEmpty
				? breads.map((bread, index) => {
						return (
							<CollapsibleHeaders
								key={index}
								variant="form"
								breadCategory={bread._id}
								breads={bread.records}
								orders={orders}
							/>
						);
				  })
				: loaded && (
						<Flex
							alignSelf={"center"}
							width={["90%"]}
							height={["auto"]}
							borderWidth={"2px"}
							borderRadius={"xl"}
							boxShadow={"md"}
							direction={"column"}
							padding={"1.5rem"}
						>
							<Center
								alignSelf={"center"}
								borderRadius={"full"}
								borderColor={"green.300"}
								borderWidth={"2px"}
								width={["3.5rem"]}
								height={["3.5rem"]}
							>
								<CheckIcon fontSize={"1.5rem"} color={"green.300"} />
							</Center>
							<Heading mt={"0.7rem"} color={"blackAlpha.700"} textAlign={"center"} fontSize={"lg"}>
								Yesterday's Order Retrieved!
							</Heading>
						</Flex>
				  )}
		</>
	);
}

export default PreviousOrderForm;
