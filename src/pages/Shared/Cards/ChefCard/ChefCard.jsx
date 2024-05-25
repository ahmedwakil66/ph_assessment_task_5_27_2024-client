// eslint-disable-next-line no-unused-vars
import React from 'react';
import './ChefCard.css';
import { heartIcon } from '../../../../Icons';
import { useNavigate } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

const ChefCard = ({ chef }) => {
    const { _id, name, image, years_of_experience, num_of_recipes, likes, is_retired } = chef;
    const navigate = useNavigate()

    return (
        <div className={`chef-card ${is_retired && 'disabled-card'}`}>
            <LazyLoad height={366} width={320} threshold={.5}>
                <img className='banner' src={`/${image}`} alt="" />
            </LazyLoad>
            {is_retired && <span className='retired-text'>Retired</span>}
            <div className='body-wrapper'>
                <div className='body'>
                    <div className='description'>
                        <h3 className='title'>{name}</h3>
                        <p>
                            {!is_retired && <>Working for {years_of_experience} years</>}
                            {is_retired && <>Worked for {years_of_experience} years</>}
                        </p>
                        <p>Has total {num_of_recipes} recipes</p>
                    </div>
                    <div className='likes'>
                        <span>{heartIcon}</span>
                        <span>{likes}</span>
                    </div>
                </div>
                <button onClick={() => navigate(`/chef-recipes/${_id}`)} className={`btn ${is_retired && 'btn-disabled'}`} disabled={is_retired}>View Recipes</button>
            </div>
        </div>
    );
};

export default ChefCard;