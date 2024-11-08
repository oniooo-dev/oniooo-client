import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import config from '@/config'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
        console.error('Authorization code is missing');
        return new Response(JSON.stringify({ error: 'Authorization code is missing' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const supabase = createClient();
    const { data: sessionData, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !sessionData) {
        console.error('Failed to exchange code for session:', error);
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    const { session } = sessionData;

    if (!session || !session.access_token) {
        console.error('No session or access token found');
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    try {

        // If user doesn't exist, create it in the backend
        const response = await fetch(`${config.backendUrl}/users/${session.user.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.access_token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error('User not found, attempting to create a new user');
        }

        const user = await response.json();

        return new Response(JSON.stringify(user), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    catch (err) {
        console.error('Error calling Express backend:', err);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}