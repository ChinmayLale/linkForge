export interface loginProps {
    password: string;
    email: string; // Optional, if you want to support email login
    provider?: string; // Optional, if you want to support different providers
}

export interface LoginResponse {
    id: string;
    username: string;
    email: string;
    token: string;
}