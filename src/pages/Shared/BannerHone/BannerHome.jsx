// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import './BannerHome.css';
import { AuthContext } from '../../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import GoogleLoginBtn from '../Utils/GoogleLoginBtn';

const BannerHome = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="banner-home" >
            <div className="banner-head">
                <div className="row2-text">
                    <h1>Simply Recipes</h1>
                    <h4>no fluff, just recipes</h4>
                    <div className='mt-4'>
                        <Link to={'/recipes'} className='btn btn-accent'>See Recipes</Link>
                        {
                            user
                                ? <Link to={'/add-recipe'} className='btn btn-success'>Add Recipe</Link>
                                : (
                                    <GoogleLoginBtn redirectPath={'/add-recipe'}>
                                        <button className='btn btn-success'>Add Recipe</button>
                                    </GoogleLoginBtn>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerHome;