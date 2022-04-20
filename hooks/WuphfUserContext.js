import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
const WuphfUserContext = React.createContext()

const WuphfUserContextProvider = ({ children }) => {
	const [wuphfUser, setWuphfUser] = useState()
	const [wuphfUserLoading, setWuphfUserLoading] = useState(true)
	const [wuphfUserError, setWuphfUserError] = useState()

	async function getUser() {
		const res = await axios.get('/api/me').catch((err) => {
			setWuphfUserError({
				data: err.response.data,
				status: err.response.status,
			})
		})

		if (res) {
			const newWuphfUser = {
				...res.data,
				// TODO: Remove once this is in the database
				avatar: { url: 'animal_svgs/dog_nau7in.svg' }
			}
			setWuphfUser(newWuphfUser)
			setWuphfUserLoading(false)
			setWuphfUserError(undefined)
		}
	}

	useEffect(() => {
		getUser()
	}, [])

	useEffect(() => {
		if (wuphfUser !== undefined) {
			setWuphfUserError(undefined)
		}
	}, [wuphfUser])

	return (
		<WuphfUserContext.Provider
			value={{
				wuphfUser,
				setWuphfUser,
				wuphfUserLoading,
				setWuphfUserLoading,
				wuphfUserError,
				setWuphfUserError,
			}}
		>
			{children}
		</WuphfUserContext.Provider>
	)
}

const useWuphfUser = () => {
	const wuphfUserData = useContext(WuphfUserContext)

	return wuphfUserData
}

export { WuphfUserContextProvider, useWuphfUser }
