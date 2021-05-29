import { createStore, combineReducers } from "redux"
import { therReducer } from "./thermometer"
import { caliReducer } from "./calibrate"


// 全局你可以创建多个reducer 在这里统一在一起
const rootReducers = combineReducers({ therReducer, caliReducer })
// 全局就管理一个store
export const store = createStore(rootReducers)