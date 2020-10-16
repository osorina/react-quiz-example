import axios from 'axios';
import { AUTH_LOGOUT, AUTH_SUCCESS } from './actionTypes';

export function auth(email, password, isLogin) {
    return async (dispatch) => {
        const settings = {
            email,
            password,
            returnSecureToken: true,
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
        }

        url += '?key=AIzaSyDvCB39YSBlxgKvakS19CkGTPgv_Qb3_pw';

        try {
            const response = await axios.post(url, settings);
            const data = response.data;

            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

            localStorage.setItem('token', data.idToken);
            localStorage.setItem('userId', data.localId);
            localStorage.setItem('expirationDate', expirationDate);

            dispatch(authSuccess(data.idToken));
            dispatch(autoLogout(data.expiresIn));
        } catch (error) {
            console.log(error);
        }
    };
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token,
    };
}

export function autoLogin() {
    return (dispatch) => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
}

export function autoLogout(time) {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000);
    };
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    return {
        type: AUTH_LOGOUT,
    };
}
