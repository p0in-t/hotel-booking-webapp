import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from '../../App';
import { languages, languageData } from '../../Localization';
import { handleLogout } from "../log_in/LogIn";

const Navbar = () => {
    const ctx = useContext(AppContext);
    const [ showLangSelector, setLangSelector ] = useState(false);

    if (!ctx) {
        return;
    }

    const { language, setLanguage, accUsername, isLoggedIn, isLoggedInFacebook, setIsLoggedIn, setIsLoggedInFacebook } = ctx;

    const handleShowSelector = () => {
        setLangSelector(!showLangSelector);
    };

    const handleSwitch = (sel) => {
        setLanguage(sel);
        handleShowSelector();
    };

    return (
        <div className="navbar-container">
            <div className="nav-home">
                <Link to="/" className="navbar-home">Home</Link>
            </div>
            <ul className="nav">
                <li className="nav-entry">
                    <Link to="/contact" className="navbar-link">{languageData[language]['contact']}</Link>
                </li>
                {
                    (isLoggedIn || isLoggedInFacebook) ? 
                    <div className="login-element">
                        <li className="nav-entry">
                            <Link to="/" className="navbar-link" onClick={() => handleLogout(isLoggedIn, isLoggedInFacebook, setIsLoggedIn, setIsLoggedInFacebook)}>{languageData[language]['log_out']}</Link>
                        </li>
                        <li className="nav-entry">
                            <Link to="/account" className="navbar-link">{accUsername}</Link>
                        </li>
                    </div>
                    :
                    <div className="account-element">
                        <li className="nav-entry">
                            <Link to="/log-in" className="navbar-link">{languageData[language]['log_in']}</Link>
                        </li>
                        <li className="nav-entry">
                            <Link to="/sign-up" className="navbar-link">{languageData[language]['sign_up']}</Link>
                        </li>
                    </div>
                }
                <li className="nav-entry">
                    <div className="nav-lang-sel-container">
                        <img onClick={() => handleShowSelector()} loading='lazy' alt='Navbar entry' src={languages.find(({id}) => id === language).flag} className="nav-lang-sel-img"></img>
                        <ul className="nav-lang-sel-rest" style={{ display: showLangSelector ? 'block' : 'none' }}>
                            {
                                languages.filter( ({id}) => id !== language )
                                .map( (lang) => 
                                    <li className="nav-lang-sel-entry" key={lang.id}>
                                        <img onClick={() => handleSwitch(lang.id)} loading='lazy' src={lang.flag} alt={lang.name} className="nav-lang-sel-img">
                                        </img>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </li>
            </ul>
        </div> 
    )
};

export default Navbar;