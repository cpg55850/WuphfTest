import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (session) {
    if (req.method === 'GET') {
      //   res.json(user)
      console.log('Session', JSON.stringify(session, null, 2))
      res.json(session)
    } else if (req.method === 'POST') {
      const user = await prisma.WuphfUser.create({
        data: {
          providerId: session.user.email,
          userName: req.body.userName,
          bio: req.body.bio || undefined,
        },
      })
      res.json(user)
    }
  }
  res.end()
}
