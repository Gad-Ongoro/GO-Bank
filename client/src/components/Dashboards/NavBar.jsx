import { ImSearch } from "react-icons/im";

function NavBar() {
	return (
		<div>
			<div className='container flex justify-between'>
				<div>Profile Pic</div>
				<div>
					<div className="flex justify-center align-center text-center">
						<input className="outline-0 bg-transparent border rounded p-1" type="search" placeholder="Search here..."></input>
						<ImSearch size={17} className="transition-all duration-300 m-2 cursor-pointer hover:text-green-500"></ImSearch>
					</div>
				</div>
				<div>New Messages</div>
			</div>
		</div>
	)
};

export default NavBar;