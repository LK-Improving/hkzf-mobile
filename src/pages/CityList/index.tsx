import {IndexBar, List, NavBar} from 'antd-mobile';
import React, {useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom';
import {apiAreaCity, apiAreaHot} from "../../utils/request/api";
import {formatCityData, getCurrentCity} from "../../utils";
import {IndexBarRef} from "antd-mobile/es/components/index-bar";

export const CityList = () => {

    /**state  state部分**/
    const history = useHistory()
    const [dataList, setDataList] = useState<object>([])
    const [dataIndex, setDataIndex] = useState<string[]>([])
    const indexBarRef = useRef<IndexBarRef>(null)
    /**effect  effect部分**/
    useEffect(() => {
        getAllCityList()
    }, [])
    /**methods 方法部分**/
        // 获取当前城市城市数据
    const getCurrCity = async (cityList: object | any, cityIndex: string[]) => {
            const currentCity = await getCurrentCity()
            cityList['#'] = [currentCity]
            cityIndex = ['#', ...cityIndex]
            setDataList(cityList)
            setDataIndex(cityIndex)
            cityIndex.forEach((item:any) =>{
                console.log(cityList[item])
            })
        }
    // 获取热门城市列表数据
    const getHotCityList = async (cityList: object | any, cityIndex: string[]) => {
        await apiAreaHot().then((res: any) => {
            console.log(res)
            const {body: hotList} = res
            cityList['hot'] = hotList
            cityIndex = ['hot', ...cityIndex]
            getCurrCity(cityList, cityIndex)
        })
    }
    // 获取城市列表数据
    const getAllCityList = async () => {
        await apiAreaCity({level: 1}).then((res: any) => {
            console.log(res)
            const {cityList, cityIndex} = formatCityData(res.body)
            console.log(cityList, cityIndex)
            getHotCityList(cityList, cityIndex)
        })
    }
    const back = () => {
        // 返回上一个路由
        history.goBack()
    }
    /**styles 样式部分**/

    /**render**/

    return (
        <div>
            <NavBar back={'返回'} onBack={back}>城市选择</NavBar>
            <IndexBar ref={indexBarRef}>
                {dataIndex.map((key:string,index:number) => {
                    return (
                        <IndexBar.Panel
                            index={key}
                            title={key}
                            key={key}
                        >
                            <List>
                                {(dataList as any)[key].map((item:any, index:number) => (
                                    <List.Item key={index}>{item.label}</List.Item>
                                ))}
                            </List>
                        </IndexBar.Panel>
                    )
                })}
            </IndexBar>
        </div>
    );
};