// eslint-disable-next-line no-unused-vars
import React, { Suspense } from 'react';
import Spinner from '../pages/Shared/LoaderSpinner/Spinner';

// eslint-disable-next-line react/prop-types
const MySuspense = ({children}) => {
    return (
        <Suspense fallback={<Spinner />}>{children}</Suspense>
    );
};

export default MySuspense;