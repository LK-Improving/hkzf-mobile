import {Toast} from 'antd-mobile';
import React, {useEffect, useState} from 'react'
import {CustomOverlay, Map} from 'react-bmapgl';
import {LayoutTop} from '../../layouts/DefaultLayout/LayoutTop';
import store from "../../redux/store";
import styles from './index.module.less'
import {apiAreaMap} from "../../utils/request/api";
import index from "../../router";

export const BdMap = () => {

    /**state  state部分**/
    const [location, setLocation] = useState<object>()
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
        getAreaMap(value)
    }, [])
    /**methods 方法部分**/
    // 获取房源信息
    const getAreaMap = (data:string) => {
        apiAreaMap({id: data}).then((res:any) =>{
            const {body:dataList} = res
            setOverLayList(dataList)
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
            //     setLocation({lng,lat})
            //     console.log(r)
            //     console.log(`您当前在${province + city + district + street}`)
            // });
            const {label, value}: any = store.getState().city
            console.log(label, value)
            var myGeo = new BMapGL.Geocoder();
            // 将地址解析结果显示在地图上，并调整地图视野
            await myGeo.getPoint(label + '市', function (point: any) {
                if (point) {
                    setLocation(point)

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
                center={location}
                zoom={15}
                heading={0}
                tilt={40}
                // onClick={e => console.log(e)}
                enableScrollWheelZoom
            >
                {
                    overLayList.map((item:any,index) => {
                        return <CustomOverlay key={index} position={{lng: item['coord']['longitude'], lat: item['coord']['latitude']}} map={<Map center={location} zoom={15}/>}>
                            <div className={styles.overLay} onClick={handleClick(item)}>
                                <p>{item['label']}</p>
                                <p>{item['count']}套</p>
                            </div>
                        </CustomOverlay>
                    })
                }
            </Map>
        </div>
    );
};