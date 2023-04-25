import { useRef } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import './NavBar.css'
import { userData, userout } from "../../layout/userSlice";
import { useDispatch, useSelector } from "react-redux";


export const NavBar = () => {
  const navRef = useRef();

  const dispatch = useDispatch();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav")
  }

  const userCredentialsRdx = useSelector(userData);
console.log(userCredentialsRdx);
  const logoutFunction = () => {
    dispatch(userout({ credentials: {} }));
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <>
  <header>
  {!userCredentialsRdx.credentials?.user?.roleId ? (
    <>
    <nav ref={navRef} className='d-flex align-items-lg-center justify-content-lg-between w-100'>
      <div className="d-flex flex-xs-column align-items-xs-center">
      <a href="/profile">Hi {userCredentialsRdx.credentials?.user?.name}!</a>
      <a href="/">Home</a>
      <a href="/artworks-gallery">Art gallery</a>
      <a href="/artworks-featured">Featured</a>
      <a href="/artists">Artists</a>
      </div>

      <div>
      <a className="logoDesign" href="/#">ARTHIVE</a>
      </div>

      <div className="d-flex flex-xs-column align-items-center">

      <a href="/how-it-works">How it works</a>
      <a href="/about-me">About me</a>
      <a href="/contact">Contact</a>
      <a className="login-btn" href=" /login">Log in</a>
      </div>
      <button className="nav-btn nav-close-btn" onClick={showNavbar}>
        <FaTimes/>
      </button>
    </nav>

    <button className="nav-btn" onClick={showNavbar}>
        <FaBars/>
      </button>
      </>
      ) : userCredentialsRdx.credentials?.user?.roleId === 1 || userCredentialsRdx.credentials?.user?.roleId === 2 ? (
<>
        <nav ref={navRef} className='d-flex align-items-lg-center justify-content-lg-between w-100'>
      <div className="d-flex flex-xs-column align-items-xs-center">
      <a href="/profile">Hi {userCredentialsRdx.credentials?.user?.name}!</a>
      <a href="/">Home</a>
      <a href="/artworks-gallery">My panel</a>
      </div>

      <div>
      <a className="logoDesign" href="/#">ARTHIVE</a>
      </div>

      <div className="d-flex flex-xs-column align-items-center">

      <a className="login-btn" onClick={() => logoutFunction()}>Log out</a>
      </div>
      <button className="nav-btn nav-close-btn" onClick={showNavbar}>
        <FaTimes/>
      </button>
    </nav>

    <button className="nav-btn" onClick={showNavbar}>
        <FaBars/>
      </button>
      </>
      )  : userCredentialsRdx.credentials?.user?.roleId === 3 ? (
<>
        <nav ref={navRef} className='d-flex align-items-lg-center justify-content-lg-between w-100'>
      <div className="d-flex flex-xs-column align-items-xs-center">
      <a href="/profile">Hi {userCredentialsRdx.credentials?.user?.name}!</a>
      <a href="/">Home</a>
      <a href="/artworks-gallery">Art gallery</a>
      <a href="/artworks-featured">Featured</a>
      <a href="/new-artwork">New artwork</a>
      <a href="/my-artworks-gallery">My artworks</a>
      </div>

      <div>
      <a className="logoDesign" href="/#">ARTHIVE</a>
      </div>

      <div className="d-flex flex-xs-column align-items-center">
      <a href="/artworks-featured">My profile</a>

      <a href="/how-it-works">How it works</a>
      <a href="/about-me">About me</a>
      <a href="/contact">Contact</a>
      <a className="login-btn" onClick={() => logoutFunction()} >Logout</a>
      </div>
      <button className="nav-btn nav-close-btn" onClick={showNavbar}>
        <FaTimes/>
      </button>
    </nav>

    <button className="nav-btn" onClick={showNavbar}>
        <FaBars/>
      </button>
      </>
      ) : userCredentialsRdx.credentials?.user?.roleId === 4 ? (
<>
        <nav ref={navRef} className='d-flex align-items-lg-center justify-content-lg-between w-100'>
      <div className="d-flex flex-xs-column align-items-xs-center">
      <a href="/profile">Hi {userCredentialsRdx.credentials?.user?.name}!</a>
      <a href="/">Home</a>
      <a href="/artworks-gallery">Art gallery</a>
      <a href="/artworks-featured">Featured</a>
      <a href="/artists">Artists</a>
      <a href="/artists">Favorites</a>
      </div>

      <div>
      <a className="logoDesign" href="/#">ARTHIVE</a>
      </div>

      <div className="d-flex flex-xs-column align-items-center">
      <a href="/artworks-featured">My profile</a>

      <a href="/how-it-works">How it works</a>
      <a href="/about-me">About me</a>
      <a href="/contact">Contact</a>
      <a className="login-btn" href=" /login">Log in</a>
      </div>
      <button className="nav-btn nav-close-btn" onClick={showNavbar}>
        <FaTimes/>
      </button>
    </nav>

    <button className="nav-btn" onClick={showNavbar}>
        <FaBars/>
      </button>
      </>
      ) : (
        <>
        console.log("Unexpected user");
        </>
        )}
  </header>
 <br className="lineDesign" />
   </>
  );
}

