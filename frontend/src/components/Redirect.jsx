import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";


function Redirect() {
	const navigate = useNavigate();
	useEffect(() => {
		const isLoggedIn = ReactSession.get("loggedIn");

		if (isLoggedIn) {
			navigate("/home");
		} else {
			navigate("/login");
		}
	}, []);
}

export default Redirect;
