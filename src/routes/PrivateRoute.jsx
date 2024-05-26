// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return (
            <div className='h-52 flex justify-center items-center'>
                <span className='loading loading-spinner loading-lg text-primary'/>
            </div>
        )
    }

    if(!user) {
        toast('You must Login first!');
        return <Navigate to={'/'} state={{from: location}} replace></Navigate>
    }
    
    return children;
};

export default PrivateRoute;