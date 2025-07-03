import "./App.css";
import TodoList from "./todo_list";
import { createTheme, ThemeProvider } from "@mui/material/styles";



const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
});

function App() {
  return (

    
    <ThemeProvider theme={theme}>
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
        </container>
      </div>
    </ThemeProvider>


  );
}

export default App;
