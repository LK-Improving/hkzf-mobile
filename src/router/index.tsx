import React from "react";
import {CityList} from "../pages/CityList";
import {News} from "../pages/News";
import {Home} from "../pages/Home";
import {Me} from "../pages/Me";
import {Map} from "../pages/Map";
import {DefaultLayout} from "../layouts/DefaultLayout";
import {UserOutline} from "antd-mobile-icons";

export const redirectRouter:object = {
    path:'/',
    redirect: '/modules/home'
}

export const layoutRouter:object[] = [{
    path: '/modules',
    component:<DefaultLayout/>,
    exact:false,
    children:[{
        path: '/modules/home',
        name: 'Home',
        component: <Home/>,
        title: '首页',
        icon: <i className='iconfont icon-home'/>
    },{
        path: '/modules/city-list',
        name: 'CityList',
        component: <CityList/>,
        title: '找房',
        icon: <i className='iconfont icon-search'/>
    },{
        path: '/modules/news',
        name: 'News',
        component: <News/>,
        title: '资讯',
        icon: <i className='iconfont icon-icnews'/>
    },{
        path: '/modules/me',
        name: 'Me',
        component: <Me/>,
        title: '个人',
        icon: <UserOutline />
    }]
}]

const otherRouter:object[] = [{
    path: '/other/map',
    name: 'Map',
    exact: true,
    component: <Map/>
}]

export default layoutRouter.concat(otherRouter)