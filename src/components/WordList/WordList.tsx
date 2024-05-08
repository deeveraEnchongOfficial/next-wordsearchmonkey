import React, { useState, useEffect } from "react";
import styles from "@/components/WordList/wordList.module.css";

type Props = {
  wordList: string[];
  correctWords: [Position[], string][];
};

type Position = {
  row: number;
  col: number;
};

const WordList: React.FC<Props> = ({ wordList, correctWords }) => {
  const [completedWords, setCompletedWords] = useState<string[]>([]);

  useEffect(() => {
    const completed = correctWords.map((item) => item[1]); // item[1] is the string part of the tuple
    setCompletedWords(completed);
  }, [correctWords]);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {wordList?.map((word, index) => {
          const isCompleted = completedWords.includes(word);
          return (
            <li key={index} className={isCompleted ? styles.completed : styles.item}>
              {word}
            </li>
          );
        })}
      </ul>
      <text className={styles.counter}>{correctWords.length} / {wordList.length}</text>
    </div>
  );
};

export default WordList;
