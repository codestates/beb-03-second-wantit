import initialState from "./initialState";

// Action
const SET_USER = "SET_USER";
const UNSET_USER = "UNSET_USER";

// Action 생성 함수
export const setUser = (userInfo) => {
  return {
    type: SET_USER,
    data: {
      userInfo,
    },
  };
};

export const unsetUser = () => {
  return {
    type: UNSET_USER,
  };
};

// Reducer
function tokenReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        token: action.data.accessToken,
      };
    case UNSET_USER:
      return {
        token: "",
      };
    default:
      return state;
  }
}

export default tokenReducer;
