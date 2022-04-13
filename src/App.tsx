import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import List from "./components/List";
import useDidUpdate from "./hooks/DidUpdate";
import Todo from "./interfaces/todo";


function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [todo, setTodo] = useState<string>("")

  const [searchTodo, setSearchTodo] = useState<string>("")

  const handelSubmit = (): void => {
    if(!todo) return alert('add a todo')
    
    const todoData = {
      id: uuidv4(),
      todo,
      show: true
    }
    setTodos(state => [...state, todoData])
    setTodo('')
  }

  useDidUpdate(() => {
    const filteredTodos = todos.map(el => {
      if (!el.todo.includes(searchTodo)) return { ...el, show: false }
      else return { ...el, show: true }
    })
    setTodos(filteredTodos)
  }, searchTodo)

  const handelDelete = (id: string): void => {
    const filteredTodos = todos.filter(el => el.id !== id)
    setTodos(filteredTodos)
  }

  return (
    <div className="App">
      <h1>todos</h1>

      <div id="form">
        <input type="text" name="todo" value={todo} onChange={(e) => setTodo(e.target.value)} className="input" id="input" placeholder="Enter your todo" autoComplete="off" required/>
        <button className="btn" onClick={handelSubmit}>Add</button>
      </div>
      
      <div style={{marginTop:10}}>
        <input onChange={e => setSearchTodo(e.target.value)} className="input" value={searchTodo} placeholder="Search..." />
        <br />
        <List handelDelete={handelDelete} todos={todos} />
      </div>

    </div>
  );
}

export default App;
