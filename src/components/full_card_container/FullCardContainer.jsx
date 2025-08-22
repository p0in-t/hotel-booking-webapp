import './FullCardContainer.css'

const FullCardContainer = ( {children} ) => {
    return (
        <div className='full-card-container'>
            {children}
        </div>
    );
}

export default FullCardContainer;