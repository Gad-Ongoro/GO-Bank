import React from 'react';
import { TbSmartHome } from "react-icons/tb";
import { IconContext } from 'react-icons/lib';

function SideNav() {
	return (
		<div>
			<IconContext.Provider
      			value={{ color: 'white', size: '30px' }}
    		>
				<TbSmartHome size={35}/>
			</IconContext.Provider>
		</div>
	)
}

export default SideNav;