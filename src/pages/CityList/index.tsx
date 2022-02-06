import {NavBar} from 'antd-mobile';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import {apiAreaCity, apiAreaHot} from "../../utils/request/api";
import {formatCityData} from "../../utils";

export const CityList = () => {

    /**state  state部分**/
    const history = useHistory()
    console.log(history)
    /**effect  effect部分**/
    useEffect(()=>{
        getCityList()
        getHotCityList()
    },[])
    /**methods 方法部分**/
    // 获取城市列表数据
    const getCityList = async () => {
        await apiAreaCity({level: 1}).then((res:any) => {
            console.log(res)
            const cityList = formatCityData(res.body)
            console.log(cityList)
        })
    }
    // 获取城市列表数据
    const getHotCityList = async () => {
        await apiAreaHot().then((res:any) => {
            console.log(res)
            const hotCityList = formatCityData(res.body)
            console.log(hotCityList)
        })
    }
    const back = ()=>{
        // 返回上一个路由
        history.goBack()
    }
    /**styles 样式部分**/

    /**render**/

    return(
        <div>
            <NavBar back={'返回'} onBack={back}>城市选择</NavBar>
        </div>
    );
};