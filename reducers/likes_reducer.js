import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/es/constants';

import { LIKE_JOB } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case REHYDRATE:
      if (action.payload) {
        return action.payload.likedJobs || [];
      }
      return [];
    case LIKE_JOB:
      return _.uniqBy([
        action.payload, ...state,
      ], 'jobkey');
    default:
      return state;
  }
}
