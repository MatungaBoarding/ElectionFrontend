import React from "react";
import { unprotected_api_call, admin_info_url } from "../api/api"
import Photo from './Photo'
import { GlobalContext } from '../globalConfig/firebase';
import { VscLoading } from "react-icons/vsc";


class AdminInfo extends React.Component {

    static contextType = GlobalContext;

    state = {
        userinfo: "",
        loading: false,
        extraData: "",
        error_text: "Loading..."
    }


    componentDidMount = async () => {
        const currentUrl = window.location.href;
        const id = currentUrl.split("/").pop();
        let response
        if(this.state.userinfo === ""){
            response = await unprotected_api_call(admin_info_url, {"MemId": id}) 
            if(response.status === 200){
                let text = JSON.parse(await response.text())
                if(text["val"] === false)   
                    this.setState({userinfo: "", extraData: "", error_text: text["data"]["error"]})
                else    
                    this.setState({userinfo: text["data"]["MemberData"], error_text: "", extraData: text["data"]["ExtraData"]})
            }else{
                this.setState({userinfo: "", extraData: "", error_text: "ERROR"})
            }
        } 

    }


    render() {
        return (
            <>
                <div className='flex justify-center items-center flex-col w-auto mt-20  rounded'>

                    {this.state.userinfo==="" ? (<>
                        {this.state.error_text}
                    </>):(
                        <div className='flex flex-col justify-center items-center h-1/2 w-full'>
                            <div className='flex justify-around bg-purple-600 text-white w-1/2 items-center m-1 p-2'>
                            <a href={this.state.userinfo.PhotoS3} target="_blank">
                                <img src={this.state.userinfo.PhotoS3} alt="no image" className='h-[150px] w-[150px] rounded-full'/>
                            </a>
                            </div>

                            <div className='flex justify-around bg-purple-100 text-purple w-1/2 items-center m-1 p-2'>
                                {(this.state.userinfo.IDCARDLink!=="") ? (<a href={this.state.userinfo.IDCARDLink} target="_blank"> <button className='ml-3 bg-white text-purple-900 px-4 py-1 rounded-lg'>ID CARD</button></a>): (<></>)}
                                <span><b>MEMBER ID:</b> {this.state.userinfo.MemberID}</span>
                                <a href={this.state.userinfo.AadharS3} target="_blank"> <button className='ml-3 bg-white text-purple-900 px-4 py-1 rounded-lg'>Government ID</button></a>
                            </div>

                            <div className='flex justify-around bg-purple-600 text-white w-1/2 items-center m-1 p-2'>
                                <span><b>First Name:</b> {this.state.userinfo.FirstName}</span>
                                <span><b>Middle Name:</b> {this.state.userinfo.MiddleName}</span>
                                <span><b>Last Name:</b> {this.state.userinfo.LastName}</span>
                            </div>

                            <div className='flex justify-around bg-purple-100 text-purple w-1/2 items-center m-1 p-2'>
                                <span><b>Gender:</b> {this.state.userinfo.Gender}</span>
                                <span><b>Date of Birth:</b> {this.state.userinfo.DateOfBirth}</span>
                                <span><b>Marital Status:</b> {this.state.userinfo.MaritalStatus}</span>
                            </div>

                            <div className='flex justify-around bg-purple-600 text-white w-1/2 items-center m-1 p-2'>
                                <span><b>Native Village:</b> {this.state.userinfo.NativeVillage}</span>
                                <span><b>Occupation:</b> {this.state.userinfo.Occupation}</span>
                                <span><b>Blood Group:</b> {this.state.userinfo.BloodGroups}</span>
                            </div>

                            <div className='flex justify-around bg-purple-100 text-purple w-1/2 items-center m-1 p-2'>
                                <span className=""><b>Address:</b> {this.state.userinfo.Address}</span>
                            </div>

                            <div className='flex justify-around bg-purple-600 text-white w-1/2 items-center m-1 p-2'>
                                <span><b>Area:</b> {this.state.userinfo.Area}</span>
                                <span><b>City:</b> {this.state.userinfo.City}</span>
                                <span><b>State:</b> {this.state.userinfo.State}</span>
                                <span><b>Pincode:</b> {this.state.userinfo.Pincode}</span>
                            </div>
                        </div>
                    )}
                    {this.state.extraData !== "" ? (
                        <div className='flex flex-col justify-center items-center h-1/2 w-full my-10'>
                            {this.state.extraData.CountIssued ? (
                                <div className='flex flex-col w-full items-center'>
                                    <b>Slip Issued</b>
                                    <img src={this.state.extraData.CountData.CountImage} alt="slip" className="w-200 h-200 mt-2" />
                                </div>
                            ) : (<></>)}

                            {this.state.extraData.BallotIssued ? (
                                <div className='flex flex-col w-full items-center mt-5'>
                                    <b>Ballot Issued</b>
                                    <img src={this.state.extraData.BallotData.BallotImage} alt="sign" className="w-200 h-200 mt-2" />
                                </div>
                            ) : (<></>)}

                            {!this.state.extraData.CountIssued && !this.state.extraData.BallotIssued ? (
                                <div className='flex flex-col w-full items-center mt-5'>
                                    <b>YET TO VOTE</b>
                                </div>
                            ) : (<></>)}

                        </div>
                    ):( <></> )}
                </div>
            </>
        )
    }
}

export default AdminInfo;