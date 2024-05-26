import { memo, useEffect, useState } from 'react';
import QueryString from 'qs';
import { baseUrl } from '../../../routes/Routes';
import ItemCard from '../Cards/ItemCard/ItemCard';

const SimilarRecipes = memo(function SimilarRecipes({ category, country, currentRecipeId }) {
    const [loading, setLoading] = useState(true);
    const [similarRecipes, setSimilarRecipes] = useState([]);
    const hasSimilar = similarRecipes.length > 0;

    useEffect(() => {
        const getRecipes = async () => {
            const query = { $or: [{ category }, { country }] }
            const res = await fetch(`${baseUrl}/get-recipes/${QueryString.stringify(query)}`);
            const data = await res.json();
            if (data.recipes) {
                setSimilarRecipes(data.recipes.filter(recipe => recipe._id !== currentRecipeId));
            }
            setLoading(false);
        };
        getRecipes();
    }, [category, country, currentRecipeId])

    return (
        <div>
            <h2 className='title-sec-2'>Similar recipes</h2>

            {loading && <p>Loading...</p>}

            {!loading && hasSimilar && (
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {similarRecipes.map(recipe => <ItemCard item={recipe} key={recipe._id} />)}
                </div>
            )}

            {!loading && !hasSimilar && <p>Nothing found!</p>}
        </div>
    );
});

export default SimilarRecipes;