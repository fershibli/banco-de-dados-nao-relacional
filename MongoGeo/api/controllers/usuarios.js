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

        if (!usuario?.length || usuario?.[0]?.ativo === false) {
            return res.status(403).json({ message: 'Dados de login inválidos' })
        }

        const isMatch = await bcrypt.compare(senha, usuario[0].senha)
        if (!isMatch) {
            return res.status(403).json({ message: 'Dados de login inválidos' })
        }

        jwt.sign(
            { usuario: { id: usuario[0]._id } },
            process.env.SECRET_KEY,
            { expiresIn: process.env.EXPIRES_IN },
            (err, token) => {
                if (err) {
                    console.error(err)
                    throw err
                }

                res.status(200).json({ message: 'Login realizado com sucesso', token })
            }
        )

    } catch (error) {
        res.status(500).json({ message: 'Erro ao efetuar login', error })
    }
}