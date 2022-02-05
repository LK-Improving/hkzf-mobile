/**
 * 该文件专门用于暴露一个store对象,整个应用只有一个store对象
 */

// 引入createStore 专门用于创建redux中最为核心的store对象
import {createStore,applyMiddleware,combineReducers} from 'redux'
// 引入为Reducer
import cityReducer from "./City/reducer";
import userReducer from "./User/reducer";
// 引入为action支持异步action
import thunk from 'redux-thunk';
// 引入redux工具插件
import {composeWithDevTools} from "redux-devtools-extension"

// 汇总所有的reducer变为一个总的reducer
const allReducer = combineReducers({
    city: cityReducer,
    user: userReducer
})

export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))