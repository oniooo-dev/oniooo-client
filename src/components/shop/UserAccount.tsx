import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React from 'react'

const UserAccount = () => {

    // Router
    const router = useRouter();

    // Auth
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <div className="flex flex-col gap-4">
            <p className="text-6xl font-semibold">
                Account
            </p>
            <div className="flex flex-row gap-4 text-lg">
                {isAuthenticated ?
                    <p>
                        Logged in as {user?.email}
                    </p> :
                    <p>
                        Pliz an account we beg u!
                    </p>
                }
                {isAuthenticated &&
                    <p
                        className="underline underline-offset-8 cursor-pointer"
                        onClick={
                            () => {
                                logout();
                                router.push('/melody');
                            }
                        }
                    >
                        Log out
                    </p>
                }
            </div>
        </div>
    )
}

export default UserAccount