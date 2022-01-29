import React from 'react';
import './App.css';
import {NavBar} from 'antd-mobile'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Home} from "./pages/Home";
import {CityList} from "./pages/CityList";
import {News} from "./pages/News";
import {Me} from "./pages/Me";
import {LayoutBottom} from "./layout/LayoutBottom";
import {LayoutTop} from "./layout/LayoutTop";
import {LayoutMain} from "./layout/LayoutMain";

function App() {
    return (
        <Router>
            <div>
                <div>
                    <LayoutTop/>
                </div>
                <div>
                    <LayoutMain/>
                </div>
                <div>
                    <LayoutBottom/>
                </div>
            </div>
        </Router>
    );
}

export default App;
