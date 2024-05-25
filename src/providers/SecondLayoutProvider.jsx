// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react';
import SecondLayout from '../layouts/SecondLayout';

export const SecondLayoutContext = new createContext();

const SecondLayoutProvider = () => {
    const [secLayTitle, setSecLayTitle] = useState('');
    const [secLayTitleMain, setSecLayTitleMain] = useState('');

    const info = {
        secLayTitle,
        setSecLayTitle,
        secLayTitleMain,
        setSecLayTitleMain
    }
    return (
        <SecondLayoutContext.Provider value={info}>
            <SecondLayout />
        </SecondLayoutContext.Provider>
    );
};

export default SecondLayoutProvider;