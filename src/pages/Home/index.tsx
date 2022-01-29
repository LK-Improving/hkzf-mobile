import React, {useEffect, useState} from 'react'
import {Button} from "antd-mobile";
import { Route } from 'react-router-dom';
import {News} from '../News'

export const Home = () => {

    /**state  state部分**/

    /**effect  effect部分**/

    /**methods 方法部分**/

    /**styles 样式部分**/

    /**render**/

    return (
        <div>
            Home
            <Button color='primary'>Primary</Button>
            <Route path={'/home/news'} component={News}/>
        </div>
    );
};