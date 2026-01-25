import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://loan-default-backend-poad.onrender.com';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log(`Proxying request to: ${API_URL}/predict`);

        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        // Get the response body from the backend
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            console.error("Backend Error:", response.status, JSON.stringify(data, null, 2));
            return NextResponse.json(
                { detail: data.detail || "Backend error", status: response.status },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Proxy Error:", error);
        return NextResponse.json(
            { detail: "Internal Proxy Error", error: error.message },
            { status: 500 }
        );
    }
}
