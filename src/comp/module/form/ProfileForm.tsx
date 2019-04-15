import React, { FormEvent } from 'react'
import { InputWithLabel } from '../../atom/form'
import { withCurrentUser } from '../../hoc'
import '../../../style/layout.scss'

type ProfileFormProps = {
	id: string,
	currentUserId: string,
}
class _ProfileForm extends React.Component<ProfileFormProps> {
	formInputs = [
		{
			label: 'Email',
			type: 'email',
			disabled: true,
		},
		{
			label: 'Tên tài khoản',
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
		const { id, currentUserId } = this.props
		const isCurrentUser = id === currentUserId
		const inputs = this.formInputs.map((element, index) => {
			return {
				...element,
				formId: id,
				id: `${index}`,
				key: `${index}`,
				disabled: !isCurrentUser
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
				{isCurrentUser
					? <div>
						<input type="submit" value="Hoàn tất" />
						<button>Hủy bỏ</button>
					</div>
					: null
				}
			</div>
		)
	}
}

export const ProfileForm = withCurrentUser(_ProfileForm)