export const likeJob = (job) => {
    return {
        type: 'like_job',
        payload: job
    }
};

export const resetLikes = () => {
    return {
        type: 'reset_likes'
    }
};
