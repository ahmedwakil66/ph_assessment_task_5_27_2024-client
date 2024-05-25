// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './TodaysPick.css';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { arrowRightIcon } from '../../../Icons';
import Spinner from '../LoaderSpinner/Spinner';

const TodaysPick = () => {
    const [todaysPick, setTodaysPick] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://craftawesome-us-1.onrender.com/simply-recipes/todays-pick')
            .then(res => res.json())
            .then(data => {
                setTodaysPick(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                toast.error(error.message)
            })
    }, []);

    return (
        <div className='container section'>
            <h2 className='title-sec'>Today{"'"}s Pick</h2>
            {isLoading && <Spinner />}
            <Link to={`/recipes/${todaysPick[0]?._id}`} className='todays-pick' style={{ backgroundImage: `url('${todaysPick[0]?.image}')` }}>
                <div className='title-desc'>
                    <div>
                        <h2>{todaysPick[0]?.name}</h2>
                        <p>{todaysPick[0]?.description}</p>
                        {arrowRightIcon}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default TodaysPick;