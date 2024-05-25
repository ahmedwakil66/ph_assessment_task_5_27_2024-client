/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { memo, useContext, useMemo } from 'react';
import './ItemCard.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../providers/AuthProvider';
import toast from 'react-hot-toast';

const ItemCard = memo(function ItemCard({ item }) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { _id, name, image, country, purchased_by, creator_email, price } = item;
    const recipe_price = price || 10;

    const isOwner = useMemo(() => {
        if (user) {
            return creator_email === user.email || purchased_by.indexOf(user._id) !== -1;
        } else {
            return false
        }
    }, [creator_email, purchased_by, user])

    const onClick = () => {
        if (!user) {
            toast('Please Login to view recipe', { icon: '❔' });
            return;
        }

        if (isOwner) {
            return navigate(`/recipes/${_id}`);
        }

        if (user.coin < 10) {
            toast("You don't have enough coin", { icon: '❔' });
            return navigate(`/purchase-coin`);
        }

        document.getElementById('purchase_recipe_modal').showModal();
    }

    const purchaseRecipe = async () => {

    }

    return (
        <div className='item-card relative'>
            <img src={image.startsWith('recipes_img/') ? `/${image}` : image} alt={name} title={name} />
            <h2 className='text-lg font-semibold my-2'>{name}</h2>
            <p>From - {country[0].split(':')[0]}</p>
            <p>By - <Link to={'mailto:' + creator_email}>{creator_email}</Link></p>
            <p className='italic'>Purchased by {purchased_by.length} {purchased_by.length == 1 ? 'people' : 'person'}</p>

            {!isOwner && <span className="badge badge-accent absolute top-4 right-4">BDT 10</span>}

            <button onClick={onClick} className='btn btn-block mt-4'>
                View The Recipe
            </button>

            <dialog id="purchase_recipe_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm purchase!</h3>
                    <p className="py-4">Spend {recipe_price} coins to purchase this recipe?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div onClick={purchaseRecipe} className='btn btn-accent mr-2' role='button'>Confirm</div>
                            <button className="btn btn-outline">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
});

export default ItemCard;