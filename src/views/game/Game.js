import React, { lazy, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { restartGame, exitGame } from "../../redux/actions/gameActions";

import Modal from "../../components/Modals/modal";
import "../../styles/Game.css";

const PlayerBoard = lazy(() => import("../../components/Board/PlayerBoard"));
function Game() {
  const { players, gameStatus } = useSelector((state) => state);
  const { isShuffling, currentShuffle, openModal, message } = gameStatus;
  const [dice, setDice] = useState(0);
  const modalRef = useRef();
  const dispatch = useDispatch();

  /**
   * dice shuffling animation
   */
  useEffect(() => {
    if (isShuffling) {
      var i = 0;
      function myLoop() {
        setTimeout(function () {
          i++;
          setDice(Math.floor(Math.random() * 6) + 1);
          if (i < 16) {
            myLoop();
          } else {
            setDice(currentShuffle);
          }
        }, 30);
      }
      return myLoop();
    }
  }, [isShuffling, currentShuffle]);

  /**
   * open the model when it is ready
   */

  useEffect(() => {
    if (openModal) {
      modalRef.current.openModal();
    }
  }, [openModal]);

  return (
    <div className="game-wrapper">
      <div className="board">
        <Modal ref={modalRef}>
          <button className="exit" onClick={() => modalRef.current.close()}>
            x
          </button>
          <h3>{message}</h3>
          <div className="actions">
            <button
              className="button primary"
              onClick={() => {
                dispatch(restartGame());
                modalRef.current.close();
              }}
            >
              New game
            </button>
            <button
              className="button secondary"
              onClick={() => dispatch(exitGame())}
            >
              Exit
            </button>
          </div>
        </Modal>
        <div className="dice-wrapper">
          {Array(dice)
            .fill(1)
            .map((_d, i) => (
              <span className="dice-dot" key={i} />
            ))}
        </div>
        {players.map((player, i) => (
          <div className="item" key={i}>
            <PlayerBoard player={player} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
