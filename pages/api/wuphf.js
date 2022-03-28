import prisma from '../../lib/prisma'

export default async function handler(req, res) {
	//Error Handling here
	if (req.method === 'GET') {
		const wuphf = await prisma.Wuphf.findMany({
			where: {
				userId: req.body.email,
			},
		})
		console.log('Wuphf', JSON.stringify(wuphf, null, 2))
		res.json(wuphf)
	} else if (req.method === 'POST') {
		const wuphf = await prisma.Wuphf.create({
			data: {
				userId: req.body.email,
				pictureUrl: req.body.pictureUrl || undefined, // not allowing undefined - fix later
				postBody: req.body.postBody,
			},
		})

		res.json(wuphf)
	}
}
