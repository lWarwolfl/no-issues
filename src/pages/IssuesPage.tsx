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

export default function IssuesPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items, total, loading } = useAppSelector((s) => s.issues)
  const { page, limit, sort, order, search, setFilter, toggleSort } = useIssuesFilter()

  const [searchInput, setSearchInput] = useState(search)
  const debouncedSearch = useDebounce(searchInput, 400)

  useEffect(() => {
    setFilter({ q: debouncedSearch || '' })
  }, [debouncedSearch])

  useEffect(() => {
    dispatch(fetchIssues({ page, limit, sort, order, search }))
  }, [dispatch, page, limit, sort, order, search])

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight={700}>
          Issues
        </Typography>
        <Box display="flex" gap={1}>
          <Button variant="contained" size="small" onClick={() => navigate('/new')}>
            New Issue
          </Button>
          <TextField
            size="small"
            placeholder="Search issues..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            sx={{ width: 300 }}
          />
        </Box>
      </Box>

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
