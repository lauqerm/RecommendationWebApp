import React from 'react'
import { Dropdown } from '../../comp/module'
import { NavLink } from 'react-router-dom'
import { withCurrentUser } from '../../comp/hoc'
import '../../style/profile.scss'

const AvatarDropdown = (props: any) => {
	const { currentUserId } = props
	return <div>
		<NavLink to={`/${currentUserId}/favourite`} >{'Địa điểm yêu thích'}</NavLink><br />
		<NavLink to={`/${currentUserId}/profile`} >{'Thông tin cá nhân'}</NavLink><br />
		<NavLink to={`/logout`} >{'Đăng xuất'}</NavLink><br />
	</div>
}

type _HeaderAvatarProps = {
	currentUserId: string
}
const _HeaderAvatar = (props: _HeaderAvatarProps) => {
	const { currentUserId } = props
	return <Dropdown
		child={<img className="profile__avatar" src={require('../../image/user--noAvatar.png')} />}
		drop={<AvatarDropdown userId={currentUserId} />} />
}

export const HeaderAvatar = withCurrentUser(_HeaderAvatar)