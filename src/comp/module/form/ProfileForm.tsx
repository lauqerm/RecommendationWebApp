import React, { FormEvent } from 'react'
import { InputWithLabel } from '../../atom/form'
import '../../../style/layout.scss'

export class ProfileForm extends React.Component<any> {
	formInputs = [
		{
			label: 'Email',
			type: 'email',
			disabled: true,
		},
		{
			label: 'Tên đăng nhập',
			type: 'text',
		},
		{
			label: 'Mật khẩu',
			type: 'password',
		},
		{
			label: 'Xác nhận mật khẩu',
			type: 'password',
		},
		{
			label: 'Địa điểm',
			type: 'text',
		},
		{
			label: 'Ưa thích',
			type: 'text',
		},
	]
	submit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}
	render() {
		const { id } = this.props
		const inputs = this.formInputs.map((element, index) => {
			return {
				...element,
				formId: id,
				id: `${index}`,
				key: `${index}`,
			}
		})
		return (
			<div className="container--stack">
				<div>
					<img src="/" />
					Ảnh đại diện
					{InputWithLabel(inputs[0])}
					{InputWithLabel(inputs[1])}
					{InputWithLabel(inputs[2])}
					{InputWithLabel(inputs[3])}
				</div>
				{InputWithLabel(inputs[4])}
				{InputWithLabel(inputs[5])}
				<div>
					<input type="submit" value="Hoàn tất" />
					<button>Hủy bỏ</button>
				</div>
			</div>
		)
	}
}