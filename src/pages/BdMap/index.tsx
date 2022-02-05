import React, { useEffect, useState } from 'react'
import {CustomOverlay, Map} from 'react-bmapgl';

export const BdMap = () => {

    /**state  state部分**/
    const [location,setLocation ]= useState<object>({lng:  116.404449, lat: 39.914889})
    /**effect  effect部分**/
    useEffect(()=>{
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
    },[])
    /**methods 方法部分**/
    // 通过百度地图Api获取位置信息
    async function getLocation(){
        //const BMap = window.BMap 这样写也可以
        const {BMapGL} = window as any
        // 初始化地图实例
        var geolocation = new BMapGL.Geolocation();
        await geolocation.getCurrentPosition(function(r:any){
            const {address:{province,city,district,street}} = r
            const {longitude:lng,latitude:lat} = r
            setLocation({lng,lat})
            console.log(r)
            console.log(`您当前在${province + city + district + street}`)
        });
    }
    /**styles 样式部分**/

    /**render**/

    return(
            <Map
                style={{ height: '100vh' }}
                center={location}
                zoom={15}
                heading={0}
                tilt={40}
                onClick={e => console.log(e)}
                enableScrollWheelZoom
            >
                <CustomOverlay position={{lng:  116.404449, lat: 39.914889}} map={<Map center={location}
                                                                                       zoom={15}/>}>
                    <div className="custom" style={{width: 40, height: 40, background: 'rgba(222, 0, 0, 0.8)'}}>
                        <span style={{color: '#fff'}}>DOM</span>
                    </div>
                </CustomOverlay>
            </Map>
    );
};