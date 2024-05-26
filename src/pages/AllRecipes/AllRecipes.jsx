import { useLoaderData } from 'react-router-dom';
import ItemCard from '../Shared/Cards/ItemCard/ItemCard';
import { useCallback, useContext, useEffect, useState } from 'react';
import { SecondLayoutContext } from '../../providers/SecondLayoutProvider';
import toast from 'react-hot-toast';
import { baseUrl } from '../../routes/Routes';
import QueryString from 'qs';
import { categories, countries } from '../../constants/constants';
import InfiniteScrollRecipes from './InfiniteScrollRecipes';

const AllRecipes = () => {
    const { setSecLayTitle, setSecLayTitleMain } = useContext(SecondLayoutContext);
    const data = useLoaderData();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [queryString, setQueryString] = useState('');
    const [recipesToShow, setRecipesToShow] = useState([]);

    useEffect(() => {
        setRecipesToShow(data.recipes);
    }, [data])

    useEffect(() => {
        setSecLayTitle(`All Recipes `);
        setSecLayTitleMain('');
    }, [setSecLayTitle, setSecLayTitleMain]);

    // merge new recipes through a callback
    const setRecipesToShowCallback = useCallback((newRecipes) => {
        setRecipesToShow(prev => ([...prev, ...newRecipes]));
        setPage(prev => prev + 1); // new data means +1 page
    }, [])

    // handle recipe search
    const onClickSearch = async (event) => {
        event.preventDefault();
        const value = event.target.searchInput.value;
        setLoading(true);
        try {
            if (!value) throw new Error('You must enter a name');
            const query = { name: { $regex: value } };
            const queryString = QueryString.stringify(query);
            setQueryString(queryString);
            const res = await fetch(`${baseUrl}/get-recipes/${queryString}`);
            const data = await res.json();
            if (data.recipes) setRecipesToShow(data.recipes);

        } catch (error) {
            toast.error(error.message);

        } finally {
            setLoading(false);
        }
    }

    // handle recipe filter
    const onClickFilter = async (event) => {
        event.preventDefault();
        const category = event.target.category.value;
        const country = event.target.country.value;
        setLoading(true);
        try {
            if (!country && !category) throw new Error('Select at least one filter');
            const query = {};
            if (country) query.country = country;
            if (category) query.category = category;
            const queryString = QueryString.stringify(query);
            setQueryString(queryString);
            const res = await fetch(`${baseUrl}/get-recipes/${queryString}`);
            const data = await res.json();
            if (data.recipes) setRecipesToShow(data.recipes);

        } catch (error) {
            toast.error(error.message);

        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className='relative'>
                <div role="tablist" className="tabs tabs-lifted">
                    {/* search recipes */}
                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Search" defaultChecked />
                    <div role="tabpanel" className="tab-content py-4 pb-6">
                        <form onSubmit={onClickSearch} id='searchRecipeForm' className="join w-full">
                            <input
                                className="input w-8/12 input-bordered join-item"
                                placeholder="Search by recipe name"
                                name='searchInput'
                            />
                            <button className="btn w-4/12 join-item" type='submit'>Search</button>
                        </form>
                    </div>

                    {/* recipe filter */}
                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Filter" />
                    <div role="tabpanel" className="tab-content py-4 pb-6">
                        <form onSubmit={onClickFilter} id='recipeFilterForm' className="join w-full">
                            <select name='country' defaultValue='' className="join-item select select-bordered w-full">
                                <option value='' disabled>Select country</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                            <select name='category' defaultValue='' className="join-item select select-bordered w-full">
                                <option value='' disabled>Select category</option>
                                {categories.map((item) => (
                                    <option key={item.category} value={item.category}>
                                        {item.category.slice(0, 1).toUpperCase()}{item.category.slice(1)}
                                    </option>
                                ))}
                                <option value='other'>Other</option>
                            </select>
                            <button className="btn w-4/12 join-item" type='submit'>Filter</button>
                        </form>
                    </div>

                    {/* reset any search or filter */}
                    <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Reset" />
                    <div role="tabpanel" className="tab-content py-4 pb-6">
                        <div className='flex justify-end'>
                            <button
                                className="btn"
                                onClick={() => {
                                    document.getElementById('searchRecipeForm').reset();
                                    document.getElementById('recipeFilterForm').reset();
                                    setQueryString('');
                                    setRecipesToShow(data.recipes);
                                    toast.success('Reset success');
                                }}
                            >
                                Reset all Search & Filter
                            </button>
                        </div>
                    </div>
                </div>

                {/* loading backdrop */}
                {loading && (
                    <div
                        className='absolute top-0 left-0 w-full h-5/6 flex justify-center items-center rounded-lg'
                        style={{ background: 'rgba(0, 0, 0, .4)' }}
                    >
                        <span className='loading loading-spinner loading-lg' />
                    </div>
                )}
            </div>

            {/* show recipes */}
            {recipesToShow.length === 0 && <p>Nothing found!</p>}
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {recipesToShow.map(recipe => <ItemCard item={recipe} key={recipe._id} />)}
            </div>

            {/* auto load more recipes */}
            <InfiniteScrollRecipes
                page={page + 1}
                queryString={queryString}
                setRecipesToShow={setRecipesToShowCallback}
                totalShowing={recipesToShow.length}
            />

        </div>
    );
};

export default AllRecipes;