import { connect } from 'react-redux'

const mapStateToProps = (state: any) => {
	return { currentUserId: state.authorization.currentUserId }
}

export default connect(
	mapStateToProps,
	null,
)