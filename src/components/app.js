/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import React from 'react';
import '../style.scss';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import Results from './results/results';
import Mainpage from './mainpage/mainpage';
import SignIn from './signin/signin';
import SignUp from './signup/signup';
import LendItem from './lenditem/lenditem';
import Navigationbar from './navbar/navbar';
import Footer from './footer/footer';
import Dashboard from './dashboard/dashboard';
import RenderPay from './payment/RenderPay';
import Success from './payment/success';
import SingleItem from './singleitem/singleitem';
import BorrowSignIn from './signin/borrowsignin';
import EditListing from './edit/editlisting';

function App(props) {
  return (
    <BrowserRouter>
      <div className="main">
        <Navigationbar />
        <hr className="divider-color" />
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/posts/:postID" element={<SingleItem />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/lenditem" element={<LendItem />} />
            <Route path="/results" element={<Results />} />
            <Route path="/success" element={<Success />} />
            <Route path="/checkout" element={<RenderPay />} />
            <Route path="/accountcheck" element={<BorrowSignIn />} />
            <Route path="/editlisting/:postID" element={<EditListing />} />
            <Route path="/singleitem" element={<SingleItem />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer id="footer-sec" />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
