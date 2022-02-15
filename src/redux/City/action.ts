/**
 * 该文件专门为City生成action对象
 */
import {SET_CITY} from "../contant";


// 表达式返回一个对象用小括号包着表示一个整体
// 同步action，就是指action的值为Object类型的一般对象
export const setCityAction = (data: any) => ({type: SET_CITY, data})
