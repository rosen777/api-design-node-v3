import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: 'Email and password required'
    })
  }
  try {
    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: 'Email and password required'
    })
  }
  const email = req.body.email
  try {
    const filter = {
      email
    }
    const user = await User.findOne(filter).exec()
    if (!user) {
      return res.status(401).send({
        message: 'User must be real'
      })
    }
    try {
      const validatedPassword = await user.checkPassword(req.body.password)
      if (!validatedPassword) {
        return res.status(401).send({
          message: 'Passwords must match'
        })
      }
      const token = newToken(user)
      return res.status(201).send({ token })
    } catch (e) {
      return res.status(400).send({ message: 'Error' })
    }
  } catch (e) {
    console.error(e)
    return res.status(401).send({ message: 'User must be real' })
  }
}

export const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end()
  }
  let token = req.headers.authorization.split('Bearer ')[1]
  if (!token) {
    return res.status(401).end()
  }
  try {
    const payload = await verifyToken(token)
    const user = await User.findById(payload.id)
      .select('-password')
      .lean()
      .exec()
    req.user = user
    next()
  } catch (e) {
    console.error(e)
    return res.status(401).end()
  }
  next()
}
