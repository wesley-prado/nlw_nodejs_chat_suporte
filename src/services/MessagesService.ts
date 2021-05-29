import { getCustomRepository, Repository } from 'typeorm'
import { Message } from '../entities/Message'
import { MessagesRepositorty } from '../repositories/MessagesRepository'

interface IMessagesCreate{
  admin_id?: string
  user_id: string
  text: string
}

class MessagesService {
  private messagesRepository: Repository<Message>

  constructor () {
    this.messagesRepository = getCustomRepository(MessagesRepositorty)
  }

  async create ({ admin_id, user_id, text }: IMessagesCreate) {
    const message = this.messagesRepository.create({
      admin_id,
      user_id,
      text
    })

    await this.messagesRepository.save(message)

    return message
  }

  async listByUser (user_id: string) {
    const list = await this.messagesRepository.find({
      where: { user_id },
      relations: ['user'],
      order: { created_at: 'ASC' }
    })

    return list
  }
}

export { MessagesService }
