import React, {useState, useEffect} from "react";
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import "./App.css"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />}/>
        <Route path="/SignUp" element={<SignUp />}/>
        <Route path="/Home" element={<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;
