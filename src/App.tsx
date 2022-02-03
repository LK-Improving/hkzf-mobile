import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {LayoutBottom} from "./layout/LayoutBottom";
import {LayoutTop} from "./layout/LayoutTop";
import {LayoutMain} from "./layout/LayoutMain";

function App() {
    return (
        <Router>
                {/*布局顶部*/}
                {/*<LayoutTop/>*/}
                {/*布局主体*/}
                <LayoutMain/>
                {/*布局底部*/}
                <LayoutBottom/>
        </Router>
    );
}

export default App;
