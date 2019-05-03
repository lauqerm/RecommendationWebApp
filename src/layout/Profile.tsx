import _ from 'lodash'
import Input from '../comp/atom/form'
import React, { ChangeEvent, FormEvent, ReactChild } from 'react'
import { Card, Loader } from '../comp/atom'
import { Fetcher, FetchStatusProps } from '../com/fetcher'
import { InputWithLabel } from '../comp/atom/form'
import { preservingMerge } from '../com/shorten'
import { retrieveInput } from '../com/event'
import { withCurrentUser } from '../comp/hoc'
import { WithCurrentUserProps } from '../comp/hoc/withCurrentUser'
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
} & WithCurrentUserProps
type ProfileFormState = {
	error: boolean,
	errorCode: string,
	success: boolean,
	successCode: string,
}
type ProfileData = {
	email: string,
	gender: string,
	username: string,
	oldpassword: string,
	password: string,
	repassword: string,
}
class $Profile extends React.Component<ProfileFormProps, ProfileFormState> {
	constructor(props: ProfileFormProps) {
		super(props)
		this.state = {
			error: false,
			errorCode: '',
			success: false,
			successCode: '',
		}
	}
	lang: { [key: string]: ReactChild } = {
		mismatchPassword: 'Mật khẩu mới không khớp với mật khẩu xác nhận',
		oldPasswordMissing: 'Vui lòng nhập mật khẩu cũ để thay đổi mật khẩu',
		updated: 'Đã cập nhật'
	}
	formInputs = [
		{
			label: 'Email',
			type: 'email',
			name: 'email',
		},
		{
			label: 'Tên tài khoản',
			type: 'text',
			name: 'username',
		},
		{
			label: 'Mật khẩu cũ',
			type: 'password',
			name: 'oldpassword',
		},
		{
			label: 'Mật khẩu mới',
			type: 'password',
			name: 'password',
		},
		{
			label: 'Xác nhận',
			type: 'password',
			name: 'repassword',
		},
		{
			label: 'Địa điểm',
			type: 'text',
			name: 'location',
		},
		{
			label: 'Ưa thích',
			type: 'text',
			name: 'preference',
		},
	]
	profileData: ProfileData = {
		email: '',
		gender: '',
		username: '',
		oldpassword: '',
		password: '',
		repassword: '',
	}
	onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = retrieveInput(e)
		this.profileData = preservingMerge(this.profileData, value)
		this.forceUpdate()
	}
	submit = (e: FormEvent<HTMLInputElement>) => {
		e.preventDefault()
		const { id } = this.props
		const { oldpassword, password, repassword } = this.profileData

		if (oldpassword === '')
			if (password !== repassword)
				return this.setState({
					error: true,
					errorCode: 'oldPasswordMissing',
				})

		if (password !== repassword)
			return this.setState({
				error: true,
				errorCode: 'mismatchPassword',
			})

		const { request, tokenSource } = Fetcher.PATCH({
			source: `user?id=${id}`,
			data: this.profileData
		})
		this.fetchStatus.cancelToken = tokenSource
		request.then((response) => {
			const { cancelToken } = this.fetchStatus
			if (cancelToken)
				this.fetchStatus.cancelToken = undefined

			if (response.status === 200)
				this.setState({
					success: true,
					successCode: 'updated'
				})
		})

		this.setState({
			error: false,
			errorCode: '',
		})
	}
	fetchStatus: FetchStatusProps = {
		ready: false,
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

			this.profileData = preservingMerge(this.profileData, response.data)
			this.fetchStatus.ready = true
			this.forceUpdate()
		})
	}
	componentDidMount() {
		if (this.props.currentUserId !== '' && !this.fetchStatus.ready)
			this.fetch()
	}
	componentDidUpdate() {
		if (this.props.currentUserId !== '' && !this.fetchStatus.ready)
			this.fetch()
	}
	shouldComponentUpdate(nextProps: ProfileFormProps) {
		if (nextProps.currentUserId !== '')
			return true
		return false
	}
	componentWillUnmount() {
		let cancelToken
		cancelToken = this.fetchStatus.cancelToken
		if (cancelToken)
			cancelToken.cancel()
	}
	renderProfile() {
		const { id, currentUserId } = this.props
		const { error, errorCode, success, successCode } = this.state
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
			<React.Fragment>
				<div className="profile__cont--info">
					<ProfileImage />
					<div className="profile__cont--content">
						{isCurrentUser
							&& <InputWithLabel disabledLabelProps={{ className: 'disabledValue' }} type="text" value={email} {...inputs[0]} />
						}
						<InputWithLabel
							disabledLabelProps={{ className: 'disabledValue' }}
							value={username}
							inputProps={{ type: 'text', onChange: this.onChange }}
							{...inputs[1]} />
						<InputWithLabel
							label="Giới tính"
							formId={id}
							id='sex'
							disabled={!isCurrentUser}
							value={gender}
							disabledLabelProps={{ className: 'disabledValue' }}
							customInput={<div>
								<Input.Checkbox
									key="male"
									label="Nam"
									inputProps={{
										name: 'gender',
										type: 'radio',
										value: 'Nam',
										defaultChecked: gender === 'Nam' ? true : false,
										onChange: this.onChange
									}} />
								<Input.Checkbox
									key="female"
									label="Nữ"
									inputProps={{
										name: 'gender',
										type: 'radio',
										value: 'Nữ',
										defaultChecked: gender === 'Nữ' ? true : false,
										onChange: this.onChange
									}} />
							</div>} />
						{isCurrentUser
							&& <React.Fragment>
								<InputWithLabel {...inputs[2]}
									inputProps={{ type: 'password', onChange: this.onChange }} />
								<InputWithLabel {...inputs[3]}
									inputProps={{ type: 'password', onChange: this.onChange }} />
								<InputWithLabel {...inputs[4]}
									inputProps={{ type: 'password', onChange: this.onChange }} />
							</React.Fragment>
						}
					</div>
				</div>
				<InputWithLabel {...inputs[5]}
					inputProps={{ type: 'text' }} />
				<InputWithLabel {...inputs[6]}
					inputProps={{ type: 'text' }} />
				<div className="pt-1">
					{error && <Card.Error>{this.lang[errorCode]}</Card.Error>}
					{success && <Card.Success>{this.lang[successCode]}</Card.Success>}
				</div>
				{
					isCurrentUser
					&& <div className="profile__cont--act">
						<input onClick={this.submit} className="btn btn-success" type="submit" value="Hoàn tất" />
						<button className="btn btn-danger">Hủy bỏ</button>
					</div>
				}
			</React.Fragment >
		)
	}
	render() {
		const { ready } = this.fetchStatus

		return (
			<div className="ctn--stack p-3 mt-1 profile">
				{ready
					? this.renderProfile()
					: <Loader />
				}
			</div>
		)
	}
}

export const Profile = withCurrentUser($Profile)