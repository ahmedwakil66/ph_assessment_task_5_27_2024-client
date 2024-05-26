
import './RecipeCard.css';
import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating';
import { Link } from 'react-router-dom';
import RecipeCardReaction from './RecipeCardReaction';

const RecipeCard = ({ recipe }) => {
    const { _id, name, image, description, ingredients, cooking_method, rating, youtube_embed,
        country, category, purchased_by, reacted_by, creator_email, watch_count } = recipe;

    return (
        <div className='recipe-card'>
            <div>
                <img src={`/${image}`} alt="" />
                <div className='title-desc'>
                    <h2 className='font-semibold my-2'>{name}</h2>
                    <p>{description}</p>
                </div>
            </div>

            <div className='info'>
                <div>
                    <h4 className='font-semibold'>Required Ingredients</h4>
                    <ul>
                        {ingredients?.map((item, ind) => <li key={ind}>{item}</li>)}
                    </ul>
                </div>

                <div>
                    <h4 className='font-semibold'>Cooking Method</h4>
                    <div>
                        {cooking_method?.split('\n').map((item, ind) => <p key={ind} style={{ marginBottom: '5px' }}>{item}</p>)}
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center my-4'>
                <iframe className='w-80 h-48 md:w-[560px] md:h-[315px]' src={`https://www.youtube.com/embed/${youtube_embed || 'dRW3VMfNlaY?si=9vaJQEx3pibQBsjq'}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                <p className='text-sm font-semibold mt-1'>Watch recipe video</p>
            </div>

            <div className='info'>
                <div>
                    <h5 className='font-semibold'>Category</h5>
                    <p>{category.slice(0, 1).toUpperCase()}{category.slice(1)}</p>
                    <h5 className='font-semibold mt-2'>Origin</h5>
                    <p>{country}</p>
                    <h5 className='font-semibold mt-2'>Crafted by</h5>
                    <Link to={`mailto:${creator_email}`} className='text-primary'>{creator_email}</Link>
                </div>

                <div>
                    <h5 className='font-semibold'>Stats</h5>
                    <p>{watch_count} views</p>
                    <h5 className='font-semibold mt-2'>Purchased by</h5>
                    <p>{purchased_by.length} people</p>
                </div>
            </div>

            <div className='recipe-card-footer'>
                <Rating
                    style={{ maxWidth: 110 }}
                    value={rating}
                    readOnly
                >
                </Rating>
               <RecipeCardReaction reacted_by={reacted_by} recipeId={_id}/>
            </div>
        </div>
    );
};

export default RecipeCard;