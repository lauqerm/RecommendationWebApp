import React from 'react'
import Schedule from '../layout/Schedule'
import Trip from '../layout/Trip'
import { Logout, Showroom } from '../comp/module'
import { Profile } from '../layout/Profile'
import { Route, RouteComponentProps } from 'react-router'

export const UserRoute = () => {
	return (
		<React.Fragment>
			<Route exact path="/" component={() => {
				return <Showroom />
			}} />
			<Route exact path="/search" render={(props: any) => {
				return <Showroom externalQuery={`search${props.location.search}`} />
			}} />
			<Route exact path="/trip/:tripId" render={(props: any) => {
				const { tripId } = props.match.params
				return <Trip id={tripId} />
			}} />
			<Route exact path="/schedule/:userId" render={(props: any) => {
				const { userId } = props.match.params
				return <Schedule id={userId} />
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