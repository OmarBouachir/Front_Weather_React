import React from 'react'
import Deconection from './Deconection'
import Notification from './Notification'
import History from './History';
function TopButtons( {setQuery} ) {
    const cities=[
        {
            id:1,
            title:'London'
        },
        {
            id:2,
            title:'Sydney'
        },
        {
            id:3,
            title:'Tokyo'
        },
        {
            id:4,
            title:'Toronto'
        },
        {
            id:5,
            title:'Paris'
        },
    ]
  return (
    <div className="flex items-center justify-around my-6">
        {cities.map((city)=>(
            <button id={city.id} className="text-white text-lg font-medium" onClick={()=>{setQuery({q: city.title})}}>{city.title}</button>
        )
        )}
        <History/>
        <Deconection/>
    </div>
  )
}

export default TopButtons