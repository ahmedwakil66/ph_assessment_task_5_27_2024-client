// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import './AboutUs.css';
import useTitle from '../../hooks/useTitle';

const AboutUs = () => {
    useTitle('About Us');

    return (
        <div className='container section'>
            about us
        </div>
    );
};

export default AboutUs;