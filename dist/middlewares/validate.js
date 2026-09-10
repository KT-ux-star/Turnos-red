import { AppError } from '../errors/app.error.js';
export function validate(schema) {
    return (req, _res, next) => {
        const resultado = schema.safeParse(req.body);
        if (!resultado.success) {
            const details = resultado.error.issues.map((issue) => ({
                field: issue.path.join('.') || 'body',
                message: issue.message,
            }));
            next(new AppError(400, 'Error de validación en los datos ingresados', 'VALIDATION_ERROR', details));
            return;
        }
        req.body = resultado.data;
        next();
    };
}
//# sourceMappingURL=validate.js.map