import type { IssuesState, Issue, IssuesFilter, UpdateIssueData, CreateIssueData } from '@/types'
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
  initiallyLoaded: false,
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

export function createIssue(data: CreateIssueData): AppThunk {
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

export function updateIssue(id: number, data: UpdateIssueData): AppThunk {
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

interface ListRequestAction { type: typeof LIST_REQUEST }
interface ListSuccessAction { type: typeof LIST_SUCCESS; payload: { items: Issue[]; total: number } }
interface ListFailureAction { type: typeof LIST_FAILURE; payload: string }
interface GetRequestAction { type: typeof GET_REQUEST }
interface GetSuccessAction { type: typeof GET_SUCCESS; payload: Issue }
interface GetFailureAction { type: typeof GET_FAILURE; payload: string }
interface CreateSuccessAction { type: typeof CREATE_SUCCESS }
interface UpdateSuccessAction { type: typeof UPDATE_SUCCESS }
interface DeleteSuccessAction { type: typeof DELETE_SUCCESS }

type IssuesAction =
  | ListRequestAction
  | ListSuccessAction
  | ListFailureAction
  | GetRequestAction
  | GetSuccessAction
  | GetFailureAction
  | CreateSuccessAction
  | UpdateSuccessAction
  | DeleteSuccessAction

export function issuesReducer(state = initialState, action: IssuesAction): IssuesState {
  switch (action.type) {
    case LIST_REQUEST:
      return { ...state, loading: !state.initiallyLoaded, error: null }
    case GET_REQUEST:
      return { ...state, loading: true, error: null }
    case LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        total: action.payload.total,
        initiallyLoaded: true,
      }
    case LIST_FAILURE:
    case GET_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case GET_SUCCESS:
      return { ...state, loading: false, currentIssue: action.payload }
    case CREATE_SUCCESS:
    case UPDATE_SUCCESS:
    case DELETE_SUCCESS:
      return state
    default:
      return state
  }
}
