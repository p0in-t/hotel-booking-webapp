import s from './Reservation.module.css';
import { languageData } from '../../Localization';
import { useContext } from 'react';
import { AppContext } from '../../App';

const Reservation = (props) => {
    const ctx = useContext(AppContext);
    const { language } = ctx;

    return (
        <div className={s.roomContainer}>
            <img src={props.imgSrc} loading='lazy' alt='Hotel preview' className={s.roomImage}></img>
            <div className={s.roomInfo}>
                <div className={s.nameDesc}>
                    <p className={s.hotelName}>
                        {props.name}
                    </p>
                </div>
                <div className={s.roomDetails}>
                    <p className={s.hotelInfo}>{props.city}, {props.country}</p>
                    <div className={s.hotelRatingContainer}>
                        <p style={{margin: '4px', alignContent: 'center', justifyContent: 'center' }}>{props.rating}</p>
                    </div>
                    <span className={s.hotelInfo} style={{ fontWeight: '400', fontSize: '12px' }}>{props.reviews} {languageData[language].reviews}</span><br></br>
                    <p className={s.hotelInfo}>Check in date : {props.check_in}</p>
                    <p className={s.hotelInfo}>Check out date : {props.check_out}</p>
                </div>
            </div>
        </div>
    )
};

export default Reservation;