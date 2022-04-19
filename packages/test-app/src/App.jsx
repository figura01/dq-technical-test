// Libs

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from './components/Navbar';
import MainMenu from './components/SubMenu';

//Pages

import SubMenu from "./components/SubMenu";
import { Outlet } from 'react-router-dom';

export function App() {
    return <div className="app">
        <Navbar />
        <div className="container">
            <SubMenu /> 
            <div className="container">
                <Outlet />
            </div>
        </div>
    </div>
}
