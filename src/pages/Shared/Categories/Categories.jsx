// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './Categories.css';
import { heroSvg } from '../../../Icons';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Spinner from '../LoaderSpinner/Spinner';

const Categories = ({noHeadline}) => {
    const [category, setCategory] = useState([]);
    const[isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://craftawesome-us-1.onrender.com/simply-recipes/categories')
        .then(res => res.json())
        .then(data => {
            setCategory(data);
            setIsLoading(false);
        })
        .catch(error => {
            console.error(error);
            setIsLoading(false);
            toast.error(error.message);
        })
    }, [])


    return (
        <div className={`container ${noHeadline || 'section'}`}>
            {noHeadline || <h2 className='title-sec'>Our Recipe Categories</h2>}
            {isLoading && <Spinner />}
            <div className='categories'>
                {category.map((cat, ind) => {
                    const catFirst = cat.category.slice(0, 1).toUpperCase();
                    const catRemains = cat.category.slice(1, cat.length);
                    const catName = catFirst + catRemains;
                    return(
                        <Link to={`/categories/${cat.category}`} key={ind} className='category-card'>
                            <img src={`/${cat.image}`} alt="" />
                            <div className='hero-svg'>{heroSvg}</div>
                            <span className='hero-text'>{catName}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default Categories;