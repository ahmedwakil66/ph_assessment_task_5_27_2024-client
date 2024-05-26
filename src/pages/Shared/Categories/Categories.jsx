import './Categories.css';
import { heroSvg } from '../../../Icons';
import { Link } from 'react-router-dom';
import { categories } from '../../../constants/constants';

const Categories = ({noHeadline}) => {

    return (
        <div className={`container ${noHeadline || 'section'}`}>
            {noHeadline || <h2 className='title-sec'>Our Recipe Categories</h2>}
            {/* {isLoading && <Spinner />} */}
            <div className='categories'>
                {categories.map((cat, ind) => {
                    const catFirst = cat.category.slice(0, 1).toUpperCase();
                    const catRemains = cat.category.slice(1, cat.length);
                    const catName = catFirst + catRemains;
                    return(
                        <Link to={`/categories/${cat.category}`} key={ind} className='category-card'>
                            <img src={`/${cat.image}`} alt="" />
                            <div className='hero-svg'>{heroSvg}</div>
                            <span className='hero-text'>{catName}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default Categories;