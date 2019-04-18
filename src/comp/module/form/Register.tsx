import React, { ChangeEvent, FormEvent } from 'react'
import { AuthAction } from '../../../redux/action/auth'
import { Fetcher } from '../../../com/fetcher'
import { InputWithLabel } from '../../atom/form'
import { RouteComponentProps, withRouter } from 'react-router'

interface RegisterFormProps extends RouteComponentProps {
	id: string,
	method: {
		auth: (token: string, userId: string) => AuthAction,
	},
}
export class _RegisterForm extends React.Component<RegisterFormProps> {
	formInputs = [
		{
			label: 'Email',
			type: 'email',
			key: 'email',
			required: true,
		},
		{
			label: 'Tên tài khoản',
			type: 'text',
			key: 'username',
			required: true,
		},
		{
			label: 'Mật khẩu',
			type: 'password',
			key: 'password',
			required: true,
		},
		{
			label: 'Xác nhận mật khẩu',
			type: 'password',
			key: 'repassword',
			required: true,
		},
	]
	fetcherStatus = {
		status: 0,
	}
	formData: any = {}
	onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const name = e.currentTarget.getAttribute('name') as string
		const value = e.currentTarget.value
		this.formData[name] = value
		this.forceUpdate()
	}
	submit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { request } = Fetcher.POST({
			source: 'user',
			data: Fetcher.makeBody(this.formData)
		})
		request.then((response: any) => {
			const { auth_token, id, status } = response.data
			const { auth } = this.props.method
			this.fetcherStatus.status = status
			if (status === 201) {
				console.log('201')
				auth(auth_token, id as string)
				this.props.history.push('/')
			} else {
				this.forceUpdate()
			}
		})
	}
	render() {
		const { id } = this.props
		const { password, repassword } = this.formData
		return (
			<form className="ctn--stack p-2 drop--shadow" style={{ width: '250px' }} id={id} onSubmit={this.submit} >
				{this.formInputs.map((element, index) => {
					return InputWithLabel({
						formId: id,
						id: `${index}`,
						onChange: this.onChange,
						value: this.formData[element.key],
						...element
					})
				})}
				<div className="pt-1 text-danger">{
					password !== repassword
						? 'Mật khẩu không khớp'
						: this.fetcherStatus.status === 409
							? 'Tài khoản đã tồn tại'
							: <br />
				}</div>
				<input type="submit" className="btn btn-success" value="Gửi yêu cầu" />
			</form>
		)
	}
}

export const RegisterForm = withRouter(_RegisterForm)