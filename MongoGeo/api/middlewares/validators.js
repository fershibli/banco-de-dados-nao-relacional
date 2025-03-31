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
        .equals('Point').withMessage('Local type must be "Point"'),
    check('local.coordinates')
        .notEmpty().withMessage('Local coordinates are required')
        .isArray({ min: 2, max: 2 }).withMessage('Local coordinates must be an array of 2 numbers'),
    check('local.coordinates.0')
        .isFloat({ min: -180, max: 180 }).withMessage('Local coordinates[0] must be a float between -180 and 180'),
    validateRequest
]