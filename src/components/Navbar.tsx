import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import BugReportOutlined from '@mui/icons-material/BugReportOutlined'

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <BugReportOutlined sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            No Issues
          </Link>
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/issues"
            sx={{ fontWeight: pathname.startsWith('/issues') ? 700 : 400 }}
          >
            Issues
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
