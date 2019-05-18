import React from 'react'
import Trip from '../layout/Trip'
import { Logout, Showroom } from '../comp/module'
import { Profile } from '../layout/Profile'
import { Route, RouteComponentProps } from 'react-router'

export const UserRoute = () => {
	return (
		<React.Fragment>
			<Route exact path="/" render={(props: any) => {
				return <React.Fragment>
					<Showroom />
				</React.Fragment>
			}} />
			<Route exact path="/search" render={(props: any) => {
				return <React.Fragment>
					<Showroom externalQuery={`search${props.location.search}`} />
				</React.Fragment>
			}} />
			<Route exact path="/trip/:tripId" render={(props: any) => {
				const { tripId } = props.match.params
				return <Trip id={tripId} />
			}} />
			<Route exact path="/favourite/:userId" render={(props: any) => {
				return <div>Hello favourite</div>
			}} />
			<Route exact path="/history/:userId" render={(props: any) => {
				return <div>Hello history</div>
			}} />
			<Route exact path="/profile/:userId" render={(props: RouteComponentProps<{ userId: string }>) => {
				const { userId } = props.match.params
				return <Profile id={`${userId}`} />
			}} />
			<Route exact path="/logout" render={(props: any) => {
				return <Logout />
			}} />
		</React.Fragment>
	)
}