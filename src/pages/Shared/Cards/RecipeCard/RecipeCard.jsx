// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './RecipeCard.css';
import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating';
import { heartEmptyIcon, heartIcon } from '../../../../Icons';
import { toast } from 'react-hot-toast';

const RecipeCard = ({ recipe }) => {
    const [favorite, setFavorite] = useState(false);
    const { name, image, description, ingredients, cooking_method, rating } = recipe;

    const handleFav = () => {
        toast.success('Added to Favorite!');
        setFavorite(true);
    }

    return (
        <div className='recipe-card'>
            <div>
                <img src={`/${image}`} alt="" />
                <div className='title-desc'>
                    <h2 style={{ margin: '10px 0' }}>{name}</h2>
                    <p>{description}</p>
                </div>
            </div>

            <div className='info'>
                <div>
                    <h4>Required Ingredients</h4>
                    <ul>
                        {ingredients?.map((item, ind) => <li key={ind}>{item}</li>)}
                    </ul>
                </div>

                <div>
                    <h4>Cooking Method</h4>
                    <div>
                        {cooking_method?.split('\n').map((item, ind) => <p key={ind} style={{ marginBottom: '5px' }}>{item}</p>)}
                    </div>
                </div>
            </div>

            <div className='recipe-card-footer'>
                <Rating
                    style={{ maxWidth: 110 }}
                    value={rating}
                    readOnly
                >
                </Rating>
                <button onClick={handleFav} className={`mark-fav-btn ${favorite && 'btn-disabled brown'}`} disabled={favorite}>
                    {!favorite && <>{heartEmptyIcon} <span>Mark Favorite</span></>}
                    {favorite && <>{heartIcon}</>}
                </button>
            </div>
        </div>
    );
};

export default RecipeCard;