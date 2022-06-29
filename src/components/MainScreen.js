import React from 'react';
import Quiz from './Quiz';

export default function MainScreen() {
  return (
    <main className="main">
      <Quiz />
      <Quiz />
      <Quiz />
      <Quiz />
      <button className="button">Check answers</button>
    </main>
  );
}
