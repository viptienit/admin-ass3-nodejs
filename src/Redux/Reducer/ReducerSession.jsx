const initialState = {
  idUser: "",
  role: "",
};

const ReducerSession = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SESSION":
      state.idUser = action.data.id;
      state.role = action.data.role;

      return state;

    case "DELETE_SESSION":
      state.idUser = "";
      state.role = "";

      return state;

    default:
      return state;
  }
};

export default ReducerSession;
