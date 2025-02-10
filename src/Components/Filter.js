import React from 'react'
import { VscLoading } from "react-icons/vsc";
import { Link } from 'react-router-dom'
import { villages } from '../assets/villname.js'
import { member_election_filter_url, unprotected_api_call } from '../api/api'

class Filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          
          //   first_name: "", last_name: "", phone: "", email: "", dob: new Date(),
          
          // address: "",city: "", state: "", pincode: "",

          memid: "", native_village: "None", first_name: "", last_name: "", dob: "", middle_name: "", pincode: "",
          
          hospital: "None", diagonosis: "None", criticalitiy: "None", insurance: "None",
          esrd: "None", references: "None", sfreq: "None", sdate: "",
          comments: "", created_at: "", created_by: "", sstatus: "None",
        
          results: [],

          loading: false,
          loadingxl: false,

          show_options: false,
      }
    }

    filterFormField = []

    componentDidMount() {
    
    //   let user_list = JSON.parse(localStorage.getItem("user_data"))["details"]["user_list"]
      this.filterFormField = [
        {
            "name": "Membership ID",
            "id_name": "memid",
            "type": "text"
        },
        {
            "name": "Native Village",
            "id_name": "native_village",
            "options": villages,
            "type": "dropdown"
        },
        {
            "name": "Date of birth",
            "id_name": "dob",
            "type": "date"
        },
        {
            "name": "First Name",
            "id_name": "first_name",
            "type": "text"
        },
        {
            "name": "Middle Name",
            "id_name": "middle_name",
            "type": "text"
        },
        {
            "name": "Last Name",
            "id_name": "last_name",
            "type": "text"
        },
        
        {
            "name": "Pincode",
            "id_name": "pincode",
            "type": "text"
        }

      ]
      this.setState({})
    }

    submit = async () => {
        let data = {
            "FirstName": this.state["first_name"], "MiddleName": this.state["middle_name"],
            "LastName": this.state["last_name"], "DateOfBirth": this.state["dob"],
            "NativeVillage": this.state["native_village"], "MemId": this.state["memid"],
            "Pincode": this.state["pincode"]
        }
        
        this.setState({loading: true})

        let response = await unprotected_api_call(member_election_filter_url, data)
        if(response.status === 200 || response.status === 201) {
            let resp = await response.json()
            this.setState({results: resp["data"], loading: false})
        } else {
            this.setState({loading: false})
            alert("Server Error")
        }   
    }


    render(){
      return(
        <>
            <div className=' w-full flex justify-between'>
                <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                    Search
                </h1>
            </div>
            <div className='flex flex-wrap justify-center '>
                {this.filterFormField.map((data, key) => (
                  data.type === "dropdown" ? (
                    <>
                      <div className='flex flex-col p-2 border border-gray-600 rounded  m-2 w-1/3 '>
                          <h1 className='text-purplegray-900 mb-2'>{data.name}</h1>
                          <select
                              className='bg-purple-200 text-gray-700 appearance-none py-2 px-3 border rounded focus:bg-purple-50 focus:border-gray-400 focus:shadow-outline focus:outline-none'
                              value={this.state[data.id_name]}
                              onChange = {e => this.setState({[data.id_name]: e.target.value})}>
                              <option value="None">None</option>
                              {data.options.map((option, key) => (
                                  <option key={key} value={option}>{option}</option>
                              ))}
                          </select>
                      </div>

                    </>
                  ) : (
                    <div className='flex flex-col p-2 border border-gray-600 rounded  m-2 w-1/3 '>
                        <h1 className='text-purplegray-900 mb-2'>{data.name}</h1>
                        <input
                            className='bg-purple-200 text-gray-700 appearance-none py-2 px-3 border rounded focus:bg-purple-50 focus:border-gray-400 focus:shadow-outline focus:outline-none'
                            type={data.type}
                            value={this.state[data.id_name]}
                            onChange = {e => this.setState({[data.id_name]: e.target.value})}
                        />
                    </div>
                  )
                ))}
            </div>

            <div className="w-full flex flex-col items-center mt-5">
                <button
                    type="submit"
                    className="w-1/3 h-12 flex justify-center items-center rounded-lg bg-purple-600 text-purplegray-100 text-lg hover:shadow-md"
                    onClick={this.submit}
                    >
                    {this.state.loading ? <VscLoading className='w-6 h-6 animate-spin' /> : <h1>Search</h1>}
                </button>
            </div>

            {
                this.state.results.length == 0 ? (
                    <div className='grid mt-10 place-items-center'>
                        <h1 className='text-2xl font-bold border text-purple-800  border-purple-300 px-10 py-2 rounded-lg  bg-purple-200'>NO RESULTS FOUND</h1>
                    </div>
                ) : (
                    <>
                        <div className=' w-full flex justify-between mt-2'>
                            <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2 mx-20'>
                                Results
                            </h1>
                        </div>

                        {this.state.results.map((data, key) => (
                            <div key={key} className='flex flex-col md:flex-row justify-center items-center bg-purple-200 p-4 rounded-lg border border-purple-300 gap-4 mx-20 my-2'>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-grow items-center text-center md:text-left">
                                    <img src={data.PhotoS3} alt="no image" className='h-[100px] w-[100px] rounded-full mx-auto md:mx-0'/>
                                    <h1 className='text-xl font-bold'>Membership ID: {data.MemberID || "NA"}</h1>
                                    <h1 className='text-xl font-bold'>Name: {`${data.FirstName} ${data.MiddleName} ${data.LastName}`}</h1>
                                    <h1 className='text-xl font-bold'>Village: {data.NativeVillage || "NA"}</h1>
                                    <h1 className='text-xl font-bold'>DOB: {data.DateOfBirth || "NA"}</h1>
                                </div>
                                <div className="flex justify-center">
                                    <div className="w-full">
                                        <Link 
                                            onClick={(event) => {}} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            to={`/info/${data.MemberID}`} 
                                            state={{ "userinfo": data }} 
                                            className="bg-purple-900 px-6 py-3 rounded-xl text-white text-lg text-center block"
                                        >
                                            INFO
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </>       
                )
            }
        </>
      )
    }



}


export default Filter