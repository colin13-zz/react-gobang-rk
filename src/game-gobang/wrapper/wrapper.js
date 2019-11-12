import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import './wrapper.css';

export function GameOver(props) {
  return (
    (props.gameOver) ? (
      <div className="gameOverWrapper">
        <Jumbotron className="textArea">
          <h1>The Winner is<br/><strong>{props.winner}</strong>!</h1>
          <p>
            - Please Start A New Game to Continue - 
          </p>
        </Jumbotron>
      </div>
    ) : (
      <div></div>
    )
  );
}

