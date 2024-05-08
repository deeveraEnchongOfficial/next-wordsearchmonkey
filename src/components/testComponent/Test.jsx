import React, { useState, useEffect } from 'react';
import './WordSearch.css';

const WordSearch = () => {
  const gridSize = 20;
  const wordList = [
    'REACT', 'NODE', 'JAVA', 'CSS', 'HTML', 'JAVASCRIPT',
    'ANGULAR', 'VUE', 'REACTNATIVE', 'TYPESCRIPT', 'PYTHON',
    'RUBY', 'PHP', 'SWIFT', 'KOTLIN', 'OBJECTIVEC', 'SQL',
    'MONGODB', 'POSTGRESQL', 'MYSQL',
  ].map(word => word.toUpperCase()); // Ensure all words are uppercase for comparison

  const [grid, setGrid] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [lines, setLines] = useState([]);
  const [correctWords, setCorrectWords] = useState([]);

  useEffect(() => {
    generateGrid();
  }, []);

  const generateGrid = () => {
    // Initialize empty grid
    let initialGrid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => ({ letter: '', selected: false }))
    );
  
    // Function to place a word in the grid
    const placeWordInGrid = (word) => {
      for (let attempts = 0; attempts < 100; attempts++) {
        const direction = Math.floor(Math.random() * 3); // 0 = horizontal, 1 = vertical, 2 = diagonal
        const rowStart = Math.floor(Math.random() * gridSize);
        const colStart = Math.floor(Math.random() * gridSize);
        const incrementRow = direction === 1 ? 1 : (direction === 2 ? (Math.random() > 0.5 ? 1 : -1) : 0);
        const incrementCol = direction === 0 ? 1 : (direction === 2 ? (Math.random() > 0.5 ? 1 : -1) : 0);
  
        // Check if the word fits
        let fits = true;
        let row = rowStart;
        let col = colStart;
        for (let i = 0; i < word.length; i++) {
          if (row < 0 || row >= gridSize || col < 0 || col >= gridSize || (initialGrid[row][col].letter !== '' && initialGrid[row][col].letter !== word[i])) {
            fits = false;
            break;
          }
          row += incrementRow;
          col += incrementCol;
        }
  
        // Place the word if it fits
        if (fits) {
          row = rowStart;
          col = colStart;
          for (let i = 0; i < word.length; i++) {
            initialGrid[row][col].letter = word[i];
            row += incrementRow;
            col += incrementCol;
          }
          return true;
        }
      }
      return false;
    };
  
    // Try placing each word in the word list
    wordList.forEach(word => {
      if (!placeWordInGrid(word)) {
        console.error('Failed to place word:', word);
      }
    });
  
    // Fill remaining spaces with random letters
    initialGrid = initialGrid.map(row => row.map(cell => ({
      ...cell,
      letter: cell.letter || getRandomLetter(),
    })));
  
    setGrid(initialGrid);
  };
  

  const getRandomLetter = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  const handleMouseDown = (row, col) => {
    setStartPoint({ row, col });
    setEndPoint(null); // Reset end point on new selection
  };

  const handleMouseEnter = (row, col) => {
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
        selected: allSelectedCells.some(cell => cell.row === rowIndex && cell.col === colIndex),
      }))
    );
    setGrid(newGrid);
};

  const finalizeSelection = () => {
    if (!startPoint || !endPoint) return;
  
    const selectedCells = calculateLineCells(startPoint, endPoint);
    const selectedWord = selectedCells.map(({ row, col }) => grid[row][col].letter).join('');
  
    if (wordList.includes(selectedWord)) {
      setCorrectWords(prevWords => [...prevWords, selectedWord]);
      setLines(prevLines => [...prevLines, { start: startPoint, end: endPoint }]);
      // Update grid to mark cells as correct
      const newGrid = grid.map((row, rowIndex) => row.map((cell, colIndex) => {
        const isSelected = selectedCells.some(cell => cell.row === rowIndex && cell.col === colIndex);
        return {
          ...cell,
          selected: false, // Remove general selection
          correct: isSelected ? true : cell.correct // Mark as correct if part of correct word
        };
      }));
      setGrid(newGrid);
    } else {
      // Optionally reset grid selection visually here if needed
      const newGrid = grid.map(row => row.map(cell => ({
        ...cell,
        selected: false
      })));
      setGrid(newGrid);
    }
  };
  

  const calculateLineCells = (start, end) => {
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
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [startPoint, endPoint]);
  

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => {
            const cellClass = `cell ${cell.selected ? 'selected' : ''} ${cell.correct ? 'correct' : ''}`;
            return (
              <div
                key={colIndex}
                className={cellClass}
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
  );
};

export default WordSearch;
