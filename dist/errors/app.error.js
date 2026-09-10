export class AppError extends Error {
    constructor(status, message, code, details = []) {
        super(message);
        this.status = status;
        this.message = message;
        this.code = code;
        this.details = details;
        this.name = 'AppError';
    }
}
//# sourceMappingURL=app.error.js.map