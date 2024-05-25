// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../pages/Shared/Header/Header';
import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loader from '../pages/Shared/LoaderSpinner/Loader';
import Footer from '../pages/Shared/Footer/Footer';

const MainLayout = () => {
    const navigation = useNavigation();

    return (
        <>
            <Navbar />
            <Outlet></Outlet>
            <Footer />
            <Toaster />
            <ScrollRestoration />
            {navigation.state === 'loading' ? <Loader /> : ''}
        </>
    );
};

export default MainLayout;