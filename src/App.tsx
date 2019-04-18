import createSagaMiddleware from 'redux-saga'
import React from 'react'
import rootReducer from './redux/reducer'
import sagaToken from './redux/saga'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import { SiteContainer } from './layout'
import { withRootRouter } from './route'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, composeWithDevTools(
	applyMiddleware(sagaMiddleware)
))

sagaMiddleware.run(sagaToken)

const App = () => {
	return (
		<Provider store={store}>
			{withRootRouter(<SiteContainer />)}
		</Provider>
	)
}

export default App
