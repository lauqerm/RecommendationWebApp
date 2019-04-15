import FooterBar from './Footer'
import Header from './Header'
import React from 'react'
import View from './View'
import '../style/site.scss'

const SiteContainer = () => {
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

export default SiteContainer