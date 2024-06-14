import React from 'react';
import AnimatedYPage from './AnimatedYPage';
import Footer from './Footer';

function About() {
	return (
		<AnimatedYPage>
			<div>
				<div className='container mb-5'>
					<div>
						<h2 className='text-center text-4xl font-bold text-green-400 my-3'>About Us</h2>
						<p className='text-lg tracking-wide'>Go Bank is incorporated in Kenya under the Company Act and is also licensed to do the business of banking under the Banking Act.</p>

						<h2 className='text-center text-4xl font-bold text-green-400 my-3'>Our Vision</h2>
						<p className='text-lg tracking-wide'>To be the dominant bank in Kenya and the region, riding on the unique Co-operative Model providing innovative financial solutions for distinctive customer experience.</p>

						<h2 className='text-center text-4xl font-bold text-green-400 my-3'>Our Mission</h2>
						<p className='text-lg tracking-wide'>To offer a wide range of innovative financial solutions leveraging on our heavy investment in multi-channels, national and regional presence and with a focus on excellent customer experience by a highly motivated and talented team.</p>

						<h2 className='text-4xl font-bold text-green-400 my-3'>Our Values :</h2>
						<ul className='ml-5'>
							<li className='text-lg tracking-wide'>We are Trustworthy</li>
							<li className='text-lg tracking-wide'>We are Innovative and Agile</li>
							<li className='text-lg tracking-wide'>We Value our Customers/People</li>
							<li className='text-lg tracking-wide'>We Share and Collaborate</li>
							<li className='text-lg tracking-wide'>We have Passion for Excellence</li>
							<li className='text-lg tracking-wide'>We are Bold and courageous</li>
						</ul>

					</div>
				</div>
				<Footer></Footer>
			</div>
		</AnimatedYPage>
	)
};

export default About;