import { useContext } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { BankContext } from '../App';

function Header() {
	let { token_exists, signedIn } = useContext(BankContext);

	function handleLogOut(){
		localStorage.clear();
		Navigate('/login')
	};

	return (
		<header className='sticky top-0 z-50 backdrop-blur'>
			<div className='container flex flex-col md:flex-row justify-content-between'>
				<div>
					<NavLink 
						to={'/'}
						className={'no-underline'}
					>
						<h1 className='text-2xl font-bold mt-1 p-0 text-green-500 text-center'><i>GOBank</i></h1>
					</NavLink>
				</div>
				<div className='nav_holder flex justify-center'>
					<div className='m-2'>
						<ul className='d-flex list-none'>
							<li className='navlink'>
								<NavLink className='navlink m-3 no-underline' to={'/about'}>About</NavLink>
							</li>
							<li className='navlink'>
								<NavLink className='navlink m-3 no-underline' to={'/services'}>Services</NavLink>
							</li>
							{/* <li className='navlink'>
								<NavLink className='navlink m-3 no-underline' to={'/contact'}>Contact Us</NavLink>
							</li> */}
						</ul>
					</div>
					<div className='m-2'>
						<ul className='d-flex list-none'>
							<li className='navlink'>
								{token_exists || signedIn ? <NavLink to={'/signin'} className='navlink m-3 no-underline' onClick={handleLogOut}>Logout</NavLink> : <NavLink to={'/signin'} className='navlink m-3 no-underline'>Login</NavLink>}
							</li>
							{/* <li className='navlink'>
								<NavLink to={'/register'} className='navlink m-3 no-underline'>Signup</NavLink>
							</li> */}
							<li className='navlink'>
								<NavLink to={'/customer_dashboard/dashview'} className='navlink m-3 no-underline'>Account</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header;