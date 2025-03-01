import React from 'react';
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { VscLoading } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import Photo from './Photo';
import { GlobalContext } from '../globalConfig/firebase';
import { unprotected_api_call, ballot_info_url, confirm_presence_url } from "../api/api";

// class Popup extends React.Component {
//     state = {
//         loading: false,
//     };

//     onConfirm = async () => {
//         this.setState({loading: true})

//         await this.props.onConfirm();
        
//         this.setState({loading: false})
//     };

//     render() {
//         if (!this.props.isOpen) return null;
//         return (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//                 <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md mx-auto">
//                     <h2 className="text-lg font-bold text-center">Upload sign</h2>

//                     <div className='flex justify-center items-center mt-4'>
//                         <Photo mbmID={window.location.href.split("/").pop()} type="Sign" width={500} height={500} ext="png"/>
//                     </div>

//                     {/* <p className="mt-5 text-center">Are you sure you want to confirm your presence?</p> */}
//                     <div className="flex justify-end mt-4">
//                         <button className="bg-gray-400 text-white px-4 py-2 rounded mr-2" onClick={this.props.onClose}>Cancel</button>
//                         <button className="bg-purple-900 text-white px-4 py-2 rounded" onClick={this.onConfirm}>
//                             {this.state.loading ? <VscLoading className='w-6 h-6 animate-spin' /> : "Confirm"}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

class PopupFinal extends React.Component {
    state = {
        loading: false,
    };

    onConfirm = async () => {
        this.setState({loading: true})

        await this.props.onConfirm();
        
        this.setState({loading: false})
    };

    render() {
        if (!this.props.isOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md mx-auto">
                    <h2 className="text-lg font-bold text-center">Confirm Presence</h2>
                    <p className="mt-5">Are you sure you want to confirm your presence?</p>
                    <div className="flex justify-end mt-4">
                        <button className="bg-gray-400 text-white px-4 py-2 rounded mr-2" onClick={this.props.onClose}>Cancel</button>
                        <button className="bg-purple-900 text-white px-4 py-2 rounded" onClick={this.onConfirm}>
                            {this.state.loading ? <VscLoading className='w-6 h-6 animate-spin' /> : "Confirm"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

class BallotInfo extends React.Component {

    static contextType = GlobalContext;

    state = {
        userinfo: "",
        slipLoading: false,
        popupOpen: false,
        popupOpenFinal: false,
        final: false,
        firebase_url: "",
        errorTxt: "Loading ..."
    };

    async componentDidMount() {
        const currentUrl = window.location.href;
        const id = currentUrl.split("/").pop();
        if (!this.state.userinfo) {
            const response = await unprotected_api_call(ballot_info_url, { "AppId": id });
            if (response.status === 200) {
                let text = JSON.parse(await response.text());
                if (text["val"] === false) {
                    this.setState({ userinfo: "", errorTxt: text["data"]["error"] });
                }else{
                    this.setState({ userinfo: text["data"], errorTxt: "" });
                }
            }
        }
    }

    confirmPresence = async () => {
        const currentUrl = window.location.href;
        const id = currentUrl.split("/").pop();
        let agent_data = localStorage.getItem("user_data")
        agent_data = JSON.parse(agent_data)

        const response = await unprotected_api_call(confirm_presence_url, { "MemId": id, 'SignImageUrl': "", 'Agent': agent_data["user_email"] });
        if (response.status === 200) {
            // link to ./dashboard
            this.setState({ popupOpenFinal: false });
            window.location.href = "/dashboard"
        } else {
            alert("Server Error. Try again!");
        }
    };

    handleConfirm = async () => {
        const {fireb, setFireb} = this.context;

        if(fireb.signUrl === ""){
            alert("Please capture image.")
            this.setState({slip_loading: false})
            return
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        this.setState({ popupOpen: false, final: true, firebase_url: fireb.signUrl });
        setFireb({...fireb, signUrl: ""})
    };

    handleConfirmFinal = async () => {
        await this.confirmPresence();
        this.setState({ popupOpenFinal: false });
    };

    render() {
        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Navbar />
                </AppBar>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    {this.state.userinfo ? (
                        <div className="flex flex-col items-center">
                            {/* <h2 className="text-xl font-semibold mb-4">BALLOT INFO</h2> */}
                            <img src={this.state.userinfo["PhotoS3"]} alt="user" className="w-40 h-40 rounded-full" />

                            <p className="text-lg font-bold mt-10">{this.state.userinfo["MemberId"]}</p>
                            <p className="text-lg">{this.state.userinfo["Name"]}</p>
                            <p className="text-lg">Village: {this.state.userinfo["NativeVillage"]}</p>
                            <p className="text-lg">DOB: {this.state.userinfo["DateOfBirth"]}</p>
                            
                            <Link to={`/dashboard`} className="w-1/2 bg-purple-700 mt-10 text-white p-2 text-center block">
                                Scan again
                            </Link>

                            {/* {this.state.final ? ( */}
                                <div className='flex flex-col w-full items-center'>
                                    <button className='w-full bg-purple-700 mt-10 text-white p-2' onClick={() => this.setState({ popupOpenFinal: true })}>
                                        Confirm presence
                                    </button>
                                </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <p>{this.state.errorTxt}</p>
                            <Link to={`/dashboard`} className="w-1/3 bg-purple-700 mt-10 text-white p-2 text-center block">
                                Go back to scan
                            </Link>
                        </div>
                    )}
                    {/* <Popup isOpen={this.state.popupOpen} onClose={() => this.setState({ popupOpen: false })} onConfirm={this.handleConfirm} /> */}
                    <PopupFinal isOpen={this.state.popupOpenFinal} onClose={() => this.setState({ popupOpenFinal: false })} onConfirm={this.handleConfirmFinal} />
                </Box>
            </Box>
        );
    }
}

export default BallotInfo;
