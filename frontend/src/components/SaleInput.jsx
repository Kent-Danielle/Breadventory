import {
	Flex,
	Heading,
	Text,
	Checkbox,
	CheckboxGroup,
	HStack,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { FormContext } from "./FormPage";

function SaleInput(props) {
	const { saleStatus, setSaleStatus } = useContext(FormContext);
	let [isSpecial, setIsSpecial] = useState(
		!(saleStatus[props.bread] == null) && saleStatus[props.bread] ? true : false
	);
	let [isBad, setIsBad] = useState(
		!(saleStatus[props.bread] == null) && !saleStatus[props.bread]
			? true
			: false
	);

	useEffect(() => {
		if (isSpecial && !isBad) {
			setSaleStatus((prev) => ({
				...prev,
				[props.bread]: true,
			}));
		} else if (isBad && !isSpecial) {
			setSaleStatus((prev) => ({
				...prev,
				[props.bread]: false,
			}));
		} else if (!isSpecial && !isBad) {
			setSaleStatus((prev) => {
				delete prev[props.bread];
				return prev;
			});
		}
	}, [isSpecial, isBad]);

	const toggleSpecial = () => {
		if (isBad) {
			setIsBad(false);
		}
		setIsSpecial(!isSpecial);
	};

	const toggleBadSeller = () => {
		if (isSpecial) {
			setIsSpecial(false);
		}
		setIsBad(!isBad);
	};

	return (
		<Flex mt={["1rem"]} flexWrap={"wrap"} justifyContent={"space-between"}>
			<Flex width={["45%", "25%"]} justifyContent={"space-around"}>
				<Checkbox
					onChange={toggleSpecial}
					isChecked={isSpecial}
					id="isSpecial"
				></Checkbox>
				<Checkbox
					onChange={toggleBadSeller}
					isChecked={isBad}
					id="isBadSell"
				></Checkbox>
			</Flex>

			<Text
				flexGrow={1}
				wordBreak={"break-all"}
				ms={["1rem"]}
				fontSize={["sm", "lg"]}
			>
				{props.bread}
			</Text>
		</Flex>
	);
}

export default SaleInput;
