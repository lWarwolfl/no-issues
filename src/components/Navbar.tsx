import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import BugReportOutlined from '@mui/icons-material/BugReportOutlined'
import ArrowBack from '@mui/icons-material/ArrowBack'
import GitHub from '@mui/icons-material/GitHub'

const BACK_ROUTES = ['/new']
const GITHUB_URL = 'https://github.com/lWarwolfl/no-issues'

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const showBack = pathname !== '/' && (
    BACK_ROUTES.includes(pathname) || /^\/\d+(\/edit)?$/.test(pathname)
  )

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        {showBack && (
          <IconButton color="inherit" edge="start" onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowBack />
          </IconButton>
        )}
        <BugReportOutlined sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            No Issues
          </Link>
        </Typography>

        <Box flex={1} />

        <IconButton
          color="inherit"
          component="a"
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}
        >
          <GitHub />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
