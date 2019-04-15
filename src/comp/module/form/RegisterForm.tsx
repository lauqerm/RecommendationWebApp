import React from 'react'

export class RegisterForm extends React.Component {
	render() {
		return (
			<div>
			<label>Email</label><br />
			<input type="text" /><br />
				<label>Tên đăng nhập</label><br />
				<input type="text" /><br />
				<label>Mật khẩu</label><br />
				<input type="password" /><br />
				<label>Xác nhận mật khẩu</label><br />
				<input type="password" /><br />
				<button>Đăng ký</button>
			</div>
		)
	}
}