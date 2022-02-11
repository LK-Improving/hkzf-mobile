import {IndexBar, NavBar, List as amList, Toast} from 'antd-mobile';
import {AutoSizer, List} from 'react-virtualized';
import React, {useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom';
import {apiAreaCity, apiAreaHot} from "../../utils/request/api";
import {formatCityData, getCurrentCity} from "../../utils";
import {IndexBarRef} from "antd-mobile/es/components/index-bar";
import './index.less'
import store from "../../redux/store";
import {setCityAction} from "../../redux/City/action";


export const CityList = () => {

    /**state  state部分**/
    const history = useHistory()
    const [dataList, setDataList] = useState<object>([])
    const [dataIndex, setDataIndex] = useState<string[]>([])
    const [chooseIndex, setChooseIndex] = useState<number>(0)
    const indexBarRef = useRef<IndexBarRef>(null)
    const listRef = useRef(null)
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
    const handleJump = (index:number) => {
        return () => {
            setChooseIndex(index)
            // this.listRef.current.scrollToRow(index) //或者调用组件的方法可以实现一样的效果
        }
    }
    const changeCity = (data: any) => {
        return () => {
            const existList = ['北京','上海','广州','深圳']
            const isExist = existList.find((item)=>{
                return item === data.label
            })
            if (isExist === undefined) {
                return Toast.show({
                    content: '该城市暂无房源信息'
                })
            }
            store.dispatch(setCityAction(data))
            localStorage.setItem('city', JSON.stringify(data))
            back()
        }
    }
    /**styles 样式部分**/
    // 每一行长什么样子
    // @ts-ignore
    function rowRenderer({key, index, isScrolling, isVisible, style}) {
        const cityTitle = dataIndex[index]
        return (
            <div key={key} style={style}>
                <div className={'title'}>
                    {cityTitle === '#' ? '当前城市' : cityTitle === 'hot' ? '热门城市' : cityTitle.toUpperCase()}
                </div>
                {
                    (dataList as any)[cityTitle].map((item:any,index2:number)=>{
                        return <div className={'name'} key={index2} onClick={changeCity(item)}>
                            {item.label}
                        </div>
                    })
                }
            </div>
        );
    }
    // 右侧城市索引列表： index-active
    function renderJumpIcon() {
        return (
            <ul className="city-index">
                {dataIndex.map((item, index) => (
                    <li className="city-index-item" key={item} onClick={handleJump(index)}>
                        <span className={chooseIndex === index?'index-active':''}>{item === 'hot' ? '热' : item.toUpperCase()}</span>
                    </li>
                ))}
            </ul>
        )
    }
    // @ts-ignore
    const onRowsRendered = ({ overscanStartIndex, overscanStopIndex, startIndex, stopIndex }) => {
        // console.log(overscanStartIndex, overscanStopIndex, startIndex, stopIndex);
        return () => {
            setChooseIndex(startIndex)
        }
    }
    // 手动计算每一行的高度
    // @ts-ignore
    const rowHeight = ({ index }) => {
        // 一行内容的高度 = 36 标题高度 + 城市数量 * 50
        const cityTitle = dataIndex[index]
        return 36 + (dataList as any)[cityTitle].length * 50
    }
    /**render**/

    return (
        <div style={{height: window.innerHeight}}>
            <NavBar back={'返回'} onBack={back}>城市选择</NavBar>
            <AutoSizer>
                {({height, width}) => (
                    <List
                        ref={listRef}
                        width={width}
                        height={height - 45}
                        rowCount={dataIndex.length}
                        scrollToIndex={chooseIndex}
                        scrollToAlignment="start"
                        rowHeight={rowHeight}
                        rowRenderer={rowRenderer}
                        onRowsRendered={onRowsRendered}
                    />
                )}
            </AutoSizer>
            {renderJumpIcon()}
            {/*antd-mobile的IndexBar方法*/}
            {/*<IndexBar ref={indexBarRef}>*/}
            {/*    {*/}
            {/*        dataIndex.map((key: string, index: number) => {*/}
            {/*            return (*/}
            {/*                <IndexBar.Panel*/}
            {/*                    index={key === 'hot' ? '热' : key.toUpperCase()}*/}
            {/*                    title={*/}
            {/*                        key === '#' ? '当前城市' : key === 'hot' ? '热门城市' : key.toUpperCase()*/}
            {/*                    }*/}
            {/*                    key={index}*/}
            {/*                >*/}
            {/*                    <List>*/}
            {/*                        {(dataList as any)[key].map((item: any, index: number) => (*/}
            {/*                            <List.Item key={index} onClick={changeCity(item)}>{item.label}</List.Item>*/}
            {/*                            ))}*/}
            {/*                    </List>*/}
            {/*                </IndexBar.Panel>*/}
            {/*            )*/}
            {/*        })}*/}
            {/*</IndexBar>*/}
        </div>
    );
};