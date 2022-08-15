import { Button, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function FormPage() {
	const navigate = useNavigate();
	return (
		<Box>
			<Button
				opacity={0.85}
				alignSelf={"flex-start"}
				mb={"2em"}
				borderRadius={"full"}
				px={"1.5em"}
				py={"1em"}
				bgColor={"carbon.400"}
				color="white"
				boxShadow={"xl"}
				onClick={() => {
					navigate("/home");
				}}
			>
				Return
			</Button>
		</Box>
	);
}

export default FormPage;
