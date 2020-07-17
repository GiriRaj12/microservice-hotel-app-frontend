import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import '../componentStyles/mybookings.css';
import { Button } from '@material-ui/core';

function MyBookings(props) {

    const userEmail = props.email;
    console.log("Mybooking" + userEmail);
    const [mybookings, setMyBookings] = useState({});
    const [total, setTotal] = useState(100);

    let getAndSetBooking = (data) => {
        let obj = {}
        let sum = 0;
        data.map(e => {
            obj[e.id] = e;
            sum = sum + e.price;
        });
        setMyBookings(obj);
        setTotal(sum);
    }

    useEffect(() => {
        FetchBookings(userEmail, getAndSetBooking);
    }, mybookings)

    let doneDeleting = () => {
        props.display("rooms");
    }



    return (<div className="mybooking-view" style={{ marginBottom: '80px' }}>
        <div className="mybooking-headding">
            <span>My Bookings</span>
        </div>
        <div className="total-amount-spent">
            <span style={{ marginRight: '10px' }}><FontAwesomeIcon icon={faCoins}></FontAwesomeIcon></span>
                    Total Spent : <span style={{ marginRight: '10px' }}>{total}</span>
                    Number of Bookings : <span>{Object.values(mybookings).length}</span>
        </div>
        <div className="booking-container">
            {render(mybookings, doneDeleting)}
        </div>
    </div>)
}

function render(mybookings, doneDeleting) {
    return (Object.values(mybookings).map(e =>
        <div className="individual-bookings" id={e.id}>
            <div className="room-image">
                <img className="room-imgae" alt={'logo'} src={e.imageUrl} height={'140px'} width={'220px'}></img>
            </div>
            <div className="room-details-holder">
                <p>Room  : {e.roomName}</p>
                <p>Price : {e.price}</p>
                <p>Type  : {e.roomClass}</p>
                <p>Count : {e.count}</p>
                <p>Date  : {new Date(e.date).toLocaleDateString()} </p>
            </div>
            <Button
                variant="contained"
                color="secondary"
                onClick={e => deleteBooking(e.target.parentNode.id, doneDeleting)}
                id={e.id}
            >
                Delete Booking
                </Button>
        </div>));
}

function deleteBooking(id, callBack) {
    if (!id) {
        alert("Please try again");
        return;
    }

    const requestOptions = {
        method: 'DELETE'
    };
    fetch("http://localhost:8081/billing/delete?bookingId=" + id, requestOptions)
        .then(res => res.json())
        .then(res => {
            if (res.response) {
                alert("Desired item deleted");
                callBack();
            }
            else {
                alert("Something went wrong please try agian later");
            }
        })
}


function FetchBookings(userEmail, setMyBookings) {
    fetch("http://localhost:8081/billing/get?userEmail=" + userEmail)
        .then(res => res.json())
        .then(res => {
            setMyBookings(res.datas);
        })
}
export default MyBookings;