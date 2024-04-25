import React from "react";
import styles from "@/components/NotFound/NotFound.module.css";

const NotFound: React.FC = () => {
  const getRandomLetter = (): string => {
    const alphabet = "ABCEGHIJKLMPQRSVWXYZ";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  };

  const wordList = [
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    '4', '0', '4',
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    'N', 'O', 'T',
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    'F', 'O', 'U', 'N', 'D',
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
    getRandomLetter(),
  ];

  return (
    <div className="flex justify-center items-center h-screen">
      <div className={styles.grid}>
        {wordList.map((letter, index) => (
          <div
            key={index}
            className={`${styles.cell} ${['4', '0', '4', 'N', 'O', 'T', 'F', 'O', 'U', 'N', 'D'].includes(letter) ? styles.greenCell : ''}`}
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotFound;
