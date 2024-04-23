import React, { useState, useEffect } from 'react';

interface TimerProps{
    isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ isActive }) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval: string | number | NodeJS.Timeout | null | undefined = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            if (interval) {
                clearInterval(interval);
            }
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isActive, seconds]);

    // const toggle = () => {
    //     setIsActive(!isActive);
    // };

    // const reset = () => {
    //     setSeconds(0);
    //     setIsActive(false);
    // };

    // Function to format time
    const formatTime = () => {
        const minutes = Math.floor((seconds % 3600) / 60);
        const sec = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center justify-center relative w-40">
            <div className="flex items-center text-2xl font-semibold text-gray-800 space-x-2">
                <svg
                    className="w-6 h-6 text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
                <span>{formatTime()}</span>
            </div>
            {/* <div className="space-x-2 mt-2">
                <button
                    onClick={toggle}
                    className={`px-4 py-1 rounded font-medium text-white ${
                        isActive
                            ? "bg-red-400 hover:bg-red-500" 
                            : "bg-green-400 hover:bg-green-500"
                    }`}
                >
                    {isActive ? "Pause" : "Start"}
                </button>
                <button
                    onClick={reset}
                    className="px-4 py-1 bg-blue-400 hover:bg-blue-500 text-white rounded font-medium"
                >
                    Reset
                </button>
            </div> */}
        </div>
    );
};

export default Timer;
