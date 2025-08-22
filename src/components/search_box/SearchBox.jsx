import './SearchBox.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { languageData } from '../../Localization';

const SearchBox = (params) => {
    const [ showSearch, setShowSearch ] = useState(false);
    const [ searchWord, setSearchWord ] = useState('');
    const [ hotelPriceRange,setHotelPriceRange ] = useState([0, 0]);
    const [ rangePriceMin, setRangePriceMin ] = useState(0);
    const [ rangePriceMax, setRangePriceMax ] = useState(0);
    const [ rangeRatingMin, setRangeRatingMin ] = useState(0);
    const [ rangeRatingMax, setRangeRatingMax ] = useState(10);
    const [ sortingType, setSortingType ] = useState('none');
    const ctx = useContext(AppContext);
    const { language } = ctx;
    const navigate = useNavigate();
    const mountedStyle = { animation: "inAnimation 450ms ease-in" };
    const unmountedStyle = {
        animation: "outAnimation 500ms ease-out",
        animationFillMode: "forwards"
    };

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/search?name=${searchWord}&price_min=${rangePriceMin}&price_max=${rangePriceMax}&rating_min=${rangeRatingMin}&rating_max=${rangeRatingMax}&sorting_type=${sortingType}`);
    }

    const handleSortChange = (event) => {
        event.preventDefault();
        setSortingType(event.target.value)
        navigate(`/?sorting_type=${event.target.value}`);
    }

    useEffect( () => {
        if (!params.data)
            return;

        const priceData = params.data.map( ({rates_from}) => rates_from );
        const min = Math.min(...priceData);
        const max = Math.max(...priceData);

        setHotelPriceRange([min, max])
        setRangePriceMin(min);
        setRangePriceMax(max);
    }, [params.data]) 

    return (
        <div className='search-box-container'>
            <div className='search-show-container'>
                { 
                    showSearch ? 
                        <div className='search-show-collapse' onClick={() => setShowSearch(false)}>

                        </div> 
                        :
                        <div className='search-show-expand' onClick={() => setShowSearch(true)}>

                        </div> 
                }
                {
                    showSearch ?
                        <p>{languageData[language]['hide_searchbox']}</p>
                        :
                        <p>{languageData[language]['show_searchbox']}</p>

                }
            </div>
            {
                showSearch ?
                    <div className='search-box' style={showSearch ? mountedStyle : unmountedStyle}>
                        <select id='sort-options' name='sort-options' onChange={handleSortChange}>
                            <option value='none'>{languageData[language]['sorting_option_none']}</option>
                            <option value='A-Z'>{languageData[language]['sorting_option_az']}</option>
                            <option value='Z-A'>{languageData[language]['sorting_option_za']}</option>
                            <option value='priceAsc'>{languageData[language]['sorting_option_priceasc']}</option>
                            <option value='priceDesc'>{languageData[language]['sorting_option_pricedesc']}</option>
                            <option value='ratingAsc'>{languageData[language]['sorting_option_ratingasc']}</option>
                            <option value='ratingDesc'>{languageData[language]['sorting_option_ratingdesc']}</option>
                        </select>
                        <form className='search-parameter-form' onSubmit={handleSearch}>
                            <div className='search-input-box'>
                                <input type='text' placeholder={`${languageData[language]['searchbar_placeholder']}`} value={searchWord} onChange={(e) => setSearchWord(e.target.value.trim().toLowerCase())}></input>
                            </div>
                            <div className='search-element'>
                                <label className='searchLabel' htmlFor='priceRange'>{languageData[language]['filter_price']}</label><br/>
                                <label className='searchLabel' htmlFor='priceRange'>{languageData[language]['min']}</label>
                                <input type='number' min={hotelPriceRange[0]} max={rangePriceMax} id='priceRangeMin' name='priceRangeMin' value={rangePriceMin} onChange={(e) => setRangePriceMin(parseFloat(e.target.value))}></input>
                                <input type='number' min={rangePriceMin} max={hotelPriceRange[1]} id='priceRangeMax' name='priceRangeMax' value={rangePriceMax} onChange={(e) => setRangePriceMax(parseFloat(e.target.value))}></input>
                                <label className='searchLabel' htmlFor='priceRange'>{languageData[language]['max']}</label>
                            </div>
                            <div className='search-element'>
                                <label className='searchLabel' htmlFor='ratingRange'>{languageData[language]['filter_rating']}</label><br/>
                                <label className='searchLabel' htmlFor='ratingRange'>{languageData[language]['min']}</label>
                                <input type='number' step={0.1} min={0} max={rangeRatingMax} id='ratingRangeMin' name='ratingRangeMin' value={rangeRatingMin} onChange={(e) => setRangeRatingMin(parseFloat(e.target.value))}></input>
                                <input type='number' step={0.1} min={rangeRatingMin} max={10} id='ratingRangeMax' name='ratingRangeMax' value={rangeRatingMax} onChange={(e) => setRangeRatingMax(parseFloat(e.target.value))}></input>
                                <label className='searchLabel' htmlFor='ratingRange'>{languageData[language]['max']}</label>
                            </div>
                            <button className='submit-button' type='submit'>{languageData[language]['search']}</button>
                        </form>
                    </div>
                :
                    <div/>
            }
        </div>
    );
}

export default SearchBox;