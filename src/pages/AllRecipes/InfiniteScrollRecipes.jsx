import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { baseUrl } from '../../routes/Routes';

const InfiniteScrollRecipes = ({ setRecipesToShow, page, totalShowing, queryString }) => {
    const [load, setLoad] = useState(false);
    const [noMoreToFetch, setNoMoreToFetch] = useState(false);

    const { ref, inView } = useInView({
        threshold: .3,
    });

    useEffect(() => {
        // prevents instant inView when page load first time
        const timerId = setTimeout(() => setLoad(true), 2500);
        return () => clearTimeout(timerId);
    }, [])

    // fetch new data on demand
    useEffect(() => {
        const fetchNew = async () => {
            let url = `${baseUrl}/get-recipes/`;
            if(queryString) url += queryString
            else url += 'all-recipes';

            const res = await fetch(`${url}?page=${page}`);
            const data = await res.json();

            if (data.recipes && data.meta.total > totalShowing) {
                setRecipesToShow(data.recipes);

            } else if (data.meta.total <= totalShowing) {
                // we now know that there is no more to fetch
                setNoMoreToFetch(true);
            }
        };
        if (inView) fetchNew();
    }, [inView, setRecipesToShow, page, totalShowing, queryString])

    return (
        <div className='mt-4'>
            {load && !noMoreToFetch && (
                <div ref={ref}>
                    <div className={!inView ? 'hidden' : 'flex gap-3 items-center justify-center'}>
                        Loading more recipes
                        <span className='loading loading-spinner' />
                    </div>
                </div>
            )}
            {noMoreToFetch && <p className='opacity-60'>You have reached the end.</p>}
        </div>
    );
};

export default InfiniteScrollRecipes;