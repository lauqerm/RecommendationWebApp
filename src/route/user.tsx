import React from 'react'
import { Route } from 'react-router'

export const UserRoute = () => {
	return (
		<React.Fragment>
			<Route path="/:userId/favourite" render={(props: any) => {
				console.log(props)
				return <div>Hello favourite</div>
			}} />
			<Route path="/:userId/profile" render={(props: any) => {
				console.log(props)
				return <div>Hello profile</div>
			}} />
			<Route path="/logout" render={(props: any) => {
				console.log(props)
				return <div>Logging out</div>
			}} />
		</React.Fragment>
	)
}