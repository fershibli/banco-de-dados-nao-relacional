import { check, param, validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: true,
            message: 'Validation error',
            errors: errors.array()
        });
    }
    next();
}

export const validateMunicipio = [
    check('codigo_ibge')
        .notEmpty().withMessage('IBGE code is required')
        .isInt({ min: 1000000, max: 9999999 }).withMessage('IBGE code must be an integer with 7 digits'),
    check('nome')
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 100 }).withMessage('Name must be at most 100 characters long'),
    check('capital')
        .isBoolean().withMessage('Capital must be a boolean value'),
    check('local')
        .notEmpty().withMessage('Local is required')
        .isObject().withMessage('Local must be an object'),
    check('local.type')
        .notEmpty().withMessage('Local type is required')
        .equals('Point').withMessage('Local type must be \"Point\"'),
    check('local.coordinates')
        .notEmpty().withMessage('Local coordinates are required')
        .isArray({ min: 2, max: 2 }).withMessage('Local coordinates must be an array of 2 numbers'),
    check('local.coordinates.0')
        .isFloat({ min: -180, max: 180 }).withMessage('Local coordinates[0] must be a float between -180 and 180'),
    validateRequest
]

export const validateUsuario = [
    check('nome')
        .not().isEmpty().trim().withMessage('É obrigatório informar o nome')
        .isAlpha('pt-BR', { ignore: ' ' }).withMessage('Informe apenas texto')
        .isLength({ min: 3 }).withMessage('Informe no mínimo 3 caracteres')
        .isLength({ max: 100 }).withMessage('Informe no máximo 100 caracteres'),
    check('email')
        .not().isEmpty().trim().withMessage('É obrigatório informar o e-mail')
        .isEmail().withMessage('Informe um e-mail válido')
        .isLowercase().withMessage('Não são permitidas letras maiúsculas')
    // .custom((value, { req }) => {
    //     return db.collection('usuarios')
    //         .find({ email: { $eq: value } }).toArray()
    //         .then((email) => {
    //             if (email.length && !req.params.id) {
    //                 return Promise.reject(`O e-mail ${value} já existe`)
    //             }
    //         })
    // }),
    ,
    check('senha')
        .not().isEmpty().trim().withMessage('A senha é obrigatória')
        .isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres')
        .isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage('A senha não é segura. Informe no mínimo 1 caractere maiúsculo, 1 minúsculo, 1 número e 1 caractere especial'),
    check('ativo')
        .default(true)
        .isBoolean().withMessage('O valor deve ser um booleano'),
    check('tipo')
        .default('Cliente')
        .isIn(['Cliente', 'Admin']).withMessage('O tipo deve ser Admin ou Cliente'),
    check('avatar')
        .optional({ nullable: true })
        .isURL().withMessage('A URL do avatar é inválida'),
    validateRequest
]   