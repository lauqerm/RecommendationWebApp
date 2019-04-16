import React, { FormEvent } from 'react'
import { InputWithLabel } from '../../atom/form'
import '../../../style/layout.scss'

type LoginFormProps = {
	id: string
}
export class LoginForm extends React.Component<LoginFormProps> {
	formInputs = [
		{
			label: 'Email',
			type: 'email',
			disabled: true,
		},
		{
			label: 'Mật khẩu',
			type: 'password',
		},
	]
	submit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}
	render() {
		const { id } = this.props
		return (
			<form className="container--stack" id={id} onSubmit={this.submit} >
				{this.formInputs.map((element, index) => {
					return InputWithLabel({
						formId: id,
						id: `${index}`,
						key: `${index}`,
						...element
					})
				})}
				<input type="submit" value="Đăng nhập" />
			</form>
		)
	}
}