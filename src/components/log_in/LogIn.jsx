import ReactFacebookLogin from 'react-facebook-login';
import './LogIn.css'
import React, { useEffect } from 'react';
import { AppContext } from '../../App';
import { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { languageData } from '../../Localization';

const LogIn = (props) => {
    const ctx = useContext(AppContext);
    const navigate = useNavigate();
    const { accData, setAccData, setAccUID, setAccEmail, setAccUsername, setAccPassword, isLoggedIn, setIsLoggedIn, isLoggedInFacebook, setIsLoggedInFacebook, reservationData, setReservationData, language } = ctx;

    useEffect( () => {
        if (isLoggedIn || isLoggedInFacebook)
            navigate('/');
    }, [isLoggedIn, isLoggedInFacebook, navigate])

    const handleReservationsEntry = useCallback((accUid) => {
        setReservationData([...reservationData, {uid: accUid, reservations: []}]);
    }, [reservationData, setReservationData])

    const handleAccountEntry = useCallback((accUid, accEmail, accUsername, accPassword, accBalance) => {
        setAccData([...accData, {uid: accUid, email: accEmail, username: accUsername, password: accPassword, balance: accBalance}]);
    }, [accData, setAccData])

    const testAPI = useCallback((accessToken) => {
        FB.api('/me', {fields: 'email, name', access_token: accessToken}, function(response) {
            setAccUID(response.id)
            setAccEmail(response.email);
            setAccUsername(response.name.split(' ')[0])
            setAccPassword(response.id);
            handleReservationsEntry(response.id);
            handleAccountEntry(response.id, response.email, response.name.split(' ')[0], response.id, 10000);
        });
    }, [handleAccountEntry, handleReservationsEntry, setAccEmail, setAccPassword, setAccUID, setAccUsername])

    const statusChangeCallback = useCallback((response) => {
        if (response.status === 'connected') {
            setIsLoggedInFacebook(true);
            setIsLoggedIn(false);
            console.log(response.authResponse.accessToken)
            testAPI(response.authResponse.accessToken);
        } else {
            console.log(response);
        }
    }, [setIsLoggedIn, setIsLoggedInFacebook, testAPI])
    
    const checkLoginState = () => {
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
    }

    useEffect( () => {
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        
        window.fbAsyncInit = () => {
            FB.init({
                appId      : '451009454320237',
                cookie     : true,
                xfbml      : true,
                version    : 'v20.0'
            });
    
            FB.getLoginStatus((response) => {
                statusChangeCallback(response);
            });
        };
    }, [statusChangeCallback])

    const handleFacebookLogin = () => {
        if (isLoggedIn || isLoggedInFacebook) {
            alert("You are already logged in");
            return;
        }

        window.FB.login(checkLoginState, { scope: 'public_profile,email' });
    };

    const handleLogin = (event) => {
        event.preventDefault();

        if (isLoggedIn || isLoggedInFacebook) {
            alert("You are already logged in");
            return;
        }

        const login = (acc) => {
            setAccUID(acc.uid)
            setAccEmail(acc.email);
            setAccUsername(acc.username)
            setAccPassword(acc.password);
            setIsLoggedIn(true);
            setIsLoggedInFacebook(false);
        }

        const formData = new FormData(event.target);
        const inputEmail = formData.get('accEmail');
        const inputPw = formData.get('accPassword');

        let existing = accData.find((acc) => acc.email === inputEmail);

        if (existing) {
            if (inputPw === existing.password) {
                login(existing)
            }
            else {
                alert("Wrong password, try again")
            }
        }
        else {
            existing = accData.find((acc) => acc.username === inputEmail);

            if (existing) {
                if (existing.password === inputPw) {
                    login(existing)
                }
                else{
                    alert("Wrong password, try again")
                }
            }
            else {
                alert("No account found with email/username, try again")
            }
        }
    }

    return (
        <div className='main-login-container'>
            <div className='login-type-container'>
                <div className='email-login-container'>
                    <form className='login-form' onSubmit={handleLogin}>
                        <label htmlFor='accEmail'>{languageData[language]['email_username']}</label>
                        <input type='text' id='accEmail' name='accEmail' required={true} placeholder='example@gmail.com'></input><br></br>
                        <label htmlFor='accPassword'>{languageData[language]['password']}</label>
                        <input type='password' id='accPassword' required={true} name='accPassword'></input>
                        <button className='login-button' type='submit'>{languageData[language]['log_in']}</button>
                    </form>
                </div>
                <div className='login-facebook-container'>
                    <ReactFacebookLogin
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={handleFacebookLogin}
                    onClick={() => console.log('Logging in with Facebook')}
                    icon="fa-facebook"
                    textButton="Login with Facebook"
                    />
                </div>
            </div>
        </div>
    );
};

export const handleLogout = (isLoggedIn, isLoggedInFacebook, setIsLoggedIn, setIsLoggedInFacebook) => {
    if (isLoggedIn) {
        setIsLoggedIn(false);
    }
    else if (isLoggedInFacebook) {
        FB.logout(function(response) {
            setIsLoggedInFacebook(false);
        });
    }
};

export default LogIn;