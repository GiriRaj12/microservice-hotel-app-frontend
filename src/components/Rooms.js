import React, { useState, useEffect } from 'react';
import '../componentStyles/Rooms.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign, faPersonBooth } from '@fortawesome/free-solid-svg-icons';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Checkout from './Checkout';

function Rooms(props) {
    const userEmail = props.email;
    console.log(userEmail);
    const [rooms, setRooms] = useState({});

    const [showRooms, setShowRooms] = useState(true);

    const[data, setData] = useState({});

    let setRoomsAfterFetch = (rooms) => {
        let obj = new Object();
        rooms.map(e => {obj[e.id] = e});
        console.log(JSON.stringify(obj));
        setRooms(obj);
    }

    let checkoutHandler = (id) =>{
        setData(rooms[id]);
        setShowRooms(false);
    }

    let showRoomsHandler = () => {
        setShowRooms(!showRooms);
    }
    
    useEffect(()=>{
        fetchRooms(setRoomsAfterFetch);
    },rooms);

    return (showRooms ? <div className="rooms-holder" style={{marginBottom:'100px'}}>
        {Object.values(rooms).map(e => (
            <div className="individual-rooms" id={e.id}>
                <div className="room-image">
                        <img className="room-imgae" alt={'logo'} src={e.imageUrl} height={'140px'} width={'220px'}></img>
                </div>
                <div className="room-details">
                    <p style={{marginTop:'20px'}}>Room : {e.name}</p>
                    <p>About : {e.description}</p>
                    <div className="room-extra-details">
                    <span style={{marginRight:'10px'}}>Type </span>
                    <FontAwesomeIcon icon={faPersonBooth}></FontAwesomeIcon>
                    <span style={{marginLeft:'10px'}}>{e.roomClass}</span>
                    </div>
                    <div style={{padding:'10px'}}>
                    <span style={{marginRight:'10px'}}>Price </span><FontAwesomeIcon icon={faRupeeSign}></FontAwesomeIcon>
                    <span style={{marginLeft:'5px'}}>{e.price}</span>
                    </div>
                    <div className="individual-rooms-button" id={e.id} style={{cursor:'pointer'}}>
                        <Button 
                        variant="contained" 
                        color="primary"
                        onClick={e => checkoutHandler(e.target.parentNode.id)}
                        id={e.id}
                        >
                        Book Now 
                        </Button>
                    </div>
                 </div>
            </div>))}
    </div> : 
    <div className="checkoutHolder"> 
        <Checkout emailId={userEmail} objectData={data} toggleShow={showRoomsHandler} ></Checkout>
    </div>)
}




function fetchRooms(setRooms) {
    fetch("http://localhost:8080/inventory/get/rooms")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.response) {
                setRooms(res.datas);
            }
        })
}


function pickADate(date, setDate) {
    setDate(date);
    console.log(date.getTime());
}
export default Rooms;