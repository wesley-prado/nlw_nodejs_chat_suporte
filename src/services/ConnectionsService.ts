import { getCustomRepository, Repository } from 'typeorm'
import { Connection } from '../entities/Connection'
import { ConnectionsRepository } from '../repositories/ConnectionsRepository'

interface IConnectionsCreate{
  user_id: string,
  socket_id: string
  admin_id?: string,
  id?: string
}

class ConnectionsService {
  private connectionsRepository: Repository<Connection>

  constructor () {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository)
  }

  async create ({ admin_id, user_id, socket_id, id }: IConnectionsCreate) {
    const connection = this.connectionsRepository.create({
      socket_id,
      user_id,
      admin_id,
      id
    })

    await this.connectionsRepository.save(connection)

    return connection
  }

  async findByUserId (user_id: string) {
    const connection = await this.connectionsRepository.findOne({
      user_id
    })

    return connection
  }

  async findAllMessagesWithoutAdmin () {
    const connections = await this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ['user']
    })

    return connections
  }
}

export { ConnectionsService }
