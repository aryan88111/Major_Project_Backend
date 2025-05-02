import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/Home/HomePage";
import Login from "./components/Auth/Login";
import Navbar from "./components/NavFooter/Navbar";
import Footer from "./components/NavFooter/Footer";
import HouseSearchCardParent from "./components/Card/SearchCard/HouseSearchCardParent";
import DetailCard from "./components/Card/DetailedCard/DetailCard";
import DashBoard from "./components/Profile/Seller/DashBoard";
import MyProfile from "./components/Profile/MyProfile";
import ForgotPassword from "./components/Auth/ForgotPassword"; // Import Component
import SignUp from "./components/Auth/SignUp"; // Import Component
import PropertyCard from "./components/Card/DetailedCard/PropertyCard";
import SubscriptionPage from "./components/Auth/SubscriptionPage";
import ChangePassword from "./components/Auth/ChangePAssword";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Navbar />

        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/api/users/login" element={<Login />} />
            
            <Route path="/house-search" element={<HouseSearchCardParent />} />
            <Route path="/api/property/:id" element={<DetailCard />} />
            <Route path="/api/property" element={<PropertyCard/>} />
            <Route path="/myprofile/*" element={<MyProfile />} />
            <Route path="api/users/forgot-password" element={<ForgotPassword />} />
            <Route path="/api/users/register" element={<SignUp />} />
            <Route path="/subscription" element={<SubscriptionPage/>}/>
            <Route path='api/users/forget-password/:id/:token' element={<ChangePassword/>}/>
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
