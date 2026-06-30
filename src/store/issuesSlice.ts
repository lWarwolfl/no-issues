import { IssuesState, Issue, IssuesFilter } from '@/types'
import * as issuesApi from '@/api/issues'

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

export function fetchIssues(filter: IssuesFilter) {
  return async (dispatch: any) => {
    dispatch({ type: LIST_REQUEST })
    try {
      const result = await issuesApi.fetchIssues(filter)
      dispatch({ type: LIST_SUCCESS, payload: result })
    } catch (e: any) {
      dispatch({ type: LIST_FAILURE, payload: e?.message ?? 'Failed to fetch issues' })
    }
  }
}

export function fetchIssue(id: number) {
  return async (dispatch: any) => {
    dispatch({ type: GET_REQUEST })
    try {
      const issue = await issuesApi.fetchIssue(id)
      dispatch({ type: GET_SUCCESS, payload: issue })
    } catch (e: any) {
      dispatch({ type: GET_FAILURE, payload: e?.message ?? 'Failed to fetch issue' })
    }
  }
}

export function createIssue(data: Omit<Issue, 'id' | 'createdAt'>) {
  return async (dispatch: any) => {
    await issuesApi.createIssue(data)
    dispatch({ type: CREATE_SUCCESS })
  }
}

export function updateIssue(id: number, data: Partial<Issue>) {
  return async (dispatch: any) => {
    await issuesApi.updateIssue(id, data)
    dispatch({ type: UPDATE_SUCCESS })
  }
}

export function deleteIssue(id: number) {
  return async (dispatch: any) => {
    await issuesApi.deleteIssue(id)
    dispatch({ type: DELETE_SUCCESS })
  }
}

interface Action {
  type: string
  payload?: any
}

export function issuesReducer(state = initialState, action: Action): IssuesState {
  switch (action.type) {
    case LIST_REQUEST:
    case GET_REQUEST:
      return { ...state, loading: true, error: null }
    case LIST_SUCCESS:
      return { ...state, loading: false, items: action.payload.items, total: action.payload.total }
    case LIST_FAILURE:
    case GET_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case GET_SUCCESS:
      return { ...state, loading: false, currentIssue: action.payload }
    case CREATE_SUCCESS:
      return { ...state }
    case UPDATE_SUCCESS:
      return { ...state }
    case DELETE_SUCCESS:
      return { ...state }
    default:
      return state
  }
}
