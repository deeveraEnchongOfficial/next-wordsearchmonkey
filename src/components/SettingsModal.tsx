import React, { useState, useEffect } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ColorTheme =
  | "contrasting-citrus"
  | "rich-red"
  | "lavender-aroma"
  | "green-beauty"
  | "black-white"
  | "default-gray";
type CellSize = "small" | "medium" | "large";
type BorderSize = "small" | "medium" | "large";
type Type = "cell-select" | "free-select";

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [color, setColor] = useState<ColorTheme>("default-gray");
  const [cellSize, setCellSize] = useState<CellSize>("large");
  const [borderSize, setBorderSize] = useState<BorderSize>("large");
  const [type, setType] = useState<Type>(localStorage.getItem("type") as Type ?? "free-select");
  const [showTimer, setShowTimer] = useState<boolean>(localStorage.getItem("isTimerShown") as unknown as boolean ?? true);


  let cells = 19;
  let gap = 5;

  let color1 = '#fae6b1';
  let color2 = '#ffa101';
  let color3 = '#b3dee5';
  let color4 = '#31525b';
  let color5 = '#b3dee5';
  let color6 = '#31525b';
  let color7 = '#31525b';

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

    if (color === "contrasting-citrus") {
      color1 = "#fae6b1";
      color2 = "#ffa101";
      color3 = "#b3dee5";
      color4 = "#31525b";
      color5 = "#b3dee5";
      color6 = '#31525b';
      color7 = '#31525b';
    } else if (color === "rich-red") {
      color1 = '#f8d4ba';
      color2 = '#d69f3a';
      color3 = '#f8d4ba';
      color4 = '#541412';
      color5 = '#c34f5a';
      color6 = '#541412';
      color7 = '#541412';
    } else if (color === "lavender-aroma") {
      color1 = '#f4f2f3';
      color2 = '#94a7ae';
      color3 = '#c0a9bd';
      color4 = '#64766a';
      color5 = '#c0a9bd';
      color6 = '#64766a';
      color7 = '#64766a';
    } else if (color === "green-beauty") {
      color1 = '#cc8b65';
      color2 = '#100c0d';
      color3 = '#e3dcd2';
      color4 = '#013328';
      color5 = '#e3dcd2';
      color6 = '#013328';
      color7 = '#013328';
    } else if (color === "black-white") {
      color1 = 'white';
      color2 = 'black';
      color3 = 'white';
      color4 = 'black';
      color5 = 'white';
      color6 = 'black';
      color7 = 'black';
    } else if (color === "default-gray") {
      color1 = '#F5F5F5';
      color2 = '#1e3b39';
      color3 = 'black';
      color4 = 'white';
      color5 = '#EFEFEF';
      color6 = 'black';
      color7 = '#EFEFEF';
    }

    document.documentElement.style.setProperty("--primary-color", color1);
    document.documentElement.style.setProperty("--selection-color", color2);
    document.documentElement.style.setProperty("--text-color", color3);
    document.documentElement.style.setProperty("--container-color", color4);
    document.documentElement.style.setProperty("--gridcells-color", color5);
    document.documentElement.style.setProperty("--container-text-color", color6);
    document.documentElement.style.setProperty("--list-border-color", color7);

    if (borderSize === "small") {
      gap = 20;
      const cell = `calc(100vmin / ${cells})`;
      const gridGap = `calc(${cell} / ${gap})`;
      document.documentElement.style.setProperty("--grid-gap", gridGap);
    } else if (borderSize === "medium") {
      gap = 10;
      const cell = `calc(100vmin / ${cells})`;
      const gridGap = `calc(${cell} / ${gap})`;
      document.documentElement.style.setProperty("--grid-gap", gridGap);
    } else {
      gap = 5;
      const cell = `calc(100vmin / ${cells})`;
      const gridGap = `calc(${cell} / ${gap})`;
      document.documentElement.style.setProperty("--grid-gap", gridGap);
    }

  }, [color, cellSize, borderSize]);

  useEffect(() => {
    if (type === "cell-select") {
      onBorderChange({ target: { value: "large" } } as React.ChangeEvent<HTMLSelectElement>);
    }
  }, [type]);

  const toggleShowTimer = () => {
    const updatedShowTimer = !showTimer;
    setShowTimer(updatedShowTimer);
    localStorage.setItem('isTimerShown', updatedShowTimer.toString());
  };

  const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as Type);
    localStorage.setItem("type", e.target.value);
  }

  const onBorderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBorderSize(e.target.value as BorderSize);
    localStorage.setItem("borderSize", e.target.value);
  }

  const gameType = localStorage.getItem("type")

  // if (!isOpen) return null;

  return (
    <>
      <div className="absolute top-0 left-4 mt-4 mr-4 z-10">
        <button
          className="flex items-center focus:outline-none"
          onClick={onClose}
        >
          <svg
            className="h-8 w-8 text-black cursor-pointer hover:text-slate-800"
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
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6 py-3 px-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">
                  Settings
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm"
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
              <div className="flex">
                <div className="flex-1 my-8 px-6">
                  <div className="-mt-5 mb-4">
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
                      <option value="black-white">Black & White</option>
                      <option value="default-gray">Default Gray</option>
                    </select>
                  </div>
                  <div>
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
                  <div className="pt-5">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value={showTimer.toString()}
                        onChange={toggleShowTimer}
                        className="sr-only peer"
                        defaultChecked={showTimer}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Show Timer
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex-1 my-8 px-6">
                  <div className="-mt-5 mb-4">
                    <label className="block text-lg text-black font-semibold mb-2">
                      Selection Mode:
                    </label>
                    <select
                      value={type}
                      onChange={onTypeChange}
                      className="w-full border-2 border-gray-300 py-2 px-4 rounded-lg text-lg"
                    >
                      <option value="free-select">Free Select</option>
                      <option value="cell-select">Cell Select</option>
                    </select> 
                  </div>
                  <div>
                    <label className="block text-lg text-black font-semibold mb-2">
                      Border Size:
                    </label>
                    <select
                      value={borderSize}
                      onChange={onBorderChange}
                      className="w-full border-2 border-gray-300 py-2 px-4 rounded-lg text-lg"
                      disabled={gameType === "cell-select"}
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
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
