import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({ req })

  // if (session) {
  if (req.method === 'GET') {
    //   res.json(user)
    const user = await prisma.WuphfUser.findUnique({
      where: {
        providerId: req.body.email,
      },
    })
    console.log('User', JSON.stringify(user, null, 2))
    res.json(user)
  } else if (req.method === 'POST') {
    const user = await prisma.WuphfUser.create({
      data: {
        providerId: req.body.email,
        userName: req.body.userName,
        bio: req.body.bio || undefined,
      },
    })
    res.json(user)
  } else if (req.method === 'PATCH') {
    const user = await prisma.WuphfUser.update({
      where: {
        providerId: req.body.email,
      },
      data: {
        userName: req.body.userName,
        bio: req.body.bio || undefined,
      },
    })

    res.json(user)
  } else if (req.method === 'DELETE') {
    let user = await prisma.User.findUnique({
      where: {
        email: req.body.email,
      },
    })

    const { id } = user

    user = await prisma.User.delete({
      where: {
        id,
      },
    })

    res.json(user)
  }
  // }
  res.end()
}
