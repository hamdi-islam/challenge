import gameReducer from "./reducers/gameReducer";
import playerReducer from "./reducers/playerReducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  gameStatus: gameReducer,
  players: playerReducer,
});

export default rootReducers;
