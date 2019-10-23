import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers/index'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
	const store = createStore(
		rootReducer(history),
		preloadedState,
		storeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
	)

	return store
}
