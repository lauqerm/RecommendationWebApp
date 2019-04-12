import React from 'react'
import rootReducer from './redux/reducer'
import SiteContainer from './layout'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(rootReducer, composeWithDevTools())

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<SiteContainer />
			</Router>
		</Provider>
	)
}

export default App
