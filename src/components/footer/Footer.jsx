import './Footer.css'
import { languageData } from '../../Localization';
import { useContext } from 'react';
import { AppContext } from '../../App';

const Footer = () => {
    const ctx = useContext(AppContext);
    const { language } = ctx;

    return (
        <div className='footer-container'>
            <p>{languageData[language].footer_main_text}</p>
        </div>
    );
}

export default Footer;