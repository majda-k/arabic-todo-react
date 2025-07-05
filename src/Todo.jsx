import { MdDeleteOutline } from "react-icons/md";
import { SlPencil } from "react-icons/sl";
import { GrValidate } from "react-icons/gr";
import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import TodoContext from "./todoContext";
import { ToastContext } from './toastContext';



import "../src/todo_list.css"; // Assuming you have a CSS file for styles

export default function Todo({ todo, handleCheck }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [ShowEditDialog, setShowEditDialog] = useState(false);
  const [updatedTodo , setUpdatedTodo]= useState({title:"", details :""});

  const { todos, setTodos } = useContext(TodoContext); // ✅ accès au contexte
 const {showHideToast} = useContext(ToastContext);

  function handleCheckClick() {
    handleCheck(todo.id);
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
    showHideToast("تم الحذف بنجاح ");
  }

  function handleClose() {
    setShowDeleteDialog(false);
    setShowEditDialog(false);
  }

  function handleAgreeClick() {
    const updatedTodos = todos.filter((t) => {
      return t.id !== todo.id;
    });

    setTodos(updatedTodos);
     localStorage.setItem("todos" , JSON.stringify(updatedTodos))
    handleClose();
  }

  function handleEditClick() {
    setShowEditDialog(true);
  }

function handleAgreeEdit(e) {
  e.preventDefault();
  const updatedTodos = todos.map((t) => {
    if (t.id === todo.id) {
      return {
        ...t,
        title: updatedTodo.title,
        details: updatedTodo.details,
      };
    }else
    return t;
  });
  setTodos(updatedTodos);
   localStorage.setItem("todos" , JSON.stringify(updatedTodos))
  setShowEditDialog(false)
    showHideToast(" تم التعديل بنجاح");


}

  return (
    <>
      {/* dialog delete button */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showDeleteDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من رغبتك في حذف المهمة
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك من التراجع عن الحذف بعد إتمام
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إغلاق</Button>
          <Button autoFocus onClick={handleAgreeClick}>
            نعم ، تأكيد الحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* dialog Edit Button */}
      <Dialog style={{direction:"rtl"}} open={ShowEditDialog} onClose={handleClose}>
        <DialogTitle>تعديل</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
       
          <form onSubmit={handleAgreeEdit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="عنوان المهمة"
              name="عنوان المهمة"
              type="text"
              fullWidth
              variant="standard"
              value={updatedTodo.title}
              onChange={(e)=>{
               setUpdatedTodo({...updatedTodo , title : e.target.value})
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label=" التفاصيل"
              name= "التفاصيل"
              type="text"
              fullWidth
              variant="standard"
                value={updatedTodo.details}
              onChange={(e)=>{
               setUpdatedTodo({...updatedTodo , details : e.target.value})
              }}
            />
            <DialogActions>
              <Button onClick={handleClose}>إغلاق</Button>
              <Button type="submit">تعديل</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <div display="flex" style={{ flexDirection: "row", padding: "0px 5px " }}>
        <div
          className="todoCard"
          style={{
            width: "100%",
            marginTop: "20px",
            color: "white",
            direction: "rtl",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#0000CD",
            height: "90px",
          }}
        >
          <div className="todo" style={{ marginRight: "20px" }}>
            <h3 className="todo-title" style={{textDecoration : todo.isCompleted ? "line-through" : "none"}} >{todo.title}</h3>
            <p className="todo-details">{todo.details}</p>
          </div>

          <div
            className="div"
            style={{
              flexDirection: "row",
              height: "60px",
              padding: "0px 5px ",
            }}
          ></div>
          <div style={{ marginTop: "15px" }}>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <GrValidate
                onClick={() => {
                  handleCheckClick();
                }}
                style={{
                  color: todo.isCompleted ? "green" : "white",
                  fontSize: "20px",
                  borderRadius: "50%",
                  border: "1px solid green",
                  padding: "5px",
                  backgroundColor: todo.isCompleted ? "white" : "green",
                  boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                }}
              />
            </button>

            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                marginTop: "-20px",
              }}
            >
              <SlPencil
                onClick={handleEditClick}
                style={{
                  color: "blue",
                  fontSize: "20px",
                  borderRadius: "50%",
                  border: "1px solid blue",
                  padding: "5px",
                  backgroundColor: "white",
                  boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                }}
              />
            </button>

            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <MdDeleteOutline
                onClick={handleDeleteClick}
                style={{
                  color: "#8B008B",
                  fontSize: "20px",
                  borderRadius: "50%",
                  padding: "5px",
                  border: "1px solid #8B008B",
                  backgroundColor: "white",
                  boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
