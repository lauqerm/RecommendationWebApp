import React, { FormEvent } from 'react'
import { InputWithLabel } from '../../atom/form'
import { withCurrentUser } from '../../hoc'
import '../../../style/layout.scss'
import '../../../style/profile.scss'

type ProfileFormProps = {
	id: string,
	currentUserId: string,
}
class _ProfileForm extends React.Component<ProfileFormProps> {
	formInputs = [
		{
			label: 'Email',
			type: 'email',
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
			label: 'Xác nhận',
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
				disabled: index !== 0 ? !isCurrentUser : true
			}
		})

		return (
			<div className="ctn--stack p-3 mt-1 profile">
				<div className="profile__cont--info">
					<figure className="profile__cont--avt">
						<img className="profile__cont--avatar" src="/" />
						<br />
						<label>Ảnh đại diện</label>
					</figure>
					{isCurrentUser
						? InputWithLabel(inputs[0])
						: null
					}
					{InputWithLabel(inputs[1])}
					{isCurrentUser
						? <div className="profile__cont--pwd">
							<div className="profile__cont--pwd--sub">{InputWithLabel(inputs[2])}</div>
							<div className="profile__cont--pwd--sub">{InputWithLabel(inputs[3])}</div>
						</div>
						: null
					}
					<div></div>
				</div>
				{InputWithLabel(inputs[4])}
				{InputWithLabel(inputs[5])}
				{isCurrentUser
					? <div className="profile__cont--act">
						<input className="btn btn-success" type="submit" value="Hoàn tất" />
						<button className="btn btn-danger">Hủy bỏ</button>
					</div>
					: null
				}
			</div>
		)
	}
}

export const ProfileForm = withCurrentUser(_ProfileForm)