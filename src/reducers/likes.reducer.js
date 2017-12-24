import { REHYDRATE } from 'redux-persist/constants';
import _ from 'lodash';

const LikesReducer = (state = [], action) => {
    switch (action.type) {
        case REHYDRATE:
            return action.payload.likes || [];
        case 'like_job':
            return _.uniqBy([action.payload, ...state], 'jobkey');
        case 'reset_likes':
            return [];
        default:
            return state;
    }
};

export default LikesReducer;
