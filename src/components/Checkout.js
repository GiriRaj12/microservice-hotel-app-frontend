import React, { useState } from 'react';
import '../componentStyles/checkout.css';
import { Button } from '@material-ui/core';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Checkout(props){

    const data = props.objectData;

    const userEmail = props.emailId;
    console.log("Checkout"+userEmail);

    const [selectedNumber, setSelectedNumber] = useState(0);

    const [date, setDate] = useState();

    let desiredDates = (date) =>{
        return date.getTime() > new Date().getTime();
    }

    let callBackAfterSaving = (res) =>{
        console.log(res)
        if(res){
            alert("Order Taken ");
            props.toggleShow();
        }
        else{
            alert("Something went wrong");
        }
    }

    let verifyBookingAndBookNow = () =>{
        if(!date){
            alert("Please select the desired date");
        }
        else if(selectedNumber == 0){
            alert("Please Select the desired number");
        }
        else if(selectedNumber > data.availableNumber){
            alert("Desired rooms not available");
        }
        else
            bookNow(userEmail,data,selectedNumber,date,callBackAfterSaving)
    }

    return <div className="checkout-box">
            <div style={{fontSize:'20px', fontWeight:'bold',textAlign:'center'}}>
                Checkout
            </div>
            <div className="room-image">
                <img className="room-imgae" alt={'logo'} src={data.imageUrl} height={'180px'} width={'260px'}></img>
            </div>
            <div className="checkout-details">
                <p>Name : {data.name}</p>
                <p>Type : {data.roomClass}</p>
                <p>Available : {data.availableNumber}</p>
                <p>Price : {data.price}</p>
                <p>Type : {data.name}</p>
                <div className="set-number-tag">
                    Set Number : 
                <input type="number" value ={selectedNumber} max={data.availableNumber} min={0} onChange={e => setSelectedNumber(e.target.value)} style={{padding:'5px', marginLeft:'8px',}}></input>  
                </div>
                <div className="set-date-tag">
                Select Desired Date : 
                <DatePicker
                        selected={date}
                        onChange={date => setDate(date)}
                        filterDate={date => desiredDates(date)}
                    >
                </DatePicker>
                </div>
                <div className="selectButtons" style={{padding:'10px'}}>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => verifyBookingAndBookNow()}
                 >
                    BookNow
                </Button>
                <span style={{marginLeft:'20px'}}></span>
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={() => props.toggleShow()}
                >
                    Cancel
                </Button>
        </div>
        </div>
    </div>
}

function bookNow(user, obj, number, date, callBack){

    let request = {
        date:date,
        userEmail:user,
        roomName:obj.name,
        roomId:obj.id,
        count: parseInt(number),
        roomClass:obj.roomClass,
        imageUrl:obj.imageUrl,
        price:obj.price,
    }
    console.log(JSON.stringify(request));
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };

    fetch("http://localhost:8081/billing/book",requestOptions)
    .then(res => res.json())
    .then(res => {
        callBack(res.response);
    })
}

export default Checkout;