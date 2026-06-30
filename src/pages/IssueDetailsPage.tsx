import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchIssue, deleteIssue } from '@/store/issuesSlice'
import { showToast } from '@/store/uiSlice'

const priorityColor: Record<string, 'error' | 'warning' | 'default'> = {
  High: 'error',
  Medium: 'warning',
  Low: 'default',
}

export default function IssueDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { currentIssue, loading } = useAppSelector((s) => s.issues)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (id) dispatch(fetchIssue(Number(id)))
  }, [dispatch, id])

  const handleDelete = async () => {
    setOpen(false)
    await dispatch(deleteIssue(Number(id)))
    dispatch(showToast('Issue deleted', 'success'))
    navigate('/')
  }

  if (loading || !currentIssue) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Paper sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
          <Box flex={1}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              {currentIssue.title}
            </Typography>
            <Box display="flex" gap={1} mb={1}>
              <Chip label={currentIssue.status} size="small" />
              <Chip
                label={currentIssue.priority}
                size="small"
                color={priorityColor[currentIssue.priority] ?? 'default'}
              />
            </Box>
          </Box>
          <Box display="flex" gap={1}>
            <Button variant="outlined" onClick={() => navigate(`/${id}/edit`)}>
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
              Delete
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Description
            </Typography>
            <Typography>{currentIssue.description}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Assignee
            </Typography>
            <Typography>{currentIssue.assignee}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Due Date
            </Typography>
            <Typography>{currentIssue.dueDate}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Created
            </Typography>
            <Typography>{new Date(currentIssue.createdAt).toLocaleDateString()}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete Issue</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this issue? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
