import React, { useEffect, useState, createContext } from "react";
import { Row } from "react-bootstrap";
import GobangBoard from "../board/board";
import { BottonBar, PlayerBar } from "../bars/bars";
import { createMatrix, checkWin } from "../matrix/matrix";
import "./game.css";

export const GobangStateContext = createContext();

export const updateMatrix = (matrix_, isBlack, currStep, x, y) => {
  if (matrix_[x][y]) return[matrix_, isBlack, currStep];
  const index = currStep + 1;
  const isBlack_ = !isBlack;
  matrix_[x][y] = isBlack_ ? "⚫️" : "⚪️";

  return [matrix_, isBlack_, index];
};

const GobangGame = () => {
  const [player1] = useState("Player 1");
  const [player2, setPlayer2] = useState("Player 2");
  const [currStep, setCurrStep] = useState(0);
  const [firstPlayer, setFirstPlayer] = useState(0);
  const [matrix, setMatrix] = useState(createMatrix(15, 15, 0));
  const [isBlack, setIsBlack] = useState(true);
  const [modeIsMulti, setModeIsMulti] = useState(true);

  let gameOver = false;
  let winner = "";

  useEffect(() => {
    setPlayer2(!modeIsMulti ? "Computer" : "Player 2");
    newGame();
  }, [modeIsMulti]);

  useEffect(() => {
    if (!modeIsMulti && !isBlack) _computerSelectBox();
  }, [isBlack]);

  const _updateMatrix = (x, y) => {
    const [matrix_, isBlack_, index] = updateMatrix(
      matrix,
      isBlack,
      currStep,
      x,
      y
    );
    setMatrix(matrix_);
    setIsBlack(isBlack_);
    setCurrStep(index);
  };

  /*
   AI Version
   Random for now
  */
  const _computerSelectBox = () => {
    let xRand;
    let yRand;
    let cell = 1;

    while (!gameOver && cell > 0) {
      xRand = Math.floor(Math.random() * 14);
      for (let i = 0; i < matrix[xRand].length; i++) {
        cell = matrix[xRand][i];
        if (cell === 0) {
          yRand = i;
          break;
        }
      }
    }

    if (!gameOver) _updateMatrix(xRand, yRand);
  };

  const switchPlayer = () => {
    const new1stPlayer = firstPlayer ? 0 : 1;
    setFirstPlayer(new1stPlayer);
  };

  const changeMode = () => {
    setModeIsMulti(!modeIsMulti);
  };

  const newGame = () => {
    setMatrix(createMatrix(15, 15, 0));
    setIsBlack(true);
    setCurrStep(0);
    gameOver = false;
    winner = "";
  };
  // check if there is a winner
  const result = checkWin(matrix);
  if (result.win) {
    gameOver = true;
    const _firstPlayer = firstPlayer ? player2 : player1;
    const _secondPlayer = firstPlayer ? player1 : player2;
    winner = currStep % 2 === 1 ? _firstPlayer : _secondPlayer;
  }

  return (
    <Row className="gameContainer mx-0">
      <GobangStateContext.Provider
        value={{
          switchPlayer,
          firstPlayer,
          isBlack,
          player1,
          player2
        }}
      >
        <PlayerBar />
      </GobangStateContext.Provider>

      <GobangStateContext.Provider
        value={{
          matrix,
          modeIsMulti,
          isBlack,
          _updateMatrix,
          gameOver,
          winner
        }}
      >
        <GobangBoard />
      </GobangStateContext.Provider>

      <GobangStateContext.Provider value={{ changeMode, newGame }}>
        <BottonBar />
      </GobangStateContext.Provider>
    </Row>
  );
};

export default GobangGame;
