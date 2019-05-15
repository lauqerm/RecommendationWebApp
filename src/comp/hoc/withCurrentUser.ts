import { connect } from 'react-redux'

export type WithCurrentUserProps = {
	currentUserId: string,
	username: string,
	role: string,
}
const mapStateToProps = (state: any): WithCurrentUserProps => {
	const { username, role, currentUserId } = state.authorization
	return {
		username: `${username}`,
		role: `${role}`,
		currentUserId: `${currentUserId}`
	}
}

export default connect(
	mapStateToProps,
	null,
)