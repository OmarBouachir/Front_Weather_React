import React from 'react'
import {UilArrowUp,
        UilArrowDown,
        UilTemperature,
        UilTear,
        UilWind,
        UilSun,
        UilSunset} from '@iconscout/react-unicons';
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService';

function TemperatureAndDetails( {weather:{
    details,icon,temp,temp_min,temp_max,sunrise,sunset,speed,humidity,feels_like,timezone
}} ) {
  return (
    <div>
        <div className="flex items-center justify-center py-6 text-xl text-blue-400">
            <p>{details}</p>
        </div>
        <div className="flex flex-row items-center justify-between text-white py-3 ">
            <img src={iconUrlFromCode(icon)} className="w-20" alt=""/>
            <p className="text-5xl">{temp.toFixed()}</p>
            <div className=" flex flex-col space-y-2">
                
                <div className="flex font-light text-sm items-center justify-center">
                    <UilTemperature size={18} className="mr-1" />
                    Real feel:
                    <span className="font-medium ml-1">{feels_like.toFixed()}</span>
                </div>
                <div className="flex font-light text-sm items-center justify-center">
                    <UilTear size={18} className="mr-1" />
                    Humidity:
                    <span className="font-medium ml-1">{humidity.toFixed()}%</span>
                </div>
                <div className="flex font-light text-sm items-center justify-center">
                    <UilWind size={18} className="mr-1" />
                    Wind:
                    <span className="font-medium ml-1">{speed.toFixed()} km/h</span>
                </div>
            
            </div>
        </div>
        <div className="flex flex-row items-center justify-cente space-x-2 text-white text-sm py-3">
            <UilSun/>
            <p className="font-light">Rise:</p>
            <span className="font-medium ml-1">{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span>
            <p className="font-light">|</p>

            <UilSunset/>
            <p className="font-light">Set:</p>
            <span className="font-medium ml-1">{formatToLocalTime(sunset,timezone,"hh:mm a")}</span>
            <p className="font-light">|</p>

            <UilSun/>
            <p className="font-light">High:</p>
            <span className="font-medium ml-1">{temp_max.toFixed()}°</span>
            <p className="font-light">|</p>

            <UilSun/>
            <p className="font-light">Low:</p>
            <span className="font-medium ml-1">{temp_min.toFixed()}°</span>

        </div>
    </div>
  )
}

export default TemperatureAndDetails