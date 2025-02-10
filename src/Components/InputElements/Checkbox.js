import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setError } from "../fieldsSlice";

const Checkbox = ({ question, name, label, required, errorMsg, error}) => {
  const dispatch = useDispatch()
  return (
    <div className='flex flex-col pt-2'>
      <h1 className='text-purplegray-400 mb-2'>{question}{required && '*'}</h1>
      <label className="flex items-center gap-1 text-sm text-purplezinc">
        <input type="checkbox" className="accent-purplegray-900 h-6" />
        {label}
      </label>
      {error ? <p className='text-red-500 text-sm mt-1'>{errorMsg}</p> : '‎'}
    </div>
  )
}

export default Checkbox