import React, { useEffect, useState } from 'react'
import {Redirect, Route} from "react-router-dom";
import {Home} from "../../pages/Home";
import {CityList} from "../../pages/CityList";
import {News} from "../../pages/News";
import {Me} from "../../pages/Me";

export const LayoutMain = () => {

    /**state  state部分**/

    /**effect  effect部分**/

    /**methods 方法部分**/

    /**styles 样式部分**/

    /**render**/

    return(
        <div style={{marginBottom:'50px'}}>
            <Route exact path='/home'>
                <Home/>
            </Route>
            <Route exact path='/city-list'>
                <CityList/>
            </Route>
            <Route exact path='/news'>
                <News/>
            </Route>
            <Route exact path='/me'>
                <Me/>
            </Route>
            <Route exact path='/' render={() => <Redirect to={'/home'}/>} />
        </div>
    );
};