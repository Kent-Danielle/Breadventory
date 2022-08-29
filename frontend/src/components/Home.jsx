import { useNavigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
	Button,
	Box,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuItemOption,
	MenuGroup,
	MenuOptionGroup,
	MenuDivider,
	ButtonGroup,
} from "@chakra-ui/react";
import CollapsibleHeaders from "./CollapsibleHeader";
import { setLogInStatus, checkLogInStatus } from "./Redirect";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

export const ModalContext = createContext(null);

function Home() {
	const navigate = useNavigate();
	const [breads, setBreads] = useState([]);
	const [orders, setOrders] = useState([]);
	const [breadClicked, setBreadClicked] = useState({});
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	function toggleDeleteModal(breadData) {
		breadData && setBreadClicked(breadData);
		setIsDeleteModalOpen(!isDeleteModalOpen);
	}

	function toggleEditModal(breadData) {
		breadData && setBreadClicked(breadData);
		setIsEditModalOpen(!isEditModalOpen);
	}

	useEffect(() => {
		console.log(breadClicked)
	}, [breadClicked])

	// Redirect user if they're logged in or not
	useEffect(() => {
		const isLoggedIn = checkLogInStatus();

		isLoggedIn ? navigate("/home") : navigate("/login");

		async function fetchBread() {
			const response1 = await fetch("/data/getBreads", {
				method: "GET",
			});

			const result1 = await response1.json();

			const response2 = await fetch("/data/getOrders", {
				method: "GET",
			});

			const result2 = await response2.json();

			setBreads(result1);
			setOrders(result2);
		}

		fetchBread();
	}, []);

	const handleLogout = async () => {
		try {
			const logoutResponse = await fetch("/logout", {
				method: "POST",
			});
		} catch (err) {
			console.log(err);
		}

		//remove local storage
		setLogInStatus(false);
		navigate("/login");
	};

	return (
		<>
			<ModalContext.Provider
				value={{
					isDeleteModalOpen,
					toggleDeleteModal,
					isEditModalOpen,
					toggleEditModal,
				}}
			>
				<Menu>
					<MenuButton
						p={["0.8rem"]}
						alignSelf={"flex-end"}
						width={"fit-content"}
						as={Button}
					>
						<HamburgerIcon />
					</MenuButton>
					<MenuList>
						<MenuItem
							onClick={() => {
								navigate("/addbread");
							}}
						>
							Add bread
						</MenuItem>
						<MenuItem onClick={handleLogout} color={"red.500"}>
							Logout
						</MenuItem>
					</MenuList>
				</Menu>

				<>
					<ButtonGroup mt={"3rem"}>
						<Button
							opacity={0.85}
							alignSelf={"flex-start"}
							mb={"2em"}
							px={"1.5em"}
							py={"1em"}
							boxShadow={"md"}
							onClick={() => {
								navigate("/formpage");
							}}
						>
							Order Bread
						</Button>
					</ButtonGroup>

					{breads.map((bread, index) => {
						return (
							<CollapsibleHeaders
								key={index}
								variant="home"
								breadCategory={bread._id}
								breads={bread.records}
								orders={orders}
							/>
						);
					})}
				</>
				<DeleteModal bread={breadClicked} />
				<EditModal bread={breadClicked} />
			</ModalContext.Provider>
		</>
	);
}

export default Home;
