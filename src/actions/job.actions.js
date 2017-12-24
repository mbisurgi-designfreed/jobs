import axios from 'axios';
import geocode from 'latlng-to-zip';
import qs from 'qs';

const URL = 'http://api.indeed.com/ads/apisearch?';
const QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript'
};

export const getJobs = (region, cb) => {
    return async (dispatch) => {
        try {
            const zip = await geocode(region);

            const query = qs.stringify({ ...QUERY_PARAMS, l: zip });

            const { data } = await axios.get(`${URL}${query}`);

            dispatch({
                type: 'get_jobs',
                payload: data.results
            });

            cb();
        } catch (err) {
            console.log(err);
        }
    };
};
