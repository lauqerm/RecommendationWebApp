import React from 'react'
import { connect } from 'react-redux'
import { Dropdown } from '../../comp/module'
import { HeaderAvatar } from './HeaderAvatar'
import { LoginForm, RegisterForm, Search } from '../../comp/module/form'
import { mapAuthDispatchToProps } from '../../comp/hoc'
import { NavLink } from 'react-router-dom'
import '../index.scss'
import '../Profile.scss'

const mapStateToProps = (state: any) => {
	return { authStatus: state.authorization.authStatus }
}

const HeaderContainer = (props: any) => {
	const { auth } = props
	const { authStatus } = props
	return (
		<div className="siteHeader">
			<div style={{
				borderRight: '2px solid var(--bd0)',
				paddingRight: '1rem',
				marginRight: '1rem',
			}}>
				<NavLink to="/" >
					<img style={{ height: '60px' }} src={require('../../image/logo--full.png')} />
				</NavLink>
			</div>
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
	mapAuthDispatchToProps
)(HeaderContainer)