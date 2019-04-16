import React from 'react'
import { ProfileForm } from '../comp/module/form'
import { Route, RouteComponentProps } from 'react-router'

export const UserRoute = () => {
	return (
		<React.Fragment>
			<Route exact path="/" render={(props: any) => {
				return <div>Hello main page</div>
			}} />
			<Route exact path="/:userId/favourite" render={(props: any) => {
				return <div>Hello favourite</div>
			}} />
			<Route exact path="/:userId/profile" render={(props: RouteComponentProps<{ userId: string }>) => {
				const { userId } = props.match.params
				return <ProfileForm id={userId} />
			}} />
			<Route exact path="/logout" render={(props: any) => {
				return <div>Logging out</div>
			}} />
		</React.Fragment>
	)
}