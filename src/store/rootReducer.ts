import { combineReducers } from 'redux'
import { toastReducer } from '@/store/uiSlice'
import { issuesReducer } from '@/store/issuesSlice'

export const rootReducer = combineReducers({
  toast: toastReducer,
  issues: issuesReducer,
})
