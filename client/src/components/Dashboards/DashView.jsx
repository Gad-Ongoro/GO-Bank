import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { FaArrowRightLong } from "react-icons/fa6";
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

function DashView() {
    return (
        <div className='container grid grid-cols-12'>
			<div className='col-span-12 md:col-span-8'>
				<div>
					<h2 className='text-lg my-2'>Recent Transactions</h2>
					<div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
						<div className='flex justify-center'>
							<img className='rounded h-52 object-cover cursor-pointer transition-all duration-300 hover:scale-105' src="https://i.pinimg.com/474x/b9/37/9a/b9379ad46b7f2d23fc893714558d6f93.jpg" alt="NA" width={200} />
						</div>
						<div className='flex justify-center'>
							<img className='rounded h-52 object-cover cursor-pointer transition-all duration-300 hover:scale-105' src="https://i.pinimg.com/474x/60/42/04/604204f56a9164a4b4a0d4ca6e4cdcbf.jpg" alt="NA" width={200} />
						</div>
						<div className='flex justify-center'>
							<img className='rounded h-52 object-cover cursor-pointer transition-all duration-300 hover:scale-105' src="https://i.pinimg.com/474x/dd/09/3d/dd093d214f0df5a700f1f31cbd2c3e0f.jpg" alt="NA" width={200} />
						</div>
					</div>
				</div>
				<div>
					<div className='flex flex-col align-center rounded bg-gray-300 my-5 text-center overflow-auto'>
						<h2 className='text-gray-900 text-lg font-bold'>Changes Chart</h2>
						<BarChart
							series={[
								{ data: [3, 4, 1, 6, 5], stack: 'A', label: 'Series A1' },
								{ data: [4, 3, 1, 5, 8], stack: 'A', label: 'Series A2' },
								{ data: [4, 2, 5, 4, 1], stack: 'B', label: 'Series B1' },
								{ data: [2, 8, 1, 3, 1], stack: 'B', label: 'Series B2' },
								{ data: [10, 6, 5, 8, 9], label: 'Series C1' },
							]}
							width={600}
							height={350}
						/>
					</div>
					<div>
						<h2>Contacts List</h2>
					</div>
				</div>
			</div>

			<div className='col-span-12 md:col-span-4 text-center'>
				<div>
					<h2 className='text-lg'>My Cards</h2>
				</div>

				<div className='flex justify-around'>
					<div>
						<h2 className='text-lg'>Total Balance</h2>
						
						<button className='bg-green-500 hover:bg-green-400 transition-all duration-500 w-36 h-10 text-white-500 font-bold rounded-full'>Transfer <CompareArrowsIcon className='inline ml-1' /></button>
					</div>
					<div>
						<p>$5,060.99</p>
						<button className='bg-green-500 hover:bg-green-400 transition-all duration-500 w-36 h-10 text-white-500 font-bold rounded-full'>Withdraw <InstallMobileIcon  className='inline ml-1' /></button>
					</div>
				</div>
				<div>

				</div>
				<div>

				</div>
				<div>
					<button className='bg-green-500 hover:bg-green-400 transition-all duration-500 w-36 h-10 text-white-500 font-bold rounded-full'>Show All <FaArrowRightLong className='inline ml-1' /></button>
				</div>
			</div>
		</div>
    )
};

export default DashView;