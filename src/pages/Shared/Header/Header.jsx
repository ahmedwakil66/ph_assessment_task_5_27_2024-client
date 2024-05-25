// eslint-disable-next-line no-unused-vars
import './Header.css'
import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { menuIcon } from '../../../Icons';
import GoogleLoginBtn from '../Utils/GoogleLoginBtn';

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const { user, logOut } = useContext(AuthContext);

    let element = '';
    if (user) {
        if (user.photoURL) {
            element = <img src={user.photoURL} alt="" title={user.displayName} />
        } else if (user.displayName) {
            element = <p>{user.displayName.toUpperCase().slice(0, 1)}</p>
        } else {
            element = <p>{user.email.toUpperCase().slice(0, 1)}</p>
        }
    }

    return (
        <div className='header container'>
            <div className='logo-and-menu'>
                <Link to={'/'}><img className='logo' src="/assets/icons/logo.svg" alt="" /></Link>
                <button onClick={() => setOpenMenu(!openMenu)} className='menu-icon'>{menuIcon}</button>
            </div>
            <nav className={openMenu ? 'h-md-nav' : 'h-md-zero'}>
                <br />
                <NavLink to={'/'} className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink>
                <NavLink to={'/recipes'} className={({ isActive }) => isActive ? 'active-link' : ''}>Recipes</NavLink>

                {user && (
                    <>
                        <NavLink to={'/add-recipe'} className={({ isActive }) => isActive ? 'active-link' : ''}>Add Recipe</NavLink>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className={`profile-link-div ${user.photoURL ? '' : 'flex-centered'}`}>{element}</div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><p>Available coins: <strong>{user.coin}</strong></p></li>
                                <li><p>Account: {user.email}</p></li>
                                <li><Link to={'/buy-coin'} className='btn'>Add more coin</Link></li>
                                <li><button onClick={logOut} className='btn btn-neutral mt-2'>Log Out</button></li>
                            </ul>
                        </div>
                    </>
                )}

                {!user && <GoogleLoginBtn />}

            </nav>
        </div>
    );
};

export default Navbar;