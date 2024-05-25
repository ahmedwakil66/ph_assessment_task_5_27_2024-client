// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import './Profile.css';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';

const Profile = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    useTitle('Profile');

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Log Out Successful!');
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message);
            })
    }

    return (
        <div className='container section'>
            {user && <div className='profile-header'>
                <p>Signed in Email</p>
                <p>{user.email}</p>
                <button onClick={handleLogOut} style={{ padding: '0 5px' }}>Log Out</button>
            </div>}

            <hr style={{ margin: '2rem 0', color: '#e7d6d6cf' }} />
        </div>
    );
};

export default Profile;