

import {ADD_PLAYER, OPEN_CONTENT} from '../actions/ActionTypes';

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_PLAYER:
      const newPlayers = state.slice();
      newPlayers.push(
          action.payload);
      return newPlayers;
  }
  return state;
}