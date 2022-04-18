import React from 'react'
import styled from 'styled-components'
import FormInput from './forms/FormInput'
import SelectInput from './forms/SelectInput'
import TextArea from './forms/TextArea'
import Button from './Button'
import * as yup from 'yup'
import Title from './styledComponents/Title'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useState } from 'react'
import Loading from './Loading'

const schema = yup.object({
	username: yup.string().min(4, 'Minimum length is 4').required('Required'),
	animal: yup.string().required('Required'),
	message: yup.string().required('Required'),
})

function SettingsForm(props) {
	const { setWuphfUser } = props
	const { data: session } = useSession()
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()

	const onSubmit = ({ username, animal, message }) => {
		// alert(`username: ${username}, animal: ${animal}, message: ${message}`)
		registerUser()
	}

	function registerUser() {
		setLoading(true)
		axios
			.post('/api/users', {
				email: session.user.email,
				userName: props.watch('username'),
				bio: props.watch('bio'),
			})
			.then((res) => {
				setLoading(false)
				setWuphfUser(res.data)
			})
			.catch((err) => {
				setError(err)
				setLoading(false)
			})
	}

	if (loading) return <Loading />

	return (
		<SettingBorder>
			<Title>WUPHF</Title>
			<form onSubmit={props.handleSubmit(onSubmit)}>
				<Watchs>
					<Watch>username: {props.watch('username')}</Watch>
					<Watch>animal: {props.watch('animal')}</Watch>
					<Watch>message: {props.watch('message')}</Watch>
				</Watchs>

				<FormInput
					id='username'
					label='Username'
					register={props.register}
					error={props.errors.username}
				/>
				<SelectInput register={props.register} id='animal' label='Your Animal'>
					{props.animals.map((animal) => (
						<option value={animal.label} key={`select-option-${animal.label}`}>
							{animal.label}
						</option>
					))}
				</SelectInput>

				<TextArea
					id='bio'
					label='Biography'
					register={props.register}
					error={props.errors.bio}
					rows='3'
				/>

				<Button variant='primary' type='submit' disabled={props.isSubmitting}>
					Submit
				</Button>
			</form>
			{<p>{error && JSON.stringify(error, null, 2)}</p>}
		</SettingBorder>
	)
}

const Watchs = styled.div`
	margin-bottom: 1rem;
`

const Watch = styled.h3`
	margin-bottom: 0.3em;
	font-size: 1.18rem;
	font-weight: 600;
	line-height: 1.5em;
`

const SettingBorder = styled.div`
	border: 1px solid #adadad;
	border-radius: 15px;
	padding: 1.5rem;
	/* margin: 10px; */
`

export default SettingsForm
