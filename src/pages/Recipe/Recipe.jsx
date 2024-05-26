import './Recipe.css';
import { memo, useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import RecipeCard from '../Shared/Cards/RecipeCard/RecipeCard';
import { SecondLayoutContext } from '../../providers/SecondLayoutProvider';
import useTitle from '../../hooks/useTitle';
import SimilarRecipes from '../Shared/SimilarRecipes/SimilarRecipes';

const Recipe = memo(function Recipe() {
    const recipe = useLoaderData();
    const { setSecLayTitle, setSecLayTitleMain } = useContext(SecondLayoutContext);

    useTitle(recipe?.name);

    useEffect(() => {
        setSecLayTitle('Recipe for ');
        setSecLayTitleMain(recipe?.name);
    }, [recipe?.name, setSecLayTitle, setSecLayTitleMain])

    if (!recipe) {
        return <p className='text-error'>Could not load the recipe!</p>
    }

    return (
        <div className='recipe'>
            <RecipeCard recipe={recipe} />
            <SimilarRecipes
                category={recipe.category}
                country={recipe.country}
                currentRecipeId={recipe._id}
            />
            {/* <div className='who-crafted'>
                <h2 className='title-sec-2'>Who crafted this recipe?</h2>
                <div className='who-crafted-cards'>
                    <ChefCard chef={chef} />
                </div>
            </div> */}
        </div>
    );
});

export default Recipe;