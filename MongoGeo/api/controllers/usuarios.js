import ObjectId from 'mongodb'
import bcrypt from 'bcryptjs'
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

export const efetuaLogin = async (req, res) => {
    const { email, senha } = req.body
    try {
        const db = req.app.locals.db
        let usuario = await db.collection('usuarios')
            .find({ email })
            .limit(1)
            .toArray()

        if (!usuario?.length) {
            return res.status(401).json({ message: 'Dados de login inválidos' })
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        if (!senhaValida) {
            return res.status(401).json({ message: 'Dados de login inválidos' })
        }

        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao efetuar login', error })
    }
}