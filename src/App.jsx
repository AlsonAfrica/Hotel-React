import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import LandingPage from './Pages/landingPage'
import HomePage from './Pages/homePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthenticationPage from './Pages/autheticationPage'

function App() {
  return (
    <>
    <Router>
      <Routes>  
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/HomePage" element={<HomePage/>}/>
        <Route path="/authetication" element={<AuthenticationPage/>}/>
      </Routes>
    </Router>
    
    {/* <HomePage/> */}
    </>
  )
}

export default App
