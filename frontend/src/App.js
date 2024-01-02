import React from "react";
import LandingPage from "./screens/landingPage/LandingPage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signups from "./components/Signup/SignUp";
import ForgotPassword from "./components/ForgetPassword/Forgetpassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import SignIn from "./components/SignIN/SignIn";
import RegisterEvent from "./components/RegisterEvent/RegisterEvent";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import UserUpdate from "./components/UpdateUser/UserUpdate";
import AddTeam from "./components/addTeam/AddTeam";
import Team from "./components/Team/Team";
import OurTeam from "./components/OurTeam/OurTeam";
import Aboutus from "./screens/AboutUs/Aboutus";

import Events from "./components/Events/Events";
import EventsDetailed from "./components/Events/EventsDetailed/EventsDetailed"

import Payment from "./components/Payment/Payment";

import Faq from "./components/FAQ/Faq";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    // <>
    //   <div className="app">
    //     <LandingPage />
    //   </div>
    // </>
    <Router>
      <Routes>
        {/* section 1 */}

        <Route path="/" element={<LandingPage />} />
        {/* check if logged in or not*/}
        <Route path="/sign-in" element={<SignIn />} />
        {/* check if logged in or not*/}
        <Route path="/sign-up" element={<Signups />} />
        {/* forget and reset password */}
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* section 2 */}

        {/* check user login */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        {/* check user login */}
        <Route path="/updateuser" element={<UserUpdate />} />

        <Route path="/addteam" element={<AddTeam />} />
        <Route path="/team" element={<Team />} />
        {/* check if  logged in or not */}
        <Route path="/register" element={<RegisterEvent />} />
        
        

        
        {/* section 3 */}

        <Route path="/events"  element={<Events/>}/>
        <Route path="/events/:id" element ={<EventsDetailed/>}/>





        {/* section 4 */}

        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
