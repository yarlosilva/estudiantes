import { resultActionTypes } from "./result.type";

const INITIAL_STATE = {
  result: null,
  correctAnswer: 0,
  wrongAnswer: 0,
};

const resultReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case resultActionTypes.SET_RESULT:
      return {
        ...state,
        currentUser: action.payload,
      };

    case resultActionTypes.INCREASE_CORRECTANSWER:
      return {
        ...state,
        correctAnswer: state.correctAnswer + 1,
      };
    case resultActionTypes.DECREASE_CORRECTANSWER:
      return {
        ...state,
        wrongAnswer: state.wrongAnswer + 1,
      };

    default:
      return state;
  }
};

export default resultReducer;
