import {autorun, observable, configure, action,runInAction} from "mobx";
import {SET_CITY} from "../redux/contant";
import {apiGetSwiper} from "../utils/request/api";

configure({
    // 总是开启严格模式
    // 不允许在动作之外进行状态修改
    enforceActions:'always'// never：永不开启
})
// export let num = observable.box(10)

// 观察对象，通过map
// export let obj = observable.map({key:'value'})
// obj.set('key','value2')
// obj.get('key')

// 观察对象，不通过map
// export let obj = observable({key:'value'})
//
// export let arr = observable.array([1,2,3])

// const store = {
//     city:initState,
//     user:{}
// }

// 第一次以及相关数据更新时执行
// autorun(()=>{
//     console.log(num.get())
//     console.log(obj.key)
// })

// 初始化状态
const initState:object = JSON.parse(localStorage.getItem('city')!) ?
    JSON.parse(localStorage.getItem('city')!) as object : {}

class store{
    @observable city:object = initState

    @observable user:object = {}

    @action  cityReducer({type,data}:any){
        if (type){
            switch (type) {
                case SET_CITY: // 设置City
                    // runInAction:将‘“最终的”修改放入一个异步动作中
                    runInAction(()=>{
                        this.city = data
                    })
                    break
                default:
                    break
            }
        }
    }
}

export default new store()