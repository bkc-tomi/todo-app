import React, { FC } from "react";
import {Button, Checkbox, makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() => createStyles({
  container: {
    margin: "5px auto",
  },
  title: {
    float: "left",
    width: "150px",
    overflow: "auto",
    verticalAlign: "center",
  },
  checkbox: {
    float: "left",
    width: "50px",
    textAlign: "center",
  },
  btn: {
    float: "left",
    width: "100px",
    textAlign: "center",
  },
}))

const Todo: FC<{
  todo: any,
  changeCheck: Function,
  deleteTodo: Function,
}> = ({ todo, changeCheck, deleteTodo}) => {
  const classes = useStyles();
  return (
    <div className={ classes.container  }>
      <div className={ classes.title }>
        { todo.title }
      </div>
      <div className={ classes.checkbox }>
        <Checkbox 
          checked={ todo.done }
          onChange={ () => changeCheck(todo.index) }
          color="primary"
        />
      </div>
      <div className={ classes.btn }>
        <Button
          onClick={ () => deleteTodo(todo.index) }
          color="primary"
          variant="contained"
        >
          削除
        </Button>
      </div>
    </div>
  );
}

export default Todo;