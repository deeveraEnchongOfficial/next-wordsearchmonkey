import React, { useState, useEffect } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ColorTheme = "contrasting-citrus" | "rich-red" | "lavender-aroma" | "green-beauty";
type CellSize = "small" | "medium" | "large";

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [color, setColor] = useState<ColorTheme>("contrasting-citrus");
  const [cellSize, setCellSize] = useState<CellSize>("large");

  let cells = 19;
  let gap = 5;

  let color1 = '#fae6b1';
  let color2 = '#ffa101';
  let color3 = '#b3dee5';
  let color4 = '#31525b';
  let color5 = '#b3dee5';

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

    if (color === "contrasting-citrus"){
      color1 = '#fae6b1';
      color2 = '#ffa101';
      color3 = '#b3dee5';
      color4 = '#31525b';
      color5 = '#b3dee5';
    } else if (color === "rich-red"){
      color1 = '#f8d4ba';
      color2 = '#d69f3a';
      color3 = '#f8d4ba';
      color4 = '#541412';
      color5 = '#c34f5a';
    } else if (color === "lavender-aroma"){
      color1 = '#f4f2f3';
      color2 = '#94a7ae';
      color3 = '#c0a9bd';
      color4 = '#64766a';
      color5 = '#c0a9bd';
    } else if (color === "green-beauty"){
      color1 = '#cc8b65';
      color2 = '#100c0d';
      color3 = '#e3dcd2';
      color4 = '#013328';
      color5 = '#e3dcd2';
    }

    document.documentElement.style.setProperty("--primary-color", color1);
    document.documentElement.style.setProperty("--selection-color", color2);
    document.documentElement.style.setProperty("--text-color", color3);
    document.documentElement.style.setProperty("--container-color", color4);
    document.documentElement.style.setProperty("--gridcells-color", color5);

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
            className="h-8 w-8 text-black cursor-pointer hover:text-slate-400"
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
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center mb-6 py-3 px-4 border-b dark:border-neutral-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Settings
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-neutral-700 dark:focus:ring-offset-gray-800"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="my-8 px-6">
                <label className="block text-lg text-black font-semibold mb-2">
                  Color Theme:
                </label>
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value as ColorTheme)}
                  className="w-full border-2 border-gray-300 py-2 px-4 rounded-lg text-lg"
                >
                  <option value="contrasting-citrus">Contrasting Citrus</option>
                  <option value="rich-red">Rich Red</option>
                  <option value="lavender-aroma">Lavender Aroma</option>
                  <option value="green-beauty">Green Beauty</option>
                </select>
              </div>
              <div className="my-8 px-6">
                <label className="block text-lg text-black font-semibold mb-2">
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
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                <button
                  onClick={onClose}
                  className="bg-red-500 hover:bg-red-700 text-white text-md font-bold py-3 px-6 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SettingsModal;
