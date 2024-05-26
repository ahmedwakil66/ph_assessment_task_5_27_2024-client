import './TodaysPick.css';
import { Link } from 'react-router-dom';
import { arrowRightIcon } from '../../../Icons';

const TodaysPick = () => {

    return (
        <div className='container section'>
            <h2 className='title-sec'>Today{"'"}s Pick</h2>
            {/* {isLoading && <Spinner />} */}
            <Link
                to={`/recipes/6651b70efb636a4e69d47d0c`}
                className='todays-pick'
                style={{ backgroundImage: `url('recipes_img/Beef_Rezala.png')` }}
            >
                <div className='title-desc'>
                    <div>
                        <h2>Beef Rezala</h2>
                        <p>A flavorful Bengali beef curry with a rich yogurt-based gravy.</p>
                        {arrowRightIcon}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default TodaysPick;