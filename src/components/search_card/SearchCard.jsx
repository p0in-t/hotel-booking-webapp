import s from './SearchCard.module.css';
import { languageData } from '../../Localization';
import { useContext } from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const SearchCard = (props) => {
    const ctx = useContext(AppContext);
    const { language } = ctx;
    const navigate = useNavigate();

    const handleNav = () => {
        navigate(`/hotel?id=${props.id}`)
    }

    return (
        <div className={s.roomContainer} onClick={handleNav}>
            <img src={props.imgSrc} loading='lazy' alt='Hotel preview' className={s.roomImage}></img>
            <div className={s.roomInfo}>
                <div className={s.nameDesc}>
                    <p className={s.hotelName}>
                        {props.name}
                    </p>
                    <div className={s.descriptionBox}>
                        {props.overview.length > 200 ? <p className={s.hotelInfo}>{props.overview.substring(0, 200)}...</p> : <p className={s.hotelInfo}>{props.overview}</p>}
                    </div>    
                </div>
                <div className={s.roomDetails}>
                    <p className={s.hotelInfo}>{props.city}, {props.country}</p>
                    <div className={s.hotelRatingContainer}>
                        <p style={{margin: '4px', alignContent: 'center', justifyContent: 'center' }}>{props.rating}</p>
                    </div>
                    <span className={s.hotelInfo} style={{ fontWeight: '400', fontSize: '12px' }}>{props.reviews} {languageData[language].reviews}</span>
                    <p className={s.hotelInfo}>{languageData[language].price} <span className={s.hotelInfo} style={{fontWeight: 'bold', fontSize: '18px' }}>{props.price}$</span></p>
                </div>
            </div>
        </div>
    )
};

export default SearchCard;