import axios from 'axios';
import React from 'react'
import { useState,useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import getFormattedWeatherData from '../services/weatherService';

function Maps({query,units}) {
    const API_KEY_MAP='5KpnWVi19bOfBnPujCSj';
    const [weatherData,setWeatherData]=useState(null);
    useEffect(()=>{
        const fetchDataFromApiWeathher=async()=>{
            const response=await getFormattedWeatherData({...query,units});
            console.log("this is the weather from the map component : "+ response);
            setWeatherData(response);
        };
        fetchDataFromApiWeathher();
    },[]);

  return (
        <MapContainer center={[10.77127, 106.69012]} zoom={10} style={{width:'100vw',height:'100vh'}}>
            <TileLayer url="https://api.maptiler.com/maps/streets-v2/?key=5KpnWVi19bOfBnPujCSj#1.5/23.69953/16.28539"/>
                {weatherData && (
                    <Marker position={[weatherData.lat, weatherData.lon]}>
                        <Popup>
                            <div>
                             <h2>{weatherData.name}</h2>
                             <p>Temperature: {weatherData.temp}°C</p>
                             <p>Weather: {weatherData.details}</p> 
                            </div>
                        </Popup>
                    </Marker>
                )}
        </MapContainer>
  )
}

export default Maps