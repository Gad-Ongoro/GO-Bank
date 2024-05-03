import React from 'react';
import SideNav from './SideNav';
import NavBar from './NavBar';

function CustomerDash() {
	return (
		<div className='container h-screen'>
			<div className='w-11/12 float-right sticky top-10'>
				<NavBar></NavBar>
			</div>
			<div className='w-1/12 float-left sticky top-10'>
				<SideNav></SideNav>
			</div>
			<div>
				
			</div>
		</div>
	)
}

export default CustomerDash;