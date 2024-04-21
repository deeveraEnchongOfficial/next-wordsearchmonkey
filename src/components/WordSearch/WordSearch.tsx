"use client";
import React, { useState, useEffect } from "react";
import styles from "@/components/WordSearch/WordSearch.module.css";
import WordList from "@/components/WordList/WordList";
import Toast from "@/components/Toast";
import WordCounter from "@/components/WordCounter";
import Timer from "@/components/Timer";
import CompleteModal from "@/components/CompleteModal"

interface Cell {
  letter: string;
  selected: boolean;
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
}

const WordSearch = ( wordsProp: WordSearchProps ) => {
  const { words } = wordsProp;
  const gridSize = 15;

  const [grid, setGrid] = useState<Cell[][]>([]);
  const [selectedCells, setSelectedCells] = useState<Position[]>([]);
  const [correctWords, setCorrectWords] = useState<[Position[], string][]>([]);
  const [initialMove, setInitialMove] = useState<Position | null>(null);
  const [toast, setToast] = useState<Toast>({
    visible: false,
    message: "",
    type: "success",
  });
  const [wordList, setWordList] = useState<string[]>([]);
  const [isGridInteracted, setIsGridInteracted] = useState<boolean>(false);

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
  }, [wordList]);

  useEffect(() => {
    if (correctWords.length === wordList.length) {
      setIsGridInteracted(false);
    }
  }, [correctWords, wordList]);

  useEffect(() => {
    function generateGrid() {
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
          const direction = directions[Math.floor(Math.random() * directions.length)];
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
  }, [words]); // Ensures this effect only runs when words changes


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

  const isValidNextCell = (lastCell: Position, nextCell: Position): boolean => {
    if (!lastCell) return true;

    const dx = nextCell.row - lastCell.row;
    const dy = nextCell.col - lastCell.col;

    if (selectedCells.length === 1) {
      setInitialMove({ row: dx, col: dy });
    }

    if (selectedCells.length > 1 && initialMove) {
      // If the change in x-direction (dx) is not equal to the initial row, reset the initial move
      if (dx !== initialMove.row) {
        return false;
      }
    }

    if (selectedCells.length > 1 && initialMove) {
      // If the change in x-direction (dx) is not equal to the initial row, reset the initial move
      if (dy !== initialMove.col) {
        return false;
      }
    }

    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) return false;
    if (dx === 0 && dy === 0) return false;

    if (selectedCells.length > 1) {
      const direction = {
        x: nextCell.row - selectedCells[0].row,
        y: nextCell.col - selectedCells[0].col,
      };
      const normalizedDirection = {
        x: Math.sign(direction.x),
        y: Math.sign(direction.y),
      };
      const prevDirection = {
        x: lastCell.row - selectedCells[0].row,
        y: lastCell.col - selectedCells[0].col,
      };
      const normalizedPrevDirection = {
        x: Math.sign(prevDirection.x),
        y: Math.sign(prevDirection.y),
      };

      return (
        normalizedDirection.x === normalizedPrevDirection.x &&
        normalizedDirection.y === normalizedPrevDirection.y
      );
    }

    return true;
  };

  const handleMouseDown = (row: number, col: number) => {
    if (correctWords.length != wordList.length) {
      setIsGridInteracted(true);
    }
    const newSelectedCells = [{ row, col }];
    setSelectedCells(newSelectedCells);
    const newGrid = grid.map((gridRow, rowIndex) =>
      gridRow.map((cell, colIndex) => ({
        ...cell,
        selected: rowIndex === row && colIndex === col,
      }))
    );
    setGrid(newGrid);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (selectedCells.length > 0) {
      const nextCell = { row, col };
      const lastCell = selectedCells[selectedCells.length - 1];
      if (isValidNextCell(lastCell, nextCell)) {
        const newSelectedCells = [...selectedCells, nextCell];
        setSelectedCells(newSelectedCells);
        const newGrid = grid.map((gridRow, rowIndex) =>
          gridRow.map((cell, colIndex) => ({
            ...cell,
            selected: newSelectedCells.some(
              (sc) => sc.row === rowIndex && sc.col === colIndex
            ),
          }))
        );
        setGrid(newGrid);
      }
    }
  };

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>,
    row: number,
    col: number
  ): void => {
    if (correctWords.length != wordList.length) {
      setIsGridInteracted(true);
    }
    event.preventDefault(); // Prevent scrolling
    handleMouseDown(row, col);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>): void => {
    event.preventDefault(); // Prevent scrolling
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      const target = document.elementFromPoint(
        touch.clientX,
        touch.clientY
      ) as HTMLDivElement;

      if (target && target.dataset.row && target.dataset.col) {
        const newRow = parseInt(target.dataset.row, 10);
        const newCol = parseInt(target.dataset.col, 10);

        // Assuming lastCell is the last cell in the selectedCells array
        const lastCell = selectedCells[selectedCells.length - 1];

        if (lastCell) {
          const dx = newRow - lastCell.row;
          const dy = newCol - lastCell.col;

          // If this is the first move after the initial selection
          if (
            initialMove &&
            Math.abs(initialMove.row) === 1 &&
            Math.abs(initialMove.col) === 1
          ) {
            const isDiagonal =
              Math.abs(initialMove.row) === 1 &&
              Math.abs(initialMove.col) === 1;
            const movingDiagonally = Math.abs(dx) === 1 && Math.abs(dy) === 1;
            const directionChanged =
              (isDiagonal && !movingDiagonally) ||
              (!isDiagonal && movingDiagonally);

            // If trying to change direction (diagonal to non-diagonal or vice versa), return early
            if (directionChanged) {
              return;
            }
          }

          handleMouseEnter(newRow, newCol);
        }
      }
    }
  };

  const handleTouchEnd = () => {
    finalizeSelection();
  };

  const handleMouseUp = () => {
    finalizeSelection();
  };

  const finalizeSelection = () => {
    const selectedWord = selectedCells
      .map(({ row, col }) => grid[row][col].letter)
      .join("");

    if (wordList.includes(selectedWord) && !correctWords.some(([_, word]) => word === selectedWord)) {
      // Store the positions and word as a tuple
      setCorrectWords([...correctWords, [selectedCells, selectedWord]]);
      setToast({
        visible: true,
        message:
          successMessages[Math.floor(Math.random() * successMessages.length)],
        type: "success",
      });
    } else {
      setGrid(
        grid.map((row) => row.map((cell) => ({ ...cell, selected: false })))
      );
      if (selectedCells.length > 1) {
        setToast({
          visible: true,
          message:
            failMessages[Math.floor(Math.random() * failMessages.length)],
          type: "failure",
        });
      }
    }
    setSelectedCells([]);

    // Automatically hide the toast after 3 seconds
    setTimeout(() => setToast({ visible: false, message: "", type: "" }), 3000);
  };

  return (
    <div className={styles.gridContainer}>
      {correctWords.length == wordList.length && <CompleteModal />}
      {wordList?.length > 0 && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <WordCounter correctCount={correctWords.length} totalCount={wordList.length}/>
          <Timer isActive={isGridInteracted}/>
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
                  onTouchStart={(e) => handleTouchStart(e, rowIndex, colIndex)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
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
