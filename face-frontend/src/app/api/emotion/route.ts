/**
 * NEXT.js API ROUTE (Server-Side Proxy)
 * ------------------------------------
 * PURPOSE: Bridges the frontend with the Python AI engine.
 * SECURITY: Keeps the Python backend URL hidden from the public browser.
 * RELIABILITY: Handles cases where the backend might be offline.
 */
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. Get the URL from your environment variables
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Safety Check: If the variable is missing, provide a clear error in logs
    if (!backendUrl) {
      console.error("CRITICAL: NEXT_PUBLIC_BACKEND_URL is not set!");
      throw new Error("Backend configuration missing.");
    }

    // 2. Forward the request to the Flask server
    // CRITICAL FIX: Note the comma after the URL string!
    const response = await fetch(`${backendUrl}/analyze`, {
      cache: 'no-store', // Ensures every request is a fresh AI scan
    });

    // 3. Handle response from the Python engine
    if (!response.ok) {
      throw new Error(`AI Engine Error: ${response.status}`);
    }

    const data = await response.json();

    // 4. Send the result back to the React frontend
    return NextResponse.json(data);
    
  } catch (error: any) {
    // Server-side logging for debugging
    console.error("API Bridge Failure:", error.message);
    
    return NextResponse.json(
      { 
        status: "error", 
        message: "Neural Engine is currently unreachable. Please ensure the backend is running." 
      },
      { status: 500 }
    );
  }
}