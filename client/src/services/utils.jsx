import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from 'notistack';
import api from "./api";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
	const accessToken = localStorage.getItem("access");
	const refreshToken = localStorage.getItem("refresh");
	let [ inputData, setInputData ] = useState({});
	const [user, setUser] = useState(null);
	const [ branches, setBranches ] = useState([]);
	const [loading, setLoading] = useState(false);
	const [auth, setAuth] = useState(false);
	const navigate = useNavigate();

	// auth confirmation
	useEffect(() => {
		const access_token = localStorage.getItem("access");
		if (access_token) {
			const decoded = jwtDecode(access_token);
			setUser(decoded);
			setAuth(true);
		}
		setLoading(false);
	}, []);

	// Input Change
	function handleInputChange(e){
		let name = e.target.name;
		let value = e.target.value;

		if (e.target.type === 'select-one'){
			value = e.target.options[e.target.selectedIndex].value;
		}

		setInputData(current => ({...current, [name]: value}));
	}

	// User Register
	async function registerUser() {
		try {
			setLoading(true);
			const response = await api.post('users/register/', inputData);
			if (response.status === 201) {
				navigate('/signin')
			}
		} catch (error) {
			console.log(error);
		} finally {
			setInputData({});
			setLoading(false);
		}
	};

	// User Login
	async function tokenSignIn() {
		try {
			setLoading(true);
			const response = await api.post('token/', inputData);
			if (response.status === 200) {
				localStorage.setItem('access', response.data.access);
				localStorage.setItem('refresh', response.data.refresh);
				setAuth(true);
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setInputData({});
			setLoading(false);
		}
	};

	// User Logout
	const handleLogout = async () => {
    if (!refreshToken) {
      alert('No refresh token found!');
      return;
    }
  
    try {
			setLoading(true);
      const res = await api.post('logout/', { 'refresh_token': refreshToken });
      if (res.status === 205) {
        setAuth(false);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/signin');
				enqueueSnackbar(`Successfully Logged Out!`, { variant: 'success' });
      }
    } catch (error) {
			enqueueSnackbar('Error Logging Out!', { variant: 'error' })
      console.error('Logout Error:', error);
    } finally {
			setLoading(false);
		}
  };

	// Branches GET
	async function fetchBranches() {
		try {
			setLoading(true);
			const response = await api.get('branches/');
			if (response.status === 200){
				setBranches(response.data)
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	// Scroll to top
	function scrollToTop() {
		document.body.scrollTop = 0; // Safari
		document.documentElement.scrollTop = 0; //Chrome, Firefox, IE and Opera
	};

	useEffect(() => {
		fetchBranches();
	}, []);

	const contextValues = {
		user,
		setUser,
		handleInputChange,
		registerUser,
		tokenSignIn,
		handleLogout,
		branches,
		setBranches,
		loading,
		setLoading,
		auth,
		setAuth,
		scrollToTop,
		navigate
	};

	return (
		<AppContext.Provider
			value={contextValues}
		>
			{children}
		</AppContext.Provider>
	);
};
