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

import Form from './../Components/Form';
import Productivity from './../Components/Productivity';

const drawerWidth = 250;

class AgentDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            form: true,
            productivity: false,
            summary: false,
            calendar: false,
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
                            {["Patient Form", "Calendar", "Dashboard", "Productivity", "Filter", "Unscheduled Patients"].map((t, index) => (
                                <ListItemButton
                                    key={t}
                                    onClick={() => {
                                        if (t === "Patient Form") {
                                            this.setState({ form: true, productivity: false, filter: false, unscheduled: false, summary: false, calendar: false})
                                        } else if(t === "Calendar"){
                                            this.setState({ form: false, productivity: false, filter: false, unscheduled: false, summary: false, calendar: true})
                                        } else if(t === "Dashboard") {
                                            this.setState({ form: false, productivity: false, filter: false, unscheduled: false, summary: true, calendar: false})
                                        } else if (t === "Productivity") {
                                            this.setState({ form: false, productivity: true, filter: false, unscheduled: false, summary: false, calendar: false})
                                        } else if (t === "Filter" ) {
                                            this.setState({ form: false, productivity: false, filter: true, unscheduled: false, summary: false, calendar: false})
                                        } else if (t === "Unscheduled Patients") {
                                            this.setState({ form: false, productivity: false, filter: false, unscheduled: true, summary: false, calendar: false})
                                        }
                                    }}>
                                    <ListItemIcon sx={{ color: "#9333ea", fontSize: "25px" }}>
                                        {index ===0 && <MdAddCircle />}
                                        {index === 1 && <MdCalendarMonth />}
                                        {index === 2 && <MdNfc />}
                                        {index === 3 && <MdBarChart/>}
                                        {index === 4 && <MdFilterAlt />}
                                        {index === 5 && <MdCall />}
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
                    {this.state.form && (<Form />)}
                    {/* {this.state.calendar && (<Calendar />)} */}
                    {/* {this.state.summary && (<Summary />)} */}
                    {this.state.productivity && (<Productivity />)}
                    {this.state.filter && (<Filter />)}
                    {/* {this.state.unscheduled && (<Unscheduled />)} */}
                </Box>  

            </Box>
        )
    }
}

export default AgentDashboard