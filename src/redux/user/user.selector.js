import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectResult = createSelector([selectCurrentUser], (user) => {
  console.log(user.result);
  if(user) {
     return user.result;
  } else {
    console.log('it null')
    return []
  }
 
});
