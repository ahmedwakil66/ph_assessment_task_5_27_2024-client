import { useContext, useEffect, useState } from 'react';
import { baseUrl } from '../../../../routes/Routes';
import { heartEmptyIcon, heartIcon } from '../../../../Icons';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../providers/AuthProvider';

const RecipeCardReaction = ({ recipeId, reacted_by = [] }) => {
    const { user } = useContext(AuthContext);
    const [reacted, setReacted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (reacted_by && reacted_by.length > 0) {
            setReacted(reacted_by.indexOf(user?._id) !== -1)
        }
    }, [reacted_by, user])

    // add or remove reaction
    const handleReaction = async () => {
        setLoading(true);
        const toastId = toast.loading('Please wait...');

        try {
            const res = await fetch(`${baseUrl}/recipes/reaction?action=${reacted ? 'remove' : 'add'}&recipeId=${recipeId}`, {
                method: "PATCH",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('simply-recipes-token')}`
                }
            })
            const data = await res.json();

            if (!data.success) {
                toast.error(data?.message || 'Failed! Please try again later.');
                return
            }
            toast.success(reacted ? 'Reaction removed' : 'Reaction added', { id: toastId });
            setReacted((prev) => !prev);

        } catch (error) {
            toast.error(error.message, { id: toastId });

        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            disabled={loading}
            onClick={handleReaction}
            className={`mark-fav-btn ${reacted && 'text-red-900'}`}
        >
            {!reacted && <>{heartEmptyIcon} <span className='hidden sm:block'>I love this recipe</span></>}
            {reacted && <>{heartIcon}</>}
        </button>
    );
};

export default RecipeCardReaction;