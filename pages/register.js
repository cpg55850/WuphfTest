import React from 'react'
import SettingsForm from '../components/SettingsForm'
import styled from 'styled-components'
import Avatar from '../components/Avatar'
import breakpoint from '../styles/breakpoint'
import Container from '../components/styledComponents/Container'

export default function Register() {
	return (
		<Container>
			<Wrapper>
				<div className='avatarContainer'>
					<Avatar
						username='Joe Smith'
						profileImageUrl='sample.jpg'
						size='large'
					/>
				</div>
				<SettingsForm />
			</Wrapper>
		</Container>
	)
}

const Wrapper = styled.div`
	margin: 0 1rem;

	@media ${breakpoint.up.sm} {
		display: grid;
		grid-template-columns: 50% 50%;
	}

	.avatarContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	}
`
