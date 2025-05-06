import ObjectId from 'mongodb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const insereUsuario = async (req, res) => {
    req.body.avatar = `https://ui-avatars.com/api/?name=${req.body.nome.replace(/ /g, '+')}&background=0D8ABC&color=fff`
    const salt = await bcrypt.genSalt(10)
    req.body.senha = await bcrypt.hash(req.body.senha, salt)
    const db = req.app.locals.db
    await db.collection('usuarios')
        .insertOne(req.body)
        .then(result => res.status(201).send(result))
        .catch(err => res.status(400).json(err))
}