import React from 'react'
import './index.css'
import { Provider } from 'react-redux'
import configureStore, { history } from './store/configureStore'
import { ConnectedRouter } from 'connected-react-router'
import { Main } from './sections'

const store = configureStore()

const App = () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Main history={history} />
		</ConnectedRouter>
	</Provider>
)

export default App
