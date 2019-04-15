import { connect } from 'react-redux'

const mapStateToProps = (state: any) => {
	return { userId: state.authorization.userId }
}

export default connect(
	mapStateToProps,
	null,
)