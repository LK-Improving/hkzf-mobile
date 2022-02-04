import React, { useEffect, useState } from 'react'
import styles from "./index.module.less";
import {Image} from "antd-mobile";
import {baseUrl} from "../../../utils/request/http";
import {apiGetNews} from "../../../utils/request/api";
import {useHistory} from "react-router-dom";

export const Search = () => {

    /**state  state部分**/
    const history = useHistory()
    /**effect  effect部分**/

    /**methods 方法部分**/
    // 路由跳转
    function go(path:string) {
        history.push(path)
    }
    /**styles 样式部分**/

    /**render**/

    return(
        <div className={styles.search}>
            <div className={styles.searchLeft} onClick={()=>go('/modules/city-list')}>
                <div className={styles.location}>
                    <span>上海<i className='iconfont icon-xiala'/></span>
                </div>
                <div className={styles.form}>
                    <span><i className='iconfont icon-sousuo'/>请输入小区或地址</span>
                </div>
            </div>
            <div className={styles.searchRight} onClick={()=>go('/other/map')}>
                <i className={'iconfont icon-ditu ' + styles.icon}/>
            </div>
        </div>
    );
};