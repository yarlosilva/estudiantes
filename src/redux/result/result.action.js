import { resultActionTypes } from "./result.type";

export const setCurrentAnswer = (answer) => ({
  type: resultActionTypes.SET_RESULT,
  payload: answer,
});

export const increaseNumber = () => ({
  type: resultActionTypes.INCREASE_CORRECTANSWER,
});

export const decreaseNumber = () => ({
  type: resultActionTypes.DECREASE_CORRECTANSWER,
});
