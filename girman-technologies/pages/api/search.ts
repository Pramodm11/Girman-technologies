import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  company: string
  jobTitle: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  if (req.method === 'GET') {
    const { q } = req.query

    if (!q || typeof q !== 'string') {
      return res.status(400).json([])
    }

    try {
      const jsonPath = path.join(process.cwd(), 'data', 'users.json')
      const fileContents = fs.readFileSync(jsonPath, 'utf8')
      const users: User[] = JSON.parse(fileContents)

      const searchTerm = q.toLowerCase()
      const results = users.filter(user => 
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.company.toLowerCase().includes(searchTerm)
      )

      res.status(200).json(results)
    } catch (error) {
      console.error('Error reading or parsing JSON:', error)
      res.status(500).json([])
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}