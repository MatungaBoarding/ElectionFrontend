// import { useSelector, useDispatch } from "react-redux";
// import { setField } from "../formSlice";
// import { setError } from "../fieldsSlice";
import TextField from '@mui/material/TextField';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import "react-datepicker/dist/react-datepicker.css";
// import { useEffect,useState } from "react";
// import DatePicker from 'react-date-picker';

import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


export const Calendar = ({question, name, type, regex, required, errorMsg, error, onChange, value}) => {

  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className='flex flex-col pt-2 mr-20'>
      <h1 className='text-purplegray-400 mb-2'>{question}{required && '*'}</h1>
      <DatePicker selected={value} onChange={onChange}
        className='align-items-start'
        customInput={<TextField size='small' className='bg-blue-100 flex w-full' />}
      />
      
      {error ? <p className='text-red-500 text-sm mt-1'>{errorMsg}</p> : '‎'}
    </div>
  )
};