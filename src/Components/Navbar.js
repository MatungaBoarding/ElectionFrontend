import React from 'react'
import { MdLogout, MdAccountCircle, MdFilterAlt, MdAddCircle, MdBarChart, MdCalendarMonth, MdNfc, MdCall, MdFolderShared } from 'react-icons/md';
import { IconButton } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';

import background from './../assets/logomb.png';

const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/"
}

const Navbar = ({type}) => {
  if (type === 'login') {
    return (
      <div className='w-full px-2 bg-white flex flex-col items-center'>
        <h1 className='font-semibold text-4xl sm:text-4xl mt-10 py-2 md:text-4xl lg:text-5xl heading text-purple-800 text-center'>
          Election Portal
        </h1>
        <img className='' style={{ width: '15%', height: 'auto' }} src={background} alt="Matunga Boarding Logo" />
      </div>
    )
  }else{
    return (
      <div className='w-full h-16 px-2 bg-white flex items-center'>
        <IconButton onClick={handleLogout} sx={{ color: "#dc2626", fontSize: "150%", padding: "2%" }}>
          <MdLogout />
        </IconButton>;

        <IconButton onClick={handleLogout} sx={{ color: "#9333ea", fontSize: "150%", padding: "2%" }}>
          <MdAccountCircle />
        </IconButton>;

      <div className='font-semibold sm:text-3xl py-2 md:text-4xl heading text-purple-800 ml-auto mx-10'>
        <img className='w-7 sm:w-10 md:w-12 lg:w-15 h-auto' src={background} alt="Matunga Boarding Logo" />
      </div>
      
      </div>
    )
  }
}

export default Navbar