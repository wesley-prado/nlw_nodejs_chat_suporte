import { EntityRepository, Repository } from 'typeorm'
import { Message } from '../entities/Message'

@EntityRepository(Message)
class MessagesRepositorty extends Repository<Message> {}

export { MessagesRepositorty }
