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

            </div>

           
            <div className="footer">
                 <div className="footer-section map">
                   <MapComponent/>
                 </div>
                 <div className="quick-links">
                    <h1>Quick Links</h1>
                    <ul>
                        <li><a href="/rooms">Rooms</a></li>
                        <li><a href="/facilities">Facilities</a></li>
                        <li><a href="/gallery">Gallery</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                   </ul>
                 </div>
                 <div className="Follow-Us">
                    <h1>Follow Us</h1>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedinIn />
                        </a>
                    </div>
                 </div>
                 <div className="Contact-Us">
                    <h1>Contact-Us</h1>
                    <p>Phone: +123-456789</p>
                    <p>Email: contact@Kingsfortunehotel.com</p>
                 </div>
            </div>
    </div>
     );
}
 
export default HomePage;


