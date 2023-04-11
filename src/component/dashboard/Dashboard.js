import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import getFormattedWeatherData from "../../services/weatherService";
import Forecast from "../Forecast";
import Inputs from "../Inputs";
import TemperatureAndDetails from "../TemperatureAndDetails";
import TimeAndLocation from "../TimeAndLocation";
import TopButtons from "../TopButtons";
import jwt_decode from 'jwt-decode';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Dashboard(){
    const [query,setQuery]=useState({q:'suisse'});
    const [units,setUnits]=useState('metric');
    const [weather,setWeather]=useState(null);

    useEffect (() =>{ 
        const getLocationByIdUser =async()=>{
            const decodedToken = jwt_decode(localStorage.getItem("jwt"));
            const userId=decodedToken.upn;
            const userWithSameId= await axios.get(`http://localhost:9090/settings/v1/${userId}`);
            localStorage.setItem('locationOfUser',JSON.stringify(userWithSameId.data.country));
        };
        getLocationByIdUser();
    },[]);

    useEffect(()=>{
        const fetchWeather = async () =>{
            const message= query.q ? query.q : "current location.";
            toast.info("Fetching weather for "+message);
            const res = await getFormattedWeatherData({...query,units});
            console.log(res)
            toast.success(`Successfuly fetched weather for ${res.name},${res.country}`)
            setWeather(res);
            const response=await axios.post("http://localhost:9090/settings/WeatherData/postWeather",{
                tampreture: res.temp,
                humidity: res.humidity,
                receivedAt: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()}`,
                location: res.name,
                icon: res.icon
            });
            console.log("the id of the post weather is : "+response.data);
            // timchi mrigla : console.log("this weather "+JSON.stringify(weather));
       };
       fetchWeather();
    },[query,units]);

    const myElementStyles = {
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' // add a 10px black shadow
      };

    return( 
        <div className="flex flex-row ">
            <div style={myElementStyles} className=" mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-800 h-fit shadow-xl shadow-gray-500 ">
                <TopButtons setQuery={setQuery} />
                <Inputs setQuery={setQuery} units={units} setUnits={setUnits}  />
                {weather && (
                    <div>
                        <TimeAndLocation weather={weather}/>
                        <TemperatureAndDetails weather={weather} />
                        <Forecast title="hourly fourcast" items={weather.forecast} />    
                    </div> 
                )}
                <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />    
            </div> 
        </div>   
    );
}
export default Dashboard;