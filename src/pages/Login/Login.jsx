// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-hot-toast';
import useTitle from '../../hooks/useTitle';

const Login = () => {
    useTitle('Login');
    const { logIn, googleLogin, githubLogin, resetPassword } = useContext(AuthContext);
    const [showPass, setShowPass] = useState(false);
    const  navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        const loading = toast.loading('Validating...');

        logIn(email, password)
            .then(result => {
                toast.success('Login successful!', { id: loading });
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
                if(error.message.includes('wrong-password')){toast.error('Password does not match!')}
                else if(error.message.includes('user-not-found')){toast.error('The user does not Exists!')}
                toast.error(error.message, { duration: 4000, id: loading });
            })
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                toast.success('Login successful!');
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message, { duration: 4000 });
            })
    }

    const handleGithubLogin = () => {
        githubLogin()
            .then(() => {
                toast.success('Login successful!');
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message, { duration: 4000 });
            })
    }

    const HandleShowPass = (event) => {
        setShowPass(event.target.checked);
        console.log(event.target.checked)
    }

    const handlePassReset = () => {
        const email = document.getElementById('resetPassEmail').value;
        if(email.length < 5){
            toast.error('Please enter a valid email address!');
            return;
        }
        resetPassword(email)
        .then(() => toast.success('A password reset Link has been sent to your email.', {duration: 4000}))
        .catch(error => {
            console.log(error);
            toast.error(error.message);
            if(error.message.includes('user-not-found')){
                toast.error('Enter a correct Email address associated with an account.')
            } else{
                toast.error('Something went wrong! Please try again later.');
            }
        })
    }


    return (
        <div className='container log-reg-container'>
            <div className='section'>
                <h1 className='log-reg-title'>L O G I N</h1>
                <form onSubmit={handleLogIn} className='log-reg-form section'>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" required/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type={showPass ? 'text' : 'password'} name='password' id='password' required/>

                        <input onClick={HandleShowPass} type="checkbox" style={{ width: 'fit-content', display: 'inline-block', marginRight: '10px' }} name='checkbox' id='checkbox' />
                        <label htmlFor="checkbox" style={{ fontSize: '16px', fontWeight: '400' }}>Show Password</label>

                    </div>
                    <div>
                        <button className='btn btn-login btn-submit'>Login</button>
                    </div>
                    <hr />
                    <div>
                        Do not have an account? <Link to={'/reg'}>Sign Up</Link>
                    </div>

                    <details>
                        <summary>Forgot Password?</summary>
                        <div>
                            <input id='resetPassEmail' type="email" placeholder='Enter your Email'/>
                            <button onClick={handlePassReset} className='btn btn-submit' type='button'>Submit</button>
                        </div>
                    </details>

                    <div className='google-github'>
                        <button onClick={handleGoogleLogin} className='btn btn-login btn-submit' type='button'>Login with Google</button>
                        <button onClick={handleGithubLogin} className='btn btn-login btn-submit' type='button'>Login with GitHub</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;