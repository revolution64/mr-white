

import {ADD_PLAYER} from '../actions/ActionTypes';

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_PLAYER:
      const newPlayers = state.slice();
      newPlayers.push(
          action.payload);
      return newPlayers;

    default:
      return [{name: 'Seppe', color: 'blue'}, {name: 'An', color: 'red'}, {name: 'Pieter', color: 'black'}];
  }
  return state;
}