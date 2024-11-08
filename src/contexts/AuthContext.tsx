import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import { Session } from '@supabase/supabase-js';
import config from '@/config';

// Defines the structure for user data throughout the application.
type User = {
    userId: string;
    email: string;
    iconUrl: string;
    mochiBalance: number;
};

// Specifies the type of context the AuthProvider will provide to its consumers.
type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    jwtToken: string | undefined;
    loading: boolean;
    error: string | null;
    login: () => void;
    logout: () => void;
};

// Initializes the authentication context with default values.
const AuthContext = createContext<AuthContextType | null>(null);

// Type definition for the props expected by the AuthProvider component.
type AuthProviderProps = {
    children: ReactNode;
};

/**
 * Provides authentication-related data and operations to its child components.
 * Manages authentication state and performs user session validation using Supabase.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [jwtToken, setJwtToken] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState<boolean>(false); // To prevent duplicate calls

    // Fetch user data on mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                // Retrieves the current session asynchronously from Supabase.
                const { data, error: sessionError } = await supabase.auth.getSession();

                // Error handling from the Supabase Client
                if (sessionError) {
                    throw new Error(sessionError.message);
                }

                if (data.session) {
                    updateAuthState(data.session);
                }
            } catch (error) {
                console.error('Error getting session:', error);
                setError('Failed to get session');
            } finally {
                setIsInitialized(true); // Set initialized to true after session check
            }
        };

        checkSession();

        // Listen for auth state changes.
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (!isInitialized) {
                // If already initialized, no need to fetch again
                return;
            }
            updateAuthState(session);
        });

        // Cleanup function to unsubscribe from the listener on component unmount.
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    // Updates the authentication state based on the current session.
    const updateAuthState = async (session: Session | null) => {
        if (session && session.user) {
            setIsAuthenticated(true);
            setJwtToken(session.access_token);
            await fetchUserData(session.access_token, session.user.id);
        }
        else {
            setIsAuthenticated(false);
            setUser(null);
            setJwtToken(undefined);
        }
    };

    // Fetches user data from the backend and updates local state.
    const fetchUserData = async (token: string, userId: string) => {

        setLoading(true);
        setError(null);

        try {

            // Debugging log
            console.log('Fetching user data...');

            const response = await fetch(`${config.backendUrl}/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                switch (response.status) {
                    case 400:
                        console.error('Fetch user data failed, user not found:', errorText);
                        setError('User not found');
                        break;
                    case 500:
                        console.error('Server error when fetching user data:', errorText);
                        setError('Server error');
                        break;
                    default:
                        console.error('Fetch user data failed:', errorText);
                        setError('Failed to fetch user data');
                }
                return;
            }

            const userData = await response.json();
            console.log('User data fetched:', userData.userData);  // Debugging log
            setUser(userData.userData);
        }
        catch (error) {
            console.error('Error fetching user data:', error);
            setError('Error fetching user data');
            logout();
        }
        finally {
            setLoading(false);
        }
    };

    // Provides a method to initiate login using OAuth provider.
    const login = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    // queryParams: {
                    //     // access_type: "offline",
                    //     prompt: "consent"
                    // },
                    redirectTo: `/auth/callback`,
                },
            })

            if (error) {
                console.error('Login error:', error.message);
                setError('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed');
        }
    };

    // Provides a method for logging out the current user.
    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            setUser(null);
            setIsAuthenticated(false);
            setJwtToken(undefined);
        } else {
            console.error('Logout error:', error.message);
            setError('Logout failed');
        }
    };

    // Context provider that makes auth state and handlers available to child components.
    return (
        <AuthContext.Provider value={{ isAuthenticated, user, jwtToken, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the authentication context.
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};