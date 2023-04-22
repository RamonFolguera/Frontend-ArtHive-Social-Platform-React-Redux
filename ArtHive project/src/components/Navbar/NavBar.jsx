import { useRef } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import './NavBar.css'


export const NavBar = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav")
  }

  return (
    <>
  <header>
    <nav ref={navRef}>
      <a href="/#">Home</a>
      <a href="/#">My work</a>
      <a href="/#">Blog</a>
      <a href="/#">About me</a>
      <button className="nav-btn nav-close-btn" onClick={showNavbar}>
        <FaTimes/>
      </button>
    </nav>

    <nav ref={navRef}>
      <a className="logoDesign" href="/#">ARTHIVE</a>
    </nav>

    <nav ref={navRef}>
      <a href="/#">Home</a>
      <a href="/#">My work</a>
      <a href="/#">Blog</a>
      <a className="login-btn" href="/#">Log in</a>
      <button className="nav-btn nav-close-btn" onClick={showNavbar}>
        <FaTimes/>
      </button>
    </nav>

    <button className="nav-btn" onClick={showNavbar}>
        <FaBars/>
      </button>
  </header>
 <br className="lineDesign" />
   </>
  );
}

