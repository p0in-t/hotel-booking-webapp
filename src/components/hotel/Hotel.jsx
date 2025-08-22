import './Hotel.css'
import { AppContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FullCardContainer from '../full_card_container/FullCardContainer';
import FullCard from '../full_card/FullCard';

const Hotel = () => {
    const ctx = useContext(AppContext);
    const { data, language } = ctx;
    const [ searchParams ] = useSearchParams();
    const [ hotel, setHotel ] = useState(null);

    useEffect( () => {
        const hotelId = searchParams.get('id');
        let existing = null;

        if (data)
            existing = data.find((el) => el.hotel_id === parseInt(hotelId));

        if (existing) {
            setHotel(existing);
        }   
    }, [data, searchParams])

    return (
        <div className='hotel-booking-main-container'>
            <div className='hotel-booking-card-container'>
                {
                    hotel ?
                    <FullCardContainer>
                    {
                        <FullCard key={hotel.hotel_id} id={hotel.hotel_id} language={language} overview={hotel.overview} img1Src={hotel.photo1} img2Src={hotel.photo2} img3Src={hotel.photo3} img4Src={hotel.photo4} name={hotel.hotel_name} city={hotel.city} country={hotel.country} address={hotel.addressline1} rating={hotel.rating_average} price={hotel.rates_from} reviews={hotel.number_of_reviews} >
                        </FullCard> 
                    }   
                    </FullCardContainer>
                    :
                    <p>Hotel not found, something went wrong.</p>
                }
            </div>
        </div>
    );
}

export default Hotel;