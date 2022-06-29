import React from 'react';

export default function Quiz(props) {
  const { question, answers } = props;
  const allAnswers = answers.map((answ, index) => (
    <div className="quiz--answer" key={index}>
      {answ.answer}
    </div>
  ));
  return (
    <div className="quiz">
      <h3 className="quiz--question">{question}</h3>
      <div className="quiz--answers-container">{allAnswers}</div>
      <hr />
    </div>
  );
}
