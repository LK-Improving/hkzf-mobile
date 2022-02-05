import React from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import router, {redirectRouter} from './router'

function App() {
    console.log(router)
    return (
        <Router>
            {
                router.map((item:any,index:number)=>{
                    return <Route exact={item['exact']} key={index} path={item['path']}>
                        {item['component']}
                    </Route>
                })
            }
            <Route exact path={(redirectRouter as any).path}
                   render={() => <Redirect to={(redirectRouter as any).redirect}/>}/>
        </Router>
    );
}

export default App;
