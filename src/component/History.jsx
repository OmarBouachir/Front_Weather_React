import React, { useEffect, useState } from 'react'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {Dialog} from "primereact/dialog";
import { iconUrlFromCode } from '../services/weatherService';
import {UilTear,UilTemperature,UilSearch } from '@iconscout/react-unicons';
import axios from 'axios';
import { FaHistory } from 'react-icons/fa';

function History() {

  const [visible,setVisible]=useState(false);
  const [historyWeather,setHistoryWeather]=useState();
  const [location,setLocation]=useState('');

  const getAllWeather=async()=>{
    const response=await axios.get("http://localhost:9090/settings/WeatherData/getAllData");
  setHistoryWeather(response.data);
  };

  const getWeatherByLocation=async()=>{
    if(location==''){
      getAllWeather();
    }else{
      const response=await axios.get(`http://localhost:9090/settings/WeatherData/${location}`);
      setHistoryWeather(response.data);
    }

  };

  const renderCards = historyWeather && historyWeather.map(attribut=>{
    return(
    <div  className="border rounded-sm border-black border-opacity-500 " >
        <div>
            <div>
                <div style={{ fontWeight: "bold", marginTop: "4px" }}>{attribut.location}</div>
                <div>{attribut.receivedAt}</div>
                 <div>Real feel</div>
            </div>
        </div>
        <img src={iconUrlFromCode(attribut.icon)} />
        <div className="flex flex-row">
            <UilTear size={20} /> 
            <div>Humidity: {attribut.humidity}%</div>
        </div>
        <div className="flex flex-row">
            <UilTemperature size={20} />
            <div>Temperature: {attribut.tampreture.toFixed()} °C </div>
        </div>
    </div>                         
    )
})

  return (
    <div>
        <button  onClick={()=>{setVisible(true);getAllWeather()}} ><FaHistory size={19} className='text-white cursor-pointer transition ease-out hover:scale-125' /></button>
        <div> 
            <Dialog visible={visible} onHide={()=>setVisible(false)}  
                header="Weather History"
                draggable={false}
                dismissableMask
                >
                <div className="flex flex-row w-1/5 items-center space-x-4 ">
                  <input form-autocomplete="on" onChange={(e)=>setLocation(e.currentTarget.value)} type="text" placeholder='Search....' className="rounded text-xl font-light w-full focus:outline-none capitalize" />
                  <UilSearch onClick={getWeatherByLocation} size={25}/>
                </div>
                <br></br>  
                <div className="flex flex-row grid grid-cols-5 gap-4" style={{justifyContent:'space-between'}}>
                  {renderCards}
                </div>
                 
            </Dialog>
        </div>   
    </div>
  );
}

export default History