
import { ADD_PLAYER, LOAD_WORDS, REMOVE_WORD} from './ActionTypes';
import { WORDS } from '../../constants/Words';

const addPlayer = (player) => {
  return {
    type: ADD_PLAYER,
    payload: player
  };
};

const loadWords = () => {
  return {
    type: LOAD_WORDS,
    payload: WORDS
  };
};

const removeWord = (word) => {
  return {
    type: REMOVE_WORD,
    payload: word
  };
};


export default {addPlayer, loadWords, removeWord};
