import { ADD_GENRES, TOGGLE_LOADER } from "../actions";

const initialState = {
  genres: [],
  isLoadingData:false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_GENRES:
      return {
        ...state,
        genres: action.payload.genres,
      };
      
    case TOGGLE_LOADER:
      return {
        ...state,
        isLoadingData: action.payload.loader,
      };
    default:
      return {
        ...state,
      };
  }
}
