import { proposeActionType } from "../actionTypes/proposeActionType";
import { addMentorship } from "./mentorAction";

const { PROPOSAL_START, PROPOSAL_SUCCESS, PROPOSAL_FAIL } = proposeActionType;

const proposeStart = () => {
  return {
    type: PROPOSAL_START,
  };
};

const proposeSuccess = (course) => {
  return {
    type: PROPOSAL_SUCCESS,
    payload: course,
  };
};

const proposeFail = (error) => {
  return {
    type: PROPOSAL_FAIL,
    payload: error,
  };
};

export const propose = (data, proposefrom) => {
  const url =
    proposefrom === "mentor" ? "http://localhost:8085/mentorshipdetail" : "";
  console.log(data);
  return (dispatch) => {
    dispatch(proposeStart());
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ...data,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(({ message, mentorship }) => {
        if (message === "Proposed successfully") {
          dispatch(proposeSuccess(mentorship));
          dispatch(addMentorship(mentorship));
        } else dispatch(proposeFail(message));
      })
      .catch((err) => {
        dispatch(proposeFail(err));
      });
  };
};
