import React, { useState, useEffect } from 'react';

interface SpinningCircleLoaderProps {
    size?: number;
    strokeWidth?: number;
    color?: string;
    duration?: number;
    isLoading?: boolean;
    children?: React.ReactNode;
}

const SpinningCircleLoader: React.FC<SpinningCircleLoaderProps> = ({
    size = 50,
    strokeWidth = 2,
    color = 'ffffff',
    duration = 2000,
    isLoading = true,
    children
}) => {
    const [progress, setProgress] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const circumference = 2 * Math.PI * ((size - strokeWidth) / 2);

    useEffect(() => {
        if (isLoading || progress < 100) {
            const id = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(id);
                        return 100;
                    }
                    if (!isLoading) {
                        return Math.min(prevProgress + 5, 100);
                    }
                    return (prevProgress + 1) % 101;
                });
            }, duration / 100);
            setIntervalId(id);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isLoading, duration, progress]);

    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={(size - strokeWidth) / 2}
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={(size - strokeWidth) / 2}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    style={{
                        transition: `stroke-dashoffset ${duration / 100}ms linear`,
                    }}
                />
            </svg>
            {children && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {children}
                </div>
            )}
        </div>
    );
};

export default SpinningCircleLoader;