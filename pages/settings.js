import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { signOut } from 'next-auth/react'
import Head from 'next/head'
import propTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import styled, { useTheme } from 'styled-components'

import { darkTheme } from '../assets/themes/darkTheme'
import { lavaTheme } from '../assets/themes/lavaTheme'
import { lightTheme } from '../assets/themes/lightTheme'
import FormInput from '../components/forms/FormInput'
import SelectInput, { Wrapper } from '../components/forms/SelectInput'
import TextArea from '../components/forms/TextArea'
import Avatar from '../components/general/Avatar'
import Button from '../components/general/Button'
import withAuth from '../components/layout/withAuth'
import GoogleLogo from '../components/other/GoogleLogo'
import Sidebar from '../components/settings/Sidebar'
import Paragraph from '../components/styledComponents/Paragraph'
import { useAvatars } from '../hooks/useAvatar'
import { useCustomTheme } from '../hooks/useCustomTheme'
import { useWuphfUser } from '../hooks/WuphfUserContext'

AccountSettings.propTypes = {
	//Use another import
	avatar: propTypes.string.isRequired,
	username: propTypes.string.isRequired,

	//make it it's own function
	biography: propTypes.string.isRequired,
	linked_accounts: propTypes.string.isRequired,
	delete_accounts: propTypes.string.isRequired,
}

function AccountSettings(props) {
	const {
		register,
		formState: { errors },
		setValue,
		getValues,
		watch,
		handleSubmit,
	} = useForm({
		mode: 'onTouched',
	})

	const [editProfileSettingsEnabled, setEditProfileSettingsEnabled] =
		useState(false)
	const [editVisualSettingsEnabled, setEditVisualSettingsEnabled] =
		useState(false)
	const theme = useTheme()
	const [selectedThemeValue, setSelectedThemeValue] = useState(theme)
	const { wuphfUser, setWuphfUser } = useWuphfUser()
	const { avatars, lookupAvatarIdByUrl } = useAvatars()
	const { changeTheme } = useCustomTheme()

	useEffect(() => {
		setValue('avatar', wuphfUser?.avatar?.url)
		setValue('username', wuphfUser?.userName.trim())
		setValue('biography_textarea', wuphfUser?.bio)
		setSelectedThemeValue(wuphfUser?.theme)
	}, [wuphfUser])

	function handleThemeChange(e) {
		e.preventDefault()
		const newTheme = e.target.value
		if (newTheme === 'light') {
			setSelectedThemeValue('light')
			changeTheme(lightTheme)
			// props.setTheme(lightTheme)
		} else if (newTheme === 'lava') {
			setSelectedThemeValue('lava')
			changeTheme(lavaTheme)
			// props.setTheme(lavaTheme)
		} else if (newTheme === 'dark') {
			setSelectedThemeValue('dark')
			changeTheme(darkTheme)
			// props.setTheme(darkTheme)
		}
	}

	async function handleEditProfileSettingsButtonClick(e) {
		e.preventDefault()
		if (editProfileSettingsEnabled) {
			await axios
				.patch(`/api/users/${encodeURIComponent(wuphfUser.userName)}`, {
					userName: getValues('username'),
					bio: getValues('biography_textarea'),
					avatarId: lookupAvatarIdByUrl(getValues('avatar')),
				})
				.then((res) => {
					console.log(res.data)
					setWuphfUser(res.data)
				})
		}
		setEditProfileSettingsEnabled(!editProfileSettingsEnabled)
	}

	async function handleEditVisualSettingsButtonClick(e) {
		e.preventDefault()
		if (editVisualSettingsEnabled) {
			const res = await axios.patch(
				`/api/users/${encodeURIComponent(wuphfUser.userName)}`,
				{
					theme: selectedThemeValue,
				}
			)
			console.log(res)
		}
		setEditVisualSettingsEnabled(!editVisualSettingsEnabled)
	}

	async function handleDeleteButtonClick(e) {
		e.preventDefault()
		await axios
			.delete(`/api/users/${encodeURIComponent(wuphfUser.userName)}`)
			.then(() => signOut())
	}

	function handleAvatarChange(e) {
		e.preventDefault()
		alert('hello')
	}

	return (
		<AccSetLayout>
			<Head>
				<title>Settings | Wuphf</title>
			</Head>
			<Sidebar />
			<MainContent>
				<div>
					<HeaderButtonWrapper>
						<HeaderText>Profile Settings</HeaderText>
						<EditBtnWrapper>
							<Button
								variant='secondary'
								onClick={handleEditProfileSettingsButtonClick}
							>
								{editProfileSettingsEnabled ? 'Save' : 'Edit'}
							</Button>
						</EditBtnWrapper>
					</HeaderButtonWrapper>
					<Subheading id='avatar'>Avatar:</Subheading>
					<TextBtnSpace>
						<SelectInput
							register={register}
							id='avatar'
							label=''
							enabled={editProfileSettingsEnabled}
							onChange={handleSubmit(handleAvatarChange)}
						>
							{avatars.map((avatar) => (
								<Option key={avatar.key} value={avatar.url}>
									{avatar.name}
								</Option>
							))}
						</SelectInput>
						<Avatar
							size='large'
							username={wuphfUser?.userName}
							profileImageUrl={watch('avatar') || 'animal_svgs/dog_nau7in.svg'}
						/>
					</TextBtnSpace>
					<Subheading id='username'>Username:</Subheading>
					<FormInput
						id='username'
						label=''
						register={register}
						error={errors.username}
						enabled={editProfileSettingsEnabled}
					/>
					<Subheading id='biography'>Biography:</Subheading>
					<TextArea
						register={register}
						id='biography_textarea'
						label=''
						enabled={editProfileSettingsEnabled}
					/>
				</div>
				<div>
					<HeaderText>Account Settings</HeaderText>
					<Subheading id='linked_account'>Linked Accounts:</Subheading>
					<GoogleLogo />
					<Subheading id='delete_account'>Delete Account:</Subheading>
					<Paragraph>
						Permanently remove all account data, Wuphs, and likes. This cannot
						be undone.
					</Paragraph>
					<DABtnWrapper>
						<Button variant='secondary' onClick={handleDeleteButtonClick}>
							Delete Account
						</Button>
					</DABtnWrapper>
				</div>
				<div>
					<HeaderButtonWrapper>
						<HeaderText>Visual Settings</HeaderText>
						<EditBtnWrapper>
							<Button
								variant='secondary'
								onClick={handleEditVisualSettingsButtonClick}
							>
								{editVisualSettingsEnabled ? 'Save' : 'Edit'}
							</Button>
						</EditBtnWrapper>
					</HeaderButtonWrapper>
					<Subheading id='site_theme'>Site Theme:</Subheading>
					<Wrapper>
						<select
							id='site_theme'
							onChange={handleThemeChange}
							value={selectedThemeValue}
							disabled={!editVisualSettingsEnabled}
						>
							<Option value='light'>Light</Option>
							<Option value='lava'>Lava</Option>
							<Option value='dark'>Dark</Option>
						</select>
					</Wrapper>
					<Subheading id='text_size'>Text Size:</Subheading>
					<SelectInput
						register={register}
						id='font_size'
						label=''
						enabled={editVisualSettingsEnabled}
					>
						<Option value='small'>Small</Option>
						<Option value='medium'>Medium</Option>
						<Option value='large'>Large</Option>
					</SelectInput>
				</div>
			</MainContent>
		</AccSetLayout>
	)
}

export default withAuth(AccountSettings)

const MainContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`
const TextBtnSpace = styled.div`
	display: flex;
	gap: 30px;
`
const AccSetLayout = styled.div`
	display: flex;
	flex-direction: row;
	grid-gap: 30px;
	max-width: 686px;
	margin: 0 auto;
	padding: 0 1rem;
`
const Subheading = styled.div`
	margin-top: 2rem;
	margin-bottom: 1rem;
	font-weight: bold;
	font-size: 1rem;
`
const HeaderText = styled.div`
	font-size: 2rem;
	font-weight: bold;
	border: none;
	text-align: left;
	width: 100%;
`
const HeaderButtonWrapper = styled.div`
	margin-left: 0em;
	display: flex;
	flex-direction: row;
	padding: 20px 0 0 0;
`
const EditBtnWrapper = styled.div`
	font-size: 1.3rem;
`
const DABtnWrapper = styled.div`
	font-size: 1.3rem;
	margin-top: 1rem;
`
const Option = styled.option`
	color: black;
`
