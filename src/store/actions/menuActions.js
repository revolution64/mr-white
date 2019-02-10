// Actions are payloads of information that send data from your application to your store. 
// They are the only source of information for the store.

// Actions are triggered either by user through interactions or by an events, such as successful AJAX call.

// Read more on Actions - https://redux.js.org/docs/basics/Actions.html

import { OPEN_CONTENT } from './ActionTypes';

const openContent = (payload) => {
  return {
    type: OPEN_CONTENT,
    payload: payload
  };
}


export default openContent;
