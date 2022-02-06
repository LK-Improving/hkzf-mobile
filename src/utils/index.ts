import {apiAreaInfo} from "./request/api";
import store from "../redux/store";
import {setCityAction} from "../redux/City/action";
import {Toast} from "antd-mobile";


// 接口返回的数据格式：
// {label: '北京', value: 'AREA|88cff55c-aaa4-e2e0', pinyin: 'beijing', short: 'bj'}
// 城市数据格式化
export const formatCityData = (list:object[]) =>{
    let cityList:any = {}
    // 1、便利list数组
    list.forEach((item:any)=>{
        // 2、获取每一个城市的首字母
        const first = item['short'].substring(0,1)
        // 3、判断cityList中是否有该分类
        if (cityList[first]){
            // 4、如果有，直接往该分类中添加数据
            // cityList[first] => [{},{}]
            // cityList[first].push(item):该方法会操作原数组，往原数组后添加数据
            // JSON.parse(JSON.stringify(cityList[first])); // 对象深拷贝，修改不影响之前的
            cityList[first] = [...cityList[first],item]// 该方法不会操作原数组，赋值一个新数组，是浅拷贝的修改会影响之前的
        } else {
            // 5、如果没有，就先创建一个数组，然后把当前城市信息添加在数组中
            cityList[first] = [item]
        }
    })
    const cityIndex = Object.keys(cityList).sort()
    return{
        cityIndex,
        cityList
    }
}

// 通过百度地图Api获取位置信息
export const getCurrentCity =  ()=> {
    const localCiy = JSON.parse(localStorage.getItem('city')!)
    if (!localCiy){
        // 注意：在react脚手架中全局对象需要使用window来访问。
        //const BMap = window.BMap 这样写也可以
        const {BMapGL} = window as any
        // 初始化地图实例
        var geolocation = new BMapGL.Geolocation();
        geolocation.getCurrentPosition(  (r:any)=>{
            const {address:{province,city,district,street}} = r
            const cityName = city.toString().replace('市','')
            console.log(r)
            console.log(`您当前在${province + city + district + street}`)
            // 根据城市名称查询该城市信息
            apiAreaInfo({cityName}).then((res:any) => {
                const {status,body:cityInfo} = res
                if (status === 200){
                    if (cityInfo.label !== cityName){
                        Toast.show(`您所在的城市暂无房源信息，已将您的位置信息自动切换至${cityInfo.label}！`)
                    }
                    store.dispatch(setCityAction(cityInfo))
                    localStorage.setItem('city',JSON.stringify(cityInfo))
                    return cityInfo
                }
            })
        });
    } else {
        return localCiy
    }
}