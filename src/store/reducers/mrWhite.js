import _ from 'lodash';
import {ADD_PLAYER, LOAD_WORDS, REMOVE_PLAYERS, REMOVE_WORD} from '../actions/ActionTypes';

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_PLAYER:
      const newPlayers = _.cloneDeep(state.players);
      newPlayers.push(
          action.payload);
      return { players: newPlayers, words: state.words}

    case REMOVE_PLAYERS:
      return { players: [], words: state.words}

    case LOAD_WORDS:
      state.words = action.payload;
      return state;

    case REMOVE_WORD:
      const indexToRemove = state.words.findIndex(action.payload)
      state.words.splice(indexToRemove, 1);
      return state;

    default:
      return {words: [], players: []};
  }
  return state;
}