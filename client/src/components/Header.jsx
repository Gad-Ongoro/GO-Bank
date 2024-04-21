import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
	return (
		<div className=''>
			<div className='container d-flex justify-content-between'>
				<div>
					<h2>GO_Bank</h2>
				</div>
				<div className='d-flex'>
					<div className='m-2'>
						<NavLink className='m-3 text-decoration-none'>About</NavLink>
						<NavLink className='m-3 text-decoration-none'>Services</NavLink>
						<NavLink className='m-3 text-decoration-none'>Contact Us</NavLink>
					</div>
					<div className='m-2'>
						<NavLink className='m-3 text-decoration-none'>Login</NavLink>
						<NavLink className='m-3 text-decoration-none'>Signup</NavLink>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header;