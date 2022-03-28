import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
	const { id } = req.query

	const user = await prisma.WuphfUser.findUnique({
		where: {
			userName: id[0],
		},
	})

	res.json(user)
}
