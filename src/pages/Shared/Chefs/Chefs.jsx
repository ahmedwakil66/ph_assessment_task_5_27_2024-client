// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './Chefs.css';
import ChefCard from '../Cards/ChefCard/ChefCard';
import { toast } from 'react-hot-toast';
import Spinner from '../LoaderSpinner/Spinner';

const Chefs = () => {
    const [chefsData, setChefsData] = useState([]);
    const[isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://craftawesome-us-1.onrender.com/simply-recipes/chefs')
        .then(res => res.json())
        .then(data => {
            setChefsData(data);
            setIsLoading(false);
        })
        .catch(error => {
            console.error(error);
            setIsLoading(false);
            toast.error(error.message);
        })
    }, []);


    return (
        <div className='container section'>
            <h2 className='title-sec'>Meet Our Awesome Chefs</h2>
            {isLoading && <Spinner />}
            <div className='chefs-container'>
                {chefsData.map(chef => <ChefCard key={chef._id} chef={chef}/>)}
            </div>
        </div>
    );
};

export default Chefs;