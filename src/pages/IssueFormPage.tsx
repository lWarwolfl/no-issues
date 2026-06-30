import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  MenuItem,
  Grid,
  CircularProgress,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchIssue, createIssue, updateIssue } from '@/store/issuesSlice'
import { showToast } from '@/store/uiSlice'

const issueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['Open', 'In Progress', 'Done', 'Closed']),
  priority: z.enum(['Critical', 'High', 'Medium', 'Low']),
  assignee: z.string().min(1, 'Assignee is required'),
  dueDate: z.string().min(1, 'Due date is required'),
})

type IssueFormData = z.infer<typeof issueSchema>

const statusOptions = ['Open', 'In Progress', 'Done', 'Closed']
const priorityOptions = ['Critical', 'High', 'Medium', 'Low']

export default function IssueFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isEdit = Boolean(id)
  const { currentIssue, loading } = useAppSelector((s) => s.issues)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'Open',
      priority: 'Medium',
      assignee: '',
      dueDate: '',
    },
    mode: 'onBlur',
  })

  useEffect(() => {
    if (isEdit && id) dispatch(fetchIssue(Number(id)))
  }, [dispatch, isEdit, id])

  useEffect(() => {
    if (isEdit && currentIssue) {
      reset({
        title: currentIssue.title,
        description: currentIssue.description,
        status: currentIssue.status as IssueFormData['status'],
        priority: currentIssue.priority as IssueFormData['priority'],
        assignee: currentIssue.assignee,
        dueDate: currentIssue.dueDate,
      })
    }
  }, [isEdit, currentIssue, reset])

  const onSubmit = async (data: IssueFormData) => {
    try {
      if (isEdit && id) {
        await dispatch(updateIssue(Number(id), data))
        dispatch(showToast('Issue updated', 'success'))
      } else {
        await dispatch(createIssue(data))
        dispatch(showToast('Issue created', 'success'))
      }
      navigate('/')
    } catch {
      // error toast already dispatched by thunk
    }
  }

  if (isEdit && loading && !currentIssue) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 640, mx: 'auto' }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        {isEdit ? 'Edit Issue' : 'Create Issue'}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Status"
                  fullWidth
                  select
                  error={!!errors.status}
                  helperText={errors.status?.message}
                >
                  {statusOptions.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Priority"
                  fullWidth
                  select
                  error={!!errors.priority}
                  helperText={errors.priority?.message}
                >
                  {priorityOptions.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="assignee"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Assignee"
                  fullWidth
                  error={!!errors.assignee}
                  helperText={errors.assignee?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Due Date"
                  type="date"
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                  error={!!errors.dueDate}
                  helperText={errors.dueDate?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        <Box display="flex" gap={2} justifyContent="flex-end" mt={3}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={!isValid || isSubmitting}>
            {isEdit ? 'Save Changes' : 'Create'}
          </Button>
        </Box>
      </form>
    </Paper>
  )
}
