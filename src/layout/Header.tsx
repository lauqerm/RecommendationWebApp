import React from 'react'
import { addToken } from '../redux/action'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Dropdown, Search } from '../comp/module'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from '../logo.svg'
import '../style/site.scss'
import '../style/profile.scss'

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		login: (token: string) => dispatch(addToken(token))
	}
}

const mapStateToProps = (state: any) => {
	return { authStatus: state.authorization.authStatus }
}

const HeaderBar = (props: any) => {
	const { login } = props
	const { authStatus } = props
	return (
		<div className="siteHeader">
			<NavLink to="/s" >
				<Logo className="siteHeader__logo" />
			</NavLink>
			<Search />
			{authStatus === true
				? <Dropdown
					child={<img className="profile__avatar" src={require('../image/user--noAvatar.png')} />}
					drop={<div> This is a dropdown</div>} />
				: <div className="siteHeader__logButton">
					<Dropdown
						child={<button>Đăng ký</button>}
						drop={<div>This is a dropdown</div>} />
					<Dropdown
						child={<button onClick={() => login('123')}>Đăng nhập</button>}
						drop={<div>This is a dropdown</div>} />
				</div>
			}
		</div >
	)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderBar)