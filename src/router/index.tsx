import React from "react";
import {CityList} from "../pages/CityList";
import {News} from "../pages/News";
import {Home} from "../pages/Home";
import {Me} from "../pages/Me";
import {BdMap} from "../pages/BdMap";
import {DefaultLayout} from "../layouts/DefaultLayout";
import {UserOutline} from "antd-mobile-icons";
import {HouseList} from "../pages/HouseList";

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
        path: '/modules/House-list',
        name: 'HouseList',
        component: <HouseList/>,
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
    component: <BdMap/>
},{
    path: '/other/city-list',
    name: 'CityList',
    exact: true,
    component: <CityList/>
}]

export default layoutRouter.concat(otherRouter)