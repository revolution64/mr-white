

import { OPEN_CONTENT} from '../actions/ActionTypes';
import CONSTANTS from '../../constants/Constants';

export default function reducer(state = 0, action) {
  switch (action.type) {
    case OPEN_CONTENT:
      return action.payload;
    default:
      return CONSTANTS.SECTION.MRWHITE;
  }
  return state;
}