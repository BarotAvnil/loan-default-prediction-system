import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://loan-default-backend-poad.onrender.com';

export async function GET() {
    try {
        console.log(`Checking backend health: ${API_URL}/health`);
        const response = await fetch(`${API_URL}/health`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store' // Ensure we don't get a cached response
        });

        if (!response.ok) {
            return NextResponse.json(
                { status: 'error', message: 'Backend is unreachable' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Health Check Error:", error);
        return NextResponse.json(
            { status: 'error', message: error.message },
            { status: 500 }
        );
    }
}
