import type { User } from '../types/TypesForAll';

export const authService = {
    // Session Management
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('auth_token');
    },

    getCurrentUser: (): User | null => {
        const userJson = localStorage.getItem('auth_user');
        if (!userJson) return null;
        try {
            const user = JSON.parse(userJson);
            return { id: user.id, email: user.email, fullName: user.fullName };
        } catch (e) {
            console.error('Failed to parse user from localStorage', e);
            return null;
        }
    },

    updateProfile: (fullName: string, email: string) => {
        const current = authService.getCurrentUser();
        if (!current) return;

        // Update auth_user in localStorage
        const updated = { ...current, fullName, email };
        localStorage.setItem('auth_user', JSON.stringify(updated));

        // Update users_list entry
        const users = authService._getAllUsers();
        const idx = users.findIndex(u => u.id === current.id);
        if (idx !== -1) {
            users[idx] = { ...users[idx], fullName, email };
            localStorage.setItem('users_list', JSON.stringify(users));
        }
    },

    // Auth Actions
    register: (fullName: string, email: string, password: string): { success: boolean, message?: string } => {
        const users = authService._getAllUsers();

        if (users.some(u => u.email === email)) {
            return { success: false, message: 'Account already exists' };
        }

        const newUser: User = {
            id: Date.now().toString(),
            fullName,
            email,
            password
        };

        const updatedUsers = [...users, newUser];
        localStorage.setItem('users_list', JSON.stringify(updatedUsers));

        // Log user in automatically after registration
        authService._setSession(newUser);
        return { success: true };
    },

    login: (email: string, password: string): { success: boolean, message?: string } => {
        const users = authService._getAllUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }

        authService._setSession(user);
        return { success: true };
    },

    logout: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
    },

    // Internal Helpers
    _getAllUsers: (): User[] => {
        const usersJson = localStorage.getItem('users_list');
        if (!usersJson) return [];
        try {
            return JSON.parse(usersJson);
        } catch {
            return [];
        }
    },

    _setSession: (user: User) => {
        localStorage.setItem('auth_token', 'mock_token_' + Date.now());
        localStorage.setItem('auth_user', JSON.stringify({
            id: user.id,
            email: user.email,
            fullName: user.fullName
        }));
    }
};
