import {
  INIT_PLAYERS,
  SET_ERRORS,
  UPDATE_SCORE,
  SET_SHUFFLING,
  STOP_SHUFFLING,
  SWITCH_PLAYER,
  GAME_ENDED,
  RESTART_GAME,
  EXIT_GAME,
} from "../constants";

const initialState = {
  isPlaying: false,
  hasWinner: false,
  maxScore: null,
  isShuffling: false,
  currentShuffle: 0,
  message: "",
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_PLAYERS:
      return {
        ...state,
        hasWinner: false,
        maxScore: parseInt(action.maxScore),
        isPlaying: true,
        message: "",
        openModal: false,
      };
    case SET_SHUFFLING:
      return { ...state, isShuffling: true };
    case UPDATE_SCORE:
      return { ...state, currentShuffle: action.payload };
    case SWITCH_PLAYER:
      return { ...state, isShuffling: false };
    case STOP_SHUFFLING:
      return { ...state, isShuffling: false };
    case GAME_ENDED:
      return {
        ...state,
        hasWinner: true,
        openModal: true,
        message: action.payload + " wins !",
      };
    case RESTART_GAME:
      return {
        ...state,
        hasWinner: false,
        openModal: false,
        currentShuffle: 0,
        message: "",
      };
    case EXIT_GAME:
      return initialState;
    case SET_ERRORS:
      return {
        ...state,
        isPlaying: false,
        message: action.payload,
      };

    default:
      return state;
  }
}
