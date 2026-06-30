import { combineReducers } from 'redux'
import { toastReducer } from '@/store/uiSlice'

export const rootReducer = combineReducers({
  toast: toastReducer,
})
