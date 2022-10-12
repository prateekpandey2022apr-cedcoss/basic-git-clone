export const addSession = (session) => {
  // debugger;
  return {
    type: "ADD_SESSION",
    session,
  };
};

export const deleteSession = () => {
  // debugger;
  return {
    type: "DEL_SESSION",
  };
};

const initialState = {
  details: {},
};

export const sessionReducer = (state = initialState, action) => {
  console.log(state, action,'STdfadsf')
  // debugger;
  switch (action.type) {
    case "ADD_SESSION":
      // debugger;
      return {
        ...state,
        details: action.session,
      };
    case "DEL_SESSION":
      // debugger;
      const temp = state;
      temp.details = {};
      return { ...temp };

    default:
      return state;
  }
};
