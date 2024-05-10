import React from 'react';
import { TbSmartHome } from "react-icons/tb";
// import { IconContext } from 'react-icons/lib';
import { CgProfile } from "react-icons/cg";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { RiSettings3Line } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";

function SideNav() {
	return (
		<div className='container flex flex-col justify-center items-center gap-14 border-r-2 border-gray-500'>
			{/* <IconContext.Provider
      			value={{ color: 'white', size: '30px' }}
    		>
				<TbSmartHome size={35}/>
			</IconContext.Provider> */}
			<TbSmartHome className='transition-all duration-400 cursor-pointer hover:text-green-500' size={30}/>
			<CgProfile className='transition-all duration-400 cursor-pointer hover:text-green-500' size={30} />
			<IoNotificationsOutline className='transition-all duration-400 cursor-pointer hover:text-green-500' size={30} />
			<MdOutlineFavoriteBorder className='transition-all duration-400 cursor-pointer hover:text-green-500' size={30} />
			<RiSettings3Line className='transition-all duration-400 cursor-pointer hover:text-green-500' size={30} />
			<TbLogout2 className='transition-all duration-400 cursor-pointer hover:text-green-500' size={30} />
		</div>
	)
}

export default SideNav;