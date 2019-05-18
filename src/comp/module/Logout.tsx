import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Fetcher } from '../../com/fetcher'
import { logout } from '../../redux/action'
import { Redirect } from 'react-router'

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
	if (token !== '') {
		const { request } = Fetcher.POST({
			source: 'logout',
			header: {
				auth_token: token
			},
			data: {}
		})
		request.then(() => {
			const { logout } = props
			logout()
		})
	}
	return null
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Logout)