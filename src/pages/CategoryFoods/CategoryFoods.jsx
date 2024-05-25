// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react';
import './CategoryFoods.css';
import { useLoaderData, useParams } from 'react-router-dom';
import ItemCard from '../Shared/Cards/ItemCard/ItemCard';
import useTitle from '../../hooks/useTitle';
import { SecondLayoutContext } from '../../providers/SecondLayoutProvider';

const CategoryFoods = () => { console.log('CategoryFoods')
    const {setSecLayTitle, setSecLayTitleMain} = useContext(SecondLayoutContext);
    const categoryItems = useLoaderData();
    const name = useParams();

    useTitle(name.catName.slice(0, 1).toUpperCase() + name.catName.slice(1));

    useEffect(() => {
        setSecLayTitle(`All recipes for `);
        setSecLayTitleMain(`${name.catName}`);
    }, [name.catName, setSecLayTitle, setSecLayTitleMain]);

    return (
        <div className=''>
            <div className='category-items'>
                {categoryItems?.map(item => <ItemCard key={item._id} item={item} />)}
            </div>
        </div>
    );
};

export default CategoryFoods;