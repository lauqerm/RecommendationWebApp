import React from 'react'
import root from './redux/reducer'
import SiteContainer from './layout'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(root)

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
