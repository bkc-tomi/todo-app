import React, { FC } from "react";
import {Button, Checkbox } from "@material-ui/core";

const Todo: FC<{
  todo: any,
  changeCheck: Function,
  deleteTodo: Function,
}> = ({ todo, changeCheck, deleteTodo}) => {
  return (
    <div>
      { todo.index }
      { todo.title }
      <Checkbox 
        checked={ todo.done }
        onChange={ () => changeCheck(todo.index) }
        color="primary"
      />
      <Button
        onClick={ () => deleteTodo(todo.index) }
        color="primary"
        variant="contained"
      >
        削除
      </Button>
    </div>
  );
}

export default Todo;