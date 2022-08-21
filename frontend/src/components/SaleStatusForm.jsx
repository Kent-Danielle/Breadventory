import { useContext } from "react";
import CollapsibleHeaders from "./CollapsibleHeader";
import { FormContext } from "./FormPage";

function SaleStatusForm(props) {
	const { breads, orders } = useContext(FormContext);

	return (
		<>
			{breads.map((bread, index) => {
				return (
					<CollapsibleHeaders
						key={index}
						variant="sale"
						breadCategory={bread._id}
						breads={bread.records}
						orders={orders}
					/>
				);
			})}
		</>
	);
}

export default SaleStatusForm;
