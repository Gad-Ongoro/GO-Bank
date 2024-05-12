import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideNav from './SideNav';
import NavBar from './NavBar';
import DashView from './DashView';

function CustomerDash() {
	return (
		<div className='container h-screen grid grid-cols-12'>
			<div className='sticky top-10 col-start-2 col-end-13 backdrop-blur'>
				<NavBar></NavBar>
			</div>
			<div className='fixed top-1/2 -translate-y-1/2 row-start-2 row-end-13'>
				<SideNav></SideNav>
			</div>
			<div className='row-start-2 row-end-13 col-start-2 col-end-13'>
				<Routes>
					<Route path='/dashview' element={<DashView></DashView>}></Route>
				</Routes>
			</div>
		</div>
	)
}

export default CustomerDash;