import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdKeyboardArrowDown } from 'react-icons/md'

export const DropDown = ({question, name, options, required, errorMsg, error, value, onChange, onErrorChange, value_}) => {
  const form = useSelector(state => state.form)

  let submit = () => {
    // console.log(e.target.value)
    if(value == "None"){
      onErrorChange("This is a required field")
    }
  }

  return (
    <div className='flex flex-col pt-2 mr-20'>
      <h1 className='text-purplegray-400 mb-2'>{question}{required && '*'}</h1>
      <div class="relative w-full">
        <select 
          value={value} 
          onChange={onChange} 
          class="appearance-none w-full border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none bg-blue-100 focus:border-gray-400">
          {options.map(option => <option>{option}</option>)}
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <MdKeyboardArrowDown />
        </div>
      </div>
      {/* {value == "Other" ? (
        <input value={value} onChange={() => {}} onBlur={e => {}} type="text" className='text-gray-700 appearance-none py-2 px-3 border rounded bg-blue-100 focus:border-gray-400 focus:shadow-outline focus:outline-none mt-1' />
      ):(
        <></>
      )} */}
      {error ? <p className='text-red-500 text-sm mt-1'>{errorMsg}</p> : '‎'}
    </div>
  )
}
