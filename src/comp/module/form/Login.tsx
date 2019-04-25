import React, { ChangeEvent, FormEvent } from 'react'
import { AuthAction } from '../../../redux/action/auth'
import { Fetcher } from '../../../com/fetcher'
import { InputWithLabel } from '../../atom/form'
import { RouteComponentProps, withRouter } from 'react-router'

interface LoginFormProps extends RouteComponentProps {
	id: string,
	method: {
		auth: (token: string, userId: string) => AuthAction,
	},
}
class $LoginForm extends React.Component<LoginFormProps> {
	formInputs = [
		{
			label: 'Email',
			type: 'email',
			name: 'email',
			required: true,
		},
		{
			label: 'Mật khẩu',
			type: 'password',
			name: 'password',
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
			source: 'login',
			data: Fetcher.makeBody(this.formData)
		})
		request.then((response: any) => {
			const { auth_token, id, status } = response.data
			const { auth } = this.props.method
			this.fetcherStatus.status = status
			if (status === 200) {
				auth(auth_token, id as string)
				this.props.history.push('/')
			} else {
				this.forceUpdate()
			}
		})
	}
	render() {
		const { id } = this.props
		return (
			<form className="ctn--stack p-2 drop--shadow" style={{ width: '250px' }} id={id} onSubmit={this.submit} >
				{this.formInputs.map((element, index) => {
					return <InputWithLabel
						formId={id}
						id={`${index}`}
						inputProps={{
							onChange: this.onChange,
							type: element.type,
							required: element.required
						}}
						label={element.label}
						name={element.name}
						key={element.name}
					/>
				})}
				<div className="pt-1 text-danger">{
					this.fetcherStatus.status === 404
						? 'Sai mật khẩu hoặc email'
						: <br />
				}</div>
				<input type="submit" className="btn btn-success" value="Đăng nhập" />
			</form>
		)
	}
}

export const LoginForm = withRouter($LoginForm)