import { AppBar, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import BugReportOutlined from '@mui/icons-material/BugReportOutlined'

export default function Navbar() {
  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <BugReportOutlined sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            No Issues
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
