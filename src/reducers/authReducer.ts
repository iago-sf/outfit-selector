import { authTypes } from "../types/authTypes";

export const authReducer = (state : any = {}, action : any) => {
  switch (action.type) {
    case authTypes.LOGIN:
      return action.payload;

    case authTypes.LOGOUT:
      return {};
    
    default:
      return state; 
  }
}