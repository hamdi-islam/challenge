import {
  SET_ERRORS,
  INIT_PLAYERS,
  UPDATE_SCORE,
  STOP_SHUFFLING,
  SWITCH_PLAYER,
  SET_SHUFFLING,
  GAME_ENDED,
  RESTART_GAME,
  EXIT_GAME,
  error_msg,
} from "../constants";

export const setErrors = (payload) => {
  return {
    type: SET_ERRORS,
    payload,
  };
};

export const initPlayers = (
  history,
  { player1 = "", player2 = "", maxScore }
) => {
  if (
    typeof parseInt(maxScore) !== "number" ||
    isNaN(parseInt(maxScore)) ||
    parseInt(maxScore) < 15
  ) {
    return setErrors(error_msg);
  }
  history && history.push({ pathname: "/game" });
  return {
    type: INIT_PLAYERS,
    payload: [player1, player2],
    maxScore,
  };
};

export const rollDice = (payload, gameEnded) => {
  return (dispatch) => {
    dispatch({ type: SET_SHUFFLING, payload });
    dispatch({ type: UPDATE_SCORE, payload });
    if (!gameEnded) {
      dispatch(switchPlayer(payload));
    }
  };
};

export const stopShuffling = () => {
  return {
    type: STOP_SHUFFLING,
  };
};

export const switchPlayer = (payload) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: SWITCH_PLAYER,
        payload,
      });
    }, 1000);
  };
};

export const endGame = (payload) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: GAME_ENDED,
        payload,
      });
    }, 500);
  };
};

export const restartGame = () => {
  return {
    type: RESTART_GAME,
  };
};

export const exitGame = () => {
  return {
    type: EXIT_GAME,
  };
};
