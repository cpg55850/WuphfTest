import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  //Error Handling here
  if (req.method === 'GET') {
  } else if (req.method === 'POST') {
    const wuphf = await prisma.Wuphf.create({
      data: {
        userId: Number(req.body.userId),
        pictureUrl: req.body.pictureUrl || undefined,
        postBody: req.body.postBody,
      },
    })
    res.json(wuphf)
  }
}
