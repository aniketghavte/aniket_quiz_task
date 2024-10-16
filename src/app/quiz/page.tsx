"use client"

import React, { useState, useEffect } from 'react';
import styles from './Quiz.module.css';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  },
  {
    id: 2,
    text: "What is the capital of Germany?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 1,
  },
  {
    id: 3,
    text: "What is the capital of Italy?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 3,
  },
  {
    id: 4,
    text: "What is the capital of Italy?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 3,
  },
  {
    id: 5,
    text: "What is the capital of Italy?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 3,
  },
  
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizEnded, setQuizEnded] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !quizEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizEnded) {
      handleNext();
    }
  }, [timeLeft, quizEnded]);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      if (selectedOption === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setTimeLeft(30);
    } else {
      setQuizEnded(true);
    }
  };

  if (quizEnded) {
    return (
      <div className={styles.container}>
        <h2>Quiz Ended</h2>
        <p>Your score: {score} out of {questions.length}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Question {currentQuestion + 1}</h2>
      <p>{questions[currentQuestion].text}</p>
      <ul className={styles.optionsList}>
        {questions[currentQuestion].options.map((option, index) => (
          <li key={index}>
            <button
              className={`${styles.optionButton} ${selectedOption === index ? styles.selected : ''}`}
              onClick={() => handleOptionSelect(index)}
              disabled={selectedOption !== null}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <p>Time left: {timeLeft} seconds</p>
        <button
          className={styles.nextButton}
          onClick={handleNext}
          disabled={selectedOption === null}
        >
          Next
        </button>
      </div>
    </div>
  );
}
