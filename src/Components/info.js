import React from "react";
import { unprotected_api_call, member_by_id_url, create_slip_url } from "../api/api"
import {generatePDF} from "./Slip";
import Photo from './Photo'
import { GlobalContext } from '../globalConfig/firebase';
import { VscLoading } from "react-icons/vsc";
import QRCode from 'qrcode';

class Info extends React.Component {

    static contextType = GlobalContext;

    state = {
        userinfo: "",
        loading: false,
        loadupdate: false,
        loadem: false,
        sched_state: "None",
        sched_date: new Date(),
        sched_state_e: "",
        sched_date_e: "",
        admin: false,

        slip_loading: false,

        error_text: "Loading..."
    }


    componentDidMount = async () => {
        const currentUrl = window.location.href;
        const id = currentUrl.split("/").pop();
        let response
        if(this.state.userinfo === ""){
            response = await unprotected_api_call(member_by_id_url, {"MemId": id}) 
            if(response.status === 200){
                let text = JSON.parse(await response.text())
                if(text["val"] === false)   
                    this.setState({userinfo: "", error_text: text["data"]["error"]})
                else    
                    this.setState({userinfo: text["data"], error_text: ""})
            }else{
                this.setState({userinfo: "", error_text: "ERROR"})
            }
        } 

    }
    
    sync_slip_audit_date = async (url) => {
        let user_data = localStorage.getItem("user_data")
        user_data = JSON.parse(user_data)
        let data = {
            "MemId": this.state.userinfo.MemberID,
            "PhotoUrl": url,
            "Agent": user_data["user_email"]
        }
        let response = await unprotected_api_call(create_slip_url, data)
        if(response.status === 200 || response.status === 201){
            response = await response.json()
            return response["data"]
        }else{
            alert("Server Error")
        }
    }


    generate_slip = async () => {
        this.setState({slip_loading: true})
        const {fireb, setFireb} = this.context;

        if(fireb.url === ""){
            alert("Please capture image.")
            this.setState({slip_loading: false})
            return
        }

        let time;

        try{
            let response = await this.sync_slip_audit_date(fireb.url);
            time = response["timestamp"]
        }catch(e){
            alert("Error syncing data. Try Again")
            this.setState({slip_loading: false})
            return
        }

        let agent_data = localStorage.getItem("user_data")
        agent_data = JSON.parse(agent_data)


        const qrurl = await QRCode.toDataURL(this.state.userinfo.MemberID, {
            width: 200,
            margin: 2,
        });
        
        let data = {
            logoUrl: "https://firebasestorage.googleapis.com/v0/b/mb-software-a20dc.appspot.com/o/election%2Flogomb.png?alt=media&token=0600a59d-33f3-43f5-9160-465794cd17cc",
            photoUrl: fireb.url,
            qrCodeUrl: qrurl,
            name: this.state.userinfo.FirstName.toUpperCase() + " " + this.state.userinfo.MiddleName.toUpperCase() + " " + this.state.userinfo.LastName.toUpperCase(),
            position: this.state.userinfo.NativeVillage.toUpperCase(),
            id: this.state.userinfo.MemberID,
            tableId: "1",
            agentName: agent_data["name"],
            location: "Matunga",
            time: time
        }

        await generatePDF(data)

        setFireb({...fireb, url: ""})
        this.setState({slip_loading: false})
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

                            <div className="m-3">
                                <Photo mbmID={window.location.href.split("/").pop()} type="slip"/>
                            </div>

                            {this.state.slip_loading ? (
                                <button className='w-1/2 bg-purple-900 mt-5 text-white p-2'>
                                    <VscLoading className='w-6 h-6 animate-spin' />
                                </button>
                            ):(    
                                <button className='w-1/2 bg-purple-900 mt-5 text-white p-2' 
                                    onClick={ async () => {await this.generate_slip()}}>
                                    CREATE ELECTION SLIP
                                </button>
                            )}

                        </div>
                    )}
                </div>
            </>
        )
    }
}

export default Info;