import FooterBar from './Footer'
import HeaderBar from './Header'
import React from 'react'
import View from './View'
import '../style/site.scss'

const SiteContainer = () => {
	return (
		<div className="siteContainer">
			<HeaderBar />
			<View />
			<FooterBar />
		</div>
	)
}

export default SiteContainer