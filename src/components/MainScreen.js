import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';
import { nanoid } from 'nanoid';

export default function MainScreen() {
  const [trivia, setTrivia] = useState([]);

  const [checkResults, setCheckResults] = useState(false);

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
          ],
          id: nanoid(),
        }))
      );
    }
    getData();
  }, []);

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

  return (
    <main className="main">
      {questions}
      <button className="button" onClick={checkIfAllAnswers}>
        Check answers
      </button>
    </main>
  );
}
