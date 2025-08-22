import './CardContainer.css'

const CardContainer = ( {children} ) => {
    return (
        <div className='preview-container'>
            {children}
        </div>
    );
}

export default CardContainer;