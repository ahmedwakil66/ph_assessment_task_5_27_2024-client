import { useLoaderData } from 'react-router-dom';
import ItemCard from '../Shared/Cards/ItemCard/ItemCard';
import { useContext, useEffect } from 'react';
import { SecondLayoutContext } from '../../providers/SecondLayoutProvider';

const AllRecipes = () => {
    const recipes = useLoaderData();
    const { setSecLayTitle, setSecLayTitleMain } = useContext(SecondLayoutContext);

    useEffect(() => {
        setSecLayTitle(`All Recipes `);
        setSecLayTitleMain('');
    }, [setSecLayTitle, setSecLayTitleMain]);

    return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {recipes.map(recipe => <ItemCard item={recipe} key={recipe._id} />)}
        </div>
    );
};

export default AllRecipes;