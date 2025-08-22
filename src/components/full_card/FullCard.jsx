import s from './FullCard.module.css';
import { languageData } from '../../Localization';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const FullCard = (props) => {
    const ctx = useContext(AppContext);
    const today = new Date();
    const navigate = useNavigate();
    const { language, isLoggedIn, isLoggedInFacebook, setReservationData, reservationData, accUID, accData, setAccData } = ctx;

    const getFormattedDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    function dateDiffInDays(a, b) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;

        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    const [ checkInDate, setCheckInDate ] = useState(getFormattedDate(today));
    const [ checkOutDate, setCheckOutDate ] = useState(() => { const today = new Date(); return getFormattedDate(new Date(today.setDate(today.getDate() + 7)))});
    const [ cost, setCost ] = useState(0);

    const createReservation = () => {
        const userReservationData = reservationData.find((el) => parseInt(el.uid) === parseInt(accUID));
        const newReservation = { hotel_id: props.id, check_in: checkInDate, check_out: checkOutDate };
        const existingReservations = userReservationData.reservations;
        existingReservations.push(newReservation);
        setReservationData([...reservationData, {uid: accUID, reservations: existingReservations}]);
    };

    const balanceUpdate = (newBalance) => {
        const newAccData = accData;
        let userIndex = newAccData.findIndex((user) => user.uid === accUID);
        newAccData[userIndex].balance = newBalance;
        setAccData(newAccData);
    }

    const handleReservation = (event) => {
        event.preventDefault();

        if (!isLoggedIn && !isLoggedInFacebook) {
            navigate('/log-in');
            return;
        }

        const balance = (accData.find((el) => parseInt(el.uid) === parseInt(accUID))).balance;

        if (balance >= cost) {
            balanceUpdate(balance - cost);
            createReservation();
            navigate('/account');
        }
        else {
            alert('Insufficient balance!')
        }
    };

    useEffect( () => {
        setCost(props.price * dateDiffInDays(new Date(checkInDate), new Date(checkOutDate)));
    }, [props.price, checkInDate, checkOutDate])

    return (
        <div className={s.roomContainer}>
            <p className={s.hotelName}>
                {props.name}
            </p>
            <div className={s.headerInfoContainer}>
                <p className={s.hotelInfo}>{props.address}, {props.city}, {props.country}</p>
            </div>
            <div className={s.galleryContainer}>
                <img src={props.img1Src} loading='lazy' alt='Hotel preview' className={s.roomImage}></img>
                <img src={props.img2Src} loading='lazy' alt='Hotel preview' className={s.roomImage}></img>
                <img src={props.img3Src} loading='lazy' alt='Hotel preview' className={s.roomImage}></img>
                <img src={props.img4Src} loading='lazy' alt='Hotel preview' className={s.roomImage}></img>
            </div>
            <div className={s.roomInfo}>
                <div className={s.nameDesc}>
                    <div className={s.descriptionBox}>
                        <p className={s.hotelInfo}>{props.overview}</p>
                    </div>    
                </div>
                <div className={s.roomDetails}>
                    <div className={s.hotelRatingContainer}>
                        <p style={{margin: '4px', alignContent: 'center', justifyContent: 'center' }}>{props.rating}</p>
                    </div>
                    <span className={s.hotelInfo} style={{ fontWeight: '400', fontSize: '12px' }}>{props.reviews} {languageData[language].reviews}</span>
                    <p className={s.hotelInfo}>{languageData[language].price} <span className={s.hotelInfo} style={{fontWeight: 'bold', fontSize: '18px' }}>{props.price}$</span></p>
                    <div className={s.reserveContainer}>
                        <form className={s.reserveForm} onSubmit={handleReservation}>
                            <div className={s.reserveDate}>
                                <label htmlFor='checkInDate' className={s.hotelInfo}>Check in</label>
                                <input type='date' name='checkInDate' id='checkInDate' min={getFormattedDate(today)} max={checkOutDate} value={checkInDate} onChange={ (event) => { setCheckInDate(event.target.value); setCost(props.price * dateDiffInDays(new Date(event.target.value), new Date(checkOutDate))); } }></input><br/>
                                <label htmlFor='checkOutDate' className={s.hotelInfo}  style={{marginLeft:'10px'}}>Check out</label>
                                <input type='date' name='checkOutDate' id='checkOutDate' min={checkInDate} value={checkOutDate} onChange={ (event) => { setCheckOutDate(event.target.value); setCost(props.price * dateDiffInDays(new Date(checkInDate), new Date(event.target.value))); } }></input>
                            </div>
                            <p className={s.hotelInfo} style={{fontSize: '16px', fontWeight: 'bold'}}>{dateDiffInDays(new Date(checkInDate), new Date(checkOutDate))} days, {cost}$ total cost</p>
                            <button type='submit' className={s.reserveButton}>Reserve</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FullCard;