import React from 'react';
import Navbar from './../Components/Navbar'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MdLogout, MdAddCircle, MdLocationOn, MdFilterAlt, MdHourglassEmpty, MdNfc, MdOutlineFlag, MdNumbers, MdPrivacyTip } from 'react-icons/md';
import { ListItemButton } from '@mui/material';
import Filter from './../Components/Filter';
import SlipIssuedAdminView from '../reports/SlipIssuedAdminView';
import BallotIssuedAdminView from '../reports/BallotIssuedAdminView';
import CountReport from '../reports/CountReport';
import AgentFilter from '../reports/AgentFilter';

const drawerWidth = 250;

class AdminDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            filter: true,
            slipIssued: false,
            ballotIssued: false,
            agent_filter: false,
            count_report: false,
        }
    }

    logout = () => {
        localStorage.clear();
        window.location.href = "/"
    }

    render(){
        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Navbar />
                </AppBar>

                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}>
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List color="primary">
                            {["Member Filter", "Slip Issued", "Ballot Issued", "Agent Filter", "Count report",].map((t, index) => (
                                <ListItemButton
                                    key={t}
                                    onClick={() => {
                                        if (t === "Member Filter") {
                                            this.setState({ filter: true, slipIssued: false, ballotIssued: false, agent_filter: false, count_report: false })
                                        } else if(t === "Slip Issued"){
                                            this.setState({ filter: false, slipIssued: true, ballotIssued: false, agent_filter: false, count_report: false })
                                        } else if(t === "Ballot Issued"){
                                            this.setState({ filter: false, slipIssued: false, ballotIssued: true, agent_filter: false, count_report: false })
                                        } else if(t === "Agent Filter"){
                                            this.setState({ filter: false, slipIssued: false, ballotIssued: false, agent_filter: true, count_report: false })
                                        } else if(t === "Count report"){
                                            this.setState({ filter: false, slipIssued: false, ballotIssued: false, agent_filter: false, count_report: true })
                                        }
                                    }}>
                                    <ListItemIcon sx={{ color: "#9333ea", fontSize: "25px" }}>
                                        {index ===0 && <MdFilterAlt />}
                                        {index === 1 && <MdAddCircle />}
                                        {index === 2 && <MdNfc />}
                                        {index === 3 && <MdOutlineFlag />}
                                        {index === 4 && <MdNumbers />}
                                    </ListItemIcon>
                                    <ListItemText primary={t} sx={{ color: "black" }} />
                                </ListItemButton>
    
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['Logout'].map((text, index) => (
                                <ListItem key={text} button onClick={this.logout}>
                                    <ListItemIcon sx={{ color: "#dc2626", fontSize: "25px" }}>
                                        {index === 0 && <MdLogout />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ color: "black" }} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    {this.state.filter && (<Filter type="admin"/>)}
                    {this.state.slipIssued && (<SlipIssuedAdminView />)}
                    {this.state.ballotIssued && (<BallotIssuedAdminView />)}
                    {this.state.agent_filter && (<AgentFilter />)}
                    {this.state.count_report && (<CountReport />)}
                </Box>

            </Box>
        )
    }
}

export default AdminDashboard