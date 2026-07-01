import { ToastState } from '@/types'

const SHOW_TOAST = 'toast/show'
const HIDE_TOAST = 'toast/hide'

interface ShowToastAction {
  type: typeof SHOW_TOAST
  payload: { message: string; severity: 'success' | 'error' }
}

interface HideToastAction {
  type: typeof HIDE_TOAST
}

type ToastAction = ShowToastAction | HideToastAction

const initialState: ToastState = {
  open: false,
  message: '',
  severity: 'success',
}

export const showToast = (
  message: string,
  severity: 'success' | 'error' = 'success',
): ShowToastAction => ({
  type: SHOW_TOAST,
  payload: { message, severity },
})

export const hideToast = (): HideToastAction => ({
  type: HIDE_TOAST,
})

export function toastReducer(state = initialState, action: ToastAction): ToastState {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity,
      }
    case HIDE_TOAST:
      return { ...initialState }
    default:
      return state
  }
}
