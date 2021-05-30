/**
 * functional component that is the first thing a player should see when starting a game
 * this compenent should take player names (optional) and max score (required)
 */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { initPlayers } from "../../redux/actions/gameActions";

function Settings() {
  const [state, setState] = useState({
    player1: "",
    player2: "",
    maxScore: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.gameStatus);

  const handleChange = (e) => {
    e.preventDefault();
    let { value, name } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(initPlayers(history, state));
  };

  return (
    <div className="settings-wrapper">
      <div className="settings">
        <h3>Game settings</h3>
        <p>{message}</p>
        <div>
          <label>Player 1</label>
          <input
            type="text"
            name="player1"
            value={state.player1}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Player 2</label>
          <input
            type="text"
            name="player2"
            value={state.player2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Max score</label>
          <input
            type="number"
            name="maxScore"
            value={state.maxScore}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="button primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Settings;
