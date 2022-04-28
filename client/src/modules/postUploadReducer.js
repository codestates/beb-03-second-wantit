// 액션
const SET_POST_FLAG = "SET_POST_FLAG";

// 액션 생성 함수
export const setPostFlag = (data) => {
  return {
    type: SET_POST_FLAG,
    data,
  };
};

// 초기 상태
const initialState = {
  data: false,
};

// 리듀서 함수
function postUploadReducer(state = initialState, action) {
  switch (action.type) {
    case SET_POST_FLAG:
      return {
        data: action.data,
      };
    default:
      return state;
  }
}

export default postUploadReducer;
