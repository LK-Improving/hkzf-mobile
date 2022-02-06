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
    // 通过百度地图Api获取位置信息
    const getLocation = async ()=> {
        // ES6的Object.keys()方法，返回值是对象中属性名组成的数组
        var arr:string[] = Object.keys(store.getState().city);
        if (arr.length === 0){
            // 注意：在react脚手架中全局对象需要使用window来访问。
            //const BMap = window.BMap 这样写也可以
            const {BMapGL} = window as any
            // 初始化地图实例
            var geolocation = new BMapGL.Geolocation();
            await geolocation.getCurrentPosition(function (r: any) {
                const {address: {province, city, district, street}} = r
                const cityName = city.toString().replace('市','')
                console.log(`您当前在${province + city + district + street}`)
                areaInfo(cityName)
            });
        } else {
            const {label} = store.getState().city as any
            setCity(label)
        }

    }

    // 路由跳转
    function go(path: string) {
        history.push(path)
    }
    // 根据城市名称查询该城市信息
    function areaInfo(name:string) {
        apiAreaInfo({name}).then((res:any) => {
            const {status,body:cityInfo} = res
            if (status === 200){
                if (cityInfo.label === name){
                    store.dispatch(setCityAction(cityInfo))
                } else {
                    Toast.show(`您所在的城市暂无房源信息，已将您的位置信息自动切换至${cityInfo.label}！`)
                    store.dispatch(setCityAction(cityInfo))
                }
                setCity(cityInfo.label);
            }
        })
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