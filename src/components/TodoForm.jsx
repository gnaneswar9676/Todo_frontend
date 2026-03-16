import { useState } from "react";
import API from "../services/api";
import '../styles/dashboard.css';
function TodoForm({fetchTodos}){

const [title,setTitle]=useState("");
const [description,setDescription]=useState("");

const handleSubmit = async (e)=>{
e.preventDefault();

const token = localStorage.getItem("token");

await API.post("/todo/create",
{title,description},
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

fetchTodos(); // refresh list

setTitle("");
setDescription("");
};

return(
<form className="todo-form" onSubmit={handleSubmit}>

<input
className="todo-input"
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
className="todo-input"
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<button className="add-btn">Add</button>

</form>
);
}

export default TodoForm;