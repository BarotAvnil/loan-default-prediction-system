"use client";

import { useEffect } from "react";

export function KeepAlive() {
    useEffect(() => {
        // Function to call the health endpoint
        const pingBackend = async () => {
            try {
                // Call our own Next.js API route which proxies to backend
                await fetch('/api/health');
                // We don't need to log success to avoid cluttering console
            } catch (error) {
                console.error("Keep-alive ping failed:", error);
            }
        };

        // Ping immediately on mount
        pingBackend();

        // Set up interval (14 minutes = 840000 ms)
        // Backend sleeps after 15 mins, so 14 mins is safe
        const intervalId = setInterval(pingBackend, 14 * 60 * 1000);

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, []);

    return null; // This component renders nothing
}
