import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from '../logo.svg'
import { Search, withDropdown } from '../comp/module'
import '../style/site.scss'
import '../style/profile.scss'

const HeaderBar = () => {
	return (
		<div className="siteHeader">
			<NavLink to="/" >
				<Logo className="siteHeader__logo" />
			</NavLink>
			<Search />
			{withDropdown(
				<img className="profile__avatar" src={require('../image/user--noAvatar.png')} />,
				<div>This is a dropdown</div>
			)}
		</div >
	)
}

export default HeaderBar