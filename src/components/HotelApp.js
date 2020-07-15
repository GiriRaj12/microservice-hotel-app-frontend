import React,{useState} from 'react';
import '../App.css';
import {faDumbbell, faHotel, faCalendarAlt, faCog, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyBookings from '../components/MyBookings.js';
import Rooms from '../components/Rooms.js';
import Settings from '../components/Settings.js'

function HotelApp(props){
    const userEmail = props.userData.userEmail;
    console.log("HotelApp"+userEmail);
    const [toDisplay, setToDisplay] = useState('rooms');

    return (
      <div className="App">
         <nav className="nav-bar-container">
           <div className="logo">
             <FontAwesomeIcon icon={faDumbbell}></FontAwesomeIcon>
           </div>
           <div className="navbar-contents">
                <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
            </div>
        </nav>
        <div className="side-bar-container">
               <div className="sidebar-content" onClick={() => setToDisplay('rooms')}>
                <FontAwesomeIcon icon={faHotel} style={{marginRight:'20px'}}></FontAwesomeIcon>
                Rooms 
              </div>
              <div className="sidebar-content" onClick={() => setToDisplay('bookings')}>
                <FontAwesomeIcon icon={faCalendarAlt} style={{marginRight:'20px'}}></FontAwesomeIcon>
                Bookings
              </div>
              <div className="sidebar-content" onClick={() => setToDisplay('settings')}>
                <FontAwesomeIcon icon={faCog} style={{marginRight:'20px'}}></FontAwesomeIcon>
                Settings
              </div>
        </div>
        <div className="main-body-container">
            <div className="body-content-holder">
                {toDisplay == 'rooms' ? <Rooms email={userEmail}></Rooms> : ''}
                {toDisplay == 'bookings' ? <MyBookings email={userEmail} display={setToDisplay}></MyBookings> : ''}
                {toDisplay == 'settings' ? <Settings></Settings> : ''}
            </div>
        </div>
      </div>
    );
}
export default HotelApp;