import {
	CHECK_TASKS_START,
	CHECK_TASKS_END,
	CHECK_SECRET_START,
	CHECK_SECRET_END,
	AUTH_START,
	AUTH_END,
	UPDATE_TASK_START,
	UPDATE_TASK_END,
	AUTH_ACTION,
	CHECK_STATUS_START,
	CHECK_STATUS_END,
	GET_ALL_DATA_START,
	GET_ALL_DATA_END
} from '../constants/action-types'
import { toast } from 'react-toastify'
import Amplify, { Auth, API } from 'aws-amplify'
import awsmobile from '../aws-exports'

Amplify.configure(awsmobile)

const apiName = awsmobile.aws_cloud_logic_custom[0].name
const path = '/tasks'
const displayPath = '/status'
const dataPath = '/data'
const tableName = awsmobile.aws_dynamodb_table_schemas[0].tableName
// const displayTableName = awsmobile.aws_dynamodb_table_schemas[1].tableName

export function authAction(action) {
	return { type: AUTH_ACTION, payload: action }
}

export function authStart() {
	return { type: AUTH_START }
}

export function authEnd(username, authState, message) {
	return { type: AUTH_END, payload: { userId: username, authState, message } }
}

export function checkSecretStart(taskNumber, secret) {
	return { type: CHECK_SECRET_START, payload: { taskNumber, secret } }
}

export function checkSecretEnd(response) {
	return { type: CHECK_SECRET_END, payload: response }
}

export function updateTaskStart(taskNumber) {
	return { type: UPDATE_TASK_START, payload: { taskNumber } }
}

export function updateTaskEnd(response) {
	return { type: UPDATE_TASK_END, payload: response }
}

export function checkTasksStart() {
	return { type: CHECK_TASKS_START }
}

export function checkTasksEnd(response) {
	return { type: CHECK_TASKS_END, payload: response }
}

export function checkStatusStart() {
	return { type: CHECK_STATUS_START }
}

export function checkStatusEnd(response) {
	return { type: CHECK_STATUS_END, payload: response }
}

export function getAllDataStart() {
	return { type: GET_ALL_DATA_START }
}

export function getAllDataEnd(response) {
	return { type: GET_ALL_DATA_END, payload: response }
}

export function updateTaskStartTime(userId, taskNumber) {
	let data = {
		body: {
			tableName: tableName,
			userId: userId,
			taskId: 'Task' + taskNumber
		}
	}

	return function(dispatch) {
		dispatch(updateTaskStart(taskNumber))
		API.patch(apiName, path, data)
			.then(response => {
				dispatch(updateTaskEnd(response))
			})
			.catch(err => console.log(err))
	}
}

export function checkSecret(userId, taskNumber, secret) {
	let data = {
		body: {
			tableName: tableName,
			userId: userId,
			taskId: 'Task' + taskNumber,
			secret: secret
		}
	}

	return function(dispatch) {
		dispatch(checkSecretStart(taskNumber, secret))
		API.post(apiName, path, data)
			.then(response => {
				dispatch(checkSecretEnd(response))
			})
			.catch(err => console.log(err))
	}
}

export function checkTasksStatus(userId) {
	let data = {
		queryStringParameters: {
			tableName: tableName,
			userId: userId
		}
	}

	return function(dispatch) {
		dispatch(checkTasksStart())
		API.get(apiName, path, data)
			.then(response => {
				dispatch(checkTasksEnd(response))
			})
			.catch(err => console.log(err))
	}
}

// export function checkStatus() {
// 	let data = {
// 		queryStringParameters: {
// 			tableName: displayTableName
// 		}
// 	}

// 	return function(dispatch) {
// 		dispatch(checkStatusStart())
// 		API.get(apiName, displayPath, data)
// 			.then(response => {
// 				dispatch(checkStatusEnd(response))
// 			})
// 			.catch(err => console.log(err))
// 	}
// }

export function getAllData() {
	let data = {
		queryStringParameters: {
			tableName: tableName
		}
	}

	return function(dispatch) {
		dispatch(getAllDataStart())
		API.get(apiName, dataPath, data)
			.then(response => {
				dispatch(getAllDataEnd(response))
			})
			.catch(err => console.log(err))
	}
}

export function signIn(username, password) {
	return function(dispatch) {
		dispatch(authStart())
		Auth.signIn({ username, password })
			.then(user => {
				dispatch(authEnd(user.username, true))
				toast.success('Logged In')
			})
			.catch(err => {
				dispatch(authEnd(username, false, err.message))
				toast.error(err.message)
			})
	}
}

export function signUp(username, email, password) {
	return function(dispatch) {
		dispatch(authStart())
		Auth.signUp({
			username,
			password,
			attributes: {
				email
			}
		})
			.then(user => {
				dispatch(authEnd(username, false, 'User is not confirmed.'))
				toast.error('User is not confirmed.')
			})
			.catch(err => {
				dispatch(authEnd(null, false, err.message))
				toast.error(err.message)
			})
	}
}

export function confirmSignUp(username, code) {
	return function(dispatch) {
		dispatch(authStart())
		Auth.confirmSignUp(username, code, {
			forceAliasCreation: true
		})
			.then(user => dispatch(authEnd(username, true)))
			.catch(err => {
				if (err.message === "Invalid verification code provided, please try again.") {
					dispatch(authEnd(username, false, err.message))	
				} else {
					dispatch(authEnd(null, false, err.message))
				}
				toast.error(err.message)
			})
	}
}

export function authenticate() {
	return function(dispatch) {
		dispatch(authStart())
		Auth.currentAuthenticatedUser()
			.then(user => {
				dispatch(authEnd(user.username, true))
			})
			.catch(err => {
				dispatch(authEnd(null, false, err.message))
			})
	}
}

export function deauthenticate() {
	return function(dispatch) {
		dispatch(authStart())
		Auth.signOut()
			.then(() => {
				dispatch(authEnd(null, false))
				toast.success('Logged Out')
			})
			.catch(err => console.log(err))
	}
}
