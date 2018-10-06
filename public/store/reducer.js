import defaultState from "./default-state.js";

export const STORE_KEY = "root";

export const actionTypes = {
  SET_STATE: `${STORE_KEY}/set-State`,
  LOGIN_COUNT: `${STORE_KEY}/LOGIN_COUNT`,
};

export const actions = {
  setState: payload => ({
    type: actionTypes.SET_STATE,
    payload,
  }),
  loginCount: () => ({
    type: actionTypes.LOGIN_COUNT,
  }),
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.SET_STATE: {
      const { connected, credentialsRequired, credentialTypes, clean, loginCount } = state;
      const passwordRequired =
        !connected &&
        credentialsRequired &&
        (credentialTypes || []).indexOf("password") !== -1;
      const error = !connected && !clean && loginCount;
      return {
        ...state,
        ...action.payload,
        passwordRequired,
        error,
      };
    }
    case actionTypes.LOGIN_COUNT: {
      return {
        ...state,
        loginCount: state.loginCount + 1,
      };
    }
    default:
      return state;
  }
}

export const selector = state => state[STORE_KEY];

export const middleware = api => next => action => {
  return next(action);
};
