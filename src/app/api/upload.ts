import { Storage } from '@google-cloud/storage';

const storage = new Storage({
    projectId: 'your-project-id',
    credentials: {
        client_email: 'service-account-email',
        private_key: 'service-account-private-key',
    },
})

const bucket = storage.bucket('your-bucket-name');