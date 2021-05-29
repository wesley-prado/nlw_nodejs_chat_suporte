import { getCustomRepository, Repository } from 'typeorm'
import { User } from '../entities/User'
import { UsersRepository } from '../repositories/UsersRepository'

interface IUserCreate{
  email: string
}

class UsersService {
  private userRepository: Repository<User>

  constructor () {
    this.userRepository = getCustomRepository(UsersRepository)
  }

  async create ({ email }:IUserCreate) {
    const userAlreadyExists = await this.userRepository.findOne({ email })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const user = this.userRepository.create({
      email
    })

    await this.userRepository.save(user)

    return user
  }

  async findByEmail (email: string) {
    const user = await this.userRepository.findOne({ email })

    return user
  }
}

export { UsersService }
