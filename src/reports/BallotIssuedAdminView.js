import React from 'react'
import { VscLoading } from "react-icons/vsc";
import { Link } from 'react-router-dom'
import { admin_dashboard_url, unprotected_api_call } from '../api/api'
import Paginate from '../Components/Paginate'

class SlipIssuedAdminView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          results: [],
          loading: false,
          error_txt: "",
          page : 1,
          total: 0,
          last: 0
      }
    }

    handleChange = (event, value) => {
        this.getData(value)
    }

    getData = async (page) => {
        this.setState({results: [], loading: true, page: page})
        let response = await unprotected_api_call(admin_dashboard_url, {"page": page}, "POST")
        let data = await response.json()
        console.log(data)
        if(response["status"] === 200){
            this.setState({results: data["data"], loading: false, total: data["total"], last: data["last_page"], page: page})
            if(data["val"] === false) {
                this.setState({loading: false, error_txt: "NO RESULTS FOUND"})
            }
        }else{
            this.setState({loading: false})
        }
    }

    componentDidMount = async () => {
        await this.getData(this.state.page)
    }


    render(){
      return(
        <>
            <div className=' w-full flex justify-between'>
                <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                    Ballot Issued
                </h1>
            </div>

            <Paginate count={this.state.last} currentPage={this.state.page} handleChange={this.handleChange} />

            {
                this.state.results.length === 0 ? (
                    <div className='grid mt-10 place-items-center'>
                        {this.state.loading ? (
                            <div className='flex justify-center items-center'>
                                <VscLoading className='w-10 h-10 animate-spin text-purple-900' />
                            </div>
                        ):(
                            <h1 className='text-2xl font-bold border text-purple-800  border-purple-300 px-10 py-2 rounded-lg  bg-purple-200'>{this.state.error_txt}</h1>
                        )}
                    </div>
                ) : (
                    <>
                        {this.state.results.map((data, key) => (
                            <div key={key} className='flex flex-col md:flex-row justify-center items-center bg-purple-200 p-4 rounded-lg border border-purple-300 gap-4 mx-20 my-2'>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-grow items-center text-center md:text-left">
                                    {data.MemberID==="" ? (
                                        <img src={"https://firebasestorage.googleapis.com/v0/b/mb-software-a20dc.appspot.com/o/election%2Fdefault_face.png?alt=media&token=1e1bf3ad-292d-492c-b0bc-ee08cbb48139"} alt="no image" className='h-[100px] w-[100px] rounded-full'/>
                                    ) : (
                                        <img src={data.PhotoS3} alt="no image" className='h-[100px] w-[100px] rounded-full mx-auto md:mx-0'/>
                                    )}
                                    <h1 className='text-xl font-bold'>Membership ID: {data.MemberID || "NO KYC"}</h1>
                                    <h1 className='text-xl font-bold'>Name: {`${data.FirstName} ${data.MiddleName} ${data.LastName}`}</h1>
                                    <h1 className='text-xl font-bold'>Village: {data.NativeVillage || "NA"}</h1>
                                    <h1 className='text-xl font-bold'>DOB: {data.DateOfBirth || "-"}</h1>
                                </div>
                                <div className="flex justify-center">
                                    <div className="w-full">
                                            <Link 
                                                onClick={(event) => {}} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                to={`/admin_info/${data.ApplicationID}`} 
                                                state={{ "userinfo": data }} 
                                                className="bg-purple-900 px-6 py-3 rounded-xl text-white text-lg text-center block">
                                                INFO
                                            </Link>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </>       
                )
            }
            <div className='mt-5'></div>
            <Paginate count={this.state.last} currentPage={this.state.page} handleChange={this.handleChange} />
        </>
      )
    }



}


export default SlipIssuedAdminView