import history from './history'
import React, { ReactChild } from 'react'
import { Router } from 'react-router-dom'
import { UserRoute } from './user'

const withRootRouter = (component: ReactChild) => {
	return (
		<Router history={history}>
			{component}
		</Router>
	)
}

export {
	withRootRouter,
	UserRoute,
}