import './Account.css';
import Reservation from '../reservation/Reservation';
import ReservationContainer from '../reservation_container/ReservationContainer';
import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const ctx = useContext(AppContext);
    const [ reservations, setReservations ] = useState([]);
    const navigate = useNavigate();
    const [ balance, setBalance ] = useState(0);

    const { language, data, accUID, accData, accUsername, reservationData, isLoggedIn, isLoggedInFacebook } = ctx;

    const handleReservations = () => {
        const userReservationData = reservationData.find((el) => parseInt(el.uid) === parseInt(accUID)).reservations;
        const newReservations = [];

        userReservationData.forEach((el, index) => {
            const hotel = data.find((el2) => parseInt(el2.hotel_id) === parseInt(el.hotel_id))
            newReservations.push( {...hotel, reservation_id: index, check_in: el.check_in, check_out: el.check_out} );
        })

        setReservations(newReservations);
    };

    const updateBalance = () => {
        const currAcc = accData.find((el) => parseInt(el.uid) === parseInt(accUID));
        setBalance(currAcc.balance);
    }

    useEffect(() => {
        if (!isLoggedIn && !isLoggedInFacebook) {
            navigate('/log-in');
            return;
        }

        handleReservations();
        updateBalance();
        console.log(reservations);
    }, [data, reservationData, accUID]);

    return (
        <div className='account-main-container'>
            <div className='account-info'>
                <p>Welcome, {accUsername}</p>
                <p>You're balance is {balance}</p>
            </div>
            <div className='main-layout-container'>
                {
                    reservations.length === 0 ?
                    <p className='account-info' style={{marginTop: '30px'}}>You have no reservations yet</p>
                    :
                    <ReservationContainer>
                    {
                        reservations.map( 
                            (el) =>
                                <Reservation key={el.reservation_id} id={el.hotel_id} language={language} imgSrc={el.photo1} name={el.hotel_name} overview={el.overview} city={el.city} country={el.country} rating={el.rating_average} price={el.rates_from} reviews={el.number_of_reviews} check_in={el.check_in} check_out={el.check_out}>
                                </Reservation>  
                        )
                    }   
                    </ReservationContainer>
                }
            </div>
        </div>
    );
};

export default Account;