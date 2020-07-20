import { todoType } from "../types/todoType";
import { todoActionType } from "../types/todoActionType";

export const setTodos = (todos: todoType[]):todoActionType => {
  return { type: "SET_TODOS", todos};
}
export const changeTodos = (todos: todoType[]):todoActionType => {
  return { type: "CHANGE_TODOS", todos};
}
export const deleteTodos = (todos: todoType[]):todoActionType => {
  return { type: "DELETE_TODOS", todos};
}

export const setIndex = (index: number) => {
  return { type: "SET_INDEX", index};
}
