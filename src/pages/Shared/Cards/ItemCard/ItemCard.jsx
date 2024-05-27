import './ItemCard.css';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../providers/AuthProvider';
import toast from 'react-hot-toast';

const ItemCard = memo(function ItemCard({ item }) {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [openPurchaseModal, setOpenPurchaseModal] = useState(false);
    const { _id, name, image, country, purchased_by, creator_email, price } = item;
    const recipe_price = price || 10; // 10 is default price

    // Owner: either creator of OR purchased the recipe
    const isOwner = useMemo(() => {
        if (user) {
            return creator_email === user.email || purchased_by.indexOf(user.email) !== -1;
        } else {
            return false
        }
    }, [creator_email, purchased_by, user])

    // Verify requirements before opening purchase confirmation
    const onClickToView = () => {
        if (!user) {
            toast('Please Login to view recipe', { icon: '❔' });
            return;
        }

        if (isOwner) {
            return navigate(`/recipes/${_id}`);
        }

        if (user.coin < 10) {
            toast("You don't have enough coin", { icon: '❔' });
            return navigate(`/buy-coin`);
        }

        setOpenPurchaseModal(true);
    }

    // Initiate purchase request
    const purchaseRecipe = async () => {
        if (loading) return; // prevents rapid multiple click on 'View The Recipe' button
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_Api_BaseUrl}/recipes/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('simply-recipes-token')}`,
                },
                body: JSON.stringify({ recipeId: _id })
            });
            const data = await response.json();
            if (data.success) {
                // update user coin locally
                setUser(prev => ({ ...prev, coin: prev.coin - recipe_price }))
                // close purchase modal & redirect upon successful purchase
                setOpenPurchaseModal(false);
                navigate(`/recipes/${_id}`);
            }

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (openPurchaseModal) {
            document.getElementById('purchase_recipe_modal').showModal();
        }
    }, [openPurchaseModal])

    return (
        <div className='item-card relative'>

            {/* Card visible parts */}
            <img
                className='min-h-28'
                src={image.startsWith('recipes_img/') ? `/${image}` : image} alt={name} title={name}
            />
            <h2 className='text-lg font-semibold my-2'>{name}</h2>
            <p>From - {country}</p>
            <p>By - <Link to={'mailto:' + creator_email}>{creator_email}</Link></p>
            <p className='italic'>Purchased by {purchased_by.length} {purchased_by.length == 1 ? 'people' : 'person'}</p>

            {!isOwner && <span className="badge badge-accent absolute top-4 right-4">BDT 10</span>}

            <button onClick={onClickToView} className='btn btn-block mt-4'>
                View The Recipe
            </button>

            {/* Recipe purchase confirmation modal */}
            {openPurchaseModal && (
                <dialog id="purchase_recipe_modal" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Confirm purchase!</h3>
                        <p className="py-4">Spend {recipe_price} coins to purchase &apos;{name}&apos; recipe?</p>
                        <div className="modal-action">
                            <form method="dialog" className='flex items-center justify-end gap-2'>
                                <div onClick={purchaseRecipe} className='btn btn-accent' role='button'>
                                    {loading && <span className="loading loading-spinner"></span>}
                                    Confirm
                                </div>
                                <button onClick={() => setOpenPurchaseModal(false)} disabled={loading} className="btn btn-outline">Cancel</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
});

export default ItemCard;