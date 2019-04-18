import FooterBar from './Footer'
import Header from './Header'
import React, { Dispatch } from 'react'
import View from './View'
import { auth } from '../redux/action'
import { connect } from 'react-redux'
import '../style/site.scss'

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		auth: (token: string, userId: string) => dispatch(auth(token, userId)),
	}
}

const _SiteContainer = (props: any) => {
	const { auth } = props
	const token = window.localStorage.getItem('TOKEN')
	const id = window.localStorage.getItem('ID')
	if (token !== null && id !== null)
		auth(token, id)
	return (
		<React.Fragment>
			<div className="siteOverlay" />
			<div className="siteContainer">
				<Header />
				<View />
				<FooterBar />
			</div>
		</React.Fragment>
	)
}

export const SiteContainer = connect(
	null,
	mapDispatchToProps,
)(_SiteContainer)