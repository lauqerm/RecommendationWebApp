import React from 'react'
import { Route } from 'react-router'
import '../style/theme.scss'

const View = () => {
	return (
		<div className="siteView p1" style={{ textAlign: 'center' }}>
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
		</div>
	)
}

export default View