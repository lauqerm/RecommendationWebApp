import React from 'react'

export class ProfileForm extends React.Component<any> {
	render() {
		return (
			<div>
				<div>
					<img src="/" />Ảnh đại diện
					</div>
				<label>Email</label><br />
				<input disabled type="text" /><br />
				<label>Tên đăng nhập</label><br />
				<input type="text" /><br />
				<div>
					<label>Mật khẩu</label><br />
					<input type="password" /><br />
				</div>
				<div>
					<label>Xác nhận mật khẩu</label><br />
					<input type="password" /><br />
				</div>
				<div>
					<label>Địa điểm</label><br />
					<input type="text" /><br />
					<label>Ưa thích</label><br />
					<input type="text" /><br />
				</div>
				<button>Hoàn tất</button>
				<button>Hủy bỏ</button>
			</div>
		)
	}
}