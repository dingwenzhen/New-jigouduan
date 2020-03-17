import {createStore,combineReducers,applyMiddleware} from "redux"
// redux-thunk是一个zhongjianjia
import  reudxThunk from "redux-thunk"
import List from "./reducer/List"
import Dafault from "./reducer/Dafault"
// 合并多个reducer   combinReducers
const reducer = combineReducers({
    List,Dafault
})
// createdStore创建store，applyMiddleware处理异步的reduxaction
const store = createStore(reducer,applyMiddleware(reudxThunk))

export default store
