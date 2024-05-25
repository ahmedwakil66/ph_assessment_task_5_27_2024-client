// eslint-disable-next-line no-unused-vars
import React from 'react';
import './ChefRecipes.css';
import { useLoaderData } from 'react-router-dom';
import RecipeCard from '../Shared/Cards/RecipeCard/RecipeCard';
import useTitle from '../../hooks/useTitle';

const ChefRecipes = () => {
    useTitle('Chef Recipes')
    const { chef, chefRecipes } = useLoaderData();
    const { likes, bio, years_of_experience, num_of_recipes } = chef;

    return (
        <div className='container section'>
            <h1 className='title-sec'>Chef Recipes</h1>
            <div className='chef-and-recipes'>
                <div className='chef-wrapper'>
                    <div className='chef'>
                        <img src={`/${chef.image}`} alt="" />
                        <h2>{chef.name}</h2>
                        <div className='description'>
                            <p>{years_of_experience} years of experience</p>
                            <p>{num_of_recipes} recipes</p>
                            <p>{likes} likes</p>
                        </div>
                        <p className='bio'>{bio}</p>
                    </div>
                </div>

                <div className='chef-recipes'>
                    {chefRecipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)}
                </div>
            </div>
        </div>
    );
};

export default ChefRecipes;