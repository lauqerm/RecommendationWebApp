import React from 'react'
import { ProfileForm } from '../comp/module/form'
import { Route, RouteComponentProps } from 'react-router'
import { withCurrentUser } from '../comp/hoc'

const _UserRoute = () => {
	return (
		<React.Fragment>
			<Route path="/:userId/favourite" render={(props: any) => {
				return <div>Hello favourite</div>
			}} />
			<Route path="/:userId/profile" render={(props: RouteComponentProps<{ userId: string }>) => {
				const { userId } = props.match.params
				return <ProfileForm id={userId} />
			}} />
			<Route path="/logout" render={(props: any) => {
				return <div>Logging out</div>
			}} />
		</React.Fragment>
	)
}

export const UserRoute = withCurrentUser(_UserRoute)