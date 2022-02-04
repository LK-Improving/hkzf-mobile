import React, { useEffect, useState } from 'react'
import {Map as BdMap} from 'react-bmapgl';
import index from 'react-bmapgl/Map/index'

export const Map = () => {

    /**state  state部分**/
    const [location,setLocation ]= useState<object>({lng:'',lat:''})
    /**effect  effect部分**/
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(position => {
            // position对象表示当前位置信息
            // 常用：latitude 纬度 / longitude 经度
            // 知道：accuracy 经纬度的精度 / altitude 海拔高度 / altitudeAccuracy 海拔高度的精度
            // / heading 设备行进方向 / speed 速度

            console.log(position)
            const lng = position.coords.longitude
            const lat = position.coords.latitude
            setLocation({lng,lat})
            console.log({lng,lat})
        })
    },[])
    /**methods 方法部分**/

    /**styles 样式部分**/

    /**render**/

    return(
        <div>
            <BdMap
                style={{ height: '100vh' }}
                center={{lng:  112.91171983842514, lat: 28.262837929216715}}
                zoom={15}
                heading={0}
                tilt={40}
                onClick={e => console.log(e,location)}
                enableScrollWheelZoom
            />
        </div>
    );
};