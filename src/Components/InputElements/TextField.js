import { useSelector } from "react-redux";
import {useState} from 'react'

export const TextField = ({question, name, type, regex, required, errorMsg, error, value, onChange, onErrorChange}) => {
  const form = useSelector(state => state.form)

  const submitChange = (e) => {
    let change = e.target.value.trim()

    if(required && change === '') {
      onErrorChange("This Field is Required")
    }else if(!required && change === ''){
      onErrorChange("")
    }else if(regex !== '') {
      if(!regex.test(change)) {
        onErrorChange("Invalid Input")
      }else{
        onErrorChange("")
      }
    }else{
      onErrorChange("")
    }

  }
  return (
    <div className='flex flex-col pt-2 mr-20'>
      <h1 className='text-purplegray-400 mb-2'>{question}{required && '*'}</h1>
      <input value={value} onChange={onChange} onBlur={e => submitChange(e)} type={type} className='text-gray-700 appearance-none py-2 px-3 border rounded bg-blue-100 focus:border-gray-400 focus:shadow-outline focus:outline-none' />
      {error ? <p className='text-red-500 text-sm mt-1'>{errorMsg}</p> : '‎'}
    </div>
  )
}

// dispatch(setField([name, e.target.value]))