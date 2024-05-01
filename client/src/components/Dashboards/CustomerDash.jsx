import React from 'react';
import SideNav from './SideNav';
import NavBar from './NavBar';

function CustomerDash() {
	return (
		<div className='container h-screen'>
			<div>
				<NavBar></NavBar>
			</div>
			<div>
				<SideNav></SideNav>
			</div>
			<div>
				
			</div>
		</div>
	)
}

export default CustomerDash;