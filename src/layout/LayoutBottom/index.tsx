import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, useHistory, useLocation} from "react-router-dom";
import {UserOutline} from "antd-mobile-icons";
import {TabBar} from "antd-mobile";

export const LayoutBottom = () => {
    const history = useHistory()
    const location = useLocation()
    console.log(history)
    const {pathname}  = location
    const tabs = [
        {
            key: '/home',
            title: '首页',
            icon: <i className='iconfont icon-home'/>
        },
        {
            key: '/city-list',
            title: '找房',
            icon: <i className='iconfont icon-search'/>
        },
        {
            key: '/news',
            title: '资讯',
            icon: <i className='iconfont icon-icnews'/>
        },
        {
            key: '/me',
            title: '个人',
            icon: <UserOutline />
        }
    ]
    const setRouteActive = (value: string) => {
        history.push(value)
        console.log(value)
    }
    /**state  state部分**/

    /**effect  effect部分**/

    /**methods 方法部分**/

    /**styles 样式部分**/

    /**render**/

    return(
            // 底部导航栏
            <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key}  icon={item.icon} title={item.title}/>
                ))}
            </TabBar>
    );
};