// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Footer.css'
import { footerIcon } from '../../../Icons';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer-container section'>
            <div className='f-div'>
                <div className='f-image'>
                    {footerIcon}
                </div>

                <h1 className='textCenter title-sec'>ENJOY YOUR FOOD WITH SIMPLE RECIPES</h1>
                

                <div className='footer-info-container'>
                    <div className='textCenter'>
                        <h3>Opening Time</h3>
                        <p>Mon - Fri: 8am - 8pm</p>
                        <p>Mon - Fri: 8am - 8pm</p>
                        <p>Mon - Fri: 8am - 8pm</p>
                    </div>
                    <div className='textCenter'>
                        <h3>Follow us</h3>
                        <p><a className='link link-primary' href="https://github.com/ahmedwakil66">GitHub</a></p>
                        <p><a className='link link-primary' href="https://www.linkedin.com/in/wakil-ahmed-a62a47248/">LinkedIn</a></p>
                    </div>
                    <div className='textCenter'>
                        <h3>Contact us</h3>
                        <p>info@mysite.com</p>
                        <p>123-456-7890</p>
                        <p className='textCenter'>Panthapath Dhaka - 1205</p>
                    </div>
                </div>

            </div>
            <hr />
            <p className='textCenter footer-foot'>© 2024 by Simple Recipes. Powered and secured by <Link to={'https://kwa.netlify.app/'} style={{color: 'inherit', fontWeight: '500'}}>Kazi Wakil Ahmed</Link></p>
        </div>
    );
};

export default Footer;