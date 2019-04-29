import { connect } from 'react-redux'

export type WithCurrentUserProps = {
	currentUserId: string
}
const mapStateToProps = (state: any):WithCurrentUserProps => {
	return { currentUserId: `${state.authorization.currentUserId}` }
}

export default connect(
	mapStateToProps,
	null,
)