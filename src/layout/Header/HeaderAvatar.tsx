import React from 'react'
import { Dropdown } from '../../comp/module'
import { NavLink } from 'react-router-dom'
import { withCurrentUser } from '../../comp/hoc'

const AvatarDropdown = (props: _HeaderAvatarProps) => {
	const { currentUserId } = props
	return <div className="ctn--stack p-2 drop--shadow" style={{ width: '250px' }}>
		<NavLink className="nav-link dropdown-item" to={`/profile/${currentUserId}`} >{'Thông tin cá nhân'}</NavLink>
		<NavLink className="nav-link dropdown-item" to={`/logout`} >{'Đăng xuất'}</NavLink>
	</div>
}

type _HeaderAvatarProps = {
	currentUserId: string
}
const _HeaderAvatar = (props: _HeaderAvatarProps) => {
	const { currentUserId } = props
	const username = window.localStorage.getItem('USERNAME')

	return <Dropdown
		meta={{
			align: 'RIGHT'
		}}
		child={<div>{username !== null ? <div className="siteHeader__username">
			<label>Xin chào</label>
			<h2>{username}</h2>
		</div> : ''}</div>}
		drop={<AvatarDropdown currentUserId={currentUserId} />} />
}

export const HeaderAvatar = withCurrentUser(_HeaderAvatar)