import React from 'react'
import { auth } from '../../redux/action'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {
	Dropdown,
	LoginForm,
	RegisterForm,
	Search
	} from '../../comp/module'
import { HeaderAvatar } from './HeaderAvatar'
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
			<NavLink to="/s" >
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
						child={<button>Đăng ký</button>}
						drop={<RegisterForm />} />
					<Dropdown
						child={<button onClick={() => {
							auth('123', '321')
						}} >Đăng nhập</button>}
						drop={<LoginForm />} />
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