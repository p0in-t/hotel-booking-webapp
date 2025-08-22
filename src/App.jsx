import { createContext, useState, useEffect } from 'react';
import './App.css';
import NavRoutes from "./components/nav_routes/NavRoutes";
import Navbar from "./components/navbar/Navbar";
import hotelData from './data/HotelData.json';
import Footer from './components/footer/Footer';
import accountData from './data/accountData.json'
import resData from './data/reservationData.json'

export const AppContext = createContext();

function App() {
  const [ language, setLanguage ] = useState('en');
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ isLoggedInFacebook, setIsLoggedInFacebook ] = useState(false);
  const [ accUID, setAccUID ] = useState('');
  const [ accEmail, setAccEmail ] = useState('');
  const [ accUsername, setAccUsername ] = useState('');
  const [ accPassword, setAccPassword ] = useState('');
  const [ data, setData ] = useState(null);
  const [ accData, setAccData ] = useState(null);
  const [ reservationData, setReservationData ] = useState(null);

  useEffect(() => {
    setData(hotelData);
    setAccData(accountData);
    setReservationData(resData);
  }, []);

  return (
    <div className="App">
      <AppContext.Provider value={{accData, setAccData, reservationData, setReservationData, isLoggedIn, setIsLoggedIn, isLoggedInFacebook, setIsLoggedInFacebook, accUID, setAccUID, accEmail, setAccEmail, accUsername, setAccUsername, accPassword, setAccPassword, language, setLanguage, data, setData}}>
        <Navbar/>
        <NavRoutes/>
        <Footer/>
      </AppContext.Provider>
    </div>
  );
}

export default App;