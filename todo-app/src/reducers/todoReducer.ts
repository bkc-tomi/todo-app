import { todoType } from "../types/todoType";
import { todoActionType } from "../types/todoActionType";

const initTodos: todoType[] = [];
export const todosReducer = (state:todoType[] = initTodos, action:todoActionType) => {
  switch (action.type) {
    case "SET_TODOS":
      return action.todos;
    case "CHANGE_TODOS":
      return action.todos;
    case "DELETE_TODOS":
      return action.todos;
    default:
      return state;
  }
}

const initIndex: number = 0;
export const indexReducer = (state:number = initIndex, action: any) => {
  switch (action.type) {
    case "SET_INDEX":
      return action.index;
    default:
      return state;
  }
}