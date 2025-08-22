import './ReservationContainer.css'

const ReservationContainer = ( {children} ) => {
    return (
        <div className='reservation-container'>
            {children}
        </div>
    );
}

export default ReservationContainer;