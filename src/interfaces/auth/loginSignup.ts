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
    name?: string;
    bio?: string;
    avatarUrl?: string;
    tags?: string[];
    themeId?: string;
    totalLinks?: number; // Optional property for total links
    totalClicks?: number; // Optional property for total views
    ctr?: number; // Optional property for click-through rate
    createdAt?: string; // Optional property for creation date
    updatedAt?: string; // Optional property for last update date
    
}