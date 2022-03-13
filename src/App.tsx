import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ToastMessage from "./components/ToastMessage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PhoneAuthPage from "./pages/PhoneAuthPage";

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/phone-auth" element={<PhoneAuthPage/>}/>
    </Routes>
  </BrowserRouter>;
}

export default App;
