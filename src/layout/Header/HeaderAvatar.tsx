import React from 'react'
import { connect } from 'react-redux'
import { Dropdown } from '../../comp/module'
import { NavLink } from 'react-router-dom'
import '../../style/profile.scss'

const mapStateToProps = (state: any):HeaderAvatarProps => {
	return { userId: state.authorization.userId }
}

const AvatarDropdown = (props: any) => {
	const { userId } = props
	return <div>
		<NavLink to={`/${userId}/favourite`} >{'Địa điểm yêu thích'}</NavLink><br />
		<NavLink to={`/${userId}/profile`} >{'Thông tin cá nhân'}</NavLink><br />
		<NavLink to={`/logout`} >{'Đăng xuất'}</NavLink><br />
	</div>
}

type HeaderAvatarProps = {
	userId: string
}
const HeaderAvatar = (props: HeaderAvatarProps) => {
	const { userId } = props
	return <Dropdown
		child={<img className="profile__avatar" src={require('../../image/user--noAvatar.png')} />}
		drop={<AvatarDropdown userId={userId} />} />
}

export default connect(
	mapStateToProps,
	null,
)(HeaderAvatar)