import { Snackbar, Alert } from '@mui/material'
import { useAppSelector, useAppDispatch } from '@/store'
import { hideToast } from '@/store/uiSlice'

export default function ToastNotification() {
  const { open, message, severity } = useAppSelector((s) => s.toast)
  const dispatch = useAppDispatch()

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={() => dispatch(hideToast())}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={() => dispatch(hideToast())}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
