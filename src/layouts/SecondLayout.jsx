// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import './Layouts.css';
import { Outlet } from 'react-router-dom';
import Categories from '../pages/Shared/Categories/Categories';
import { SecondLayoutContext } from '../providers/SecondLayoutProvider';

const SecondLayout = () => {
    const { secLayTitle, secLayTitleMain } = useContext(SecondLayoutContext);

    return (
        <div className='container'>
            <h1 className='title-sec section'>
                {secLayTitle}
                <span style={{ textTransform: 'capitalize' }}>{secLayTitleMain}</span>
            </h1>
            <div className='layout-2 section'>
                <details className='category-items-details min-w-[236px]'>
                    <summary className='category-items-summary'>All Recipe Categories</summary>
                    <Categories noHeadline={true} />
                </details>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default SecondLayout;