import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';

export default function MainScreen() {
  const [trivia, setTrivia] = useState([]);

  useEffect(() => {
    function decodeHtml(html) {
      var txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
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
            {
              answer: decodeHtml(element.correct_answer),
              isCorrect: true,
            },
            {
              answer: decodeHtml(element.incorrect_answers[0]),
              isCorrect: false,
            },
            {
              answer: decodeHtml(element.incorrect_answers[1]),
              isCorrect: false,
            },
            {
              answer: decodeHtml(element.incorrect_answers[2]),
              isCorrect: false,
            },
          ],
        }))
      );
    }
    getData();
  }, []);

  const questions = trivia.map((quiz, index) => (
    <Quiz
      key={index}
      question={quiz.question}
      answers={quiz.answers}
      id={index}
    />
  ));

  return (
    <main className="main">
      {questions}
      <button className="button">Check answers</button>
    </main>
  );
}
