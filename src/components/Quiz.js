import React from 'react';

export default function Quiz(props) {
  const { id, question, answers, selectAnswer, results } = props;

  const allAnswers = answers.map((answ) => (
    <div
      className="quiz--answer"
      onClick={() => selectAnswer(answ.id, id)}
      style={{
        backgroundColor: answ.isSelected ? '#D6DBF5' : '#F5F7FB',
      }}
      key={answ.id}
      id={answ.id}
    >
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
