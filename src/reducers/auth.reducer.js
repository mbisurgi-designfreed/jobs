const AuthReducer = (state = {}, action) => {
    switch (action.type) {
        case 'fb_login_success':
            return { token: action.payload };
        case 'fb_login_fail':
            return { token: null };
        default:
            return state;
    }
};

export default AuthReducer;