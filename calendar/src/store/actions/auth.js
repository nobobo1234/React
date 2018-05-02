import * as actionTypes from "./actionTypes";
import { auth } from "../../firebase/";
import firebase from "firebase";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const authenticate = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        auth
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                return auth
                    .signInWithEmailAndPassword(email, password)
                    .then(user => {
                        dispatch(authSuccess(user.uid, user.getToken()));
                    })
                    .catch(error => {
                        dispatch(authFail(error.message));
                    });
            })
            .catch(error => {
                dispatch(authFail(error.message));
            });
    };
};

export const authStateUpdater = () => {
    return dispatch => {
        auth.onAuthStateChanged(user => {
            if (user) {
                dispatch(authSuccess(user.uid, user.getToken()));
            } else {
                dispatch(logout());
            }
        });
    };
};

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const logout = () => {
    return dispatch => {
        auth.signOut();
        dispatch(authLogout());
    };
};
