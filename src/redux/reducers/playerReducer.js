import {
  SWITCH_PLAYER,
  INIT_PLAYERS,
  UPDATE_SCORE,
  RESTART_GAME,
  EXIT_GAME,
} from "../constants";
const initialState = [
  {
    name: "Player 1",
    active: false,
    totalScore: 0,
    shuffle: 0,
    showScore: false,
  },
  {
    name: "Player 1",
    active: false,
    totalScore: 0,
    shuffle: 0,
    showScore: false,
  },
];

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_PLAYERS:
      return init_players(state, action);
    case UPDATE_SCORE:
      return updateScore(state, action);
    case SWITCH_PLAYER:
      return switchPlayer(state, action);
    case RESTART_GAME:
      return restartGame(state);
    case EXIT_GAME:
      return [...initialState];

    default:
      return state;
  }
}

/**
 * initialize players at the beginning of the game &
 * set which player starts first randomly
 * @param {Array} state
 * @param {Obj} action
 * @returns updated state
 */
function init_players(state, action) {
  const newState = [...state];
  const randomPLayer = Math.round(Math.random());
  action.payload.forEach((player, i) => {
    newState[i].name = player === "" ? `Player ${i + 1}` : player;
    newState[randomPLayer].active = true;
  });
  return newState;
}

/**
 * rolling the dice should perform the following steps:
 * - total score updated after each roll
 * - show the small circle (showScore)
 * - switch to the next player if the roll is < 6 otherwise continue playing
 * @param {Array} state
 * @param {Number} action
 * @returns
 */
function updateScore(state, action) {
  const newState = [...state];
  const activePlayerIndex = state.findIndex((player) => player.active);
  newState[activePlayerIndex] = {
    ...state[activePlayerIndex],
    showScore: true,
    shuffle: action.payload,
    totalScore: newState[activePlayerIndex].totalScore + action.payload,
  };

  return newState;
}

/**
 * switch the active player to the next one if the score is less than 6
 * and update the parameters accordingly e.g (showScore)
 * @param {Array} state
 * @param {Obj} action
 * @returns new state [Array]
 */

function switchPlayer(state, action) {
  const newState = [...state];
  const activePlayerIndex = state.findIndex((player) => player.active);
  newState[activePlayerIndex].showScore = false;
  if (action.payload < 6) {
    newState[activePlayerIndex].active = false;
    newState[activePlayerIndex === 0 ? 1 : 0].active = true;
    return newState;
  }

  return newState;
}

/**
 * restarts the game to its initial state without changing the player names
 * and set a starting player at random again
 * @param {Array} state
 * @returns new state
 */

function restartGame(state) {
  const random = Math.round(Math.random());
  const newState = [...state].map((player, i) => {
    return {
      name: player.name,
      active: random === i,
      totalScore: 0,
      shuffle: 0,
      showScore: false,
    };
  });

  return newState;
}
