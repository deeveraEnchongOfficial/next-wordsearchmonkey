import React, { useState, useEffect } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ColorTheme = "dark-blue" | "red" | "green";
type CellSize = "small" | "medium" | "large";

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [color, setColor] = useState<ColorTheme>("dark-blue");
  const [cellSize, setCellSize] = useState<CellSize>("large");

  let cells = 19;
  let gap = 5;

  // Load settings from local storage when component mounts
  useEffect(() => {
    const savedColor = localStorage.getItem("color") as ColorTheme;
    const saveCellSize = localStorage.getItem("cellSize") as CellSize;

    if (savedColor) setColor(savedColor);
    if (saveCellSize) setCellSize(saveCellSize);
  }, []);

  // Save settings to local storage when they change
  useEffect(() => {
    localStorage.setItem("color", color);
    localStorage.setItem("cellSize", cellSize);

    if (cellSize === "small") {
      cells = 23;
      gap = 3;
    } else if (cellSize === "medium") {
      cells = 21;
      gap = 4;
    } else {
      cells = 19;
      gap = 5;
    }

    const cell = `calc(100vmin / ${cells})`;
    const gridGap = `calc(${cell} / ${gap})`;

    document.documentElement.style.setProperty("--cell-size", cell);
    document.documentElement.style.setProperty("--grid-gap", gridGap);
  }, [color, cellSize]);

  // if (!isOpen) return null;

  return (
    <>
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <button
          className="flex items-center focus:outline-none"
          onClick={onClose}
        >
          <svg
            className="h-8 w-8 text-slate-500 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                System Settings
              </h2>
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-2">
                  Color Theme:
                </label>
                <select
                  disabled
                  value={color}
                  onChange={(e) => setColor(e.target.value as ColorTheme)}
                  className="w-full border-2 border-gray-300 py-2 px-4 rounded-lg text-lg"
                >
                  <option value="dark-blue">Dark Blue</option>
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-2">
                  Cell Size:
                </label>
                <select
                  value={cellSize}
                  onChange={(e) => setCellSize(e.target.value as CellSize)}
                  className="w-full border-2 border-gray-300 py-2 px-4 rounded-lg text-lg"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <button
                onClick={onClose}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SettingsModal;
