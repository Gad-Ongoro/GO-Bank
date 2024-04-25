import './App.css';
// import SideNav from './components/SideNav';
// import Main from './components/Main';
// import Header from './components/Header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div>
			{/* <div className='container-fluid d-flex gap-4'>
				<div>
					<SideNav></SideNav>
				</div>
			</div>
			<Header></Header> */}
			<Routes>
				<Route path='/register' element={<SignUp></SignUp>}></Route>
				<Route path='/signin' element={<SignIn></SignIn>}></Route>
			</Routes>
			{/* <Main></Main> */}
		</div>
	);
}

export default App;