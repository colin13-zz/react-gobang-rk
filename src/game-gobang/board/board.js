import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { GobangStateContext } from "../game/game";
import { GameOver } from "../wrapper/wrapper";

import "./board.css";

export function Box(props) {
  const className_ = "box" + props.type;
  const matrix = props.matrix;
  const x_ = props.position.x,
    y_ = props.position.y;
  const content = matrix[x_][y_] ? matrix[x_][y_] : "";
  return (
    <Col
      className={className_}
      onClick={() => {
        if (!props.modeIsMulti && !props.isBlack)
          // => Computer should be select the box
          return false;
        props._updateMatrix(x_, y_);
      }}
    >
      <div className="piece">{content}</div>
    </Col>
  );
}

export function BoardRow(props) {
  const row = parseInt(props.row);
  var center = row === 2 || row === 7 || row === 12 ? "-center" : "";
  return (
    <Row className="board-row">
      {[
        { y: 0, type: "-left" + props.type },
        { y: 1, type: props.type },
        { y: 2, type: center + props.type },
        { y: 3, type: props.type },
        { y: 4, type: props.type },
        { y: 5, type: props.type },
        { y: 6, type: props.type },
        { y: 7, type: center + props.type },
        { y: 8, type: props.type },
        { y: 9, type: props.type },
        { y: 10, type: props.type },
        { y: 11, type: props.type },
        { y: 12, type: center + props.type },
        { y: 13, type: props.type },
        { y: 14, type: "-right" + props.type }
      ].map(placement => (
        <Box
          key={placement.y}
          matrix={props.matrix}
          position={{ x: row, y: placement.y }}
          _updateMatrix={props._updateMatrix}
          modeIsMulti={props.modeIsMulti}
          isBlack={props.isBlack}
          type={placement.type}
        />
      ))}
    </Row>
  );
}

const GobangBoard = (props) => {
  const {
    matrix,
    modeIsMulti,
    isBlack,
    _updateMatrix,
    gameOver,
    winner
  } = useContext(GobangStateContext);

  const rotate_ = "0";
  return (
    <Col
      className="board"
      md="auto"
      style={{ transform: `rotate(${rotate_}deg)` }}
    >
      <GameOver gameOver={gameOver} winner={winner} />
      {[
        { type: "-top", row: "0" },
        { type: "", row: "1" },
        { type: "", row: "2" },
        { type: "", row: "3" },
        { type: "", row: "4" },
        { type: "", row: "5" },
        { type: "", row: "6" },
        { type: "", row: "7" },
        { type: "", row: "8" },
        { type: "", row: "9" },
        { type: "", row: "10" },
        { type: "", row: "11" },
        { type: "", row: "12" },
        { type: "", row: "13" },
        { type: "-bottom", row: "14" }
      ].map(placement => (
        <BoardRow
          key={placement.row}
          matrix={matrix}
          _updateMatrix={_updateMatrix}
          modeIsMulti={modeIsMulti}
          isBlack={isBlack}
          type={placement.type}
          row={placement.row}
        />
      ))}
    </Col>
  );
};

export default GobangBoard;
