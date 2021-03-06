import { getSession } from 'next-auth/react'

import { prisma } from '../../lib/prisma'

export default async function handler(req, res) {
	const session = await getSession({ req })

	//   if (session) {
	if (req.method === 'GET') {
		// Grab all user ids that the user follows
		// Add my id to that list
		// Get all wuphfs where userid in the list
		let wuphfUser = null

		if (session) {
			try {
				wuphfUser = await prisma.WuphfUser.findUnique({
					where: {
						email: session.user.email,
					},
				})

				// if (!wuphfUser) {
				//   return res.status(404).json({
				//     message: `No WuphfUser found with the email ${session.user.email}`,
				//   })
				// }
			} catch (error) {
				res.status(500).json({ error })
				throw error
			}
		}

		try {
			let users = await prisma.Follower.findMany({
				where: {
					followerId: wuphfUser ? wuphfUser.userName : req.query.followerId,
				},
				select: {
					userId: true,
				},
			})

			users = users.map((user) => user.userId)

			const usersWithMe = [
				...users,
				wuphfUser ? wuphfUser.userName : req.query.followerId,
			]

			// console.log({
			//   skip: !isNaN(req.query.cursor) ? 1 : 0,
			//   ...(!isNaN(req.query.cursor) && {
			//     cursor: { id: Number(req.query.cursor) },
			//   }),
			// })
			// console.log(req.query.cursor)
			// console.log(!isNaN(req.query.cursor))

			const timeline = await (
				await prisma.Wuphf.findMany({
					take: Number(req.query.maxResults),
					skip: !isNaN(req.query.cursor) ? 1 : 0,
					...(!isNaN(req.query.cursor) && {
						cursor: { id: Number(req.query.cursor) },
					}),
					where: {
						userId: { in: usersWithMe },
					},
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						Likes: true,
						user: {
							select: {
								avatar: {
									select: {
										url: true,
									},
								},
							},
						},
						_count: {
							select: {
								Likes: true,
								Comments: true,
							},
						},
					},
				})
			).map((wuphf) => {
				const userLikePost = wuphf.Likes.some(
					(like) => like.userId === wuphfUser.userName
				)
				delete wuphf.Likes
				return {
					...wuphf,
					userLikePost,
				}
			})

			const lastWuphfInResults = timeline[timeline.length - 1]
			const cursor = lastWuphfInResults
				? lastWuphfInResults.id
				: req.query.cursor

			res.json({
				timeline,
				cursor,
			})
		} catch (error) {
			res.status(500).json({ error })
			throw error
		}
	}
}
//    else {
//     res.status(401).json({ message: 'User not authenticated' })
//   }
//   res.end()
// }
