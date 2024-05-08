"use client";
import React, { useState, useEffect } from "react";
import styles from "@/components/WordSearch/WordSearch.module.css"; //change
import WordList from "@/components/WordList/WordList";
import Toast from "@/components/Toast";
import Timer from "@/components/Timer";
import CompleteModal from "@/components/CompleteModal";

interface Cell {
  letter: string;
  selected: boolean;
  correct?: boolean;
}

interface Position {
  row: number;
  col: number;
}

interface Toast {
  visible: boolean;
  message: string;
  type: "success" | "failure" | "";
}

interface WordSearchProps {
  words: string[];
  gridSize: number;
}

const WordSearch: React.FC<WordSearchProps> = ({ words, gridSize }) => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [startPoint, setStartPoint] = useState<Position | null>(null);
  const [endPoint, setEndPoint] = useState<Position | null>(null);
  const [lines, setLines] = useState<Array<{ start: Position; end: Position }>>(
    []
  );
  const [correctWords, setCorrectWords] = useState<[Position[], string][]>([]);
  const [wordList, setWordList] = useState<string[]>([]);
  const [isGridInteracted, setIsGridInteracted] = useState<boolean>(false);
  const [toast, setToast] = useState<Toast>({
    visible: false,
    message: "",
    type: "success",
  });

  const successMessages: string[] = [
    "Hey, you found a word!",
    "Nice! That's a word!",
    "Yup, you got one!",
    "Yes indeed, that’s a word!",
    "Cool beans, you found a word!",
    "Yay! That’s a word!",
    "Yes! You got one",
    "Nicely done!",
    "You got one!",
    "Good eye!",
  ];
  const failMessages: string[] = [
    "Oops!",
    "Nope!",
    "Unfortunately not!",
    "Sadly not...",
    "You were so close!",
    "I didn’t put it there...",
    "Just missed it!",
    "So close!",
    "Almost had it!",
  ];

  const colors: string[] = [
    "#76b947", // Green
    "#3498db", // Blue
    "#f1c40f", // Yellow
    "#1abc9c", // Teal
    "#8a9ba8", // Light Navy
    "#f39c12", // Orange
    "#9b59b6", // Purple
    "#2c3e50", // Dark Navy
    "#e67e22", // Pumpkin
    "#f9ebae", // Light Yellow
    "#16a085", // Green Sea
    "#27ae60", // Nephritis
    "#2980b9", // Belize Hole
    "#8e44ad", // Wisteria
    "#2ecc71", // Emerald
    "#d35400", // Pumpkin
    "#7f8c8d", // Asbestos
    "#95a5a6", // Concrete
    "#1abc9c", // Turquoise
    "#9b59b6", // Amethyst
    "#3498db", // Peter River
    "#e74c3c", // Alizarin
    "#95a5a6", // Concrete
    "#f1c40f", // Sun Flower
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setWordList(words);
    generateGrid();
  }, [wordList?.length]);

  useEffect(() => {
    if (correctWords.length === wordList.length) {
      setIsGridInteracted(false);
    }
  }, [correctWords, wordList]);

  useEffect(() => {
    function generateGrid() {
      let initialGrid: Cell[][] = Array.from({ length: gridSize }, () =>
        Array.from({ length: gridSize }, () => ({
          letter: "",
          selected: false,
        }))
      );

      const directions: Position[] = [
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: -1 },
      ];

      wordList.forEach((word) => {
        let placed = false;
        while (!placed) {
          const direction =
            directions[Math.floor(Math.random() * directions.length)];
          const startPos: Position = {
            row: Math.floor(Math.random() * gridSize),
            col: Math.floor(Math.random() * gridSize),
          };

          if (canPlaceWord(initialGrid, word, startPos, direction)) {
            placeWord(initialGrid, word, startPos, direction);
            placed = true;
          }
        }
      });

      initialGrid = initialGrid.map((row) =>
        row.map((cell) =>
          cell.letter === "" ? { ...cell, letter: getRandomLetter() } : cell
        )
      );

      setGrid(initialGrid);
    }

    if (words && words.length > 0) {
      setWordList(words); // Make sure to update the word list
      generateGrid(); // Regenerate the grid whenever the word list updates
    }
  }, [words?.length]); // Ensures this effect only runs when words changes

  const generateGrid = () => {
    let initialGrid: Cell[][] = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => ({ letter: "", selected: false }))
    );

    const directions: Position[] = [
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: -1 },
    ];

    wordList.forEach((word) => {
      let placed = false;
      while (!placed) {
        const direction =
          directions[Math.floor(Math.random() * directions.length)];
        const startPos: Position = {
          row: Math.floor(Math.random() * gridSize),
          col: Math.floor(Math.random() * gridSize),
        };

        if (canPlaceWord(initialGrid, word, startPos, direction)) {
          placeWord(initialGrid, word, startPos, direction);
          placed = true;
        }
      }
    });

    initialGrid = initialGrid.map((row) =>
      row.map((cell) =>
        cell.letter === "" ? { ...cell, letter: getRandomLetter() } : cell
      )
    );

    setGrid(initialGrid);
  };

  const canPlaceWord = (
    grid: Cell[][],
    word: string,
    startPos: Position,
    direction: Position
  ): boolean => {
    let pos = { ...startPos };
    for (let i = 0; i < word.length; i++) {
      if (
        pos.row < 0 ||
        pos.row >= gridSize ||
        pos.col < 0 ||
        pos.col >= gridSize ||
        grid[pos.row][pos.col].letter !== ""
      ) {
        return false;
      }
      pos.row += direction.row;
      pos.col += direction.col;
    }
    return true;
  };

  const placeWord = (
    grid: Cell[][],
    word: string,
    startPos: Position,
    direction: Position
  ): void => {
    let pos = { ...startPos };
    for (let i = 0; i < word.length; i++) {
      grid[pos.row][pos.col].letter = word[i];
      pos.row += direction.row;
      pos.col += direction.col;
    }
  };

  const getRandomLetter = (): string => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  const handleMouseDown = (row: number, col: number) => {
    if (correctWords.length != wordList.length) {
      setIsGridInteracted(true);
    }
    setStartPoint({ row, col });
    setEndPoint(null); // Reset end point on new selection
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (startPoint) {
      setEndPoint({ row, col });
    }
  };

  const handleMouseUp = () => {
    // The logic here will be executed only if the mouse up event happens inside the grid
    if (startPoint && endPoint) {
      finalizeSelection();
      setStartPoint(null);
      setEndPoint(null);
    }
  };

  useEffect(() => {
    highlightCells();
  }, [lines, startPoint, endPoint]); // Highlight cells as the selection changes

  const highlightCells = () => {
    if (!startPoint || !endPoint) return; // Only highlight if we have a valid selection

    // Calculate straight line cells between startPoint and endPoint
    const allSelectedCells = calculateLineCells(startPoint, endPoint);
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => ({
        ...cell,
        selected: allSelectedCells.some(
          (cell) => cell.row === rowIndex && cell.col === colIndex
        ),
      }))
    );
    setGrid(newGrid);
  };

  const finalizeSelection = () => {
    if (!startPoint || !endPoint) return;

    const selectedCells = calculateLineCells(startPoint, endPoint);
    const selectedWord = selectedCells
      .map(({ row, col }) => grid[row][col].letter)
      .join("");

    if (
      wordList.includes(selectedWord) &&
      !correctWords.some(([_, word]) => word === selectedWord)
    ) {
      setCorrectWords((prevWords) => [
        ...prevWords,
        [selectedCells, selectedWord],
      ]);
      setLines((prevLines) => [
        ...prevLines,
        { start: startPoint, end: endPoint },
      ]);
      setToast({
        visible: true,
        message:
          successMessages[Math.floor(Math.random() * successMessages.length)],
        type: "success",
      });
      // Update grid to mark cells as correct
      const newGrid = grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isSelected = selectedCells.some(
            (cell) => cell.row === rowIndex && cell.col === colIndex
          );
          return {
            ...cell,
            selected: false, // Remove general selection
            correct: isSelected ? true : cell.correct, // Mark as correct if part of correct word
          };
        })
      );
      setGrid(newGrid);
    } else {
      // Optionally reset grid selection visually here if needed
      const newGrid = grid.map((row) =>
        row.map((cell) => ({
          ...cell,
          selected: false,
        }))
      );
      setGrid(newGrid);
      if (selectedCells.length > 1) {
        setToast({
          visible: true,
          message:
            failMessages[Math.floor(Math.random() * failMessages.length)],
          type: "failure",
        });
      }
    }
    setTimeout(() => setToast({ visible: false, message: "", type: "" }), 3000);
  };

  const calculateLineCells = (start: Position, end: Position) => {
    const cells = [];
    let x1 = start.col;
    let y1 = start.row;
    let x2 = end.col;
    let y2 = end.row;

    let dx = Math.abs(x2 - x1);
    let dy = -Math.abs(y2 - y1);
    let sx = x1 < x2 ? 1 : -1;
    let sy = y1 < y2 ? 1 : -1;
    let err = dx + dy;
    let e2;

    while (true) {
      cells.push({ row: y1, col: x1 });
      if (x1 === x2 && y1 === y2) break;
      e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        x1 += sx;
      }
      if (e2 <= dx) {
        err += dx;
        y1 += sy;
      }
    }

    return cells;
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (startPoint) {
        finalizeSelection();
        setStartPoint(null);
        setEndPoint(null);
      }
    };

    // Attach mouseup listener to the whole document to handle case when mouse is released outside the grid
    document.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [startPoint, endPoint]);

  const isTimerShown = localStorage.getItem("isTimerShown")

  return (
    <div className={styles.gridContainer}>
      {words && correctWords.length === wordList.length && <CompleteModal />}
      {wordList?.length > 0 && (
        <div className="flex flex-col items-center justify-center space-y-4">
          {isTimerShown === 'true' && <Timer isActive={isGridInteracted} />}
          <WordList wordList={wordList} correctWords={correctWords} />
        </div>
      )}
      <div className={styles.grid}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, colIndex) => {
              const foundWord = correctWords.find(([details]) =>
                details.some(
                  (detail) => detail.row === rowIndex && detail.col === colIndex
                )
              );
              const colorIndex =
                foundWord !== undefined ? correctWords.indexOf(foundWord) : -1;
              const isCorrectCell = foundWord !== undefined;

              const cellClass = isCorrectCell
                ? `${styles.cell} ${styles.correct}`
                : cell.selected
                ? `${styles.cell} ${styles.selected}`
                : styles.cell;

              const cellStyle =
                isCorrectCell && colorIndex !== -1
                  ? { backgroundColor: colors[colorIndex % colors.length] }
                  : {};

              return (
                <div
                  key={colIndex}
                  className={cellClass}
                  style={cellStyle}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                  onMouseUp={handleMouseUp}
                  data-row={rowIndex}
                  data-col={colIndex}
                >
                  {cell.letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {toast.visible && (
        <Toast message={toast.message} type={toast.type} />
      )}
    </div>
  );
};

export default WordSearch;
