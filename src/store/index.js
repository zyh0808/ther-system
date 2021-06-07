import { createStore, combineReducers } from "redux"
import { therReducer } from "./thermometer"
import { caliReducer } from "./calibrate"
import { homeReducer } from "./home"

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
}

const reducers = combineReducers({
  therReducer: persistReducer(persistConfig, therReducer),
  caliReducer: persistReducer(persistConfig, caliReducer),
  homeReducer: persistReducer(persistConfig, homeReducer)
})

const store = createStore(reducers)

export const persistor = persistStore(store)

export default store