import { useState } from 'react'
import { global_search_url, unprotected_api_call } from '../api/api'
import Loader from './Loader'
import { toast } from 'react-toastify';
import Navbar from './Navbar'

import {villages} from './../assets/villname'

const filterFormField = [
    {
        "name": "First Name *",
        "id": "FirstName",
        "type": "text",
    },{
        "name": "Native Village *",
        "id": "NativeVillage",
        "type": "dropdown",
        "options": villages
    },{
        "name": "Date of Birth *",
        "id": "DateOfBirth",
        "type": "date",
    },{
        "name": "Middle Name",
        "id": "MiddleName",
        "type": "text",
    },
    {
        "name": "Last Name",
        "id": "LastName",
        "type": "text",
    },
]

let state = {}

filterFormField.forEach(field => {
        state[field.id] = ''
})

const Search = () => {
    const [states, setStates] = useState({ ...state })
    const [search, setSearch] = useState([])
    const [searchClicked, setSearchClicked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [show_options, setShowOptions] = useState(false)

    const searchData = async () => {
        try{
            setLoading(true)
            for(let i in states){
                states[i] = states[i].trim()
            }
            
            if(states["FirstName"] === "" || states["NativeVillage"] === "" || states["DateOfBirth"] === ""){
                toast.error('Please fill all the required fields', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setLoading(false)
                return
            }

            let response = await unprotected_api_call(global_search_url, states)
            console.log(response.status)
            if(response.status === 200 || response.status === 201) {
                let data = await response.json()
                // const data = await global_search_api_call(states)
                setSearch(data.data)
                setLoading(false)
                setSearchClicked(true)
                
            } else {
                this.setState({loading: false})
                alert("Server Error")
            }

            setLoading(false)
            setSearchClicked(true)
        }
        catch {
            toast.error('Something went Wrong :(', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return(
        <>
            <Navbar />
            {/* Title */}
            <div className="w-full flex justify-center mt-5">
                <h1 className='font-semibold text-lg sm:text-xl pt-2 text-center md:text-4xl heading text-purple-600'>
                    Search membership details
                </h1>
            </div>

            <div className="w-full flex justify-center my-3">
                <h1 className='sm:text-xl py-2 text-center text-purple-600'>
                    (* - Required)
                </h1>
            </div>
            

            <div className="container mx-auto px-4">
                <div className="max-w-xl mx-auto">
                    <div className='grid grid-cols-1 gap-4'>
                        {filterFormField.map((data, key) => (
                            <div key={key} className='flex flex-col p-2 border border-gray-600 rounded'>
                                <h1 className='text-gray-900 mb-2'>{data.name}</h1>
                                    {data.type === "dropdown" ? (
                                        <div className="relative">
                                            <input
                                                className='bg-purple-200 w-full text-gray-700 appearance-none py-2 px-3 border rounded focus:bg-purple-50 focus:border-gray-400 focus:shadow-outline focus:outline-none'
                                                type="text"
                                                value={states[data.id]}
                                                onChange={e => {
                                                    setStates({ ...states, [data.id]: e.target.value })
                                                    setShowOptions(true)
                                                    setSearchClicked(false)
                                                }}
                                                placeholder="Type to filter options"
                                            />
                                            {( show_options &&
                                                <div className="absolute bg-white border border-gray-300 rounded mt-1 w-full max-h-60 overflow-y-auto z-10">
                                                    {data.options.filter(option => option.toLowerCase().includes(states[data.id].toLowerCase())).map((option, index) => (
                                                        <div
                                                            key={index}
                                                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                                            onClick={() => {
                                                                setStates({ ...states, [data.id]: option});
                                                                setShowOptions(false)
                                                            }}
                                                        >
                                                            {option}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <input
                                            className='bg-purple-200 text-gray-700 appearance-none py-2 px-3 border rounded focus:bg-purple-50 focus:border-gray-400 focus:shadow-outline focus:outline-none'
                                            type={data.type}
                                            value={states[data.id]}
                                            onChange={e => {
                                                setStates({ ...states, [data.id]: e.target.value })
                                                setSearchClicked(false)
                                            }}
                                        />
                                    )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full my-6 flex justify-center">
                <button 
                    onClick={() => {
                        searchData();
                    }} 
                    className='bg-purple-600 px-7 py-2 text-white rounded-lg w-full max-w-xs hover:bg-purple-700 transition-colors'>
                    {search && loading ? 
                        "Loading ... ": 
                        "Search" }
                </button>
            </div>

            {loading && <Loader />}
            {searchClicked && search.length === 0 ? (
                <div className='place-items-center p-5 text-center'>
                    <h1 className='text-2xl font-bold border text-purple-800 border-purple-300 px-10 py-2 text-center rounded-lg bg-purple-200 mb-3'>
                        NO RESULTS FOUND
                    </h1>
                    Please contact us If you think this is a mistake!

                </div>
            ) : (<> </>)}
            {searchClicked && search.length > 0 ? (
                <div className="container mx-auto px-4 pb-10">
                    <div className='w-full flex justify-between mt-2'>
                        <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                            Results
                            </h1>
                            </div>
                            <div className="space-y-4">
                                {search.map((data, key) => (
                                    <div key={key} className='flex flex-col md:flex-row justify-center items-center bg-purple-200 p-4 rounded-lg border border-purple-300 gap-4'>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-grow items-center text-center md:text-left">
                                            {data.PhotoS3 ? (<img src={data.PhotoS3} alt="no image" className='h-[100px] w-[100px] rounded-full mx-auto md:mx-0'/>) : (
                                                <img src={""} alt="no image" className='h-[100px] w-[100px] rounded-full mx-auto md:mx-0'/>
                                            )}
                                            
                                            <h1>Membership ID: {data.MemberID || "NA"}</h1>
                                            <h1>Name: {`${data.FirstName} ${data.MiddleName} ${data.LastName}`}</h1>
                                            <h1>Village: {data.NativeVillage || "NA"}</h1>
                                        </div>
                                        <div className="shrink-0">
                                            <div className="shrink-0">
                                                <a href={data.IDCARDLink} target="_blank"> <button

                                                    className='bg-purple-900 px-6 py-2 rounded-lg text-white text-center hover:bg-purple-800 transition-colors inline-block'>
                                                    GET ID CARD
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (<> </>)}

           
        </>
    )
}

export default Search