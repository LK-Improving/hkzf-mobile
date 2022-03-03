import {Image, Ellipsis, Popup, Toast, Tag, Space} from 'antd-mobile';
import React, {memo, useCallback, useEffect, useState} from 'react'
import {CustomOverlay, Map, MapApiLoaderHOC, ScaleControl, ZoomControl} from 'react-bmapgl';
import {LayoutTop} from '../../layouts/DefaultLayout/LayoutTop';
import store from "../../redux/store";
import styles from './index.module.less'
import {apiAreaMap, apiGetHouses} from "../../utils/request/api";
import {baseUrl} from "../../utils/request/http";
import { useHistory } from 'react-router-dom';

// memo():只有props发生改变时重新渲染该组件，否则之渲染局部组件（同PureComponent但同PureComponent但竟能在class组件中使用）
export const BdMap = memo(() => {

    /**state  state部分**/
    const [houseList, setHouseList] = useState<object[]>([{}])
    const [visible, setVisible] = useState<boolean>(false)
    const [mapOption, setMapOption] = useState<object>({
        position:{
            lat: 0,
            lng: 0
        },
        zoom: 11
    })
    const [overLayList, setOverLayList] = useState<object[]>([])
    const history = useHistory()
    /**effect  effect部分**/
    useEffect(() => {
        // 通过H5Api获取位置信息
        // navigator.geolocation.getCurrentPosition(position => {
        //     // position对象表示当前位置信息
        //     // 常用：latitude 纬度 / longitude 经度
        //     // 知道：accuracy 经纬度的精度 / altitude 海拔高度 / altitudeAccuracy 海拔高度的精度
        //     // / heading 设备行进方向 / speed 速度
        //     console.log(position)
        //     const lng = position.coords.longitude
        //     const lat = position.coords.latitude
        // })
        getLocation()
        const {label, value}: any = store.getState().city
        getAreaMap({value})
    }, [])
    useEffect(()=>{
        console.log('重新渲染了！')
    })
    /**methods 方法部分**/
        // 获取房源信息
    const getAreaMap = (data:object) => {
            Toast.show({icon:'loading',duration: 0,content:'加载中'})
            let val = data as any
            apiAreaMap({id: val['value']}).then((res:any) =>{
                const {body:dataList} = res
                Toast.clear()
                setOverLayList(dataList)
                let option = mapOption as any
                // 计算要绘制的覆盖物类型和下一个缩放级别
                // 区    -> 11 范围：>=10 <12
                // 镇    -> 13 范围：>=12 <14
                // 小区  -> 15 范围：>=14 <16
                if (parseInt(option['zoom']) >=10 && parseInt(option['zoom']) < 12){
                    if (val['coord']) setMapOption({
                        position:{
                            lat: val['coord']['latitude'],
                            lng: val['coord']['longitude']
                        },
                        zoom: 13
                    })
                } else if (parseInt(option['zoom']) >=12 && parseInt(option['zoom']) < 14){
                    if (val['coord']) setMapOption({
                        position:{
                            lat: val['coord']['latitude'],
                            lng: val['coord']['longitude']
                        },
                        zoom: 15
                    })
                }
            })
        }
    // 通过百度地图Api获取位置信息
    const getLocation = async () => {
        //const BMap = window.BMap 这样写也可以
        const {BMapGL} = window as any
        // 初始化地图实例
        // var geolocation = new BMapGL.Geolocation();
        // 获取当前定位
        // await geolocation.getCurrentPosition(function(r:any){
        //     const {address:{province,city,district,street}} = r
        //     const {longitude:lng,latitude:lat} = r
        //     setLocation()
        //     setMapOption({position:{lng,lat},zoom:12})
        //     console.log(r)
        //     console.log(`您当前在${province + city + district + street}`)
        // });
        const {label, value}: any = store.getState().city
        console.log(label, value)
        var myGeo = new BMapGL.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        await myGeo.getPoint(label + '市', function (point: any) {
            if (point) {
                console.log(point)
                setMapOption({position:point,zoom:11})
            } else {
                Toast.show({content: '您选择的地址没有解析到结果！'});
            }
        })
    }
    // 获取房源数据
    const getHouse = useCallback((params: any) => {
        // useCallback: 该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染
        // visible依赖项更新时，该回调函数才会重新渲染。
        // 所以 useCallback 常用记忆事件函数，生成记忆后的事件函数并传递给子组件使用。而 useMemo 更适合经过函数
        // 计算得到一个确定的值，比如记忆组件。(类似Vue中的computed计算属性)
        Toast.show({icon:'loading',duration: 0,content:'加载中'})
        setVisible(!visible)
        setMapOption({
            position:{
                lat: params['coord']['latitude'],
                lng: params['coord']['longitude']
            },
            zoom: 15
        })
        apiGetHouses({cityId:params['value']}).then((res:any) => {
            Toast.clear()
            const {body:{list:dataList}} = res
            setHouseList(dataList)
        })
    },[visible])
    // 跳转路由
    const go = (path:string)=>{
        return ()=>{
            history.push(path)
        }
    }
    /**styles 样式部分**/
//     1.3 组件间样式覆盖问题
//     1.概述
//         ① 问题：CityList 组件的样式，会影响 Map 组件的样式。
//         ② 原因：在配置路由时，CityList和 Map 组件都被导入到项目中，那么组件的样式也就被
//             导入到项目中了。如果组件之间样式名称相同，那么一个组件中的样式就会在另一个组件
//             中也生效，从而造成组件之间样式相互覆盖的问题。
//         ③ 结论：默认，只要导入了组件，不管组件有没有显示在页面中，组件的样式就会生效。
//         ④如何解决？
//             1、手动处理（起不同的类名）
//             2、CSS IN JS（css modules）
    /**render**/

    return (
        <div>
            {/*<NavBar back={'返回'} onBack={back} className={'title'}>地图找房</NavBar>*/}
            <LayoutTop>地图找房</LayoutTop>
            <Map
                style={{height: window.innerHeight - 45}}
                center={(mapOption as any)['position']}
                zoom={(mapOption as any)['zoom']}
                heading={0}
                tilt={40}
                // onClick={e => console.log(e)}
                enableScrollWheelZoom={false}
            >
                <ScaleControl map={null}/>
                <ZoomControl map={null}/>
                {
                    overLayList.map((item:any,index) => {
                        return <CustomOverlay key={index}
                                              position={{lng: item['coord']['longitude'], lat: item['coord']['latitude']}}
                                              map={null}>
                            <div className={(mapOption as any)['zoom'] !== 15 ? styles.overLay:styles.overLayRect}
                                 onClick={()=>{(mapOption as any)['zoom'] !== 15 ? getAreaMap(item) : getHouse(item)}}>
                                <div style={{width:65}}>
                                    <Ellipsis direction='end' content={item['label']} />
                                </div>
                                <div>{item['count']}套</div>
                            </div>
                        </CustomOverlay>
                    })
                }
            </Map>
            <Popup
                visible={visible}
                onMaskClick={() => {
                    setVisible(false)
                }}
                bodyStyle={{
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    minHeight: '40vh',
                }}
            >
                <div className={styles.pop}>
                    <div className={styles.title}>
                        <p className={styles.listTitle}>房源列表</p>
                        <p className={styles.moreTitle} onClick={go('')}>更多房源</p>
                    </div>
                    <div className={styles.house}>
                        {
                            houseList.map((item:any,index)=>{
                                return <div key={index} className={styles.row} onClick={go('')}>
                                    <div className={styles.rowLeft}>
                                        <Image src={baseUrl + item['houseImg']} width={106} height={80}/>
                                    </div>
                                    <div className={styles.rowRight}>
                                        <div className={styles.houseName}>
                                            <Ellipsis direction='end' content={item['title']} />
                                        </div>
                                        <div className={styles.houseInfo}>{item['desc']}</div>
                                        <div className={styles.houseTags}>
                                            <Space wrap>
                                                {
                                                    item['tags']=== undefined?'':item['tags'].map((tag:string,index2:number)=>{
                                                        return <Tag color={index2 / 2 === 0?'primary':'warning'} key={index2} fill='outline'>
                                                            {tag}
                                                        </Tag>
                                                    })
                                                }
                                            </Space>
                                        </div>
                                        <div className={styles.housePrice}><span>{item['price']}</span> 元/月</div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </Popup>
        </div>
    );
})
// 异步加载JSAPI的高阶组件，在业务组件中使用，从而实现将JSAPI以异步形式插入，而不是提前放到index.html模板里。
MapApiLoaderHOC({ak: 'WrzCPNZeMy7ppUh6QNWZLrtpRQE0g0e4'})(BdMap)