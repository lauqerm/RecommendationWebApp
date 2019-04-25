import React from 'react'
import { auth } from '../../redux/action'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Dropdown } from '../../comp/module'
import { HeaderAvatar } from './HeaderAvatar'
import { LoginForm, RegisterForm, Search } from '../../comp/module/form'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from '../../logo.svg'
import '../../style/site.scss'
import '../../style/profile.scss'

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		auth: (token: string, userId: string) => dispatch(auth(token, userId)),
	}
}

const mapStateToProps = (state: any) => {
	return { authStatus: state.authorization.authStatus }
}

const HeaderContainer = (props: any) => {
	const { auth } = props
	const { authStatus } = props
	return (
		<div className="siteHeader">
			<NavLink to="/" >
				<Logo className="siteHeader__logo" />
			</NavLink>
			<Search />
			{authStatus === true
				? <HeaderAvatar />
				: null
			}
			{authStatus === false
				? <div className="siteHeader__logButton">
					<Dropdown
						meta={{
							align: 'LEFT',
							persist: {
								clickInside: true,
							}
						}}
						child={<div className="siteHeader__button">Đăng ký</div>}
						drop={<RegisterForm id="register" method={{ auth }} />} />
					<Dropdown
						meta={{
							align: 'RIGHT',
							persist: {
								clickInside: true,
							}
						}}
						child={<div className="siteHeader__button">Đăng nhập</div>}
						drop={<LoginForm id="login" method={{ auth }} />} />
				</div>
				: null
			}
		</div >
	)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderContainer)