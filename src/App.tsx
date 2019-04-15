import React from 'react'
import rootReducer from './redux/reducer'
import SiteContainer from './layout'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { withRootRouter } from './route'

const store = createStore(rootReducer, composeWithDevTools())

const App = () => {
	return (
		<Provider store={store}>
			{withRootRouter(<SiteContainer />)}
		</Provider>
	)
}

export default App
