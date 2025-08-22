import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Loader = lazy(() => import("../loader/Loader"));
const Home = lazy(() => import("../home/Home"));
const SearchResults = lazy(() => import("../search_results/SearchResults"));
const LogIn = lazy(() => import("../log_in/LogIn"));
const SignUp = lazy(() => import("../sign_up/SignUp"));
const Hotel = lazy(() => import("../hotel/Hotel"));
const Account = lazy(() => import("../account/Account"));
const Contact = lazy(() => import("../contact/Contact"));

const NavRoutes = () => (
  <Suspense fallback={<Loader/>}>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/search' element={<SearchResults/>}/>
      <Route path='/log-in' element={<LogIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/account' element={<Account/>}/>
      <Route path='/hotel' element={<Hotel/>}/>
      <Route path='/contact' element={<Contact/>}/>
    </Routes>
  </Suspense>
);

export default NavRoutes;