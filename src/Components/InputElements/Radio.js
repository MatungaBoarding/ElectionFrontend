import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setField } from "../formSlice";
import { setError } from "../fieldsSlice";

const Radio = ({ question, name, row, options, required, errorMsg, error, index }) => {
  const dispatch = useDispatch()
  const form = useSelector(state => state.form)
  let data = form[name]
  useEffect(() => {
    if (data) {
      dispatch(setError({name: index, error: false}))
    }
  }, [data])
  // if(index===21) data = data["bool"]
  return (
    <div className='pt-2'>
      <h1 className='text-purplegray-400 mb-2'>{question}{required && '*'}</h1>
      <div className={`flex ${!row && 'flex-col'} gap-1`}>
        {options.map(option => (
          <label class={`flex items-center gap-1 ${row && 'mr-4'} text-sm text-purplezinc`}>
            <input type="radio" checked={data === option} onChange={e => dispatch(setField([name, e.target.value]))} value={option} class="w-4 h-4 accent-purplegray-600 bg-gray-100 border-gray-300" />
            {option}
          </label>
        ))}
      </div>
      {error ? <p className='text-red-500 text-sm mt-1'>{errorMsg}</p> : '‎'}
    </div>
  )
}

export default Radio