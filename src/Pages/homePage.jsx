import "../Styles/homePage.css"
import React from "react";
import Navbar from "../Components/navbar";
import SearchBar from "../Components/searchBar";
import MapComponent from "../Components/mapComponent";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import hotel from "../assets/hotel.jpg"
import penthouse from "../assets/penthouse-suite.jpg"
import room from "../assets/room.png"
import logo from "../assets/logo.png"
import pool from "../assets/pool.jpg"
import gym from "../assets/gym.jpg"
import parking from "../assets/parking.jpg"
import { Link } from 'react-router-dom';
import RoomsList from "../Components/roomlist";

const HomePage = () => {
    return ( 
    <div className="pages-wrapper">
        <div className="navbar-pages">
           <Navbar/>
        </div>
        <div className="hero-pages">
            <div className="pages-text">
                <h1>WELCOME TO KING ALSON'S FORTUNE HOTEL <br/> WERE YOU JUST DON'T STAY BUT BELONG!</h1>
                <p>Find your perfect stay with ease explore a wide range of rooms grab great <br/> deals and book your ideal gataway today.</p>
            </div>
            <div className="pages-photo">
                <div className="photo-1">
                    <img src={hotel} ></img>
                </div>
                <div className="photo-2">
                <img src={penthouse} ></img>
                </div>
                <div className="photo-3">
                <img src={room} ></img>
                </div>
                <div className="photo-4">
                <img src={logo} ></img> 
                </div>
                {/* <div className="photo-1"></div> */}
            </div>
        </div>
            <div className="search-bar">
             <SearchBar/>
            </div>  
            <div className="Rooms">
                <div className="rooms-text"><h1>View Our Rooms</h1></div>
                 <div>
                    <RoomsList/>
                 </div>
            </div>

           
            <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            {/* Map Section */}
            <div className="footer-section">
              <div className="map">
                <MapComponent />
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="footer-section quick-links">
              <h3>Quick Links</h3>
              <ul>
                {[
                  { name: "Rooms", href: "/rooms" },
                  { name: "Facilities", href: "/facilities" },
                  { name: "Gallery", href: "/gallery" },
                  { name: "About Us", href: "/about" },
                  { name: "Contact", href: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section contact-us">
              <h3>Contact Us</h3>
              <p>
                Phone: <a href="tel:+123456789">+123-456789</a>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:contact@Kingsfortunehotel.com">
                  contact@Kingsfortunehotel.com
                </a>
              </p>
            </div>

            {/* Follow Us Section */}
            <div className="footer-section">
              <h3>Follow Us</h3>
              <div className="social-icons">
                {[
                  {
                    icon: <FaFacebookF />,
                    href: "https://facebook.com",
                    label: "Facebook",
                  },
                  {
                    icon: <FaTwitter />,
                    href: "https://twitter.com",
                    label: "Twitter",
                  },
                  {
                    icon: <FaInstagram />,
                    href: "https://instagram.com",
                    label: "Instagram",
                  },
                  {
                    icon: <FaLinkedinIn />,
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Us Section */}
          </div>

          {/* Copyright Section */}
          <div className="copyright">
            <p>
              © {new Date().getFullYear()} Kings Fortune Hotel. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
     );
}
 
export default HomePage;


