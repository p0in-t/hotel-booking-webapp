import './Home.css'
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';
import PreviewCard from '../preview_card/PreviewCard';
import CardContainer from '../card_container/CardContainer';
import SearchBox from '../search_box/SearchBox';

const Home = () => {
    const ctx = useContext(AppContext);
    const [ previewData, setPreviewData ] = useState([]);
    const [ searchParams ] = useSearchParams();

    const { language, data, setData } = ctx;

    const handleSorting = useCallback(() => {
        if (!data)
            return;

        let dataToSet = data.slice(0, 20);

        switch (searchParams.get('sorting_type')) {
            case 'A-Z': dataToSet = dataToSet.sort((el1, el2) => el1.hotel_name.localeCompare(el2.hotel_name)); break;
            case 'Z-A': dataToSet = dataToSet.sort((el1, el2) => el2.hotel_name.localeCompare(el1.hotel_name)); break;
            case 'priceAsc': dataToSet = dataToSet.sort((el1, el2) => el1.rates_from - el2.rates_from); break;
            case 'priceDesc': dataToSet = dataToSet.sort((el1, el2) => el2.rates_from - el1.rates_from); break;
            case 'ratingAsc': dataToSet = dataToSet.sort((el1, el2) => el1.rating_average - el2.rating_average); break;
            case 'ratingDesc': dataToSet = dataToSet.sort((el1, el2) => el2.rating_average - el1.rating_average); break;
            default: break;
        }

        setPreviewData(dataToSet);
    }, [data, searchParams]);

    useEffect(() => {
        handleSorting();
    }, [handleSorting, searchParams]);
    
    return (
        <div className='home-main'>
            <SearchBox data={data}/>
            <div className='home-container'>
                <div className='home-hotel-preview-container'>
                    <CardContainer>
                        {
                            previewData.map( 
                                (el) =>
                                    <PreviewCard key={el.hotel_id} id={el.hotel_id} language={language} imgSrc={el.photo1} name={el.hotel_name} city={el.city} country={el.country} rating={el.rating_average} price={el.rates_from} reviews={el.number_of_reviews} >
                                    </PreviewCard>  
                            )
                        }   
                    </CardContainer>
                </div>
            </div>
        </div>
    )
};

export default Home;