import React from 'react'
import { Dropdown } from '../../comp/module'
import { NavLink } from 'react-router-dom'
import { withUserId } from '../../comp/hoc'
import '../../style/profile.scss'

const AvatarDropdown = (props: any) => {
	const { userId } = props
	return <div>
		<NavLink to={`/${userId}/favourite`} >{'Địa điểm yêu thích'}</NavLink><br />
		<NavLink to={`/${userId}/profile`} >{'Thông tin cá nhân'}</NavLink><br />
		<NavLink to={`/logout`} >{'Đăng xuất'}</NavLink><br />
	</div>
}

type _HeaderAvatarProps = {
	userId: string
}
const _HeaderAvatar = (props: _HeaderAvatarProps) => {
	const { userId } = props
	return <Dropdown
		child={<img className="profile__avatar" src={require('../../image/user--noAvatar.png')} />}
		drop={<AvatarDropdown userId={userId} />} />
}

export const HeaderAvatar = withUserId(_HeaderAvatar)