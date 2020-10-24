import { ADD_Carosal_DATA } from "../actions";

const initialState = {
  data:{}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_Carosal_DATA:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return {
        ...state,
      };
  }
}
