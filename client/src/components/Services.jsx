import React from 'react';
import AnimatedYPage from './AnimatedYPage';
import Footer from './Footer';

function Services() {
    return (
        <AnimatedYPage>
        <div className=''>
            <div className='container grid grid-cols-1 md:grid-cols-3 gap-5 mb-5'>
                <div>
                    <h2 className='text-4xl font-bold text-green-400 my-3'>Personal Banking</h2>
                    <h3 className='tracking-wide'>What are your financial aspirations?</h3>
                    <p>We will walk with you and help empower your financial future. Our personal accounts are tailor made to meet your day to day financial needs.</p>
                </div>
                <div>
                    <h2 className='text-3xl font-bold text-green-400 my-3'>Business Banking</h2>
                    <h3 className='tracking-wide'>We have suitable solutions to help your business grow</h3>
                    <p>We are the financial partner who will walk with you in every stage in your business journey</p>
                </div>
                <div>
                    <h2 className='text-3xl font-bold text-green-400 my-3'>Corporate & Institutional Banking</h2>
                    <h3>Services tailored to answer your everyday business needs</h3>
                    <p>We have tailor-made solutions for our clients according to their financial needs</p>
                </div>
                <div>
                    <h2 className='text-3xl font-bold text-green-400 my-3'>Groups</h2>
                    <h3 className='tracking-wide'>Banking for groups and chamas</h3>
                    <p>Our group banking facilities ensures your chama/investment group thrives</p>
                </div>
                <div>
                    <h2 className='text-3xl font-bold text-green-400 my-3'>Co-operatives</h2>
                    <h3 className='tracking-wide'>GO Bank provides capacity building to Cooperatives through Advisory and Training Services.</h3>
                </div>
                {/* <div>
                    <h2 className='text-3xl font-bold text-green-400 my-3'>Investing</h2>
                    <h3>Ways to Invest with us</h3>
                </div> */}
                <div>
                    <h2 className='text-3xl font-bold text-green-400 my-3'>Money Transfer</h2>
                    <h3 className='tracking-wide'>We have a bouquet of money transfer solutions for you to choose from</h3>
                </div>
                <div>
                    <h2 className='text-3xl font-bold text-green-400 my-3'>Treasury Products</h2>
                    <p className='tracking-wide'>GO Bank provides its customers flexibility of doing their Foreign exchange conversions to be delivered immediately or up to a maximum of 2 working days to give them convenience in settlement</p>
                </div>
            </div>
            <Footer></Footer>
        </div>
        </AnimatedYPage>
    )
};

export default Services;