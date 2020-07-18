import React, { FC, useState, useEffect } from "react";
import firebase, { db } from "../firebase";
import { TextField, Button } from "@material-ui/core";

import Todo from "./todo";

type userDataType = {
  username: string,
  age: string | number,
  photoURL: string,
}

type todoType = {
  title: string,
  done: boolean,
  index: number,
}

const ToDoList: FC = (props: any) => {
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<userDataType>({
    username: "no data",
    age: "no data",
    photoURL: "",
  });
  const [ index, setIndex ] = useState(0);
  const [ error, setError ] = useState(null);
  const [todo, setTodo ] = useState<todoType>({
    title: "",
    done: false,
    index: 0,
  });
  const [todos, setTodos ] = useState<todoType[]>([]);
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged(activeUser => {
      setUser(activeUser);
      console.log("user");
    });
  }, []);
  useEffect(() => {
    if(user) {
      db.collection("users").doc(user.uid).get()
      .then(result => {
        const dbUser = result.data();
        if (dbUser) {
          setUserData(dbUser as userDataType);
          console.log("get data");
        }
      });
      db.collection("todos").doc(user.uid).get()
      .then(result => {
        const dbTodo = result.data();
        if (dbTodo) {
          setTodos(dbTodo.todos);
          setIndex(dbTodo.index);
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
    console.log("effect!!");
  },[ user ]);


  const saveTodoData = () => {
    if (user) {
      db.collection("todos").doc(user.uid).set({
        todos: todos,
        index: index,
      });
      alert("saved");
    }
  }
  const logout = () => {
    firebase.auth().signOut()
    .then(() => {
      props.history.push("/");
    })
    .catch( error => {
      setError(error);
    })
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
      <div>no user</div>
    );
  }
  
  return (
    <div>
      <h3>{ userData.username } のTodo</h3>
      <p>{ error }</p>
      <TextField 
        value={ todo.title }
        onChange={ handleChange }
      />
      <Button
        onClick={ handleClick }
        color="primary"
        variant="contained"
      >登録</Button>
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
      <Button
        onClick={ saveTodoData }
        color="primary"
        variant="contained"
      >保存</Button>
      <Button
        onClick={ logout }
        color="primary"
        variant="contained"
      >ログアウト</Button>
    </div>
  );
}

export default ToDoList;