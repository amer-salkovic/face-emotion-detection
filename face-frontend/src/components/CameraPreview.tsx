'use client';
/**
 * CameraPreview Component
 * * Low-latency direct hardware interface.
 * Accesses the user's webcam via navigator.mediaDevices and streams 
 * the track directly to a <video> element.
 */
import { useEffect, useRef } from 'react';

export default function CameraPreview() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        let currentStream: MediaStream | null = null;

        async function setupCamera() {
            try {
                // Request access with specific constraints for AI detection
                currentStream = await navigator.mediaDevices.getUserMedia({ 
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        facingMode: 'user' // Ensures mobile users use front camera
                    } 
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = currentStream;
                }
            } catch (error) {
                console.error("Hardware Access Error:", error);
            }
        }

        setupCamera();

        // CLEANUP: Extremely important for GitHub projects to show resource management.
        // This stops the camera sensor when the component is unmounted.
        return () => {
            if (currentStream) {
                currentStream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="relative w-full max-w-xl aspect-video rounded-3xl overflow-hidden bg-gray-950 border-2 border-gray-800 shadow-2xl">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }} // Mirrors display for natural user feeling
            />
            
            {/* Status Indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-white uppercase font-bold tracking-tighter">Live Sensor Feed</span>
            </div>
        </div>
    );
}