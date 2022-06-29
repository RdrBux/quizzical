import React from 'react';
import classNames from 'classnames';

export default function Quiz(props) {
  const { id, question, answers, selectAnswer, results } = props;

  const allAnswers = answers.map((answ) => (
    <div
      className={classNames({
        'quiz--answer': true,
        selected: answ.isSelected,
        'results--correct': results && answ.isCorrect,
        'results--incorrect': results && answ.isSelected && !answ.isCorrect,
        'results--transparent': results && !answ.isCorrect,
      })}
      onClick={() => selectAnswer(answ.id, id)}
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
