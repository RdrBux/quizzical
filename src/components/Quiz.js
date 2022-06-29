import React from 'react';

export default function Quiz() {
  return (
    <div className="quiz">
      <h3 className="quiz--question">How would one say goodbye in Spanish?</h3>
      <div className="quiz--answers-container">
        <div className="quiz--answer">Adiós</div>
        <div className="quiz--answer">Hola</div>
        <div className="quiz--answer">Au Revoir</div>
        <div className="quiz--answer">Salir</div>
      </div>
      <hr />
    </div>
  );
}
