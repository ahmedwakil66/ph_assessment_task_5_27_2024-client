// eslint-disable-next-line no-unused-vars
import './Recipe.css';
import { memo, useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import RecipeCard from '../Shared/Cards/RecipeCard/RecipeCard';
import { SecondLayoutContext } from '../../providers/SecondLayoutProvider';
// import { toast } from 'react-hot-toast';
// import ChefCard from '../Shared/Cards/ChefCard/ChefCard';
import useTitle from '../../hooks/useTitle';

const Recipe = memo(function Recipe() {
    const recipe = useLoaderData();
    const { setSecLayTitle, setSecLayTitleMain } = useContext(SecondLayoutContext);
    // const [chef, setChef] = useState({});

    useTitle(recipe?.name);

    useEffect(() => {
        setSecLayTitle('Recipe for ');
        setSecLayTitleMain(recipe?.name);
    }, [recipe?.name, setSecLayTitle, setSecLayTitleMain])

    // useEffect(() => {
    //     fetch(`https://craftawesome-us-1.onrender.com/simply-recipes/chefs/${recipe.chef_id}`)
    //         .then(res => res.json())
    //         .then(data => setChef(data))
    //         .catch(error => {
    //             console.log(error);
    //             toast.error(error.message);
    //             toast.error('Could not fetch chef data!');
    //         })
    // }, [recipe.chef_id, recipe?.name])

    return (
        <div className='recipe'>
            <RecipeCard recipe={recipe} />
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