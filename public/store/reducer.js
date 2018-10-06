import defaultState from "./default-state.js";

export const STORE_KEY = "root";

export const actionTypes = {
  SET_STATE: `${STORE_KEY}/set-State`,
};

export const actions = {
  setState: payload => ({
    type: actionTypes.SET_STATE,
    payload,
  }),
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.SET_STATE: {
      return {
        ...state,
        ...action.payload,
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
