import './PreviewCard.css';
import { languageData } from '../../Localization';
import { useContext } from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const PreviewCard = (props) => {
    const ctx = useContext(AppContext);
    const { language } = ctx;
    const navigate = useNavigate();

    const handleNav = () => {
        navigate(`/hotel?id=${props.id}`)
    }

    return (
        <div className='preview-room-container' onClick={handleNav}>
            <img src={props.imgSrc} loading='lazy' alt='Hotel preview' className='preview-room-image'></img>
            <div className='preview-room-info'>
                <p className='hotel-name'>
                    {props.name}
                </p>
                <div className='preview-room-details'>
                    <p className='hotel-info'>{props.city}, {props.country}</p>
                    <div className='hotel-rating-container'>
                        <p style={{margin: '4px', alignContent: 'center', justifyContent: 'center' }}>{props.rating}</p>
                    </div>
                    <span className='hotel-info' style={{ fontWeight: '400', fontSize: '12px' }}>{props.reviews} {languageData[language].reviews}</span>
                    <p className='hotel-info'>{languageData[language].price} <span className='hotel-info' style={{fontWeight: 'bold', fontSize: '18px' }}>{props.price}$</span></p>
                </div>
            </div>
        </div>
    )
};

export default PreviewCard;