import React, { FormEvent } from 'react'
import { InputWithLabel } from '../comp/atom/form'
import { withCurrentUser } from '../comp/hoc'
import '../style/profile.scss'
import 'react-input-range/lib/css/index.css'

export const ProfileImage = (src: any) => {
	return (
		<figure className="profile__cont--avt">
			<img className="profile__cont--avatar profile__avatar" src="/" />
		</figure>
	)
}

type ProfileFormProps = {
	id: string,
	currentUserId: string,
}
class _Profile extends React.Component<ProfileFormProps> {
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
				disabled: index !== 0 ? !isCurrentUser : true
			}
		})

		return (
			<div className="ctn--stack p-3 mt-1 profile">
				<div className="profile__cont--info">
					<ProfileImage />
					<div className="profile__cont--content">
						{isCurrentUser
							? <InputWithLabel {...inputs[0]} />
							: null
						}
						<InputWithLabel {...inputs[1]} />
						{isCurrentUser
							? <div className="profile__cont--pwd">
								<div className="profile__cont--pwd--sub">
									<InputWithLabel {...inputs[2]} />
								</div>
								<div className="profile__cont--pwd--sub">
									<InputWithLabel {...inputs[3]} />
								</div>
							</div>
							: null
						}
					</div>
				</div>
				<InputWithLabel {...inputs[4]} />
				<InputWithLabel {...inputs[5]} />
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

export const Profile = withCurrentUser(_Profile)