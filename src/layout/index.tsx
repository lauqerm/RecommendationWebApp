import FooterBar from './Footer'
import HeaderBar from './Header'
import React from 'react'
import View from './View'
import '../style/site.scss'

const SiteContainer = () => {
	return (
		<React.Fragment>
			<div className="siteOverlay" />
			<div className="siteContainer">
				<HeaderBar />
				<View />
				<FooterBar />
			</div>
		</React.Fragment>
	)
}

export default SiteContainer