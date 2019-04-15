import React from 'react'

export class LoginForm extends React.Component {
	render() {
		return (
			<div>
				<label>Email</label><br />
				<input type="text" /><br />
				<label>Mật khẩu</label><br />
				<input type="password" /><br />
				<button>Đăng nhập</button>
			</div>
		)
	}
}