import { Typography, Box } from '@mui/material'

export default function NotFound() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
      <Typography variant="h2" color="text.secondary">
        404
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Page not found
      </Typography>
    </Box>
  )
}
