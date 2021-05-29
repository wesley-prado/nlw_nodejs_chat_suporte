import { Socket } from 'socket.io'
import { io } from '../http'
import { ConnectionsService } from '../services/ConnectionsService'
import { MessagesService } from '../services/MessagesService'

io.on('connect', async (socket:Socket) => {
  const connectionsService = new ConnectionsService()
  const messageService = new MessagesService()

  const allConnectionsWithoutAdmin = await connectionsService.findAllMessagesWithoutAdmin()

  io.emit('admin_list_all_users', allConnectionsWithoutAdmin)

  socket.on('admin_list_messages_by_user', async (params, cb) => {
    const { user_id } = params

    const userMessages = await messageService.listByUser(user_id)

    cb(userMessages)
  })

  socket.on('admin_send_message', async (params) => {
    const { text, user_id } = params

    await messageService.create({
      text,
      user_id,
      admin_id: socket.id
    })

    const connection = await connectionsService.findByUserId(user_id)

    io.to(connection!.socket_id).emit('admin_send_to_client', {
      text,
      socket_id: socket.id
    })
  })
})
