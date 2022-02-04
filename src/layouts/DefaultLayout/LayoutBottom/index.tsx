import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import {UserOutline} from "antd-mobile-icons";
import {TabBar} from "antd-mobile";
import {layoutRouter} from "../../../router";

export const LayoutBottom = () => {
    const history = useHistory()
    const location = useLocation()
    const {pathname}  = location
    const childrenRouter = (layoutRouter[0] as any).children
    console.log(childrenRouter)
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
                {childrenRouter.map((item:any) => (
                    <TabBar.Item key={item.path}  icon={item.icon} title={item.title}/>
                ))}
            </TabBar>
    );
};