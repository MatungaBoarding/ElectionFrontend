import React from 'react'
import { CircularProgress } from '@mui/material'
const Loader = () => {
  return (
    <>
        <div className='flex justify-center items-center w-full h-[70vh]'>
                <CircularProgress color="secondary"/>
            </div>
    </>
  )
}

export default Loader