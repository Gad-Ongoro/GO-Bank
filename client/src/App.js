import { useState, createContext } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Header from './components/Header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import About from './components/About';
import Services from './components/Services';
import CustomerDash from './components/Dashboards/CustomerDash';
export const BankContext = createContext();
import { AppContextProvider } from './services/utils';

function App() {
	const access_token = localStorage.getItem('access');
	const token_exists = access_token !== null;
	let [signedIn, setSignedIn] = useState(false);

	return (
		<>
			<AppContextProvider>
				<BankContext.Provider value={{access_token, token_exists, setSignedIn}}>
					<Header></Header>
					<Routes>
						<Route path='/' element={<Main></Main>}></Route>
						<Route path='/home' element={<Main></Main>}></Route>
						<Route path='/register' element={<SignUp></SignUp>}></Route>
						<Route path='/signin' element={<SignIn></SignIn>}></Route>
						<Route path='/about' element={<About></About>}></Route>
						<Route path='/customer_dashboard/*' element={<CustomerDash></CustomerDash>}></Route>
						<Route path='/services' element={<Services></Services>}></Route>
					</Routes>
				</BankContext.Provider>
			</AppContextProvider>
		</>
	);
};

export default App;