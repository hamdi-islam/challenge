import { cleanup } from "@testing-library/react";
import * as actions from "../../redux/actions/gameActions";
import * as types from "../../redux/constants";

beforeEach(cleanup);

describe("init", () => {
  it("should init players", () => {
    const data = { player1: "player 1", player2: "player 2", maxScore: 15 };
    const expectedAction = {
      type: types.INIT_PLAYERS,
      payload: [data.player1, data.player2],
      maxScore: data.maxScore,
    };
    expect(actions.initPlayers(null, data)).toEqual(expectedAction);
  });
});

describe("roll dice", () => {
  it("should roll the dice", () => {
    const data = { roll: 1, gameEnded: false };
    expect(actions.rollDice(data.roll, data.gameEnded)).toEqual(
      expect.any(Function)
    );
  });
});

describe("stop shuffling", () => {
  it("should stop shuffling", () => {
    const expectedAction = {
      type: types.STOP_SHUFFLING,
    };
    expect(actions.stopShuffling()).toEqual(expectedAction);
  });
});

describe("switch player", () => {
  it("should switch player", () => {
    const roll = 3;
    expect(actions.switchPlayer(roll)).toEqual(expect.any(Function));
  });
});

describe("end the game", () => {
  it("should end the game", () => {
    const winner = "player 1";
    expect(actions.endGame(winner)).toEqual(expect.any(Function));
  });
});

describe("restart the game", () => {
  it("should restart the game", () => {
    const expectedAction = {
      type: types.RESTART_GAME,
    };
    expect(actions.restartGame()).toEqual(expectedAction);
  });
});

describe("exit the game", () => {
  it("should exit the game", () => {
    const expectedAction = {
      type: types.EXIT_GAME,
    };
    expect(actions.exitGame()).toEqual(expectedAction);
  });
});

describe("set message", () => {
  it("should set a message", () => {
    const message = types.error_msg;
    const expectedAction = {
      type: types.SET_ERRORS,
      payload: message,
    };
    expect(actions.setErrors(message)).toEqual(expectedAction);
  });
});
