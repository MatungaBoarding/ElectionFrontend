import React from 'react';
import AdminDashboard from './Admin';
import AgentDashboard from './Agent';
import Navbar from './../Components/Navbar'
import { AppBar } from '@mui/material';
import BallotPage from './../Components/BallotPage';

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          isLoading: false,
          counter: false,
          ballot: false,
        }
    }

    componentDidMount = async () => {
      let user_data = localStorage.getItem("user_data")
      user_data = JSON.parse(user_data)
      let counter_bool = user_data["isCountingAgent"]
      let ballot_bool = user_data["isBallotAgent"]
      if(counter_bool){
        this.setState({counter: true, ballot: false})
      }else if(ballot_bool){
        this.setState({counter: false, ballot: true})
      }
    }

    render(){
        return (
          <div className='flex h-screen'>
            <div className="absolute flex flex-col z-1 w-full h-screen top-0 left-0">
              <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Navbar />
              </AppBar>
              {this.state.counter ? <AdminDashboard /> : <></>}
              {this.state.ballot ? <BallotPage /> : <></>}
            </div>
          </div>
        )
    }
}

export default Dashboard