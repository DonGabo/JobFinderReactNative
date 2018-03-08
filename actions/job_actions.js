import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import { FETCH_JOBS, LIKE_JOB } from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript',
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });

  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, redirect) => async (dispatch) => {
  try {
    const zip = reverseGeocode(region);
    const url = buildJobsUrl(zip);
    const { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: data });
    redirect();
  } catch (err) {
    console.log('error', err);
  }
};

export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB,
  };
};
