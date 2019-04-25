import _ from 'lodash'
import React, { FormEvent } from 'react'
import { Checkbox } from '../comp/atom/form/Checkbox'
import { Fetcher, FetchStatusProps } from '../com/fetcher'
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
type ProfileData = {
	email: string,
	gender: string,
	role: string,
	username: string,
}
class $Profile extends React.Component<ProfileFormProps> {
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
	profileData: ProfileData = {
		email: '',
		gender: '',
		role: '',
		username: '',
	}
	fetchStatus: FetchStatusProps = {
		cancelToken: undefined,
	}
	fetch = () => {
		const { id } = this.props
		const { request, tokenSource } = Fetcher.GET({
			source: `user?id=${id}`,
		})
		this.fetchStatus.cancelToken = tokenSource
		request.then((response) => {
			const { cancelToken } = this.fetchStatus
			if (cancelToken)
				this.fetchStatus.cancelToken = undefined

			this.profileData = { ...response.data }
			this.forceUpdate()
		})
	}
	componentDidMount() {
		if(this.props.currentUserId !== '')
			this.fetch()
	}
	componentDidUpdate() {
		if(this.props.currentUserId !== '')
			this.fetch()
	}
	render() {
		const { id, currentUserId } = this.props
		const { email, gender, username } = this.profileData

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
							? <InputWithLabel disabledLabelProps={{ className: 'disabledValue' }} type="text" value={email} {...inputs[0]} />
							: null
						}
						<InputWithLabel
							disabledLabelProps={{ className: 'disabledValue' }}
							value={username}
							inputProps={{ type: 'text' }}
							{...inputs[1]} />
						<InputWithLabel
							label="Giới tính"
							formId={id}
							id='sex'
							disabled={!isCurrentUser}
							value={gender}
							disabledLabelProps={{ className: 'disabledValue' }}
							customInput={<div>
								<Checkbox
									key="male"
									label="Nam"
									inputProps={{
										value: "Nam",
										defaultChecked: gender === 'Nam' ? true : false
									}} />
								<Checkbox
									key="female"
									label="Nữ"
									inputProps={{
										value: "Nữ",
										defaultChecked: gender === 'Nữ' ? true : false
									}} />
							</div>} />
						{isCurrentUser
							? <div className="profile__cont--pwd">
								<div className="profile__cont--pwd--sub">
									<InputWithLabel {...inputs[2]}
										inputProps={{ type: 'password' }} />
								</div>
								<div className="profile__cont--pwd--sub">
									<InputWithLabel {...inputs[3]}
										inputProps={{ type: 'password' }} />
								</div>
							</div>
							: null
						}
					</div>
				</div>
				<InputWithLabel {...inputs[4]}
					inputProps={{ type: 'password' }} />
				<InputWithLabel {...inputs[5]}
					inputProps={{ type: 'password' }} />
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

export const Profile = withCurrentUser($Profile)