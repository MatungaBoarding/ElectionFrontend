import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GlobalProvider } from './globalConfig/firebase'; 
import Login  from './auth/Login';
import Dashboard from './dashboard/Dashboard';
import Info from './Components/info';
import Search from './Components/Search';
import BallotInfo from './Components/BallotInfo';

const App = () => {
  return (
    <>
      <GlobalProvider>
        <div classNae="App">
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/info/:id" element={<Info />} />
              <Route path="/search" element={<Search />} />
              <Route path="/ballot_info/:id" element={<BallotInfo />} />
            </Routes>
          </Router>
        </div>
      </GlobalProvider>
    </>
  )
}

export default App;