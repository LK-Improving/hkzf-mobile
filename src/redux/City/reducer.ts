import {SET_CITY} from "../contant";

// 初始化状态
const initState:object = JSON.parse(localStorage.getItem('city')!) ?
    JSON.parse(localStorage.getItem('city')!) as object : {}

export default function cityReducer(preState = initState, action:any):object {
    // 从action对象获取：type，data
    const { type, data } = action
    // 根据type决定如何加工数据
    switch (type) {
        case SET_CITY: // 设置City
            return preState = data
        default:
            return preState
    }
}