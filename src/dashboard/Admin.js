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
import { MdLogout, MdAddCircle, MdBarChart, MdFilterAlt, MdCalendarMonth, MdNfc, MdCall } from 'react-icons/md';
import { ListItemButton } from '@mui/material';
import Filter from './../Components/Filter';
import SlipIssuedAdminView from '../Components/SlipIssuedAdminView';
import BallotIssuedAdminView from '../Components/BallotIssuedAdminView';

const drawerWidth = 250;

class AdminDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            filter: true,
            slipIssued: false,
            ballotIssued: false
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
                            {["Filter", "Slip Issued", "Ballot Issued"].map((t, index) => (
                                <ListItemButton
                                    key={t}
                                    onClick={() => {
                                        if (t === "Filter") {
                                            this.setState({ filter: true, slipIssued: false, ballotIssued: false })
                                        } else if(t === "Slip Issued"){
                                            this.setState({ filter: false, slipIssued: true, ballotIssued: false })
                                        } else if(t === "Ballot Issued"){
                                            this.setState({ filter: false, slipIssued: false, ballotIssued: true })
                                        }
                                    }}>
                                    <ListItemIcon sx={{ color: "#9333ea", fontSize: "25px" }}>
                                        {index ===0 && <MdFilterAlt />}
                                        {index === 1 && <MdAddCircle />}
                                        {index === 2 && <MdNfc />}
                                        {/* {index === 3 && <MdBarChart/>}
                                        {index === 4 && <MdFilterAlt />}
                                        {index === 5 && <MdCall />} */}
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
                </Box>  

            </Box>
        )
    }
}

export default AdminDashboard