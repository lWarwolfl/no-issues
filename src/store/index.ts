import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducer } from '@/store/rootReducer'
import { RootState } from '@/types'

export const store = createStore(rootReducer, undefined, applyMiddleware(thunk))

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
