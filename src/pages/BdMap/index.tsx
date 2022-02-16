import {Ellipsis, Toast} from 'antd-mobile';
import React, {useEffect, useState} from 'react'
import {CustomOverlay, Map, MapApiLoaderHOC, ScaleControl, ZoomControl} from 'react-bmapgl';
import {LayoutTop} from '../../layouts/DefaultLayout/LayoutTop';
import store from "../../redux/store";
import styles from './index.module.less'
import {apiAreaMap} from "../../utils/request/api";


export const BdMap = () => {

    /**state  state部分**/
    const [location, setLocation] = useState<object>({})
    const [mapOption, setMapOption] = useState<object>({
        position:{
            lat: 0,
            lng: 0
        },
        zoom: 11
    })
    const [overLayList, setOverLayList] = useState<object[]>([])
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
    /**methods 方法部分**/
    // 获取房源信息
    const getAreaMap = (data:object) => {
        Toast.show({icon:'loading',content:'加载中'})
        let val = data as any
        apiAreaMap({id: val['value']}).then((res:any) =>{
            const {body:dataList} = res
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
    // 点击覆盖物
    const handleClick = (params: any) => {
        return () => {
            console.log(params)
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
                                 onClick={()=>{if ((mapOption as any)['zoom'] !== 15)getAreaMap(item)}}>
                                <div style={{width:65}}>
                                    <Ellipsis direction='end' content={item['label']} />
                                </div>
                                <div>{item['count']}套</div>
                            </div>
                        </CustomOverlay>
                    })
                }
            </Map>
        </div>
    );
};
// 异步加载JSAPI的高阶组件，在业务组件中使用，从而实现将JSAPI以异步形式插入，而不是提前放到index.html模板里。
MapApiLoaderHOC({ak: 'WrzCPNZeMy7ppUh6QNWZLrtpRQE0g0e4'})(BdMap)