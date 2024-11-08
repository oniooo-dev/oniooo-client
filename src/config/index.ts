// Define an interface for your configuration to benefit from TypeScript's type checking
interface Config {
    backendUrl: string;
    socketUrl: string;
}

// Load port from environment variables or use default
const port = process.env.BACKEND_PORT || 8080;
const apiVersion = process.env.API_VERSION || 'v1';

// Define the backend URL based on the current environment
const backendBaseUrl = process.env.NODE_ENV === 'production' ?
    process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL :
    process.env.NEXT_PUBLIC_DEVELOPMENT_BACKEND_URL;

// Check if the base URL is undefined and handle it appropriately
if (!backendBaseUrl) {
    console.error("Backend URL is not defined in the environment variables.");
    process.exit(1); // Optionally exit, or handle this scenario according to your application's needs
}

// Properly append the port and API version to the backend URL
const backendUrl = process.env.NODE_ENV === 'production' ?
    `${backendBaseUrl}/api/${apiVersion}` :
    `${backendBaseUrl}:${port}/api/${apiVersion}`

const socketUrl = process.env.NODE_ENV === 'production' ?
    `${backendBaseUrl}` :
    `${backendBaseUrl}:${port}`

// Properly append the port to the backend URL
const config: Config = {
    backendUrl: backendUrl,
    socketUrl: socketUrl
    // other production-specific or development-specific configs
};

export default config;