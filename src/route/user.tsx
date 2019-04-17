import React from 'react'
import { ProfileForm } from '../comp/module/form'
import { Route, RouteComponentProps } from 'react-router'
import { TripBox } from '../comp/module'
import { NavLink } from 'react-router-dom'
import Trip from '../layout/Trip'

export const UserRoute = () => {
	return (
		<React.Fragment>
			<Route exact path="/" render={(props: any) => {
				return <NavLink to="/trip/423"><TripBox /></NavLink>
			}} />
			<Route exact path="/trip/:tripId" render={(props: any) => {
				const { tripId } = props.match.params
				return <Trip id={tripId} />
			}} />
			<Route exact path="/user/:userId/favourite" render={(props: any) => {
				return <div>Hello favourite</div>
			}} />
			<Route exact path="/user/:userId/profile" render={(props: RouteComponentProps<{ userId: string }>) => {
				const { userId } = props.match.params
				return <ProfileForm id={userId} />
			}} />
			<Route exact path="/logout" render={(props: any) => {
				return <div>Logging out</div>
			}} />
		</React.Fragment>
	)
}