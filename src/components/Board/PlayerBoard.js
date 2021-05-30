import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { rollDice, endGame } from "../../redux/actions/gameActions";

function PlayerBoard({ player }) {
  const { gameStatus } = useSelector((state) => state);
  const { maxScore, hasWinner, isShuffling } = gameStatus;

  const dispatch = useDispatch();

  const shuffle = () => {
    const number = Math.floor(Math.random() * 6) + 1;
    if (!hasWinner && !isShuffling) {
      if (player.totalScore <= maxScore) {
        if (player.totalScore + number >= maxScore) {
          dispatch(rollDice(number, hasWinner));
          return dispatch(endGame(player.name));
        }
        return dispatch(rollDice(number, hasWinner));
      }
    }
  };

  return (
    <div className="player-board">
      <h3>{player.name}</h3>
      <span className={`status ${player.active ? "primary" : "secondary"}`} />
      <div className={`total-score ${player.active ? "primary" : "secondary"}`}>
        <p>{player.totalScore}</p>
        <div className={`roll-score ${!player.showScore && "hide"}`}>
          + {player.shuffle}
        </div>
      </div>

      <button
        className={`button ${player.active ? "primary" : "secondary"}`}
        onClick={() => shuffle()}
        disabled={!player.active}
      >
        Run
      </button>
    </div>
  );
}

export default PlayerBoard;
