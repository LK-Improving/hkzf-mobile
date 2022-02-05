import {SET_USER} from "../contant";

// 初始化状态
const initState:object = {}

export default function userReducer(preState = initState, action:any):object {
    // 从action对象获取：type，data
    const { type, data } = action
    // 根据type决定如何加工数据
    switch (type) {
        case SET_USER: // 设置User
            return preState = data
        default:
            return preState
    }
}