// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Spinner from '../pages/Shared/LoaderSpinner/Spinner';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <Spinner />
    }

    if(!user) {
        toast('You must Login first!');
        return <Navigate to={'/login'} state={{from: location}} replace></Navigate>
    }
    
    return children;
};

export default PrivateRoute;