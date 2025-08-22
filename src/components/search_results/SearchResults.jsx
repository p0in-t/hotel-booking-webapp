import './SearchResults.css';
import SearchCardContainer from '../search_card_container/SearchCardContainer';
import SeachCard from '../search_card/SearchCard';
import SearchBar from '../search_bar/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';

const SearchResults = () => {
    const ctx = useContext(AppContext);
    const [ searchParams ] = useSearchParams();
    const [ searchData, setSearchData ] = useState([]);

    const { language, data } = ctx;

    const handleDataFilter = useCallback(() => {
        if (!data)
            return;

        let dataToSet = [...data];

        searchParams.forEach((value, key) => {
            console.log(value + key);

            switch (key) {
                case 'name': dataToSet = dataToSet.filter((el) => el.hotel_name.toLowerCase().includes(value.toLowerCase())); break;
                case 'price_min': dataToSet = dataToSet.filter((el) => el.rates_from >= parseInt(value)); break;
                case 'price_max': dataToSet = dataToSet.filter((el) => el.rates_from < parseInt(value)); break;
                case 'rating_min': dataToSet = dataToSet.filter((el) => el.rating_average >= parseFloat(value)); break;
                case 'rating_max': dataToSet = dataToSet.filter((el) => el.rating_average < parseFloat(value)); break;
                case 'sorting_type':
                    switch (value) {
                        case 'A-Z': dataToSet = dataToSet.sort((el1, el2) => el1.hotel_name.localeCompare(el2.hotel_name)); break;
                        case 'Z-A': dataToSet = dataToSet.sort((el1, el2) => el2.hotel_name.localeCompare(el1.hotel_name)); break;
                        case 'priceAsc': dataToSet = dataToSet.sort((el1, el2) => el1.rates_from - el2.rates_from); break;
                        case 'priceDesc': dataToSet = dataToSet.sort((el1, el2) => el2.rates_from - el1.rates_from); break;
                        case 'ratingAsc': dataToSet = dataToSet.sort((el1, el2) => el1.rating_average - el2.rating_average); break;
                        case 'ratingDesc': dataToSet = dataToSet.sort((el1, el2) => el2.rating_average - el1.rating_average); break;
                        default: break;
                    } break;
                default: break;
            }
        })

        console.log(dataToSet)

        setSearchData(dataToSet);
    }, [data, searchParams]);

    useEffect(() => {
        handleDataFilter();
    }, [handleDataFilter, searchParams]);

    return (
        <div className='main-search-results'>
            <div className='main-results-container'>
                <SearchBar data={data}/>
                <div className='main-layout-container'>
                    <SearchCardContainer>
                        {
                            searchData.map( 
                                (el) =>
                                    <SeachCard key={el.hotel_id} id={el.hotel_id} language={language} imgSrc={el.photo1} name={el.hotel_name} overview={el.overview} city={el.city} country={el.country} rating={el.rating_average} price={el.rates_from} reviews={el.number_of_reviews} >
                                    </SeachCard>  
                            )
                        }   
                    </SearchCardContainer>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;