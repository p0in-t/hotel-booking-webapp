import './SignUp.css'
import React, { useEffect } from 'react';
import { AppContext } from '../../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { languageData } from '../../Localization';

const SignUp = (props) => {
    const ctx = useContext(AppContext);
    const navigate = useNavigate();
    const { accData, setAccData, isLoggedIn, isLoggedInFacebook, reservationData, setReservationData, language } = ctx;

    useEffect( () => {
        if (isLoggedIn || isLoggedInFacebook) {
            alert('You are already logged in, log out to register!')
            navigate('/');
            return;
        }
    }, [isLoggedIn, isLoggedInFacebook, navigate])

    const handleReservationsEntry = (accUid) => {
        setReservationData([...reservationData, {uid: accUid, reservations: []}]);
    }

    const handleAccountEntry = (accUid, accEmail, accUsername, accPassword, accBalance) => {
        setAccData([...accData, {uid: accUid, email: accEmail, username: accUsername, password: accPassword, balance: accBalance}]);
    }

    const handleSignUp = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const inputEmail = formData.get('accEmail');
        const inputPw = formData.get('accPassword');

        if (accData.find((el) => el.email === inputEmail) !== undefined) {
            alert('An account with this email already exists, use another email!');
            return;
        }

        const newUID = accData[accData.length-1].uid + 1;
        const usernameFromEmail = inputEmail.split('@')[0]
        let createdUsername = usernameFromEmail;
        let index = 1;

        while (accData.find((el) => el.username === createdUsername) !== undefined) {
            createdUsername = usernameFromEmail;
            createdUsername += `${index}`;
            index++;
        }

        handleAccountEntry(newUID, inputEmail, createdUsername, inputPw, 10000);
        handleReservationsEntry(newUID);
        navigate('/log-in');
        alert(`Successfully registered, Welcome ${createdUsername}`);
        console.log(accData);
        console.log(reservationData);
    }

    return (
        <div className='main-sign-up-container'>
            <div className='sign-up-type-container'>
                <div className='email-sign-up-container'>
                    <form className='sign-up-form' onSubmit={handleSignUp}>
                        <label htmlFor='accEmail'>{languageData[language]['email']}</label>
                        <input type='email' id='accEmail' name='accEmail' required={true} placeholder='example@gmail.com'></input><br></br>
                        <label htmlFor='accPassword'>{languageData[language]['password']}</label>
                        <input type='password' id='accPassword' required={true} name='accPassword'></input>
                        <button className='sign-up-button' type='submit'>{languageData[language]['sign_up']}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;