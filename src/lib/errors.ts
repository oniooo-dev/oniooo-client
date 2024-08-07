class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthError';
    }
}

class MelodyError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MelodyError';
    }
}