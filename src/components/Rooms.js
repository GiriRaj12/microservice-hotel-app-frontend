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
    const [rooms, setRooms] = useState({ "5678011a-0679-418d-9ede-ed3984542778": { "id": "5678011a-0679-418d-9ede-ed3984542778", "name": "T 101", "roomClass": "First Class", "availableNumber": 4, "maxNumbers": 4, "available": true, "imageUrl": "https://cdn1.goibibo.com/t_g_ing_v8/oyo-19040-zisuku-villa-resort-guwahati-38__room__suite-170186534469-orijgp.jpg", "price": 100, "description": "Suitable for stags and couples on a shorter stay" }, "58fa5a5f-d55c-4dd5-bac0-fe762603872f": { "id": "58fa5a5f-d55c-4dd5-bac0-fe762603872f", "name": "F 101", "roomClass": "Second Class", "availableNumber": 4, "maxNumbers": 4, "available": true, "imageUrl": "https://media-cdn.tripadvisor.com/media/photo-s/16/45/16/dd/the-mood-luxury-rooms.jpg", "price": 200, "description": "Suitable for family. Enjoy your family. stay" }, "a7861dd4-4a6d-4d5c-93c9-576830bb7995": { "id": "a7861dd4-4a6d-4d5c-93c9-576830bb7995", "name": "B 101", "roomClass": "Business Class", "availableNumber": 4, "maxNumbers": 4, "available": true, "imageUrl": "https://www.crescentcourt.com/wp-content/uploads/2018/03/suitelife.jpg", "price": 400, "description": "Suitable for Business. Enjoy your Business. stay" }, "a7afa144-c2f3-428c-a095-cb7b98474e37": { "id": "a7afa144-c2f3-428c-a095-cb7b98474e37", "name": "L 101", "roomClass": "Luxury Class", "availableNumber": 1, "maxNumbers": 4, "available": true, "imageUrl": "https://www.thespruce.com/thmb/nsWks8B8yN7bEPNVQV72_k4bWEc=/1600x872/filters:no_upscale():max_bytes(150000):strip_icc()/ErinComerfordPhoto_LND-1210-4694db6c1d4c47ab9004414d90198946.jpg", "price": 200, "description": "Suitable for larger families on a larger stay and living." } });

    const [showRooms, setShowRooms] = useState(true);

    const [data, setData] = useState({});

    let setRoomsAfterFetch = (rooms) => {
        let obj = new Object();
        rooms.map(e => { obj[e.id] = e });
        console.log(JSON.stringify(obj));
        setRooms(obj);
    }

    let checkoutHandler = (id) => {
        setData(rooms[id]);
        setShowRooms(false);
    }

    let showRoomsHandler = () => {
        setShowRooms(!showRooms);
    }

    useEffect(() => {
        fetchRooms(setRoomsAfterFetch);
    }, rooms);

    return (showRooms ? <div className="rooms-holder" style={{ marginBottom: '100px' }}>
        {Object.values(rooms).map(e => (
            <div className="individual-rooms" id={e.id}>
                <div className="room-image">
                    <img className="room-imgae" alt={'logo'} src={e.imageUrl} height={'140px'} width={'220px'}></img>
                </div>
                <div className="room-details">
                    <p style={{ marginTop: '20px' }}>Room : {e.name}</p>
                    <p>About : {e.description}</p>
                    <div className="room-extra-details">
                        <span style={{ marginRight: '10px' }}>Type </span>
                        <FontAwesomeIcon icon={faPersonBooth}></FontAwesomeIcon>
                        <span style={{ marginLeft: '10px' }}>{e.roomClass}</span>
                    </div>
                    <div style={{ padding: '10px' }}>
                        <span style={{ marginRight: '10px' }}>Price </span><FontAwesomeIcon icon={faRupeeSign}></FontAwesomeIcon>
                        <span style={{ marginLeft: '5px' }}>{e.price}</span>
                    </div>
                    <div className="individual-rooms-button" id={e.id} style={{ cursor: 'pointer' }}>
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
    //     fetch("http://localhost:8080/inventory/get/rooms")
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log(res);
    //             if (res.response) {
    //                 console.log(JSON.stringify(res.datas));
    //                 setRooms(res.datas);
    //             }
    //         })
}

export default Rooms;