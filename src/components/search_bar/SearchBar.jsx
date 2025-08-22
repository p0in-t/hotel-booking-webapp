import s from './SearchBar.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = (params) => {
    const [ hotelPriceRange,setHotelPriceRange ] = useState([0, 0]);
    const [ searchWord , setSearchWord ] = useState('');
    const [ rangePriceMin, setRangePriceMin ] = useState(0);
    const [ rangePriceMax, setRangePriceMax ] = useState(0);
    const [ rangeRatingMin, setRangeRatingMin ] = useState(0);
    const [ rangeRatingMax, setRangeRatingMax ] = useState(10);
    const [ sortingType, setSortingType ] = useState('none');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/search?name=${searchWord}&price_min=${rangePriceMin}&price_max=${rangePriceMax}&rating_min=${rangeRatingMin}&rating_max=${rangeRatingMax}&sorting_type=${sortingType}`);
    }

    const handleSortChange = (event) => {
        setSortingType(event.target.value)
        navigate(`/search?price_min=${rangePriceMin}&price_max=${rangePriceMax}&rating_min=${rangeRatingMin}&rating_max=${rangeRatingMax}&sorting_type=${event.target.value}`);
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
        <div className={s.searchBarContainer}>
            <div className={s.searchBar}>
                <label className={s.paramLabel}>Sorting options</label>
                <div className={s.sortOptions}>
                    <select className={s.selectSort} id='sort-options' name='sort-options' onChange={handleSortChange}>
                        <option value='none'>Select a sorting option</option>
                        <option value='A-Z'>By name: A-Z</option>
                        <option value='Z-A'>By name: Z-A</option>
                        <option value='priceAsc'>By price: low to high</option>
                        <option value='priceDesc'>By price: high to low</option>
                        <option value='ratingAsc'>By rating: low to high</option>
                        <option value='ratingDesc'>By rating: high to low</option>
                    </select>
                </div>
                <form className={s.searchParameterForm} onSubmit={handleSearch}>
                    <div className={s.nameSearch}>
                        <input type='text' placeholder='Search by name...' value={searchWord} onChange={(e) => setSearchWord(e.target.value.trim().toLowerCase())}></input>
                    </div>
                    <div className={s.searchElement}>
                        <label className={s.paramLabel} htmlFor='priceRange'>Filter by price</label><br/>
                        <div className={s.filterOption}>
                            <label className={s.paramLabel} htmlFor='priceRange'>Min</label>
                            <input type='number' min={hotelPriceRange[0]} max={rangePriceMax} id='priceRangeMin' name='priceRangeMin' value={rangePriceMin} onChange={(e) => setRangePriceMin(parseFloat(e.target.value))}></input><br></br>
                        </div>
                        <div className={s.filterOption}>
                            <label className={s.paramLabel} htmlFor='priceRange'>Max</label>
                            <input type='number' min={rangePriceMin} max={hotelPriceRange[1]} id='priceRangeMax' name='priceRangeMax' value={rangePriceMax} onChange={(e) => setRangePriceMax(parseFloat(e.target.value))}></input><br></br>
                        </div>
                    </div>
                    <div className={s.searchElement}>
                        <label className={s.paramLabel} htmlFor='ratingRange'>Filter by rating</label><br/>
                        <div className={s.filterOption}>
                            <label className={s.paramLabel} htmlFor='ratingRange'>Min</label>
                            <input type='number' step={0.1} min={0} max={rangeRatingMax} id='ratingRangeMin' name='ratingRangeMin' value={rangeRatingMin} onChange={(e) => setRangeRatingMin(parseFloat(e.target.value))}></input><br></br>
                        </div>
                        <div className={s.filterOption}>
                            <label className={s.paramLabel} htmlFor='ratingRange'>Max</label>
                            <input type='number' step={0.1} min={rangeRatingMin} max={10} id='ratingRangeMax' name='ratingRangeMax' value={rangeRatingMax} onChange={(e) => setRangeRatingMax(parseFloat(e.target.value))}></input>
                        </div>
                    </div>
                    <button className={s.submitButton} type='submit'>Search</button>
                </form>
            </div>
        </div>
    );
}

export default SearchBar;