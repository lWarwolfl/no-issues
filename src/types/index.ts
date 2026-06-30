export interface ToastState {
  open: boolean
  message: string
  severity: 'success' | 'error'
}

export interface RootState {
  toast: ToastState
}
