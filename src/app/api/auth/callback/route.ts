import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import config from '@/config'

// Server-Side Google Authentication
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')

    if (!code) {
        return new Response(JSON.stringify({ error: 'Authorization code is missing' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const supabase = createClient();

    const { data: sessionData, error } = await supabase.auth.exchangeCodeForSession(code)

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
        // Call the Express backend to fetch user data
        const response = await fetch(`${config.backendUrl}/api/users/${session.user.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.access_token}`,
                'Content-Type': 'application/json'
            }
        });

        // Handle the response from the Express backend
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to fetch user data from Express:', errorText);
            return new Response(JSON.stringify({ error: 'Failed to fetch user data' }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const user = await response.json();

        // Return the user data as a response
        return new Response(JSON.stringify(user), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err) {
        console.error('Error calling Express backend:', err);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}