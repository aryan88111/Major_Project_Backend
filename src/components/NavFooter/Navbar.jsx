import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navBarAction } from "../../store";
import { HiOutlineMenu, HiX } from "react-icons/hi"; // Icons for mobile menu
import "./Navbar.css";


function Navbar() {
  const bg = useSelector((state) => state.navBar);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false); // Mobile menu state
const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleRedirect = ()=>{

    navigate('/')
    
  }
 

  useEffect(() => {
       const userData = localStorage.getItem("user");
  if (userData) setIsLoggedIn(true);

    const handleScroll = () => {
      if (location.pathname === '/' && window.scrollY < 600) {
        // On the home page and scroll is less than 600
        dispatch(navBarAction.bgColor(false));
      } else {
        // In all other cases
        dispatch(navBarAction.bgColor(true));
      }
    };

    // Run the handler initially to set the correct state on load
    handleScroll();

    // Add the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };


  
  }, [location.pathname, dispatch]);

  const handleLogout = () => {
  localStorage.clear();
  setIsLoggedIn(false);
  navigate("/"); // or navigate("/api/users/login")
};

  return (
    <nav className={`navbarContainer ${bg ? "navColor" : ""}`}>
      {/* Logo */}
      <span className="imgSpanNavbar" onClick={() => navigate("/")}>
        <img src="Daniel_Gallego-removebg-preview (1).png" alt="LOGO" className="logo" onClick={handleRedirect} />
      </span>

      {/* Desktop Navigation */}
      <ul className={`listNavbar ${mobileMenu ? "showMenu" : ""}`}>
        <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
        <Link to="/api/property" onClick={() => setMobileMenu(false)}>Contact</Link>
        <Link to="/myprofile" onClick={() => setMobileMenu(false)}>Support</Link>
        <Link to="/about" onClick={() => setMobileMenu(false)}>About us</Link>
      </ul>

      {/* Login Button */}
      <div className="loginSign">
       {isLoggedIn ? (
    <button className="loginBtn" onClick={handleLogout}>Logout</button>
  ) : (
    <Link to="/api/users/login">
      <button className="loginBtn">Login</button>
    </Link>
  )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="mobileMenuIcon" onClick={() => setMobileMenu(!mobileMenu)}>
        {mobileMenu ? <HiX size={28} /> : <HiOutlineMenu size={28} />}
      </div>
    </nav>
  );
}

export default Navbar;
