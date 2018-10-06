import defaultState from "./default-state.js";

export const STORE_KEY = "root";

export const actionTypes = {
  SET_STATE: `${STORE_KEY}/set-State`,
  SEND_CREDENTIALS: `${STORE_KEY}/SEND_CREDENTIALS`,
};

export const actions = {
  setState: payload => ({
    type: actionTypes.SET_STATE,
    payload,
  }),
  sendCredentials: () => ({
    type: actionTypes.SEND_CREDENTIALS,
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
    case actionTypes.SEND_CREDENTIALS: {
      return {
        ...state,
        error: undefined,
        clean: true,        
        reason: undefined,
        status: 0,
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
