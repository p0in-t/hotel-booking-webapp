import './SearchCardContainer.css'

const SearchCardContainer = ( {children} ) => {
    return (
        <div className='search-card-container'>
            {children}
        </div>
    );
}

export default SearchCardContainer;