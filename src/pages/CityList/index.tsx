import {IndexBar, NavBar, List as amList, Toast} from 'antd-mobile';
import {AutoSizer, List} from 'react-virtualized';
import React, {useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom';
import {apiAreaCity, apiAreaHot} from "../../utils/request/api";
import {formatCityData, getCurrentCity} from "../../utils";
import {IndexBarRef} from "antd-mobile/es/components/index-bar";
import styles from './index.module.less'
import store from "../../redux/store";
import {setCityAction} from "../../redux/City/action";
import { LayoutTop } from '../../layouts/DefaultLayout/LayoutTop';


export const CityList = () => {

    /**state  state部分**/
    const history = useHistory()
    const [dataList, setDataList] = useState<object>([])
    const [dataIndex, setDataIndex] = useState<string[]>([])
    const [activeIndex, setActiveIndex] = useState<number>(0)
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
            indexBarRef.current?.scrollTo(cityIndex[0])//indexBar默认跳转第一条
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
    // 跳转指定索引
    const handleJump = (index:number) => {
        return () => {
            setActiveIndex(index)
            // @ts-ignore
            // listRef.current?.scrollToRow(index) //或者调用组件的方法可以实现一样的效果
        }
    }
    // 用于获取list组件中渲染行的信息
    const onRowsRendered =  ({startIndex}:any) => {
        if (activeIndex !== startIndex){
            setActiveIndex(startIndex)
        }
    }
    // todo:点击部分索引会出现跳转其他索引，height设置固定值不会出现该Bug
    // 手动计算每一行的高度
    const rowHeight = ({ index }:any) => {
        // 一行内容的高度 = 36 标题高度 + 城市数量 * 50
        const cityIndex = dataIndex[index]
        const height = (dataList as any)[cityIndex].length
        return 36 + height * 50
        // return 200
    }
    // 修改城市信息
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
                <div className={styles.title}>
                    {cityTitle === '#' ? '当前城市' : cityTitle === 'hot' ? '热门城市' : cityTitle.toUpperCase()}
                </div>
                {
                    (dataList as any)[cityTitle].map((item:any,index2:number)=>{
                        return <div className={styles.name} key={index2} onClick={changeCity(item)}>
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
            <ul className={styles.cityIndex}>
                {dataIndex.map((item, index) => (
                    <li className={styles.cityIndexItem} key={item} onClick={handleJump(index)}>
                        <span className={activeIndex === index?styles.indexActive:''}>{item === 'hot' ? '热' : item.toUpperCase()}</span>
                    </li>
                ))}
            </ul>
        )
    }
    /**render**/

    return (
        <div style={{height: window.innerHeight}} className={styles.cityList}>
            <LayoutTop children={'城市选择'}/>
            <AutoSizer>
                {({height, width}) => (
                    <List
                        ref={listRef}
                        width={width}
                        height={height - 45}
                        rowCount={dataIndex.length}
                        scrollToIndex={activeIndex}
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