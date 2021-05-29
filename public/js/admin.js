const socket = io()
let connectionsUsers = []

socket.on('admin_list_all_users', connections=>{
  connectionsUsers = connections
  document.getElementById('list_users').innerHTML = ''

  let template = document.getElementById('template').innerHTML

  connections.forEach(connection=>{
    const rendered = Mustache.render(template, {
      email: connection.user.email,
      id: connection.socket_id
    })

    document.getElementById('list_users').innerHTML+= rendered
  })
})

function call(id){
  const connection = connectionsUsers.find(connection => connection.socket_id === id)

  const template = document.getElementById('admin_template').innerHTML

  const rendered = Mustache.render(template, {
    email: connection.user.email,
    id: connection.user.id
  })

  document.getElementById('supports').innerHTML += rendered

  const params = {
    user_id: connection.user_id
  }

  socket.emit('admin_list_messages_by_user', params, messages =>{
    const divMessages = document.getElementById(`allMessages${connection.user_id}`)
    const createDiv = document.createElement('div')

    messages.forEach(message =>{
      
      if(message.admin_id === null){
        createDiv.className = 'admin_message_client'

        createDiv.innerHTML += `<span>${connection.user.email}</span>`
        createDiv.innerHTML += `<span > ${message.text}</span>`
        createDiv.innerHTML += `<span class="admin_date" style="border-bottom: 1px solid #ffffff7d; margin-bottom: 5px">${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>`
      }else{
        createDiv.className = 'admin_message_admin'

        createDiv.innerHTML = `<span>Atendente</span>`
        createDiv.innerHTML = `<span>${message.text}</span>`

        createDiv.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>`
      }
    })

    divMessages.appendChild(createDiv)
  })

}

function sendMessage(id){
  const text = document.getElementById(`send_message_${id}`)

  const params = {
    text: text.value,
    user_id: id
  }
  socket.emit('admin_send_message', params)
}
