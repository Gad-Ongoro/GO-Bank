import React from 'react';
import { NavLink } from 'react-router-dom';
import AnimatedYPage from './AnimatedYPage';
import Footer from './Footer';

function Main() {
	return (
		<AnimatedYPage>
			<div>
				<div className='container mb-5'>
					<section className=''>
						<div className='flex justify-around flex-col md:flex-row my-5'>
							<div>
								<div>
									<h2 className='text-4xl font-bold tracking-wide leading-relaxed'>Banking <span className='text-green-500'>simply</span> made for you.</h2>
									<p className='text-lg my-2'>Banking solutions at your fingertips .</p>
									<p className='text-lg my-2'>We are your partner. We share your vision. Go Above! Go Beyond!</p>
								</div>
								<div>
									<NavLink
										to='/register'
										className='bg-green-500 hover:bg-green-400 transition-all duration-500 w-36 h-10 text-dark font-bold rounded-pill'>
										Get Started
									</NavLink>
								</div>
							</div>

							<div className='w-2/4 md:w-80' style={{ 'borderRadius': '47% 53% 41% 59% / 45% 41% 59% 55%', 'overflow': 'hidden' }}>
								<img
									className='rounded'
									src="https://i.pinimg.com/originals/15/8f/7b/158f7b292473c35812ad97f6b317a668.gif"
									alt="Not Supported"
									width={350}
								>
								</img>
							</div>
						</div>

						<div className='container flex flex-col md:flex-row gap-4 justify-around text-center'>
							<div className='text-4xl'>
								<p><span className='text-green-500'>100+</span> Branches & ATM</p>
							</div>
							<div className='text-4xl'>
								<p><span className='text-green-500'>10K+</span> Customers</p>
							</div>
							<div>
								<button
									type='button'
									className='bg-green-500 hover:bg-green-400 transition-all duration-500 w-36 h-10 text-white font-bold rounded-pill'
								>Learn More</button>
							</div>
						</div>

						<div className='text-center text-4xl font-bold text-green-400 my-5'>Best In All.</div>
					</section>

					<section className='container'>
						<div className=''>
							<h2 className='text-center text-4xl text-green-400 my-5'>Cards</h2>

							<div className='grid grid-cols-1 md:grid-cols-3 justify-between gap-6'>
								<div className='p-0 m-0 rounded'>
									<div className='container'>
										<div className='w-full h-56 relative'>
											<img className='w-full h-full absolute object-fill rounded' src="visa0.png" alt="NA"></img>
										</div>

										<h3 className='text-center text-green-500 text-xl'>Debit Cards(ATM CARDS)</h3>
										<p className='text-lg tracking-wide container'>Apply for Visa Debit Card Faster, safer and more convenient than cash</p>
										<div className='text-center'>
											<button type='button' className='rounded-pill bg-green-500 text-white w-50 h-10 font-bold'>Learn More</button>
										</div>
									</div>
								</div>

								<div className='p-0 m-0 rounded'>
									<div className='container'>
										<div className='w-full h-56 relative'>
											<img className='w-full h-full absolute object-fill rounded' src="visa1.png" alt="NA"></img>
										</div>
										<h3 className='text-center text-green-500 text-xl'>Credit Cards</h3>
										<p className='text-lg tracking-wide'>This is a Visa Credit Card designed for anyone who wants to access credit</p>
										<div className='text-center'>
											<button type='button' className='rounded-pill bg-green-500 text-white w-50 h-10 font-bold'>Learn More</button>
										</div>
									</div>
								</div>

								<div className='p-0 m-0 rounded'>
									<div className='container'>
										<div className='w-full h-56 relative'>
											<img className='w-full h-full absolute object-fill rounded' src="visa2.png" alt="NA"></img>
										</div>
										<h3 className='text-center text-green-500 text-xl'>Prepaid Cards</h3>
										<p className='text-lg tracking-wide'>You do not have to be a Co-op Bank customer to own a Co-op Pre-paid Card!</p>
										<div className='text-center'>
											<button type='button' className='rounded-pill bg-green-500 text-white w-50 h-10 font-bold'>Learn More</button>
										</div>
									</div>
								</div>

								<div className='p-0 m-0 rounded'>
									<div className='container'>
										<div className='w-full h-56 relative'>
											<img className='w-full h-full absolute object-fill rounded' src="visa3.png" alt="NA"></img>
										</div>
										<h3 className='text-center text-green-500 text-xl'>Platinum Card</h3>
										<p className='text-lg tracking-wide'>Enjoy the benefit of accessing airport VIP lounges globally at a highly discounted rate</p>
										<div className='text-center'>
											<button type='button' className='rounded-pill bg-green-500 text-white w-50 h-10 font-bold'>Learn More</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
				<Footer></Footer>
			</div>
		</AnimatedYPage>
	)
}

export default Main;