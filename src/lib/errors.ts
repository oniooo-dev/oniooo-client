class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthError';
    }
}

/**
 * Error on data fetching
 */
class MelodyFetchError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MelodyFetchError';
    }
}

/**
 * Error on data creation
*/
class MelodyPostError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MelodyPostError';
    }
}

/**
 * Error on data update
 */
class MelodyPutError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MelodyPutError';
    }
}

/**
 * Error on data delete
 */
class MelodyDeleteError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MelodyDeleteError';
    }
}