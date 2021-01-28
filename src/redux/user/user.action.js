import { userActionTypes } from './user.types'


export const SetCurrentUser = user => ({
    type:userActionTypes.SET_CURRENT_USER,
    payload:user
})