import { mentorActionType } from "../actionTypes/mentorActionType";

const { SET_MENTOR, SET_MENTORSHIPS, ADD_MENTORSHIP, GET_MENTORSHIPS } =
  mentorActionType;

const initialState = {
  mentor: {},
  mentorships: [],
};

export const mentorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MENTOR:
      return { ...state, mentor: payload };

    case SET_MENTORSHIPS:
      return { ...state, mentorships: [...payload] };

    case ADD_MENTORSHIP:
      return { ...state, mentorships: [...state.mentorships, payload] };

    case GET_MENTORSHIPS:
      return { state };
    default:
      return state;
  }
};
