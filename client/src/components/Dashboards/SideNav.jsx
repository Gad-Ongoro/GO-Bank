import React from 'react';
import { NavLink } from 'react-router-dom';
import { TbSmartHome } from "react-icons/tb";
// import { IconContext } from 'react-icons/lib';
import { CgProfile } from "react-icons/cg";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { RiSettings3Line } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";

function SideNav() {
	return (
		<div className='container flex md:flex-col justify-between md:justify-center items-center md:gap-14 md:border-r-2 md:border-gray-500'>
			{/* <IconContext.Provider
      			value={{ color: 'white', size: '30px' }}
    		>
				<TbSmartHome size={35}/>
			</IconContext.Provider> */}
			<NavLink to={'/'}>
				<TbSmartHome className='transition-all duration-400 cursor-pointer hover:text-green-500' size={30}/>
			</NavLink>
			<NavLink to={'/customer_dashboard/dashview'}>
				<CgProfile className='transition-all duration-400 cursor-pointer hover:text-green-500' size={30} />
			</NavLink>
			<IoNotificationsOutline className='transition-all duration-400 cursor-pointer hover:text-green-500' size={30} />
			<MdOutlineFavoriteBorder className='transition-all duration-400 cursor-pointer hover:text-green-500' size={30} />
			<RiSettings3Line className='transition-all duration-400 cursor-pointer hover:text-green-500' size={30} />
			<TbLogout2 className='transition-all duration-400 cursor-pointer hover:text-green-500' size={30} />
		</div>
	)
}

export default SideNav;