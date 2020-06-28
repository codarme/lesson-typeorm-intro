import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { server } from './setup/server'
import { User } from './app/entity/User'

const onConnected = (connection) => {
  server.get('/users', async (req, res) => {
    let userRepository = connection.getRepository(User)

    try {
      const data = await userRepository.find()
      res.send(data)
    } catch (err) {
      console.log(err)
      res.send(err)
    }
  })

  server.post('/users', async (req, res) => {
    let userRepository = connection.getRepository(User)

    try {
      const user = new User()
      user.name = req.body.name
      await userRepository.save(user)

      res.send(user)
    } catch (err) {
      console.log(err)
      res.send(err)
    }
  })

  server.start(() => console.log('Started server'))
}

createConnection()
  .then(onConnected)
  .catch((error) => console.log(error))
