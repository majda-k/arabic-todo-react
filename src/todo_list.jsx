import { useEffect, useState } from "react";

import "../src/todo_list.css"; // Assuming you have a CSS file for styles

import { v4 as uuidv4 } from "uuid"; // Importing uuid for unique IDs
import Todo from "./Todo"; // Importing the Todo component
import TextField from "@mui/material/TextField";
import TodoContext from "./todoContext";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const InitialTodos = [
  {
    id: uuidv4(), // Generate a unique ID for each todo
    title: "قراءة كتاب",
    description: "الإنجاز قبل نهاية الشهر",
    isCompleted: "false",
  },
  {
    id: uuidv4(), // Generate a unique ID for each todo
    title: "قراءة كتاب",
    description: "الإنجاز قبل نهاية الشهر",
    isCompleted: "false",
  },
  {
    id: uuidv4(), // Generate a unique ID for each todo
    title: "قراءة كتاب",
    description: "الإنجاز قبل نهاية الشهر",
    isCompleted: false,
  },
];
export default function TodoList() {
  const [todos, setTodos] = useState(InitialTodos);
  const [titleInput, setTitleInput] = useState("");
  const [diplayChangeTodos , setDiplayChangeTodos ]= useState("all");


function changeTodos (e , newValue){
if(newValue !=null){
    setDiplayChangeTodos(newValue);
}
}



    const CompletedTodos = todos.filter((t)=>{
        return !t.isCompleted;
    });


   const notCompletedTodos = todos.filter((t)=>{
        return t.isCompleted;
 });


  function handleCheckClick(todoId) {
    const updateTodo = todos.map((t) => {
      if (t.id === todoId) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updateTodo);
  }

let displayTodos = todos;

if(diplayChangeTodos === "completed"){
displayTodos = CompletedTodos;

}else if(diplayChangeTodos === "notCompleted"){
displayTodos = notCompletedTodos;

}else {
    displayTodos = todos;
}

  const todosjsx = displayTodos.map((todo) => {
    return <Todo key={todo.id} todo={todo} handleCheck={handleCheckClick} />;
  });

  useEffect(() => {
    console.log("calling use Effect");
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    if (Array.isArray(storageTodos)) {
      setTodos(storageTodos);
    }
  }, []);

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: "false",
    };
    setTodos([...todos, newTodo]);
    const updatedTodos = [...todos, newTodo];
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  return (
    <div className="card" style={{maxHeight:"80vh" , maxheight:"80vh" , overflowY:"auto", overflowX:"hidden" }}>
    <TodoContext.Provider value={{ todos, setTodos }}>
      <div >
        <h1
          style={{
            fontWeight: "bold",
            fontFamily: "unset",
            fontSize: "50px",
            marginTop: "0px",
            borderBottom: "1px solid #A9A9A9",
          }}
        >
          مهامي
        </h1>

        <ToggleButtonGroup
        value={diplayChangeTodos}
        onChange={changeTodos}
         exclusive
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            direction: "rtl",
          }}
        >
          <ToggleButton
            value="all"
            style={{
              padding: "10px",
              border: "1px solid #A9A9A9",
              fontSize: "12px",
            }}
          >
            الكل
          </ToggleButton>
          <ToggleButton
          value="completed"
            style={{
              padding: "10px",
              border: "1px solid #A9A9A9",
              fontSize: "12px",
            }}
          >
            منجز
          </ToggleButton>
          <ToggleButton
          value="notCompleted"
            style={{
              padding: "10px",
              border: "1px solid #A9A9A9",
              fontSize: "12px",
            }}
          >
            غيرمنجزة
          </ToggleButton>
        </ToggleButtonGroup>

        <div>{todosjsx}</div>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <button
            style={{
              height: "55px",
              fontWeight: "bold",
              marginRight: "20px",
              width: "100px",
              background: "#1E90FF",
              borderRadius: "5PX",
              color: "white",
            }}
            onClick={() => {
              handleAddClick();
            }}
            disabled={titleInput.length === 0}
          >
            إضافة
          </button>
          <TextField
            id="outlined-basic"
            label="عنوان المهمة"
            variant="outlined"
            style={{ width: "65%", fontWeight: "bold" }}
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
        </div>
      </div>
    </TodoContext.Provider>
    </div>
  );
}
