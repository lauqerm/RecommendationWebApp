import React from 'react'
import { Dropdown } from '../../comp/module'
import { NavLink } from 'react-router-dom'
import { withCurrentUser } from '../../comp/hoc'
import '../../style/profile.scss'

const AvatarDropdown = (props: _HeaderAvatarProps) => {
	const { currentUserId } = props
	return <div className="ctn--stack p-2 drop--shadow" style={{ width: '250px' }}>
		<NavLink className="nav-link dropdown-item" to={`/${currentUserId}/favourite`} >{'Địa điểm yêu thích'}</NavLink>
		<NavLink className="nav-link dropdown-item" to={`/${currentUserId}/profile`} >{'Thông tin cá nhân'}</NavLink>
		<NavLink className="nav-link dropdown-item" to={`/logout`} >{'Đăng xuất'}</NavLink>
	</div>
}

type _HeaderAvatarProps = {
	currentUserId: string
}
const _HeaderAvatar = (props: _HeaderAvatarProps) => {
	const { currentUserId } = props
	return <Dropdown
		meta={{
			align: 'RIGHT'
		}}
		child={<img className="profile__avatar" src={require('../../image/user--noAvatar.png')} />}
		drop={<AvatarDropdown currentUserId={currentUserId} />} />
}

export const HeaderAvatar = withCurrentUser(_HeaderAvatar)