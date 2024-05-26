/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { createContext, useEffect, useState } from 'react';
import auth from '../../firebase.config';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword, updateProfile } from 'firebase/auth';
import { toast } from 'react-hot-toast';

export const AuthContext = new createContext(null);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createAccount = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const verifyMail = (currentUser) => {
        return sendEmailVerification(currentUser)
    }

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = () => signInWithPopup(auth, googleProvider);

    const githubLogin = () => signInWithPopup(auth, githubProvider);

    const changeInfo = (info) => {
        updateProfile(auth.currentUser, info)
            .then()
            .catch(error => { console.log(error); toast.error(error.message) })
    };

    const changePassword = (newPass) => updatePassword(user, newPass);

    const resetPassword = (email) => sendPasswordResetEmail(auth, email);

    const logOut = () => signOut(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser && currentUser.email) {
                setLoading(true);
                const loggedInUser = {
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                    displayName: currentUser.displayName,
                    uid: currentUser.uid,
                }

                fetch(`${import.meta.env.VITE_Api_BaseUrl}/jwt`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loggedInUser)
                })
                    .then(res => res.json())
                    .then(data => { 
                        localStorage.setItem('simply-recipes-token', data.token);
                        setUser({ ...data.userInfo });
                        setLoading(false);
                    })
                    .catch(error => {
                        console.log(error);
                        toast.error(error.message);
                        setLoading(false);
                    })

            } else {
                localStorage.removeItem('simply-recipes-token');
                setUser(null);
                setLoading(false);
            }
        });
        return unsubscribe;
    }, [])

    const authInfo = {
        user,
        loading,
        setUser,
        createAccount,
        verifyMail,
        logIn,
        googleLogin,
        githubLogin,
        changeInfo,
        changePassword,
        resetPassword,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;