import React from 'react';

export default function StartScreen(props) {
  return (
    <div className="start">
      <h1 className="start--title">Quizzical</h1>
      <h3 className="start--description">
        Prove your knowledge and enjoy a fantastic reward!
      </h3>
      <button onClick={props.handleStart} className="start--button button">
        Start quiz
      </button>
    </div>
  );
}
