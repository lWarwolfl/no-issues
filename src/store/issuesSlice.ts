import { IssuesState, Issue, IssuesFilter } from '@/types'
import * as issuesApi from '@/api/issues'
import { showToast } from '@/store/uiSlice'
import type { AppThunk } from '@/store'

const LIST_REQUEST = 'issues/list/request'
const LIST_SUCCESS = 'issues/list/success'
const LIST_FAILURE = 'issues/list/failure'

const GET_REQUEST = 'issues/get/request'
const GET_SUCCESS = 'issues/get/success'
const GET_FAILURE = 'issues/get/failure'

const CREATE_SUCCESS = 'issues/create/success'
const UPDATE_SUCCESS = 'issues/update/success'
const DELETE_SUCCESS = 'issues/delete/success'

const initialState: IssuesState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  currentIssue: null,
}

export function fetchIssues(filter: IssuesFilter): AppThunk {
  return async (dispatch) => {
    dispatch({ type: LIST_REQUEST })
    try {
      const result = await issuesApi.fetchIssues(filter)
      dispatch({ type: LIST_SUCCESS, payload: result })
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to fetch issues'
      dispatch({ type: LIST_FAILURE, payload: msg })
      dispatch(showToast(msg, 'error'))
    }
  }
}

export function fetchIssue(id: number): AppThunk {
  return async (dispatch) => {
    dispatch({ type: GET_REQUEST })
    try {
      const issue = await issuesApi.fetchIssue(id)
      dispatch({ type: GET_SUCCESS, payload: issue })
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to fetch issue'
      dispatch({ type: GET_FAILURE, payload: msg })
      dispatch(showToast(msg, 'error'))
    }
  }
}

export function createIssue(data: Omit<Issue, 'id' | 'createdAt'>): AppThunk {
  return async (dispatch) => {
    try {
      await issuesApi.createIssue(data)
      dispatch({ type: CREATE_SUCCESS })
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to create issue'
      dispatch(showToast(msg, 'error'))
      throw e
    }
  }
}

export function updateIssue(id: number, data: Partial<Issue>): AppThunk {
  return async (dispatch) => {
    try {
      await issuesApi.updateIssue(id, data)
      dispatch({ type: UPDATE_SUCCESS })
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to update issue'
      dispatch(showToast(msg, 'error'))
      throw e
    }
  }
}

export function deleteIssue(id: number): AppThunk {
  return async (dispatch) => {
    try {
      await issuesApi.deleteIssue(id)
      dispatch({ type: DELETE_SUCCESS })
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to delete issue'
      dispatch(showToast(msg, 'error'))
      throw e
    }
  }
}

interface Action {
  type: string
  payload?: unknown
}

export function issuesReducer(state = initialState, action: Action): IssuesState {
  switch (action.type) {
    case LIST_REQUEST:
    case GET_REQUEST:
      return { ...state, loading: true, error: null }
    case LIST_SUCCESS: {
      const payload = action.payload as { items: Issue[]; total: number }
      return { ...state, loading: false, items: payload.items, total: payload.total }
    }
    case LIST_FAILURE:
    case GET_FAILURE:
      return { ...state, loading: false, error: action.payload as string }
    case GET_SUCCESS:
      return { ...state, loading: false, currentIssue: action.payload as Issue }
    case CREATE_SUCCESS:
    case UPDATE_SUCCESS:
    case DELETE_SUCCESS:
      return state
    default:
      return state
  }
}
