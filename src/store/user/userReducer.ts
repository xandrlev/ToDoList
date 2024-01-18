type StateType = {
  age: number;
  name: string;
  childrenCount: number;
};

type ActionName = {
  type: string;
  [key: string]: any;
};

export const userReducer = (
  state: StateType,
  action: ActionName
): StateType => {
  switch (action.type) {
    case "INCREMENT-AGE":
      let newState = { ...state };
      newState.age = state.age + 1;
      return newState;

    case "INCREMENT-CHILDREN-COUNT":
      return {
        ...state,
        childrenCount: state.childrenCount + 1,
      };

    case "CHANGE-NAME":
      return {
        ...state,
        name: action.newName,
      };
    default:
      return state;
  }
};
