import { todoType } from "./todoType";

export type todoActionType = {
  type: "SET_TODOS",
  todos: todoType[],
} | {
  type: "CHANGE_TODOS",
  todos: todoType[],
} | {
  type: "DELETE_TODOS",
  todos: todoType[],
}