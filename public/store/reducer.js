import defaultState from "./default-state.js";

export const STORE_KEY = "root";

export const actionTypes = {
  SET_STATE: `${STORE_KEY}/set-State`,
  ON_SEND_CREDENTIALS: `${STORE_KEY}/ON_SEND_CREDENTIALS`,
  CLOSE_PANEL: `${STORE_KEY}/CLOSE_PANEL`,
};

export const actions = {
  setState: payload => ({
    type: actionTypes.SET_STATE,
    payload,
  }),
  onSendCredentials: () => ({
    type: actionTypes.ON_SEND_CREDENTIALS,
  }),
  closePanel: () => ({
    type: actionTypes.CLOSE_PANEL,
  }),
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.SET_STATE: {
      const {
        connected,
        credentialsRequired,
        credentialTypes,
        clean,
        loginCount,
      } = state;
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
    case actionTypes.ON_SEND_CREDENTIALS: {
      return {
        ...state,
        error: undefined,
        clean: true,
        reason: undefined,
        status: 0,
        loginCount: state.loginCount + 1,
      };
    }
    case actionTypes.CLOSE_PANEL: {
      return {
        ...state,
        panelOpen: false,
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
