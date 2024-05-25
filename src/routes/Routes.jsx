/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import SecondLayoutProvider from "../providers/SecondLayoutProvider";
import MySuspense from "../utility/MySuspense";
import AllRecipes from '../pages/AllRecipes/AllRecipes';

const Profile = React.lazy(() => import('../pages/Profile/Profile'));
const CategoryFoods = React.lazy(() => import('../pages/CategoryFoods/CategoryFoods'));
const Recipe = React.lazy(() => import('../pages/Recipe/Recipe'));
const ErrorPage = React.lazy(() => import('../pages/ErrorPage/ErrorPage'));
const ChefRecipes = React.lazy(() => import('../pages/ChefRecipes/ChefRecipes'));
const Login = React.lazy(() => import('../pages/Login/Login'));

const baseUrl = import.meta.env.VITE_Api_BaseUrl;

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <MySuspense><ErrorPage /></MySuspense>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile /></PrivateRoute>
            },
            {
                path: '/chef-recipes/:chefId',
                element: <PrivateRoute><MySuspense><ChefRecipes /></MySuspense></PrivateRoute>,
                loader: ({ params }) => fetch(`${baseUrl}/simply-recipes/chef/${params.chefId}`)
                // loader: ({ params }) => fetch(`http://localhost:3000/simply-recipes/chef/${params.chefId}`, {
                //     method: 'GET',
                //     headers: {
                //         authorization: `Bearer ${localStorage.getItem('simply-recipes-token')}`
                //     }
                // })
            },
            {
                path: '/login',
                element: <MySuspense><Login /></MySuspense>
            },
            {
                path: '/categories/',
                element: <SecondLayoutProvider />,
                children: [
                    {
                        path: '/categories/:catName',
                        element: <MySuspense><CategoryFoods /></MySuspense>,
                        loader: ({ params }) => fetch(`${baseUrl}/get-recipes/categories/${params.catName}`)
                    }
                ]
            },
            {
                path: '/recipes/',
                element: <SecondLayoutProvider />,
                children: [
                    {
                        path: '',
                        element: <AllRecipes />,
                        loader: () => fetch(`${baseUrl}/get-recipes`)
                    },
                    {
                        path: '/recipes/:recipeId',
                        element: <MySuspense><Recipe /></MySuspense>,
                        loader: ({ params }) => fetch(`${baseUrl}/simply-recipes/recipes/${params.recipeId}`)
                    }
                ]
            }
        ]
    }
])

export default router;