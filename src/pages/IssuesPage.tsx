import { useEffect, useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TableSortLabel,
  Typography,
  Chip,
  MenuItem,
  Alert,
  Stack,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchIssues } from '@/store/issuesSlice'
import { useIssuesFilter } from '@/hooks/useIssuesFilter'
import { useDebounce } from '@/hooks/useDebounce'
import { useNavigate } from 'react-router-dom'
import type { Issue } from '@/types'

const priorityColor: Record<string, 'error' | 'warning' | 'default'> = {
  High: 'error',
  Medium: 'warning',
  Low: 'default',
}

const statusOptions = ['', 'Open', 'In Progress', 'Done', 'Closed']
const priorityOptions = ['', 'Low', 'Medium', 'High']

export default function IssuesPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items, total, loading, error } = useAppSelector((s) => s.issues)
  const { page, limit, sort, order, search, status, priority, assignee, setFilter, toggleSort } =
    useIssuesFilter()

  const [searchInput, setSearchInput] = useState(search)
  const debouncedSearch = useDebounce(searchInput, 400)

  useEffect(() => {
    setFilter({ q: debouncedSearch || '' })
  }, [debouncedSearch])

  useEffect(() => {
    dispatch(fetchIssues({ page, limit, sort, order, search, status, priority, assignee }))
  }, [dispatch, page, limit, sort, order, search, status, priority, assignee])

  return (
    <Box>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent="space-between"
        mb={2}
        gap={1}
      >
        <Typography variant="h5" fontWeight={700}>
          Issues
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <Button variant="contained" size="small" onClick={() => navigate('/new')}>
            New Issue
          </Button>
          <TextField
            select
            size="small"
            label="Status"
            value={status}
            onChange={(e) => setFilter({ status: e.target.value, page: '1' })}
            sx={{ minWidth: 120 }}
          >
            {statusOptions.map((o) => (
              <MenuItem key={o} value={o}>
                {o || 'All'}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            size="small"
            label="Priority"
            value={priority}
            onChange={(e) => setFilter({ priority: e.target.value, page: '1' })}
            sx={{ minWidth: 120 }}
          >
            {priorityOptions.map((o) => (
              <MenuItem key={o} value={o}>
                {o || 'All'}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"
            label="Assignee"
            value={assignee}
            onChange={(e) => setFilter({ assignee: e.target.value, page: '1' })}
            sx={{ minWidth: 140 }}
          />
          <TextField
            size="small"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            sx={{ minWidth: 180 }}
          />
        </Stack>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={sort === 'title' ? order : false}>
                <TableSortLabel
                  active={sort === 'title'}
                  direction={sort === 'title' ? order : 'asc'}
                  onClick={() => toggleSort('title')}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sort === 'status' ? order : false}>
                <TableSortLabel
                  active={sort === 'status'}
                  direction={sort === 'status' ? order : 'asc'}
                  onClick={() => toggleSort('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sort === 'priority' ? order : false}>
                <TableSortLabel
                  active={sort === 'priority'}
                  direction={sort === 'priority' ? order : 'asc'}
                  onClick={() => toggleSort('priority')}
                >
                  Priority
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sort === 'assignee' ? order : false}>
                <TableSortLabel
                  active={sort === 'assignee'}
                  direction={sort === 'assignee' ? order : 'asc'}
                  onClick={() => toggleSort('assignee')}
                >
                  Assignee
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sort === 'dueDate' ? order : false}>
                <TableSortLabel
                  active={sort === 'dueDate'}
                  direction={sort === 'dueDate' ? order : 'asc'}
                  onClick={() => toggleSort('dueDate')}
                >
                  Due Date
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sort === 'createdAt' ? order : false}>
                <TableSortLabel
                  active={sort === 'createdAt'}
                  direction={sort === 'createdAt' ? order : 'asc'}
                  onClick={() => toggleSort('createdAt')}
                >
                  Created
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                  {error ? 'An error occurred while fetching issues.' : 'No issues found.'}
                </TableCell>
              </TableRow>
            ) : (
              items.map((issue: Issue) => (
                <TableRow
                  key={issue.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/${issue.id}`)}
                >
                  <TableCell>{issue.title}</TableCell>
                  <TableCell>
                    <Chip label={issue.status} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={issue.priority}
                      size="small"
                      color={priorityColor[issue.priority] ?? 'default'}
                    />
                  </TableCell>
                  <TableCell>{issue.assignee}</TableCell>
                  <TableCell>{issue.dueDate}</TableCell>
                  <TableCell>{new Date(issue.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={total}
        page={page - 1}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(_, p) => setFilter({ page: String(p + 1) })}
        onRowsPerPageChange={(e) => setFilter({ limit: e.target.value, page: '1' })}
      />
    </Box>
  )
}
