import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'

export default function Test() {
	const [data, setData] = useState()

	const { data: session } = useSession()

	const getUser = async () => {
		const { data } = await axios.get('api/user')
		setData(data)
	}

	const createUser = async () => {
		const { data } = await axios.post('/api/user', {
			email: 'cpg55850@ucmo.edu',
			userName: 'charlie',
			bio: 'this is a bio',
		})
		setData(data)
	}

	return (
		<div>
			{data && JSON.stringify(data, null, 2)}
			<button onClick={createUser}>Create WuphfUser</button>
			<button onClick={getUser}>Get WuphfUser Data</button>
		</div>
	)
}
