import { memo, useEffect, useState } from 'react';
import AnimateCountUp from '../Utils/AnimateCountUp';

const Stats = memo(function Stats () {
    const [stats, setStats] = useState({ recipeCount: 0, userCount: 0 });

    useEffect(() => {
        const getStats = async () => {
            const response = await fetch(`${import.meta.env.VITE_Api_BaseUrl}/get-stats`);
            const data = await response.json();
            if (data.recipeCount || data.userCount) {
                setStats({
                    recipeCount: data.recipeCount,
                    userCount: data.userCount
                })
            }
        }
        getStats();
    }, [])

    return (
        <div className='container section'>
            <h2 className='title-sec'>Our Success</h2>

            <div className='flex flex-col items-center'>
                <div className="stats shadow stats-vertical lg:stats-horizontal">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div className="stat-title">Recipes</div>
                        <div className="stat-value text-success flex">
                            <AnimateCountUp start={0} end={2150 + stats.recipeCount} />    +
                        </div>
                        <div className="stat-desc">Our total recipes so far</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                        <div className="stat-title">Total Likes</div>
                        <div className="stat-value text-primary flex">
                            <AnimateCountUp start={0} end={25} duration={4}/>  K
                        </div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div className="stat-title">Recipe Views</div>
                        <div className="stat-value text-secondary flex">
                            <AnimateCountUp start={0} end={122} />  .6K
                        </div>
                        <div className="stat-desc">15% more than last month</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                        </div>
                        <div className="stat-title">Registered Users</div>
                        <div className="stat-value text-primary flex">
                            <AnimateCountUp start={0} end={2978 + stats.userCount} duration={3} /> +
                        </div>
                        <div className="stat-desc">↗︎ 400 (22%)</div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Stats;