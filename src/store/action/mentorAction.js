import { mentorActionType } from "../actionTypes/mentorActionType";

const { SET_MENTOR, SET_MENTORSHIPS, GET_MENTORSHIPS, ADD_MENTORSHIP } =
  mentorActionType;

export const setMentor = (mentor) => {
  return {
    type: SET_MENTOR,
    payload: mentor,
  };
};

const setMentorships = (mentorships) => {
  return {
    type: SET_MENTORSHIPS,
    payload: mentorships,
  };
};

export const addMentorship = (mentorship) => {
  return {
    type: ADD_MENTORSHIP,
    payload: mentorship,
  };
};
export const getMentorships = () => {
  return {
    type: GET_MENTORSHIPS,
  };
};

export const setMentorshipDetails = (mentorId) => {
  return (dispatch) => {
    fetch(`http://localhost:8085/mentorshipdetail/${mentorId}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setMentorships(data.mentorship));
      })
      .catch((err) => alert(err));
  };
};
