import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'
import Navbar from '@/components/Navbar'
import ToastNotification from '@/components/ToastNotification'

export default function Layout() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Outlet />
      </Container>
      <ToastNotification />
    </>
  )
}
