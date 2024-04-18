import React, { useState, useEffect } from 'react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ColorTheme = 'dark-blue' | 'red' | 'green';
type CellSize = 'small' | 'medium' | 'large';

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const [color, setColor] = useState<ColorTheme>('dark-blue');
    const [cellSize, setCellSize] = useState<CellSize>('large');

    let cells = 19;
    let gap = 5;

    // Load settings from local storage when component mounts
    useEffect(() => {
        const savedColor = localStorage.getItem('color') as ColorTheme;
        const saveCellSize = localStorage.getItem('cellSize') as CellSize;

        if (savedColor) setColor(savedColor);
        if (saveCellSize) setCellSize(saveCellSize);
    }, []);

    // Save settings to local storage when they change
    useEffect(() => {
        localStorage.setItem('color', color);
        localStorage.setItem('cellSize', cellSize);

        if (cellSize === 'small') {
            cells = 23;
            gap = 3;
        } else if (cellSize === 'medium') {
            cells = 21;
            gap = 4;
        } else {
            cells = 19;
            gap = 5;
        }

        const cell = `calc(100vmin / ${cells})`;
        const gridGap = `calc(${cell} / ${gap})`;

        document.documentElement.style.setProperty('--cell-size', cell);
        document.documentElement.style.setProperty('--grid-gap', gridGap);


    }, [color, cellSize]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">System Settings</h2>
                <div className="mb-6">
                    <label className="block text-lg font-semibold mb-2">Color Theme:</label>
                    <select disabled value={color} onChange={e => setColor(e.target.value as ColorTheme)} className="w-full border-2 border-gray-300 py-2 px-4 rounded-lg text-lg">
                        <option value="dark-blue">Dark Blue</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-semibold mb-2">Cell Size:</label>
                    <select value={cellSize} onChange={e => setCellSize(e.target.value as CellSize)} className="w-full border-2 border-gray-300 py-2 px-4 rounded-lg text-lg">
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>
                <button onClick={onClose} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                    Close
                </button>
            </div>
        </div>
    );
};

export default SettingsModal;
