// eslint-disable-next-line no-unused-vars
import React from 'react';
import BannerHome from './Shared/BannerHone/BannerHome';
import Categories from './Shared/Categories/Categories';
import BannerBook from './Shared/BannerHone/BannerBook';
import TodaysPick from './Shared/TodaysPick/TodaysPick';
import { useTitleHome } from '../hooks/useTitle';
import Stats from './Shared/stats/Stats';
import DevInfo from './Shared/DevInfo/DevInfo';

const Home = () => {
    useTitleHome();

    return (
        <div>
            <BannerHome />
            <Stats />
            <TodaysPick />
            <Categories />
            <DevInfo />
            <BannerBook />
            {/* <p className='container section thanks-for-visiting'>Thanks for Visiting</p> */}
        </div>
    );
};

export default Home;