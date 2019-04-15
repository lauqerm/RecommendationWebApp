import React, { ReactChild } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserRoute } from './user'

const withRootRouter = (component: ReactChild) => {
	return (
		<Router>
			{component}
		</Router>
	)
}

export {
	withRootRouter,
	UserRoute,
}