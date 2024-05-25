// eslint-disable-next-line no-unused-vars
import React from 'react';
import './BannerBook.css';
import { toast } from 'react-hot-toast';

const BannerBook = () => {
    return (
        <div className='section banner-book-background'>
            <div className='banner-book-overlay'></div>
            <div className='banner-book'>
                <div className='desc'>
                    <h4 className='special-dish-text'>Special Dish</h4>
                    <h2>Get the book of most popular recipe</h2>
                    <p></p>
                    <button onClick={() => toast('Coming Soon!')} className='btn'>Get Your Copy!</button>
                </div>
                <div>
                    <img src="assets/book.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default BannerBook;