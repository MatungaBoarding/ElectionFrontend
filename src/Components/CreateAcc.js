import React from 'react'
import { VscLoading } from "react-icons/vsc";
import { Link } from 'react-router-dom'

import { register_url, delete_user_url, unprotected_api_call, protected_api_call } from '../api/api'

class CreateAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
          
            email: "", username: "", admin_bool: "False", password: "", user: "",

            username_list: [],

            results: [],
            loading: false,
            loading_del: false
      }
    }

    filterFormField = []
    deleteField = []

    componentDidMount = async () => {

      this.filterFormField = [
        {
            "name": "Email",
            "id_name": "email",
            "type": "text"
        },
        {
            "name": "Username",
            "id_name": "username",
            "type": "text"
        },
        {
            "name": "Admin",
            "id_name": "admin_bool",
            "options": ["False", "True"],
            "type": "dropdown"
        },
        {
            "name": "Password",
            "id_name": "password",
            "type": "password"
        },
      ]

      let dd = []
        let response = await protected_api_call(delete_user_url, {}, "GET")
        if(response.status === 200 || response.status === 201) {
            let resp = await response.json()
            dd = resp["data"]
            // this.setState({username_list: resp["data"]})
        } else if(response.status === 400) {
            alert("Bad request")
        } else{
            alert("Server Error")
        }
    
        this.deleteField = [
        {
            "name": "User",
            "id_name": "user",
            "type": "dropdown",
            "options": ["None"].concat(dd)
        },
        ]

        this.setState({})
    }

    

    submit = async () => {

        let email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        let username_regex = /^([A-Za-z])+$/

        if(this.state.email === '' || this.state.username === '' || this.state.password === ''){
            alert("Incomplete Fields")
        }else if(email_regex.test(this.state.email) === false){
            alert("Invalid Email")
        }else if(username_regex.test(this.state.username) === false){
            alert("Username should have no spaces and only characters")
        }else{
            let data = {
                email: this.state.email.trim(),
                username: this.state.username.trim(),
                HKAdmin: this.state.admin_bool==="True" ? true : false,
                password: this.state.password
            }
            
            this.setState({loading: true})
    
            let response = await unprotected_api_call(register_url, data)
            if(response.status === 200 || response.status === 201) {
                let resp = await response.json()
                this.setState({loading: false})
                alert("Created Account")
            } else if(response.status === 400) {
                let resp = await response.json()
                this.setState({loading: false})
                alert(JSON.stringify(resp["data"]))
            } else{
                this.setState({loading: false})
                alert("Server Error")
            }
        }
    }

    delete = async () => {
        let data = {
            username: this.state.user
        }
        
        this.setState({loading_del: true})

        let response = await protected_api_call(delete_user_url, data, "DELETE")
        if(response.status === 200 || response.status === 201) {
            let resp = await response.json()
            this.setState({loading_del: false})
            alert("Account Deleted")
        } else if(response.status === 400) {
            let resp = await response.json()
            this.setState({loading_del: false})
            alert(JSON.stringify(resp["data"]))
        } else{
            this.setState({loading_del: false})
            alert("Server Error")
        }
    }

    render(){
        
      return(
        <>
            <div className=' w-full flex justify-between'>
                <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                    Create Account
                </h1>
            </div>
            <div className='flex flex-wrap flex-col items-center justify-center mt-10'>
                {this.filterFormField.map((data, key) => (
                  data.type === "dropdown" ? (
                    <>
                      <div className='flex flex-col p-2 border border-gray-600 rounded  m-2 w-1/3 '>
                          <h1 className='text-purplegray-900 mb-2'>{data.name}</h1>
                          <select
                              className='bg-purple-200 text-gray-700 appearance-none py-2 px-3 border rounded focus:bg-purple-50 focus:border-gray-400 focus:shadow-outline focus:outline-none'
                              value={this.state[data.id_name]}
                              onChange = {e => this.setState({[data.id_name]: e.target.value})}>
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
                    className="w-1/4 h-10 flex justify-center items-center rounded-lg bg-purple-600 text-purplegray-100 text-lg hover:shadow-md"
                    onClick={this.submit}
                    >
                    {this.state.loading ? <VscLoading className='w-6 h-6 animate-spin' /> : <h1>Create</h1>}
                </button>
            </div>

            <div className=' w-full flex justify-between'>
                <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                    Delete Account
                </h1>
            </div>
            <div className='flex flex-wrap flex-col items-center justify-center mt-10'>
                {this.deleteField.map((data, key) => (
                  data.type === "dropdown" ? (
                    <>
                      <div className='flex flex-col p-2 border border-gray-600 rounded  m-2 w-1/3 '>
                          <h1 className='text-purplegray-900 mb-2'>{data.name}</h1>
                          <select
                              className='bg-purple-200 text-gray-700 appearance-none py-2 px-3 border rounded focus:bg-purple-50 focus:border-gray-400 focus:shadow-outline focus:outline-none'
                              value={this.state[data.id_name]}
                              onChange = {e => this.setState({[data.id_name]: e.target.value})}>
                              {/* <option value="None">None</option> */}
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
                  )))}
                
                <div className="w-full flex flex-col items-center mt-5">
                <button
                    type="submit"
                    className="w-1/4 h-10 flex justify-center items-center rounded-lg bg-red-400 text-purplegray-100 text-lg hover:shadow-md"
                    onClick={this.delete}
                    >
                    {this.state.loading_del ? <VscLoading className='w-6 h-6 animate-spin' /> : <h1>Delete</h1>}
                </button>
            </div>

            </div>
        </>
      )
    }



}


export default CreateAccount