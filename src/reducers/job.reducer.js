const JobReducer = (state = [], action) => {
    switch (action.type) {
        case 'get_jobs':
            return action.payload;
        default:
            return state;
    }
};

export default JobReducer;