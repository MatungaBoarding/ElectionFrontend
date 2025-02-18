import React from 'react';
import Navbar from '../Components/Navbar'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Filter from '../Components/Filter';

const drawerWidth = 250;

class CounterDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            filter: true,
            report: false,
        }
    }

    render(){
        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Navbar />
                </AppBar>
                
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Filter />
                </Box>  
            </Box>
        )
    }
}

export default CounterDashboard