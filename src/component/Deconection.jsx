import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function NotifAndDeconection() {

    const handleLogOutOnClick=()=>{
        localStorage.removeItem("jwt");
        
    };

  return (
    <div>
        <button on onClick={handleLogOutOnClick}>
            <Link to='/'>
            <FontAwesomeIcon  style={{fontSize:20}} className='text-white cursor-pointer transition ease-out hover:scale-125 ' icon={faSignOutAlt}/>
            </Link>
        </button>
    </div>
  )
}

export default NotifAndDeconection