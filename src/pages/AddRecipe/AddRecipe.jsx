import { useState } from 'react';
import toast from 'react-hot-toast';
import { categories } from '../../constants/constants';


const AddRecipe = () => {
    const [loading, setLoading] = useState(false);

    // handle form submit
    const onFormSubmit = async (event) => {
        event.preventDefault();
        if (loading) return;
        const form = event.target;
        try {
            setLoading(true);

            // get form fields
            const name = form.name.value;
            const description = form.description.value;
            const youtube_embed = form.youtube_embed.value;
            const country = form.country.value;
            const ingredients = form.ingredients.value;
            const cooking_method = form.cooking_method.value;
            const category = form.category.value;
            const file = form.fileInput.files[0];

            // check all fields necessary
            if (!name || !description || !youtube_embed || !country || !ingredients || !cooking_method || !category || !file) throw new Error('All fields are necessary!');

            // construct new FormData object
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('youtube_embed', youtube_embed);
            formData.append('country', country);
            formData.append('ingredients', JSON.stringify(ingredients.split(','))); // Convert array to JSON string
            formData.append('cooking_method', cooking_method);
            formData.append('category', category);
            formData.append('file', file);

            // upload to the server
            const response = await fetch(`${import.meta.env.VITE_Api_BaseUrl}/recipes/add`, {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('simply-recipes-token')}`,
                },
                body: formData,
            });

            // show a response
            const result = await response.json();
            console.log('add recipe result: ', result);
            if(result.success) {
                toast.success('Recipe added successfully!');
                return;
            }

            throw new Error(`Error occurred while adding recipe. ${result?.message}`)

        } catch (error) {
            toast.error(error.message);

        } finally {
            setLoading(false);
        }

    }

    return (
        <div className='container section'>
            <h2 className='title-sec'>Add a New Recipe</h2>

            <form
                onSubmit={onFormSubmit}
                id='addRecipeForm'
                className='max-w-xl mx-auto flex flex-col gap-4'
            >
                {/* recipe name */}
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">What is the recipe name?</span>
                    </div>
                    <input name='name' type="text" placeholder="Type here" className="input input-bordered w-full" />
                </label>

                {/* one line recipe summery */}
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Summery of the recipe</span>
                    </div>
                    <input name='description' type="text" placeholder="Type here" className="input input-bordered w-full" />
                </label>

                {/* youtube embed code */}
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Embedded youtube video code</span>
                    </div>
                    <input name='youtube_embed' type="text" placeholder="Type here" className="input input-bordered w-full" />
                </label>

                {/* origin country */}
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Recipe country</span>
                    </div>
                    <input name='country' type="text" placeholder="Type here" className="input input-bordered w-full" />
                </label>

                {/* recipe ingredients */}
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Recipe ingredients (enter coma separated values)</span>
                    </div>
                    <input name='ingredients' type="text" placeholder="Eg: Salt,Chili,Ginger" className="input input-bordered w-full" />
                </label>

                {/* recipe description / cooking method */}
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Recipe description / cooking method</span>
                    </div>
                    <textarea name='cooking_method' className="textarea textarea-bordered h-24" placeholder="Type here" />
                </label>

                {/* recipe category */}
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Recipe category</span>
                    </div>
                    <select name='category' defaultValue='' className="select select-bordered w-full">
                        <option value='' disabled>Select one</option>
                        {categories.map((item) => (
                            <option key={item.category} value={item.category}>
                                {item.category.slice(0, 1).toUpperCase()}{item.category.slice(1)}
                            </option>
                        ))}
                        <option value='other'>Other</option>
                    </select>
                </label>

                {/* file upload */}
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Recipe image</span>
                    </div>
                    <input name='fileInput' type="file" accept='image/*' className="file-input file-input-bordered w-full" />
                </label>

                {/* action buttons */}
                <div className="join mt-4">
                    <button
                        onClick={() => document.getElementById('addRecipeForm').reset()}
                        disabled={loading}
                        className="btn w-1/2 join-item"
                        type='button'
                    >
                        Reset
                    </button>
                    <button
                        // disabled={loading}
                        className="btn btn-neutral w-1/2 join-item"
                        type='submit'
                    >
                        {loading && <span className='loading loading-spinner' />}
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRecipe;