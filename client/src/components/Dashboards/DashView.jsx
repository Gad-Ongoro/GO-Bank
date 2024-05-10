import React from 'react';

function DashView() {
    return (
        <div className='container grid grid-cols-12'>
			<div className='col-span-8'>
				<div>
					<h2 className='text-lg my-2'>Recent Transactions</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
						<div>
							<img className='rounded h-52 object-cover cursor-pointer transition-all duration-300 hover:scale-105' src="https://i.pinimg.com/474x/b9/37/9a/b9379ad46b7f2d23fc893714558d6f93.jpg" alt="NA" width={200} />
						</div>
						<div>
							<img className='rounded h-52 object-cover cursor-pointer transition-all duration-300 hover:scale-105' src="https://i.pinimg.com/474x/60/42/04/604204f56a9164a4b4a0d4ca6e4cdcbf.jpg" alt="NA" width={200} />
						</div>
						<div>
							<img className='rounded h-52 object-cover cursor-pointer transition-all duration-300 hover:scale-105' src="https://i.pinimg.com/474x/dd/09/3d/dd093d214f0df5a700f1f31cbd2c3e0f.jpg" alt="NA" width={200} />
						</div>
					</div>
				</div>
				<div>
					<div>
						<h2>Changes Chart</h2>
					</div>
					<div>
						<h2>Contacts List</h2>
					</div>
				</div>
			</div>

			<div>
				<div>
					<h2 className='text-lg'>My Cards</h2>
				</div>
			</div>
		</div>
    )
};

export default DashView;