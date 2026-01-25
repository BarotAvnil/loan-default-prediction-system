// We now proxy requests through Next.js API routes to avoid CORS
// The actual URL is handled in app/api/predict/route.ts

export async function predictLoanDefault(data: any) {
    try {
        // Call our own Next.js API route (relative path)
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `Request failed: ${response.status}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error("API Error:", error);
        throw error;
    }
}
