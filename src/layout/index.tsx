import FooterBar from './Footer'
import Header from './Header'
import React from 'react'
import View from './View'
import { connect } from 'react-redux'
import { mapAuthDispatchToProps } from '../comp/hoc'
import '../style/site.scss'

const $SiteContainer = (props: any) => {
	const { auth } = props
	const token = window.localStorage.getItem('TOKEN')
	const id = window.localStorage.getItem('ID')
	const username = window.localStorage.getItem('USERNAME')
	const role = window.localStorage.getItem('ROLE')
	if (token !== null && id !== null && username !== null && role !== null) {
		auth(token, id, username, role)
	}
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
	mapAuthDispatchToProps,
)($SiteContainer)