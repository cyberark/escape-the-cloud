import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import {
	CHECK_TASKS_END,
	CHECK_SECRET_END,
	AUTH_END,
	UPDATE_TASK_END,
	CHECK_STATUS_END,
	GET_ALL_DATA_END,
	AUTH_ACTION
} from '../constants/action-types'

const initialState = {
	user: null,
	authAction: 'SignIn',
	tasks: {
		Task1: {
			Done: false
		},
		Task2: {
			Done: false
		},
		Task3: {
			Done: false
		},
		Task4: {
			Done: false
		}
	},
	status: 'No Status Yet',
	data: null
}

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case AUTH_END:
			return {
				...state,
				user: action.payload
			}
		case AUTH_ACTION:
			return {
				...state,
				authAction: action.payload
			}
		case CHECK_SECRET_END:
			return {
				...state,
				tasks: action.payload
			}
		case CHECK_TASKS_END:
			return {
				...state,
				tasks: action.payload
			}
		case UPDATE_TASK_END:
			return {
				...state,
				tasks: action.payload
			}
		case CHECK_STATUS_END:
			return {
				...state,
				status: action.payload
			}
		case GET_ALL_DATA_END:
			return {
				...state,
				data: action.payload
			}
		default:
			return state
	}
}

export default history =>
	combineReducers({
		router: connectRouter(history),
		rootReducer
	})
