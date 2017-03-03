import { combineReducers } from 'redux';

import notes from '../notes';
import connections from '../connections';

export default combineReducers({
  notes,
  connections
});
