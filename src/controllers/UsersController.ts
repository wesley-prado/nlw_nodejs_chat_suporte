import { Request, Response } from 'express'

import { UsersService } from '../services/UsersService'

class UsersController {
  async create (req: Request, res: Response) {
    const { email } = req.body

    const usersService = new UsersService()

    try {
      const user = await usersService.create({ email })

      return res.json(user)
    } catch (e) {
      return res.status(409).json({ error: e.message })
    }
  }
}

export default new UsersController()
