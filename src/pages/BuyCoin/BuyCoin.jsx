import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const mockLoading = () => new Promise((resolve) => { setTimeout(resolve, 1000) });

const BuyCoin = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    // handle buy coin
    const onPurchase = async (pack) => {
        setLoading(true);
        try {
            await mockLoading();
            const res = await fetch(`${import.meta.env.VITE_Api_BaseUrl}/purchase/coin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('simply-recipes-token')}`
                },
                body: JSON.stringify({ package: pack })
            });
            const result = await res.json();
            if (result.success) {
                // update user coin data locally
                setUser((prev) => ({ ...prev, coin: prev.coin + result.amountInserted }));
                // show a success toast
                toast.success(result.message || 'Coin added successfully!', { duration: 4000 });
                // navigate to all recipe page
                navigate('/recipes');
            }

        } catch (error) {
            toast.error(error.message);

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container section'>
            <h2 className='title-sec'>Purchase Coins</h2>

            <div className='flex flex-wrap gap-4 justify-center relative'>
                <div className="card w-80 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-primary text-center text-xl font-semibold">Buy 100 Coins for $1</h2>
                        <div className="card-actions justify-center mt-2">
                            <button onClick={() => onPurchase('base')} disabled={loading} className="btn btn-sm h-11">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card w-80 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-primary text-center text-xl font-semibold">Buy 500 Coins for $5</h2>
                        <div className="card-actions justify-center mt-2">
                            <button onClick={() => onPurchase('standard')} disabled={loading} className="btn btn-sm h-11">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card w-80 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-primary text-center text-xl font-semibold">Buy 1000 Coins for $10</h2>
                        <div className="card-actions justify-center mt-2">
                            <button onClick={() => onPurchase('premium')} disabled={loading} className="btn btn-sm h-11">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                {loading && (
                    <div
                        className='absolute w-full h-full top-0 left-0 rounded flex justify-center items-center'
                        style={{ background: 'rgba(0, 0, 0, .4)' }}
                    >
                        <span className="loading loading-spinner loading-lg text-info" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuyCoin;