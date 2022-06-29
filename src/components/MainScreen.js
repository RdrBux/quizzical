import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Quiz from './Quiz';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function MainScreen() {
  const [trivia, setTrivia] = useState([]);

  const [checkResults, setCheckResults] = useState(false);

  const [totalGames, setTotalGames] = useState(0);

  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    function decodeHtml(html) {
      var txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    }

    function formatAnswer(answerElement, correct = false) {
      return {
        answer: decodeHtml(answerElement),
        isCorrect: correct,
        isSelected: false,
        id: nanoid(),
      };
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    async function getData() {
      const resp = await fetch(
        'https://opentdb.com/api.php?amount=5&type=multiple'
      );
      const data = await resp.json();
      setTrivia(
        data.results.map((element) => ({
          question: decodeHtml(element.question),
          answers: [
            formatAnswer(element.correct_answer, true),
            formatAnswer(element.incorrect_answers[0]),
            formatAnswer(element.incorrect_answers[1]),
            formatAnswer(element.incorrect_answers[2]),
          ]
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value),
          id: nanoid(),
        }))
      );
    }
    getData();
  }, [totalGames]);

  const questions = trivia.map((quiz) => (
    <Quiz
      key={quiz.id}
      id={quiz.id}
      question={quiz.question}
      answers={quiz.answers}
      selectAnswer={selectAnswer}
      results={checkResults}
    />
  ));

  function selectAnswer(answId, quizId) {
    setTrivia((prevState) =>
      prevState.map((quiz) =>
        quiz.id === quizId
          ? {
              ...quiz,
              answers: quiz.answers.map((answer) =>
                answer.id === answId
                  ? { ...answer, isSelected: true }
                  : { ...answer, isSelected: false }
              ),
            }
          : { ...quiz }
      )
    );
  }

  function checkIfAllAnswers() {
    let total = 0;
    trivia.forEach(
      (quiz) => quiz.answers.some((answer) => answer.isSelected) && total++
    );
    if (total === 5) return true;
  }

  function checkCorrectAnswers() {
    setCorrectAnswers(0);
    trivia.forEach(
      (quiz) =>
        quiz.answers.some((answer) => answer.isSelected && answer.isCorrect) &&
        setCorrectAnswers((prevState) => prevState + 1)
    );
  }

  function handleResults() {
    if (checkIfAllAnswers()) {
      checkCorrectAnswers();
      setCheckResults(true);
    }
  }

  function handlePlayAgain() {
    setCheckResults(false);
    setTotalGames((prev) => !prev);
  }

  return (
    <main className="main">
      {checkResults && correctAnswers === 5 ? <Confetti /> : undefined}
      {questions}
      <div className="main--foot">
        <div
          className="main--foot"
          style={{ display: checkResults ? '' : 'none' }}
        >
          <h3>You scored {correctAnswers}/5 correct answers</h3>
          <button className="button" onClick={handlePlayAgain}>
            Play again
          </button>
        </div>
        <button
          style={{ display: checkResults ? 'none' : '' }}
          className="button"
          onClick={handleResults}
        >
          Check answers
        </button>
      </div>
    </main>
  );
}
