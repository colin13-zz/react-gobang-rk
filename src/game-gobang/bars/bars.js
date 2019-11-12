import React, { useContext } from "react";
import "./bars.css";
import { GobangStateContext } from "../game/game";
import {
  Col,
  Button,
  Card,
  ListGroup,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

export function PlayerBar(props) {
  const { switchPlayer, firstPlayer, isBlack, player1, player2 } = useContext(
    GobangStateContext
  );

  const _player1 = firstPlayer ? "⚫️" : "⚪️";
  const _player2 = firstPlayer ? "⚪️" : "⚫️";
  const p1Active = firstPlayer
    ? isBlack
      ? ""
      : "-active"
    : isBlack
    ? "-active"
    : "";
  const p2Active = p1Active === "-active" ? "" : "-active";
  const _firstPlayer = firstPlayer ? player2 : player1;
  const displayPlayer = "flex";
  return (
    <div>
      <Col
        className="bottonContainer-left"
        lg="auto"
        style={{ display: displayPlayer }}
      >
        <Card className="normalCards">
          <Card.Header>
            PLAYERS
            <TipButton
              key_="right"
              value="Click to decide who go first!"
              onClick={() => switchPlayer()}
              name="Switch Player"
              variant="switch"
            />
          </Card.Header>
        </Card>

        <Card className="normalCards">
          <Card.Text>
            <br />
            <strong>{_firstPlayer}</strong> go first
          </Card.Text>
          <ListGroup variant="flush">
            <ListGroup.Item className={"listItems" + p1Active}>
              {player1}
              <br /> {_player1}
            </ListGroup.Item>
            <ListGroup.Item className={"listItems" + p2Active}>
              {player2}
              <br /> {_player2}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </div>
  );
}

export function BottonBar(props) {
  const { changeMode, newGame } = useContext(GobangStateContext);
  const modeText = "Computer vs. User mode";
  const newGameText = (
    <p>
      Click to <strong>Start a new Game!</strong>
    </p>
  );
  return (
    <Col className="bottonContainer-right" md="auto">
      <TipButton
        key_="left"
        value={modeText}
        onClick={() => changeMode()}
        name={"Mode"}
        class_="normalButtons"
        variant="flat"
        size="xxl"
      />
      <TipButton
        key_="left"
        value={newGameText}
        onClick={() => newGame()}
        name={"New Game"}
        class_="normalButtons"
        variant="flat"
        size="xxl"
      />
    </Col>
  );
}

export function TipButton(props) {
  return (
    <OverlayTrigger
      key={props.key_}
      placement={props.key_}
      overlay={<Tooltip id={`tooltip-${props.key_}`}>{props.value}</Tooltip>}
    >
      <Button
        className={props.class_}
        variant={props.variant}
        size={props.size}
        onClick={props.onClick}
      >
        {props.name}
      </Button>
    </OverlayTrigger>
  );
}
