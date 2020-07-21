import React, { FC, useState, useEffect } from "react";
import { db } from "../firebase";
import { TextField, Button,makeStyles, createStyles } from "@material-ui/core";
import { userType, userDataType } from "../types/usertype";
import { todoType } from "../types/todoType";
// @ts-ignore
import { connect } from "react-redux";
import { setTodos, setIndex } from "../actions/todoAction";
import Todo from "./todo";

const useStyles = makeStyles(() => createStyles({
  container: {
    position: "relative",
    top: "50px",
    margin: "auto",
    width: "300px", 
  },
  textField: {
    width: "70%",
    margin: "5px auto",
    marginRight: "10px",
  },
  savebtn: {
    margin: "20px auto",
    width: "90%",
  }
}))

const ToDoList: FC<{
  user: userType,
  userData: userDataType,
  todos: todoType[],
  index: number,
  setTodos: Function,
  setIndex: Function,
}> = ({ user, userData, todos, index, setTodos, setIndex }) => {
  const classes = useStyles();
  const [todo, setTodo ] = useState<todoType>({
    title: "",
    done: false,
    index: 0,
  });
  useEffect(() => {
    if(user.user) {
      console.log("user loged in");
      db.collection("todos").doc(user.user.uid).get()
      .then(result => {
        const dbTodo = result.data();
        console.log("get dbTodo");
        if (dbTodo) {
          setTodos(dbTodo.todos);
          setIndex(dbTodo.index);
          console.log(dbTodo.todos);
        }
      });
    }
    const tempTodos = [...todos];
    tempTodos.sort((a, b) => {
      if (a.index < b.index) return -1;
      if (a.index > b.index) return 1;
      return 0;
    });
    setTodos(tempTodos);
  }, [ user, setIndex, setTodos ]);



  const saveTodoData = () => {
    if (user.user) {
      db.collection("todos").doc(user.user.uid).set({
        todos: todos,
        index: index,
      });
      alert("saved");
    }
  }

  const handleChange = (event: any) => {
    setTodo({
      title: event.target.value,
      done: false,
      index: index,
    });
  }

  const handleClick = () => {
    const tempTodos = [...todos];
    tempTodos.push(todo);
    tempTodos.sort((a, b) => {
      if (a.index < b.index) return -1;
      if (a.index > b.index) return 1;
      return 0;
    });
    setTodos(tempTodos);
    setIndex(index + 1);
  }

  const deleteTodo = (index: number) => {
    const tempTodos = todos.filter( todo => todo.index !== index);
    tempTodos.sort((a, b) => {
      if (a.index < b.index) return -1;
      if (a.index > b.index) return 1;
      return 0;
    });
    setTodos(tempTodos);
  }

  const changeCheck = (index: number) => {
    const todo = todos.find(todo => todo.index === index);
    if (todo) {
      const tempTodos = todos.filter(todo => todo.index !== index);
      todo.done = !todo.done;
      tempTodos.push(todo);
      tempTodos.sort((a, b) => {
        if (a.index < b.index) return -1;
        if (a.index > b.index) return 1;
        return 0;
      });
      setTodos(tempTodos);
    }
  }

  if (!user) {
    return (
      <div className={ classes.container }>no user</div>
    );
  }
  
  return (
    <div className={ classes.container }>
      <h3>{ userData.username } のTodo</h3>
      <TextField 
        className={ classes.textField }
        value={ todo.title }
        onChange={ handleChange }
      />
      <Button
        onClick={ handleClick }
        color="primary"
        variant="contained"
      >登録</Button>
      <br/>
      <br/>
        {
          todos.map( (todo ) => (
            <div>
              <Todo 
                key={ todo.index }
                todo={ todo }
                changeCheck={ changeCheck }
                deleteTodo={ deleteTodo }
              />
            </div>
          ))
        }
      <br />
      <br />
      <Button
        className={ classes.savebtn }
        onClick={ saveTodoData }
        color="primary"
        variant="contained"
      >保存</Button>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    userData: state.userData,
    todos: state.todos,
    index: state.index,
  };
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setTodos: (todos: todoType[]) => dispatch(setTodos(todos)),
    setIndex: (index: number) => dispatch(setIndex(index)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);