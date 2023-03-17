import React from 'react';
import Navbar from './Navbar';
import { Scrollbars } from 'react-custom-scrollbars';
import Hero from './Hero';
const Landing = () => {
return (
    <Scrollbars style={{ height: '100vh' }}>
    <Navbar/>
    <Hero/>
    </Scrollbars>
)
}

export default Landing;
