import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage'

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import rootReducer from './reducers/rootReducer'
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware()
const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // Xem thêm tại mục "Quá trình merge".
}

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}
const pReducer = persistReducer(persistConfig, rootReducer)
const createdStore = createStore(
  pReducer,
  bindMiddleware([sagaMiddleware])
)

export const initializeStore = (initialState = {}) => {
  createdStore.runSaga = () => {
    // Avoid running twice
    if (createdStore.saga) return;
    createdStore.saga = sagaMiddleware.run(rootSaga);
  };
  
  createdStore.stopSaga = async () => {
    // Avoid running twice
    if (!createdStore.saga) return;
    createdStore.dispatch(END);
    await createdStore.saga.done;
    createdStore.saga = null;
  };
  
  createdStore.execSagaTasks = async (isServer, tasks) => {
    // run saga
    createdStore.runSaga();
    // dispatch saga tasks
    tasks(createdStore.dispatch);
    // Stop running and wait for the tasks to be done
    await createdStore.stopSaga();
    // Re-run on client side
    if (!isServer) {
      createdStore.runSaga();
    }
  };
  
  createdStore.runSaga();
  
  return createdStore
}
export const persistor = persistStore(createdStore)
