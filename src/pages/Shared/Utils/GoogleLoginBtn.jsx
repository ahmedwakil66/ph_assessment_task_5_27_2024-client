import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const GoogleLoginBtn = ({ children, redirectPath }) => {
    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        // try {
        //     const result = await googleLogin();
        //     const user = result.user;
        //     if (user) {
        //         const loggedInUser = {
        //             email: user.email,
        //             photoURL: user.photoURL,
        //             displayName: user.displayName,
        //             uid: user.uid,
        //         }
        //     }

        // } catch (error) {
        //     console.log(error);
        //     const message = error.message;
        //     if (!message?.includes('closed-by-user') && !message?.includes('cancelled-popup-request')) {
        //         toast.error(message, { duration: 4000 });
        //     }
        // }

        googleLogin()
            .then(() => {
                toast.success('Login successful!');
                if (redirectPath) {
                    navigate(redirectPath);
                }
            })
            .catch(error => {
                console.log(error);
                const message = error.message;
                if (!message?.includes('closed-by-user') && !message?.includes('cancelled-popup-request')) {
                    toast.error(message, { duration: 4000 });
                }
            })
    }

    if (children) return <span onClick={handleGoogleLogin}>{children}</span>

    return <button onClick={handleGoogleLogin} className='btn btn-login'>Google Login</button>
};

export default GoogleLoginBtn;