import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Fetcher } from '../../com/fetcher'
import { logout } from '../../redux/action'
import { withRouter } from 'react-router'

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		logout: () => dispatch(logout()),
	}
}

const mapStateToProps = (state: any) => {
	return { token: state.authorization.token }
}

const Logout = (props: any) => {
	const { token } = props
	const { request } = Fetcher.POST({
		source: 'logout',
		header: {
			auth_token: token
		},
		data: {}
	})
	request.then((response) => {
		const { logout } = props
		const { status } = response.data
		if (status === 200) {
			logout()
			props.history.push('/')
		}
	})
	return <div>
		Logged out
	</div>
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Logout))