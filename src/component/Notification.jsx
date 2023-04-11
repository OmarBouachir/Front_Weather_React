import React, { useEffect } from 'react'
import { UilBell } from '@iconscout/react-unicons';
import { useState } from 'react';
import axios, { all } from 'axios';
import jwt_decode from 'jwt-decode';
import { iconUrlFromCode } from '../services/weatherService';

function Notification({count}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [listOfNotification,setListOfNotification]=useState();
  const [numberOfNotif,setNumberOfNotif]=useState();
  useEffect(()=>{
    const getNotification=async()=>{
      const decodedToken = jwt_decode(localStorage.getItem("jwt"));
      const userId=decodedToken.upn;
      const userWithSameId= await axios.get(`http://localhost:9090/settings/v1/${userId}`);
      const city=userWithSameId.data.country;
      const response=await axios.get(`http://localhost:9091/api-Notif/notification/getNotif/${city}`);
      setListOfNotification(response.data);
      console.log(listOfNotification);
    };

    const getNumberOfNotification=async()=>{
        const decodedToken = jwt_decode(localStorage.getItem("jwt"));
        const userId=decodedToken.upn;
        const userWithSameId= await axios.get(`http://localhost:9090/settings/v1/${userId}`);
        const city=userWithSameId.data.country;
        const resp=await axios.get(`http://localhost:9090/settings/notif/getNumber/${city}`);
        setNumberOfNotif(resp.data);
    };
    getNotification();
    
    getNumberOfNotification();
  },[])

  const handleIconClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="relative">
      <div className="cursor-pointer" onClick={handleIconClick}>
        <UilBell size="28" color="white" />
        {count > 0 && (
          <div className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full flex items-center justify-center w-5 h-5 text-xs">
            {numberOfNotif}
          </div>
        )}
      </div>
      {showNotifications && (
        <div className=" absolute top-full right-0 w-64 bg-white shadow-lg rounded-lg overflow-y-scroll max-h-50">
          {listOfNotification.map(att=>{
            return(
              <div className="notification-item">
              <div className='flex flex-row'>
                <div className="notification-content">
                  <p className="notification-description">{att.discription}</p>
                  <p className="notification-timestamp">{att.setAt}</p>
                </div>
                <div className="notification-icon">
                  <img
                    src={iconUrlFromCode(att.icon)}
                      className="w-21 my-1"
                      alt=""
                      
                  />
                </div>
              </div>
              <hr></hr>
              <br></br>
            </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Notification