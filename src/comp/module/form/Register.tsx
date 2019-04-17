import React, { FormEvent } from 'react'
import { InputWithLabel } from '../../atom/form'
import '../../../style/layout.scss'

type RegisterFormProps = {
	id: string
}
export class RegisterForm extends React.Component<RegisterFormProps> {
	formInputs = [
		{
			label: 'Email',
			type: 'email',
			required: true,
		},
		{
			label: 'Tên tài khoản',
			type: 'text',
			required: true,
		},
		{
			label: 'Mật khẩu',
			type: 'password',
			required: true,
		},
		{
			label: 'Xác nhận mật khẩu',
			type: 'password',
			required: true,
		},
	]
	submit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}
	render() {
		const { id } = this.props
		return (
			<form className="ctn--stack p-2 drop--shadow" style={{ width: '250px' }} id={id} onSubmit={this.submit} >
				{this.formInputs.map((element, index) => {
					return InputWithLabel({
						formId: id,
						id: `${index}`,
						key: `${index}`,
						...element
					})
				})}
				<br />
				<input type="submit" className="btn btn-success" value="Gửi yêu cầu" />
			</form>
		)
	}
}