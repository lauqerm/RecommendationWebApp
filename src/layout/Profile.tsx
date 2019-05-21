import _ from 'lodash'
import history from '../route/history'
import Input from '../comp/atom/form'
import React, {
	ChangeEvent,
	Dispatch,
	FormEvent,
	ReactChild
	} from 'react'
import { Card, Loader, Tag } from '../comp/atom'
import { changeUsername, ProfileAction } from '../redux/action/profile'
import { connect } from 'react-redux'
import { Fetcher, FetchStatusProps } from '../com/fetcher'
import { InputWithLabel } from '../comp/atom/form'
import { preservingMerge } from '../com/shorten'
import { retrieveInput } from '../com/event'
import { TagColorScheme, TagLabel } from '../comp/lang'
import { withCurrentUser } from '../comp/hoc'
import { WithCurrentUserProps } from '../comp/hoc/withCurrentUser'
import './Profile.scss'
import 'react-input-range/lib/css/index.css'

const mapProfileDispatchtoProps = (dispatch: Dispatch<ProfileAction>) => {
	return {
		change: (username: string) => {
			return dispatch(changeUsername(username))
		},
	}
}

export const ProfileImage = (src: any) => {
	return (
		<figure className="profile__cont--avt">
			<img className="profile__cont--avatar profile__avatar" src="/" />
		</figure>
	)
}

type ProfileFormProps = {
	id: string,
} & WithCurrentUserProps & {
	change: (username: string) => void
}
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
	favorites: number[],
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
			label: 'Ưa thích',
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
		favorites: [],
	}
	onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = retrieveInput(e)
		this.profileData = preservingMerge(this.profileData, value)
		this.forceUpdate()
	}
	onFavoriteChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { rawValue, checked } = retrieveInput(e)
		const { favorites } = this.profileData
		const value = parseInt(rawValue)
		if (checked)
			favorites.push(value)
		else this.profileData.favorites = favorites.filter((currentValue) => currentValue !== value)
			.filter((currentValue, index, self) => self.indexOf(currentValue) === index)
		console.log(checked, this.profileData.favorites)
		this.forceUpdate()
	}
	submit = (e: FormEvent<HTMLInputElement>) => {
		e.preventDefault()
		const { id, change } = this.props
		const { email, gender, username, oldpassword, password, repassword, favorites } = this.profileData

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
			data: {
				email,
				gender,
				username,
				oldpassword,
				password,
				repassword,
				favorites: favorites.join(','),
			}
		})
		this.fetchStatus.cancelToken = tokenSource
		request.then((response) => {
			const { cancelToken } = this.fetchStatus
			if (cancelToken)
				this.fetchStatus.cancelToken = undefined

			if (response.status === 200) {
				change(username)
				this.setState({
					success: true,
					successCode: 'updated'
				})
			}
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
			this.setState({
				success: true
			})
		}).catch(() => {
			this.fetchStatus.ready = true
			this.setState({
				error: true
			})
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
		const { email, gender, username, favorites } = this.profileData
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
					disabled={false}
					customInput={<div className="profile__cont--tag">
						{TagLabel.map((element, index) => {
							return <Input.Checkbox
								key={element}
								label={<Tag color={TagColorScheme[index]}
									className="ctn--fluid"
									mode="OUTLINE"
									disabled={isCurrentUser ? false : true}>{element}</Tag>}
								inputProps={{
									name: `${index}`,
									value: index,
									onChange: isCurrentUser ? this.onFavoriteChange : undefined,
									disabled: isCurrentUser ? false : true,
									defaultChecked: favorites.indexOf(index) === -1 ? false : true
								}}
							/>
						})}
					</div>} />
				<div className="pt-1">
					{error && <Card.Error>{this.lang[errorCode]}</Card.Error>}
					{success && <Card.Success>{this.lang[successCode]}</Card.Success>}
				</div>
				{
					isCurrentUser
					&& <div className="profile__cont--act">
						<input onClick={this.submit} className="btn btn-success" type="submit" value="Hoàn tất" />
						<button onClick={() => history.push('/')} className="btn btn-danger">Hủy bỏ</button>
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
					? this.state.success
						? this.renderProfile()
						: <div className="ctn--gridRowFluid p-3 mt-1 profile__message">Đã xảy ra lỗi</div>
					: <Loader />
				}
			</div>
		)
	}
}

export const Profile = withCurrentUser(connect(
	null,
	mapProfileDispatchtoProps
)($Profile))