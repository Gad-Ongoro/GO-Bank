import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "./api";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [auth, setAuth] = useState(false);

	// auth confirmation
	useEffect(() => {
		const access_token = localStorage.getItem("access");
		if (access_token) {
			const decoded = jwtDecode(token);
			setUser(decoded);
			setAuth(true);
		}
		setLoading(false);
	}, []);

	const contextValues = {
		user,
		setUser,
		loading,
		setLoading,
		signedIn,
		setSignedIn
	};

	return (
		<AppContext.Provider
			value={contextValues}
		>
			{children}
		</AppContext.Provider>
	);
};
