
import { v4 as uuidv4 } from "uuid";

export default function reducerFunction(currentTodos, action) {
  switch (action.type) {
    //ajouter un todo
    case "added": {
      const newTodo = {
        id:  uuidv4(), // Generate a unique ID if not provided
        title: action.payload.title,
        details: "",
        isCompleted: "false",
      };

      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
// supprimer un todo
    case "deleted": {
      const updatedTodos = currentTodos.filter((t) => {
        return t.id !== action.payload.id;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
// modifier un todo

    case "edited": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else return t;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
     // initialiser les todos depuis le localStorage
    case "init": {
      return action.payload;
    }
    case "checked": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            isCompleted: !t.isCompleted,
          };
        } else return t;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
