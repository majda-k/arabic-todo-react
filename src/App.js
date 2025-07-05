import "./App.css";
import MySnackBar from "./MySnackBar";
import TodoList from "./todo_list";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { ToastContext } from "./toastContext.jsx";


const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
});

function App() {
  const [open, setOpen] = useState(false);
 const [message, setMessage] = useState(false);

function showHideToast (message = ""){

  setOpen(true);
  setMessage(message);
  setTimeout(()=>{
    setOpen(false);
  }, 2000);
}


  return (

    
    <ThemeProvider theme={theme}>
      <ToastContext.Provider value = {{showHideToast}}>
      <div className="App" style={{ backgroundColor: "black", height: "100vh" }}>
        <container
          maxWidth="sm"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
          fixed
        >
          <div
            style={{
              width: "25%",
              maxHeight:"80vh",
              backgroundColor: "white",
              paddingBottom: "20px",
              
            }}
          >
           
            <TodoList  />
          </div>
           <MySnackBar open={open} message={message}/>
        </container>
      </div>
      </ToastContext.Provider>
    </ThemeProvider>


  );
}

export default App;
