// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import './Registration.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-hot-toast';
import useTitle from '../../hooks/useTitle';

const Registration = () => {
    useTitle('Sign Up');
    const { createAccount, changeInfo } = useContext(AuthContext);
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathName || '/';

    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photoUrl = form.photoUrl.value || '';

        if (email.length === 0 || password.length === 0) {
            toast.error('Email and Password Can NOT be Empty!');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long!');
            return;
        }

        const loading = toast.loading('Validating...')

        createAccount(email, password)
            .then(result => {
                console.log(result.user);
                toast.success('Account created successfully!', { id: loading });
                // verifyHandler(result.user);
                changeInfo({ displayName: name, photoURL: photoUrl })
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message, { duration: 4000, id: loading });
            })
    }


    const HandleShowPass = (event) => {
        setShowPass(event.target.checked);
        console.log(event.target.checked)
    }


    return (
        <div className='container log-reg-container'>
            <div className='section'>
                <h1 className='log-reg-title'>R E G I S T E R</h1>
                <form onSubmit={handleSignUp} className='log-reg-form section'>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="name" name="name" id="name" required />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type={showPass ? 'text' : 'password'} name='password' id='password' />

                        <input onClick={HandleShowPass} type="checkbox" style={{ width: 'fit-content', display: 'inline-block', marginRight: '10px' }} name='checkbox' id='checkbox' />
                        <label htmlFor="checkbox" style={{ fontSize: '16px', fontWeight: '400' }}>Show Password</label>

                    </div>
                    <div>
                        <label htmlFor="photoUrl">Photo URL</label>
                        <input type="photoUrl" name='photoUrl' id='photoUrl' />
                    </div>
                    <div>
                        <button className='btn btn-login btn-submit'>Sign Up</button>
                    </div>
                    <hr />
                    <div>
                        Already have an account? <Link to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;