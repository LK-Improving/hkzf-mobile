import {IndexBar, NavBar} from 'antd-mobile';
import {List} from 'react-virtualized';
import React, {useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom';
import {apiAreaCity, apiAreaHot} from "../../utils/request/api";
import {formatCityData, getCurrentCity} from "../../utils";
import {IndexBarRef} from "antd-mobile/es/components/index-bar";
import './index.less'
import store from "../../redux/store";
import {setCityAction} from "../../redux/City/action";


// List data as an array of strings
const list = [
    'Brian Vaughn',
    // And so on...
];


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
            indexBarRef.current?.scrollTo(cityIndex[0])
        }
    // 获取热门城市列表数据
    const getHotCityList = async (cityList: object | any, cityIndex: string[]) => {
        await apiAreaHot().then((res: any) => {
            const {body: hotList} = res
            cityList['hot'] = hotList
            cityIndex = ['hot', ...cityIndex]
            getCurrCity(cityList, cityIndex)
        })
    }
    // 获取城市列表数据
    const getAllCityList = async () => {
        await apiAreaCity({level: 1}).then((res: any) => {
            const {cityList, cityIndex} = formatCityData(res.body)
            getHotCityList(cityList, cityIndex)
        })
    }
    const back = () => {
        // 返回上一个路由
        history.goBack()
    }
    const changeCity = (data: object) => {
        return () => {
            store.dispatch(setCityAction(data))
            localStorage.setItem('city', JSON.stringify(data))
            back()
        }
    }
    /**styles 样式部分**/
    const rowRenderer = ({
                             key = 0, // Unique key within array of rows
                             index=0, // Index of row within collection
                             isScrolling=false, // The List is currently being scrolled
                             isVisible=false, // This row is visible within the List (eg it is not an overscanned row)
                             style={}, // Style object to be applied to row (to position it)
                         }) => {
            return (
                <div key={key} style={style}>
                    {list[index]}
                </div>
            );
    }
    /**render**/

    return (
        <div style={{height: window.innerHeight}}>
            <NavBar back={'返回'} onBack={back}>城市选择</NavBar>
            <IndexBar ref={indexBarRef}>
                {
                    dataIndex.map((key: string, index: number) => {
                        return (
                            <IndexBar.Panel
                                index={key === 'hot' ? '热' : key.toUpperCase()}
                                title={
                                    key === '#' ? '当前城市' : key === 'hot' ? '热门城市' : key.toUpperCase()
                                }
                                key={index}
                            >
                                {/*<List>*/}
                                {/*    {(dataList as any)[key].map((item: any, index: number) => (*/}
                                {/*        // <List.Item key={index} onClick={changeCity(item)}>{item.label}</List.Item>*/}
                                {/*</List>*/}
                                <List
                                    key={index}
                                    width={300}
                                    height={100}
                                    rowCount={1}
                                    rowHeight={20}
                                    rowRenderer={() => {
                                        return (dataList as any)[key].map((item:any,index:number)=>{
                                            return <div key={index}>{item.label}</div>
                                        })
                                    }}
                                />
                            </IndexBar.Panel>
                        )
                    })}
            </IndexBar>
        </div>
    );
};