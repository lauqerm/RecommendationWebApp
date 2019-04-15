import React from 'react'
import { UserRoute } from '../route'
import '../style/theme.scss'

const View = () => {
	return (
		<div className="siteView p1" style={{ textAlign: 'center' }}>
			<UserRoute />
		</div>
	)
}

export default View