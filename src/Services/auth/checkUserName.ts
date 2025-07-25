import axios from "axios";

export const checkUsernameAvailability = async (username: string): Promise<{ available: boolean; message?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock logic - replace with actual API call
    const unavailableUsernames = ['admin', 'test', 'user', 'johndoe', 'jane'];
    
    if (unavailableUsernames.includes(username.toLowerCase())) {
        return { available: false, message: 'Username is already taken' };
    }
    
    return { available: true, message: 'Username is available' };
};