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
import Maps from "../Maps";

function Dashboard(){
    const [locationByIdUser,setLocationByIdUser]=useState('');
    const [query,setQuery]=useState({q:'suisse'});
    const [units,setUnits]=useState('metric');
    const [weather,setWeather]=useState(null);
    useEffect (() =>{ //the equivalence of ngOnInit
        
        const getLocationByIdUser =async()=>{
            const decodedToken = jwt_decode(localStorage.getItem("jwt"));
            const userId=decodedToken.upn;
            const userWithSameId= await axios.get(`http://localhost:9090/settings/v1/${userId}`);
            setLocationByIdUser(JSON.stringify(userWithSameId.data.country));
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
            // timchi mrigla : console.log("this weather "+JSON.stringify(weather));
       };
       fetchWeather();
    },[query,units]);

    const myElementStyles = {
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' // add a 10px black shadow
      };

    return(
        
        
        <div style={myElementStyles} className=" mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-800 h-fit shadow-xl shadow-gray-500 ">
            <TopButtons setQuery={setQuery} />
            <Inputs setQuery={setQuery} units={units} setUnits={setUnits}  />
            {weather && (
                   <div>
                    <TimeAndLocation weather={weather}/>
                    <TemperatureAndDetails weather={weather} />
                    <Forecast title="hourly fourcast" />
                    <Forecast title="daily fourcast" />
                   </div> 
            )}
            <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />    
        </div>
        

    );

}
export default Dashboard;