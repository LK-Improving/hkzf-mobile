import React, {useEffect, useState} from 'react'
import styles from "./index.module.less";
import {useHistory} from "react-router-dom";

import store from "../../../redux/store";
import {apiAreaInfo} from "../../../utils/request/api";
import {Toast} from "antd-mobile";
import {setCityAction} from "../../../redux/City/action";
import {getCurrentCity} from "../../../utils";


export const Search = () => {

    /**state  state部分**/
    const [city, setCity] = useState<string>('')
    const history = useHistory()
    /**effect  effect部分**/
    useEffect(() => {
        getLocation()
    }, [])

    /**methods 方法部分**/
    // 获取城市信息
    const getLocation = async ()=> {
            const {label} = await getCurrentCity() as any
            setCity(label)
    }

    // 路由跳转
    function go(path: string) {
        history.push(path)
    }
    /**styles 样式部分**/

    /**render**/

    return (
        <div className={styles.search}>
            <div className={styles.searchLeft} onClick={() => go('/other/city-list')}>
                <div className={styles.location}>
                    <span>{city}<i className='iconfont icon-xiala'/></span>
                </div>
                <div className={styles.form}>
                    <span><i className='iconfont icon-sousuo'/>请输入小区或地址</span>
                </div>
            </div>
            <div className={styles.searchRight} onClick={() => go('/other/map')}>
                <i className={'iconfont icon-ditu ' + styles.icon}/>
            </div>
        </div>
    );
};