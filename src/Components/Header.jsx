import React from 'react'
import Cookies from 'universal-cookie';
import logo from '../assets/chat.png';
import PeopleSearch from './PeopleSearch';
function Header() {
    const Header=()=>{
        const cookies=new Cookies();
        const logoutHandler=()=>{
          cookies.remove('token');
          cookies.remove('userId');
          cookies.remove('name');
          window.location.reload();
        }
        return(
          <div className='w-full sticky h-[200px] top-0 px-10 py-3 bg-white flex items-center justify-between shadow-sm z-50 '>
            <div className='flex gap-10 items-center justify-center'>
              <img src={logo} alt='log' className=' w-8 object-contain'></img>
             <PeopleSearch />
            </div>
           <div>
            <button type='button' onClick={logoutHandler} className='text-sm font-semibold p-2 px-4 rounded-md bg-red-600 text-white'>Logout</button>
           </div>
          </div>
        )
      }
}

export default Header
