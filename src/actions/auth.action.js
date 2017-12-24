import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

const facebookLogin = async (dispatch) => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('132422984142075', { permissions: ['public_profile'] });

    console.log(type, token);

    if (type === 'cancel') {
        return dispatch({
            type: 'fb_login_fail'
        });
    }

    await AsyncStorage.setItem('token', token);

    dispatch({
        type: 'fb_login_success',
        payload: token
    });
};

export const auth = () => {
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');

        console.log(token);

        if (token) {
            dispatch({
                type: 'fb_login_success',
                payload: token
            });
        } else {
            facebookLogin(dispatch);
        }
    };
};

