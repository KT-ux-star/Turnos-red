import { AppError } from '../errors/app.error.js';
export function errorHandler(error, _req, res, _next) {
    if (error instanceof AppError) {
        res.status(error.status).json({
            status: error.status,
            message: error.message,
            code: error.code,
            details: error.details,
        });
        return;
    }
    console.error(error);
    res.status(500).json({
        status: 500,
        message: 'Error interno del servidor',
        code: 'INTERNAL_ERROR',
        details: [],
    });
}
//# sourceMappingURL=error.handler.js.map