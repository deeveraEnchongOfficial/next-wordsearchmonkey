import React from 'react';

interface WordCounterProps {
  correctCount: number;
  totalCount: number;
}

const WordCounter: React.FC<WordCounterProps> = ({ correctCount, totalCount }) => {
  const percentage = (correctCount / totalCount) * 100;
  const circumference = 2 * Math.PI * 32; // Circumference of the circle with radius 32
  const dashOffset = circumference - (circumference * percentage) / 100;

  return (
    <>
      <div className="relative h-32 w-32">
        <svg className="h-full w-full" viewBox="0 0 100 100">

          {/* Background circle */}
          <circle
            className="stroke-current text-gray-200"
            strokeWidth="10"
            cx="50"
            cy="50"
            r="32"
            fill="transparent"
          ></circle>

          {/* Progress circle */}
          <circle
            className="stroke-current transition-all duration-1000 ease-in-out transform-gpu"
            strokeWidth="10"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="32"
            fill="transparent"
            strokeDasharray={circumference} // Set strokeDasharray to the circumference
            style={{ strokeDashoffset: dashOffset, stroke: '#FFA101' }}
          ></circle>

          {/* Center text */}
          <text
            x="50"
            y="50"
            fontFamily="Arial"
            fontSize="12"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {correctCount} / {totalCount}
          </text>
        </svg>
      </div>
    </>
  );
};

export default WordCounter;
