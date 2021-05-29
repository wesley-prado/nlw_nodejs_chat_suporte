import { Router } from 'express'

import MessagesController from './controllers/MessagesController'
import SettingsController from './controllers/SettingsController'
import UsersController from './controllers/UsersController'

const routes = Router()

routes.post('/settings', SettingsController.create)
routes.get('/settings/:username', SettingsController.findByUsername)
routes.put('/settings/:username', SettingsController.update)

routes.post('/user', UsersController.create)

routes.post('/messages', MessagesController.create)
routes.get('/messages/:id', MessagesController.showByUser)

export { routes }
